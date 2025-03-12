"use client";
interface LoginButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}
export default function LoginButton({ onClick, className }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 rounded hover:bg-black hover:text-white ${className}`}
    >
      Iniciar sesión
    </button>
  );
}
