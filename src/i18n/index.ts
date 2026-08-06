import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';
import gu from './locales/gu.json';

export const LANGUAGE_STORAGE_KEY = 'appLanguage';

export type AppLanguage = 'en' | 'hi' | 'gu';

export const SUPPORTED_LANGUAGES: {
  code: AppLanguage;
  labelKey: string;
  native: string;
}[] = [
  { code: 'en', labelKey: 'language.english', native: 'English' },
  { code: 'hi', labelKey: 'language.hindi', native: 'हिन्दी' },
  { code: 'gu', labelKey: 'language.gujarati', native: 'ગુજરાતી' },
];

const SUPPORTED_CODES: string[] = SUPPORTED_LANGUAGES.map(l => l.code);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    gu: { translation: gu },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_CODES,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export async function initI18n(): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_CODES.includes(stored)) {
      await i18n.changeLanguage(stored);
    }
  } catch {
    // ignore storage failures, keep default language
  }
}

export async function setLanguage(code: AppLanguage): Promise<void> {
  if (!SUPPORTED_CODES.includes(code)) return;
  await i18n.changeLanguage(code);
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    // ignore storage failures, language still applies for the session
  }
}

export default i18n;
