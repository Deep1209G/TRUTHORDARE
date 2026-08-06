import { useTranslation } from 'react-i18next';

import type { QuestionType } from '../data/questionTypes';

export function topicLabel(type: QuestionType): string {
  return topicLabels[type];
}

export function useTopicLabel() {
  const { t } = useTranslation();
  return (type: QuestionType) => t(topicLabels[type]);
}

export const topicLabels: Record<QuestionType, string> = {
  Funny: 'topic.Funny',
  Family: 'topic.Family',
  School: 'topic.School',
  Adventure: 'topic.Adventure',
  Silly: 'topic.Silly',
  Animals: 'topic.Animals',
  Cartoons: 'topic.Cartoons',
  Superheroes: 'topic.Superheroes',
  Food: 'topic.Food',
  Games: 'topic.Games',
  Music: 'topic.Music',
  Storybooks: 'topic.Storybooks',
  Space: 'topic.Space',
  Nature: 'topic.Nature',
  Friends: 'topic.Friends',
  Party: 'topic.Party',
  Embarrassing: 'topic.Embarrassing',
  Challenge: 'topic.Challenge',
  Romantic: 'topic.Romantic',
  Spicy: 'topic.Spicy',
  Extreme: 'topic.Extreme',
  Gaming: 'topic.Gaming',
  'Movies & TV': 'topic.Movies & TV',
  'Social Media': 'topic.Social Media',
  'Dreams & Goals': 'topic.Dreams & Goals',
  'Love & Romance': 'topic.Love & Romance',
  'Career & Work': 'topic.Career & Work',
  Travel: 'topic.Travel',
  'Food & Drinks': 'topic.Food & Drinks',
  'Health & Fitness': 'topic.Health & Fitness',
  'Opinions & Choices': 'topic.Opinions & Choices',
  'Hobbies & Creativity': 'topic.Hobbies & Creativity',
  Lifestyle: 'topic.Lifestyle',
  'Family Memories': 'topic.Family Memories',
  Favorites: 'topic.Favorites',
  'Movies & Cartoons': 'topic.Movies & Cartoons',
  'Music & Dance': 'topic.Music & Dance',
  'Travel & Adventure': 'topic.Travel & Adventure',
  Creativity: 'topic.Creativity',
  'Fun Challenges': 'topic.Fun Challenges',
  'Relationship Memories': 'topic.Relationship Memories',
  Compliments: 'topic.Compliments',
  Flirting: 'topic.Flirting',
  Trust: 'topic.Trust',
  'Dreams & Future': 'topic.Dreams & Future',
  Surprises: 'topic.Surprises',
  'Food & Dates': 'topic.Food & Dates',
  'Movies & Music': 'topic.Movies & Music',
  'Couple Challenges': 'topic.Couple Challenges',
  'Would You Rather': 'topic.Would You Rather',
  Celebrations: 'topic.Celebrations',
  'Sweet Confessions': 'topic.Sweet Confessions',
};
