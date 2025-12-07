import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/preloader";
import CustomCursor from "@/components/custom-cursor";

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
    <html lang="en">
      <body className="antialiased">
        <Preloader>
          <CustomCursor />
          {children}
        </Preloader>
      </body>
    </html>
  );
}
