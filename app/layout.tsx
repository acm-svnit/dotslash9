import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/preloader";
import CustomCursor from "@/components/custom-cursor";
import { AudioProvider } from "@/contexts/audio-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dotslash - 9.0",
  description: "Dotslash - 9.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <AudioProvider>
          <Preloader>
            <CustomCursor />
            {children}
          </Preloader>
        </AudioProvider>
      </body>
    </html>
  );
}
