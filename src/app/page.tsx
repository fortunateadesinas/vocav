"use client"
import "regenerator-runtime/runtime"; // Add this at the top
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/CategoryLinks";
import TextArea from "@/components/Input/TextArea";
import FileUpload from '@/components/Input/FileUpload';
import LinkPaste from "@/components/Input/LinkPaste";
import LanguageSelector from "@/components/Input/LanguageSelector";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import useTranslate from "@/hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText";

import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";

const Home: React.FC = () => {

  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "Yoruba",
    "English",
    "Igbo",
    "Hausa",
    "French",
    "Spanish",
    "Portuguese",
    "Arabic",
    "Russian",
    "German",
    "Italian",
    "Dutch",
    "Turkish",
    "Japanese",
    "Chinese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Yoruba");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (link: string) => {
    const response = await fetch(link);
    const text = await response.text();
    setSourceText(text);
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };


  return (
    <div className="h-[58rem] w-full bg-black bg-dot-white/[0.2] relative flex items-center justify-center">
      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">Voca<span className="text-green-500">Verse</span></h1>
            <p className="mt-3 text-neutral-400">
              VocaVerse: Bridging Worlds, One Word at a Time. 🌍✨
            </p>
            <div className="mt-7 s:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative p-3 z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSourceText(e.target.value)
                    }
                    placeholder="Source Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent setSourceText={setSourceText} />
                      <IconVolume className="text-white" size={22} onClick={() => handleAudioPlayback(sourceText)} />
                      {/* file upload */}
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-4">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="target-language"
                    value={targetText}
                    onChange={() => { }}
                    placeholder="Target Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex items-center space-x-2 flex-row">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(targetText)}
                      />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipboard} className={copied ? "text-white" : ""}  />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp size={22} onClick={handleLike} />
                      <IconThumbDown size={22} onClick={handleDislike} />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-green-500" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SvgDecorations />
            </div>
            <CategoryLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;