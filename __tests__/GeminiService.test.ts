import axios from 'axios';

import { generateQuestions } from '../src/services/GeminiService';
import * as geminiConfig from '../src/config/gemini';
import type { QuestionType } from '../src/data/questionTypes';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const baseParams = {
  kind: 'truth' as const,
  ageGroup: 'adults' as const,
  difficulty: 'medium' as const,
  questionTypes: ['Party' as QuestionType],
  count: 5,
};

function mockResponse(questions: { text: string }[]) {
  return {
    data: {
      candidates: [{ content: { parts: [{ text: JSON.stringify({ questions }) }] } }],
    },
  };
}

describe('generateQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('returns an empty array when the API key is not configured', async () => {
    jest.spyOn(geminiConfig, 'isGeminiConfigured').mockReturnValue(false);
    mockedAxios.post.mockResolvedValue(mockResponse([{ text: 'Never used' }]));
    const result = await generateQuestions(baseParams);
    expect(result).toEqual([]);
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('returns an empty array when the request fails', async () => {
    jest.spyOn(geminiConfig, 'isGeminiConfigured').mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(new Error('network error'));
    const result = await generateQuestions(baseParams);
    expect(result).toEqual([]);
  });

  it('returns an empty array when the response has no text', async () => {
    jest.spyOn(geminiConfig, 'isGeminiConfigured').mockReturnValue(true);
    mockedAxios.post.mockResolvedValue({ data: {} });
    const result = await generateQuestions(baseParams);
    expect(result).toEqual([]);
  });

  it('returns an empty array when the response is malformed JSON', async () => {
    jest.spyOn(geminiConfig, 'isGeminiConfigured').mockReturnValue(true);
    mockedAxios.post.mockResolvedValue({
      data: {
        candidates: [{ content: { parts: [{ text: 'not json' }] } }],
      },
    });
    const result = await generateQuestions(baseParams);
    expect(result).toEqual([]);
  });

  it('parses questions and fills in context fields', async () => {
    jest.spyOn(geminiConfig, 'isGeminiConfigured').mockReturnValue(true);
    mockedAxios.post.mockResolvedValue(
      mockResponse([{ text: 'What is your funniest memory?' }]),
    );
    const result = await generateQuestions(baseParams);
    expect(result).toEqual([
      {
        text: 'What is your funniest memory?',
        ageGroup: 'adults',
        type: 'Party',
        category: 'medium',
      },
    ]);
  });

  it('excludes questions from the exclude list and limits to count', async () => {
    jest.spyOn(geminiConfig, 'isGeminiConfigured').mockReturnValue(true);
    mockedAxios.post.mockResolvedValue(
      mockResponse([
        { text: 'Duplicate question' },
        { text: 'Duplicate question' },
        { text: 'Second question' },
        { text: 'Third question' },
      ]),
    );
    const result = await generateQuestions({
      ...baseParams,
      count: 2,
      exclude: ['Duplicate question'],
    });
    expect(result).toHaveLength(2);
    expect(result.map(q => q.text)).toEqual(['Second question', 'Third question']);
  });
});
