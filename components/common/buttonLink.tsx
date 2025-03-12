import Link from "next/link";

interface ButtonLinkProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  href: string;
  children: React.ReactNode;
}

export default function ButtonLink({
  className,
  href,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`flex border px-5 py-3 rounded-xl hover:text-white hover:bg-black ${className}`}>
      {children}
    </Link>
  );
}
