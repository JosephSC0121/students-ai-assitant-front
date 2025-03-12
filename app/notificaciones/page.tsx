"use client";

import { Button, Input, Card, addToast } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePostDataEmail } from "@/auth/services/email";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { postData } = usePostDataEmail();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError("Por favor, ingresa tu correo electrónico");
      addToast({
        title: "Error",
        description: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    if (!isValidEmail(email)) {
      setError("El correo electrónico no es válido");
      addToast({
        title: "Error",
        description: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await postData("user/emails/", { email });

      addToast({
        title: "¡Te has suscrito con éxito!",
        description: "Pronto recibirás actualizaciones en tu correo.",
      });

      setEmail("");  
    } catch (err: any) {
      const errorMessage = err.message || "Error al enviar la suscripción.";
      setError(errorMessage);
    
      addToast({
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-md w-full rounded-2xl p-6 text-center shadow-lg border">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-full">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
          </div>
          <p className="text-sm uppercase tracking-wide">
            Recibe actualizaciones exclusivas
          </p>
          <h1 className="text-2xl font-semibold mt-2">Sé el primero en enterarte</h1>
          <p className="text-sm mt-2">
            Suscríbete gratuitamente para recibir notificaciones sobre las nuevas funciones de la app.
          </p>
        </motion.div>
        <div className="mt-4">
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            className="w-full p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            className="w-full mt-3 text-white font-bold p-2 rounded-md"
            onPress={handleSubscribe}
            isLoading={isLoading}
            disabled={isLoading}
            color="primary"
          >
            {isLoading ? "Enviando..." : "Recibir notificaciones"}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <img
                width={50}
                height={50}
                key={i}
                src={`https://i.pravatar.cc/40?u=${i}`}
                className="w-8 h-8 rounded-full border"
                alt={`User avatar ${i + 1}`}
              />
            ))}
          </div>
          <p className="text-sm">Únete a más usuarios interesados.</p>
        </div>
      </Card>
    </div>
  );
}
