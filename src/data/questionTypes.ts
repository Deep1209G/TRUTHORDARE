import type { AgeGroup, Difficulty } from '../context/GameContext';

export type QuestionType =
  | 'Funny'
  | 'Family'
  | 'School'
  | 'Adventure'
  | 'Silly'
  | 'Friends'
  | 'Party'
  | 'Embarrassing'
  | 'Challenge'
  | 'Romantic'
  | 'Spicy'
  | 'Extreme';

export type Question = {
  text: string;
  ageGroup: AgeGroup;
  type: QuestionType;
  category: Difficulty;
};

export const AGE_QUESTION_TYPES: Record<AgeGroup, QuestionType[]> = {
  kids: ['Funny', 'Family', 'School', 'Adventure', 'Silly'],
  teens: ['Funny', 'Friends', 'School', 'Party', 'Embarrassing', 'Challenge'],
  adults: ['Funny', 'Friends', 'Party', 'Romantic', 'Spicy', 'Extreme'],
};
