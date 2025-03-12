"use client";

import { title, subtitle } from "@/components/primitives";
import InputLink from "@/components/input-link";
import ResponseCard from "@/components/response-card";
import { usePostData } from "@/auth/services/link";
import { motion } from "framer-motion";
import { useState  } from "react";
import { BookOpenIcon, LinkIcon, CheckCircleIcon } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { postData } = usePostData();

  const handleVideoSubmit = async (videoId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postData("link/", videoId);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Error al procesar el video.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Staggered animation container for features
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <motion.div
          className="text-center max-w-2xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
        >
          <motion.h1
            className={title()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Convierte <span className={title({ color: "blue" })}>videos</span> en referencias confiables
          </motion.h1>
          <motion.p
            className={subtitle({ class: "mt-4 text-lg text-gray-500" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sube un enlace y obtén fuentes académicas al instante.
          </motion.p>

          {/* Features section */}
          <motion.div
            className="flex justify-center gap-4 mt-6 flex-wrap"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <BookOpenIcon size={16} />
              <span>Referencias académicas</span>
            </motion.div>
            <motion.div variants={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <LinkIcon size={16} />
              <span>Solo con un enlace</span>
            </motion.div>
            <motion.div variants={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <CheckCircleIcon size={16} />
              <span>Fuentes confiables</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <InputLink onVideoSubmit={handleVideoSubmit} isLoading={isLoading} />
        </motion.div>

        {error && (
          <motion.p
            className="text-red-500 text-sm mt-4 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center">
        {(data || isLoading) && (
          <motion.div
            className="w-full mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              damping: 15
            }}
          >
            <ResponseCard data={data || { response: "" }} isLoading={isLoading} />
          </motion.div>
        )}
      </div>
    </section>
  );
}