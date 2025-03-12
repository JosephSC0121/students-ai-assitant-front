"use client";

import { Card } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

interface ResponseCardProps {
  data: {
    response: string;
  };
  isLoading?: boolean;
}

export default function ResponseCard({ data, isLoading = false }: ResponseCardProps) {
  const { response } = data || { response: "" };
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Procesar secciones si no está cargando
  const sections = !isLoading 
    ? response.split(/\n\n#### /).map((section, index) => {
        if (index === 0) return section.replace("#### ", "");
        return `#### ${section}`;
      })
    : [];

  const mainSections = sections.filter((section) => !section.startsWith("#### **Referencias"));
  const references = sections.filter((section) => section.startsWith("#### **Referencias"));

  // Copiar referencia al portapapeles
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text.replace("#### **Referencias**", "Referencias:").trim());
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl p-4">
        <Card className="border-none shadow-xl p-6 md:p-8 w-full rounded-2xl bg-gray-50 dark:bg-gray-800">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-4xl p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="border-none shadow-xl p-6 md:p-8 w-full rounded-2xl bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            📖 <span>Análisis & Referencias</span>
          </h2>

          <div className="space-y-4 leading-relaxed">
            {mainSections.map((section, idx) => (
              <div key={idx} className="border-b pb-4 last:border-none last:pb-0 border-gray-200 dark:border-gray-700">
                <article className="prose max-w-none text-base md:text-lg dark:prose-invert">
                  <ReactMarkdown>{section}</ReactMarkdown>
                </article>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {references.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
          className="w-full"
        >
          <Card className="border-none shadow-md p-5 md:p-6 w-full rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-start">
              <article className="prose max-w-none dark:prose-invert">
                <ReactMarkdown>{section}</ReactMarkdown>
              </article>

              <button
                onClick={() => copyToClipboard(section, idx)}
                className="p-2 rounded-full transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Copiar referencia"
              >
                {copiedIndex === idx ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
