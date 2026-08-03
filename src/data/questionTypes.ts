import type { AgeGroup, Difficulty } from '../context/GameContext';

export type QuestionType =
  | 'Funny'
  | 'Family'
  | 'School'
  | 'Adventure'
  | 'Silly'
  | 'Animals'
  | 'Cartoons'
  | 'Superheroes'
  | 'Food'
  | 'Games'
  | 'Music'
  | 'Storybooks'
  | 'Space'
  | 'Nature'
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
  kids: [
    'Animals',
    'Cartoons',
    'Superheroes',
    'Food',
    'Games',
    'Music',
    'Storybooks',
    'Space',
    'Nature',
    'Funny',
  ],
  teens: ['Funny', 'Friends', 'School', 'Party', 'Embarrassing', 'Challenge'],
  adults: ['Funny', 'Friends', 'Party', 'Romantic', 'Spicy', 'Extreme'],
  family: ['Funny', 'Family', 'School', 'Adventure', 'Silly'],
  couple: ['Funny', 'Romantic', 'Spicy', 'Party', 'Challenge'],
};
