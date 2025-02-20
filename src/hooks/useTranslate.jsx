import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const useTranslate = (sourceText, selectedLanguage) => {
    const [targetText, setTargetText] = useState("");

    useEffect(() => {
        const handleTranslation = async (sourceText) => {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const prompt = `Translate the following text into ${selectedLanguage}:
                "${sourceText}"
                Only return the translated sentence, nothing else.`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const translatedText = response.text().replace(/^"|"$/g, "");

                setTargetText(translatedText);
            } catch (error) {
                console.error("404 error translating text: ", error);
            }
        };

        if (sourceText.trim()) {
            const timeoutId = setTimeout(() => {
                handleTranslation(sourceText);
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [sourceText, selectedLanguage]);

    return targetText;
};

export default useTranslate;