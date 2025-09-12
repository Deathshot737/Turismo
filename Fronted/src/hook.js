import { useState, useEffect } from "react";
import translate from "google-translate-open-api";

export const useAutoTranslate = () => {
    const [language, setLanguage] = useState(localStorage.getItem("lang") || "es");

    const translateText = async(text) => {
        try {
            const result = await translate(text, { tld: "com", to: language });
            return result.data[0][0][0]; // devuelve la traducción
        } catch (error) {
            console.error("Error traduciendo:", error);
            return text; // fallback: devuelve texto original
        }
    };

    const setLang = (lang) => {
        localStorage.setItem("lang", lang);
        setLanguage(lang);
    };

    return { language, setLang, translateText };
};