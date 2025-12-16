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
  title: {
    default: "Dotslash 9.0 - Hackathon & Tech Event",
    template: "%s | Dotslash 9.0",
  },
  description:
    "Dotslash 9.0 is a premier hackathon and tech event bringing builders, designers, and innovators together for 48 hours of creation, collaboration, and impact.",
  icons: {
    icon: "/dotslash.png",
  },
  keywords: [
    "Dotslash",
    "Dotslash 9.0",
    "hackathon",
    "coding competition",
    "developer event",
    "tech event",
    "programming",
    "software engineering",
  ],
  authors: [{ name: "Dotslash Team" }],
  creator: "Dotslash Team",
  publisher: "Dotslash",

  openGraph: {
    title: "Dotslash 9.0 - Hackathon & Tech Event",
    description:
      "Join Dotslash 9.0, a high-energy hackathon where developers, designers, and innovators build the future together.",
    siteName: "Dotslash 9.0",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/dotslash.png",
        width: 1200,
        height: 630,
        alt: "Dotslash 9.0",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dotslash 9.0 - Hackathon & Tech Event",
    description:
      "Build, ship, and innovate at Dotslash 9.0 - a hackathon for developers, designers, and makers.",
    images: ["/dotslash.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
