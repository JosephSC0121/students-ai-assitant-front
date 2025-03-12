"use client";

import LoginButton from "@/components/auth/loginButton";
import { Input } from "@heroui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      userName,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center border border-black rounded-lg p-5 gap-5 w-96">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div>
            <Input
              type="text"
              placeholder="John Doe"
              label="Nombre de usuario"
              labelPlacement="outside"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              variant="bordered"
              color="primary"
              size="lg"
              radius="sm"
              classNames={{
                label: "text-gray-700 font-bold",
                input:
                  "text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded rounded-xl",
                description: "text-sm text-gray-500",
                errorMessage: "text-red-500",
              }}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              classNames={{
                label: "text-gray-700 font-bold",
                input:
                  "text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded rounded-xl",
                description: "text-sm text-gray-500",
                errorMessage: "text-red-500",
              }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <LoginButton type="submit" className="border border-black" />
        </form>
      </div>
    </section>
  );
}
