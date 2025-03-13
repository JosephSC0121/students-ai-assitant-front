import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AcadAI",
  description: "Sitio web de referencias bibliograficas.",
  keywords: ["libros", "lectura", "educación", "AcadAI"],
  authors: [{ name: "Joseph", url: "https://acadai.com" }],
  openGraph: {
    title: "AcadAI - Tu Biblioteca Inteligente",
    description: "Descubre libros y lecturas recomendadas con inteligencia artificial.",
    url: "https://acadai.com",
    siteName: "AcadAI",
    images: [
      {
        url: "https://acadai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AcadAI Logo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AcadAI - Tu Biblioteca Inteligente",
    description: "Descubre libros y lecturas recomendadas con inteligencia artificial.",
    images: ["https://acadai.com/twitter-image.jpg"],
  },
};
