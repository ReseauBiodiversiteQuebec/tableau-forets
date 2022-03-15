import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const TranslationContext = createContext({});

export const TranslateWrapper = (props) => {
  const { t } = useTranslation();
  const { i18n } = props;
  const [language, setLanguage] = useState("fr");

  const changeLanguage = (language) => {
    i18n.changeLanguage(language && language.length === 2 ? language : "fr");
    setLanguage(language);
  };

  useEffect(() => {
    setLanguage(i18n.language === "apps" ? "fr" : "en");
  }, []);

  document.title = t("Forêts québécoises et changements climatiques");

  return (
    <TranslationContext.Provider
      value={{
        language,
        changeLanguage,
        t: t.bind(this),
      }}
    >
      {props.children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
