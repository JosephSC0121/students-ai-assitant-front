"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "../auth/logoutButton";
import ButtonLink from "../common/buttonLink";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <div className="flex justify-between px-20 py-10 border">
        <h1>Autóctonos</h1>
        {session ? (
          <LogoutButton />
        ) : (
          <ButtonLink href="/login" className="border-black">Iniciar sesión</ButtonLink>
        )}
      </div>
    </header>
  );
}
