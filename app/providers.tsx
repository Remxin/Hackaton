"use client";

// nextui
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// global user context
import UserContextProvider from "@/contexts/UserContext";

// cookie provider
import { CookiesProvider } from "react-cookie"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark", "modern"]}
      >
        <CookiesProvider>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </CookiesProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
