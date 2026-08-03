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
  | 'Extreme'
  | 'Gaming'
  | 'Movies & TV'
  | 'Social Media'
  | 'Dreams & Goals'
  | 'Love & Romance'
  | 'Career & Work'
  | 'Travel'
  | 'Food & Drinks'
  | 'Health & Fitness'
  | 'Opinions & Choices'
  | 'Hobbies & Creativity'
  | 'Lifestyle'
  | 'Family Memories'
  | 'Favorites'
  | 'Movies & Cartoons'
  | 'Music & Dance'
  | 'Travel & Adventure'
  | 'Creativity'
  | 'Fun Challenges'
  | 'Relationship Memories'
  | 'Compliments'
  | 'Flirting'
  | 'Trust'
  | 'Dreams & Future'
  | 'Surprises'
  | 'Food & Dates'
  | 'Movies & Music'
  | 'Couple Challenges'
  | 'Would You Rather'
  | 'Celebrations'
  | 'Sweet Confessions';

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
  teens: [
    'Funny',
    'Friends',
    'School',
    'Gaming',
    'Movies & TV',
    'Music',
    'Social Media',
    'Dreams & Goals',
    'Food',
    'Party',
  ],
  adults: [
    'Funny',
    'Love & Romance',
    'Career & Work',
    'Friends',
    'Travel',
    'Food & Drinks',
    'Movies & TV',
    'Music',
    'Gaming',
    'Health & Fitness',
    'Party',
    'Dreams & Goals',
    'Opinions & Choices',
    'Hobbies & Creativity',
    'Lifestyle',
  ],
  family: [
    'Funny',
    'Family Memories',
    'Favorites',
    'Food',
    'Movies & Cartoons',
    'Music & Dance',
    'Travel & Adventure',
    'Creativity',
    'Dreams & Goals',
    'Fun Challenges',
  ],
  couple: [
    'Love & Romance',
    'Relationship Memories',
    'Compliments',
    'Funny',
    'Flirting',
    'Trust',
    'Dreams & Future',
    'Surprises',
    'Food & Dates',
    'Movies & Music',
    'Travel',
    'Couple Challenges',
    'Would You Rather',
    'Celebrations',
    'Sweet Confessions',
  ],
};
