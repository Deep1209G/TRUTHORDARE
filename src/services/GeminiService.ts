import axios from 'axios';

import {
  GEMINI_API_KEY,
  GEMINI_MODEL,
  isGeminiConfigured,
} from '../config/gemini';
import type { AgeGroup, Difficulty } from '../context/GameContext';
import type { Question, QuestionType } from '../data/questionTypes';

type GenerateQuestionsParams = {
  kind: 'truth' | 'dare';
  ageGroup: AgeGroup;
  difficulty: Difficulty;
  questionTypes: QuestionType[];
  count: number;
  exclude?: string[];
};

const AGE_GUIDE: Record<AgeGroup, string> = {
  kids: 'age-appropriate for children, never romantic, spicy, or adult content',
  teens: 'age-appropriate for teenagers, no explicit content',
  adults: 'for adults, can include mature party themes',
  family:
    'age-appropriate for a family playing together, wholesome and never adult content',
  couple:
    'for a couple or partners, romantic and flirty but keep it playful and fun',
};

const INTENSITY_GUIDE: Record<Difficulty, string> = {
  mild: 'playful, light, family-friendly',
  medium: 'a bit spicy, mildly daring',
  wild: 'full party chaos, very daring',
};

function buildPrompt(params: GenerateQuestionsParams): string {
  const { kind, ageGroup, difficulty, questionTypes, count, exclude = [] } = params;
  const typeLabel = kind === 'truth' ? 'Truth' : 'Dare';
  const typeGuide =
    questionTypes.length > 0 ? questionTypes.join(', ') : 'any';
  const excluded =
    exclude.length > 0
      ? [`Excluded (do not reuse): ${exclude.slice(0, 20).join(' | ')}`]
      : [];

  return [
    `You are a party game host generating ${typeLabel} questions.`,
    `Write exactly ${count} unique ${typeLabel} questions.`,
    `Age group: ${ageGroup} (${AGE_GUIDE[ageGroup]}).`,
    `Intensity: ${difficulty} (${INTENSITY_GUIDE[difficulty]}).`,
    `Question types allowed: ${typeGuide}.`,
    'Rules: one short sentence each; English; spoken aloud at a party;',
    'vary the phrasing and avoid generic filler; keep every question on-topic.',
    ...excluded,
  ].join('\n');
}

function parseQuestions(
  raw: string,
  params: GenerateQuestionsParams,
): Question[] {
  const { ageGroup, difficulty, questionTypes, count, exclude = [] } = params;
  const parsed = JSON.parse(raw);
  const items = Array.isArray(parsed?.questions) ? parsed.questions : [];
  const excludeSet = new Set(exclude);
  const fallbackType: QuestionType = params.kind === 'truth' ? 'Funny' : 'Challenge';
  const primaryType: QuestionType = questionTypes[0] ?? fallbackType;

  return items
    .filter((item: { text?: unknown }) => item && typeof item.text === 'string')
    .map((item: { text: string }) => item.text.trim())
    .filter(
      (text: string) => text.length > 0 && !excludeSet.has(text) && !excludeSet.has(text.toLowerCase()),
    )
    .slice(0, count)
    .map((text: string) => ({
      text,
      ageGroup,
      type: primaryType,
      category: difficulty,
    }));
}

export async function generateQuestions(
  params: GenerateQuestionsParams,
): Promise<Question[]> {
  if (!isGeminiConfigured()) return [];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: buildPrompt(params) }] }],
        generationConfig: {
          temperature: 1.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              questions: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: { text: { type: 'STRING' } },
                },
              },
            },
          },
        },
      },
      { timeout: 15000 },
    );

    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return [];
    return parseQuestions(text, params);
  } catch {
    return [];
  }
}
