"use client";
import { signOut } from "next-auth/react";
export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex bg-white text-black px-3 py-1 rounded hover:bg-red-600 hover:text-white gap-1"
    >
      Cerrar sesión
    </button>
  );
}
