"use client";

import { Card } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

interface ResponseCardProps {}

export default function ResponseCard({}: ResponseCardProps) {
  const { response } = { response: "#### **Resumen de la Transcripción:**\nEsta transcripción presenta una entrevista técnica simulada en Google, donde un candidato (Sammy) intenta resolver un problema planteado por un entrevistador (Juliana). El problema consiste en encontrar el área máxima de un cuadrado de \"tierra buena\" (representada por unos) dentro de una matriz de unos y ceros. Sammy explora diferentes enfoques, desde una solución de fuerza bruta hasta una solución de programación dinámica, discutiendo sus ventajas y desventajas en el camino.\n\n#### **Conceptos Claves y Temas Relevantes:**\n1. **Clarificación del Problema** (0:01:05): Es crucial obtener una comprensión clara del problema antes de intentar resolverlo.\n2. **Enfoque de Fuerza Bruta** (0:02:02): Se discute como un punto de partida, pero se descarta debido a su ineficiencia (O(n^4)).\n3. **Pensamiento Recursivo** (0:03:34): Considera una solución recursiva, pero reconoce la necesidad de memorización para evitar cálculos repetidos.\n4. **Programación Dinámica** (0:06:55): Desarrolla una solución de programación dinámica bottom-up para resolver el problema de manera más eficiente.\n5. **Optimización de Código** (0:14:00): Se discuten maneras de optimizar el código, incluyendo el seguimiento del valor máximo durante la iteración y la minimización de las lecturas de la matriz.\n\n#### **Referencias y Fuentes de Apoyo:**\n1. **Algoritmos y Estructuras de Datos:**\n   - **Cormen, T.H., Leiserson, C.E., Rivest, R.L., & Stein, C. (2009).** *Introduction to Algorithms* (3rd ed.). MIT Press.\n   - **Sedgewick, R., & Wayne, K. (2011).** *Algorithms* (4th ed.). Addison-Wesley Professional.\n\n2. **Programación Dinámica:**\n   - **Dasgupta, S., Papadimitriou, C.H., & Vazirani, U. (2006).** *Algorithms*. McGraw-Hill.\n   - **Kleinberg, J., & Tardos, E. (2005).** *Algorithm Design*. Addison-Wesley.\n\n3. **Preparación para Entrevistas Técnicas:**\n   - **Laakmann McDowell, G. (2015).** *Cracking the Coding Interview: 189 Programming Questions and Solutions*. CareerCup.\n   - **Skiena, S. S. (2020).** *The Algorithm Design Manual*. Springer.\n\n#### **Citas Formateadas (Estilo APA):**\n- **Cormen, T.H., Leiserson, C.E., Rivest, R.L., & Stein, C. (2009).** *Introduction to Algorithms* (3rd ed.). MIT Press.\n- **Sedgewick, R., & Wayne, K. (2011).** *Algorithms* (4th ed.). Addison-Wesley Professional.\n- **Dasgupta, S., Papadimitriou, C.H., & Vazirani, U. (2006).** *Algorithms*. McGraw-Hill.\n- **Kleinberg, J., & Tardos, E. (2005).** *Algorithm Design*. Addison-Wesley.\n- **Laakmann McDowell, G. (2015).** *Cracking the Coding Interview: 189 Programming Questions and Solutions*. CareerCup.\n" };
  
  const [isLoading, setIsLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sections = !isLoading 
    ? response.split(/\n\n#### /).map((section, index) => {
        if (index === 0) return section.replace("#### ", "");
        return `#### ${section}`;
      })
    : [];

  const mainSections = sections.filter((section) => !section.startsWith("#### **Referencias"));
  const references = sections.filter((section) => section.startsWith("#### **Referencias"));

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text.replace("#### **Referencias**", "Referencias:").trim());
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
        <Card className="border-none shadow-xl p-6 md:p-8 w-full rounded-2xl bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">📖 <span>Análisis & Referencias</span></h2>
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
        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }} className="w-full">
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
