"use client";

import { Input } from "@heroui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardPaste, LinkIcon, ArrowRightIcon } from "lucide-react";

export default function InputLink({ onVideoSubmit, isLoading }: { onVideoSubmit: (videoId: string) => void, isLoading?: boolean }) {
  const [videoId, setVideoId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/|\/v\/|\/e\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11})/);
    return match && match[1] ? match[1] : null;
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardText = event.clipboardData.getData("text");
    setInputValue(clipboardText);
    
    const extractedId = extractVideoId(clipboardText);
    if (extractedId) {
      setVideoId(extractedId);
      setError("");
      onVideoSubmit(extractedId);
    } else {
      setError("Link inválido. Asegúrate de pegar un enlace de YouTube.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError("");

    if (!value) {
      setError("");
      setVideoId("");
      return;
    }

    if (value.includes("youtube") || value.includes("youtu.be")) {
      const extractedId = extractVideoId(value);
      if (extractedId) {
        setVideoId(extractedId);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue) {
      setError("Por favor, ingresa un enlace de YouTube.");
      return;
    }

    const extractedId = extractVideoId(inputValue);
    if (extractedId) {
      setVideoId(extractedId);
      onVideoSubmit(extractedId);
    } else {
      setError("Link inválido. Asegúrate de ingresar un enlace de YouTube válido.");
    }
  };

  return (
    <motion.section 
      className="flex flex-col items-center gap-4 w-full max-w-md"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full">
          <Input
            isDisabled
            label="Pega el link de tu video aquí:"
            labelPlacement="outside"
            value={inputValue}
            onPaste={handlePaste}
            onChange={handleChange}
            startContent={<LinkIcon className="h-4 w-4 text-gray-400" />}
            endContent={
              <button 
                type="submit" 
                className={`flex items-center justify-center h-8 w-8 rounded-full 
                ${isLoading 
                  ? 'bg-gray-200 cursor-not-allowed dark:bg-gray-700' 
                  : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'} 
                text-white transition-colors`}
                disabled={isLoading}
                aria-label="Analizar video"
              >
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <ArrowRightIcon className="h-4 w-4" />
                )}
              </button>
            }
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className={error ? "border-red-500" : ""}
            disabled={isLoading}
          />
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {error}
            </motion.p>
          )}
        </div>
      </form>
      
      <motion.div 
        className="text-xs text-gray-500 dark:text-gray-400 text-center w-full mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p>Simplemente pega el enlace completo del video de YouTube que deseas analizar.</p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="text-xs text-blue-500 dark:text-blue-400 hover:underline mt-1 flex items-center gap-1"
        onClick={() => {
          const exampleUrl = "https://www.youtube.com/watch?v=Ti5vfu9arXQ&ab_channel=LifeatGoogle"; 
          setInputValue(exampleUrl);
          const id = extractVideoId(exampleUrl);
          if (id) {
            setVideoId(id);
            setError("");
            // Trigger the submission with the example video ID
            onVideoSubmit(id);
          }
        }}
        disabled={isLoading}
      >
        <ClipboardPaste className="h-3 w-3" /> Ver ejemplo
      </motion.button>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs italic blod text-gray-900 dark:text-gray-100 text-center mt-2"
      >
        DISCLAIMER!! Esto es una demostración, próximamente se habilitarán los links. si quieres ejecutar tu propia instancia del programa el código está disponible en: <a target="_blank" className="text-blue-500 underline" href="https://github.com/JosephSC0121/students-ai-assitant-front">
  https://github.com/JosephSC0121/students-ai-assitant-front
</a>
      </motion.div>
    </motion.section>
  );
}