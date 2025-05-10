import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";
import {
  DirConstants,
  LanguagesConstants,
  NodeEnvConstants,
} from "@/utils/constants";

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: LanguagesConstants.ENGLISH,
    debug: import.meta.env.VITE_NODE_ENV === NodeEnvConstants.DEVELOPMENT,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: [LanguagesConstants.ENGLISH, LanguagesConstants.ARABIC],
  });

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  document.documentElement.dir =
    lng === LanguagesConstants.ARABIC ? DirConstants.RTL : DirConstants.LTR;
  document.documentElement.lang = lng;
};

document.documentElement.dir =
  i18n.language === LanguagesConstants.ARABIC
    ? DirConstants.RTL
    : DirConstants.LTR;
document.documentElement.lang = i18n.language;

export default i18n;