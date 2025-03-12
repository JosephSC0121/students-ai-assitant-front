"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import AuthProvider from "@/components/session/sessionProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { ToastProvider } from "@heroui/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      
      <NextThemesProvider {...themeProps}><HeroUIProvider navigate={router.push}><ToastProvider />{children}  </HeroUIProvider></NextThemesProvider>
    
    </AuthProvider>
  );
}
