"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Suggest from '@/components/sugerencias';

const ProximamentePage = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-full max-w-4xl">
                    <h1 className="font-semibold">Próximamente</h1>
                </div>
            </div>
        );
    }

    const isDarkMode = resolvedTheme === 'dark';

    const colors = {
        badge: isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
        secondaryBadge: isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
        outlineBadge: 'border border-current rounded-full px-3 py-1 text-sm'
    };

    const currentFeature = {
        title: "Convierte videos en referencias confiables",
        description: "Sube un enlace y obtén fuentes académicas al instante.",
        benefits: [
            "Referencias académicas",
            "Solo con un enlace",
            "Fuentes confiables"
        ]
    };

    const upcomingFeatures = [
        {
            id: 1,
            title: "Editor de bibliografía avanzado",
            description: "Edita, organiza y exporta tus referencias bibliográficas en cualquier formato académico.",
            timeline: "Mayo 2025",
            icon: "📝"
        },
        {
            id: 2,
            title: "Integración con gestores de referencias",
            description: "Exporta tus referencias directamente a Zotero, Mendeley y EndNote.",
            timeline: "Junio 2025",
            icon: "🔄"
        },
        {
            id: 3,
            title: "Asistente de escritura académica",
            description: "Recibe sugerencias para mejorar tus citas y referencias en tiempo real.",
            timeline: "Julio 2025",
            icon: "🤖"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <div className="md:p-8 flex flex-col items-center transition-colors duration-200">
            <div className="w-full max-w-4xl mb-8">
                <h1 className="md:text-3xl font-semibold">Próximamente</h1>
                <p className="text-gray-500 dark:text-gray-400">Descubre las nuevas funcionalidades que estamos preparando</p>
            </div>
            <Card className="w-full max-w-4xl mb-12">
                <CardHeader className="pb-2">
                    <div className='flex flex-col'>
                        <div className="flex items-center mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                                Disponible ahora
                            </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold">{currentFeature.title}</h2>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="text-lg mb-4">{currentFeature.description}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {currentFeature.benefits.map((benefit, index) => (
                            <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-sm border border-current`}>
                                ✓ {benefit}
                            </span>
                        ))}
                    </div>
                </CardBody>
            </Card>

            <h2 className="w-full max-w-4xl text-xl md:text-2xl font-semibold mb-6">Nuevas funcionalidades</h2>
            <motion.div
                className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {upcomingFeatures.map((feature) => (
                    <motion.div key={feature.id} variants={itemVariants}>
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="text-3xl mb-2">{feature.icon}</div>
                                <h3 className="text-lg font-medium">{feature.title}</h3>
                            </CardHeader>
                            <CardBody className="flex-grow">
                                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${colors.secondaryBadge}`}>
                                    {feature.timeline}
                                </span>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <div className="w-full max-w-4xl mt-4 text-center">
                <p className="mb-4 text-gray-500 dark:text-gray-400">¿Tienes alguna sugerencia para una nueva funcionalidad?</p>
                <Suggest />
            </div>
        </div>
    );
};

export default ProximamentePage;