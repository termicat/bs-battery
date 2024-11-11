import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./locales/zh/common.json";
import ja from "./locales/ja/common.json";

const opt = {
  resources: {
    en: {
      translation: {},
    },
    zh: {
      translation: zh,
    },
    ja: {
      translation: ja,
    },
    // 添加更多语言...
  },
  lng: "zh", // 默认语言
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
};
i18n.use(initReactI18next).init(opt);

console.log(opt);

export default i18n;
