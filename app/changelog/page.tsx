"use client";
import { motion } from "framer-motion";

type ChangelogItem = {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  isNew: boolean;
};

const changelogItems: ChangelogItem[] = [
  {
    id: "v0.0.1",
    title: "Obten referencias académicas de videos de YouTube solamente usando el link.",
    author: "AcadAI Team",
    timeAgo: "11 - Marzo",
    isNew: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const Changelog = () => {
  return (
    <main className="p-8 flex flex-col items-center transition-colors duration-200">
      <header className="w-full max-w-lg mb-6">
        <h1 className="text-xl font-semibold">Historial de cambios</h1>
      </header>
      <motion.div
        className="w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {changelogItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className="relative pl-8 pb-8"
            variants={itemVariants}
          >
            <section className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-500" />
            {index !== changelogItems.length - 1 && (
              <div className="absolute left-2 top-5 w-px h-full bg-gray-300 dark:bg-gray-600"></div>
            )}
            <div>
              {item.id && (
                <span className="inline-block text-xs font-medium rounded-full px-2 py-1 mb-2">
                  {item.id}
                </span>
              )}
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm mt-1">
                {item.author} • {item.timeAgo}
              </p>
              {item.isNew && (
                <span
                  className="absolute right-2 top-0 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-200"
                  aria-label="Nuevo"
                >
                  NEW
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Changelog;
