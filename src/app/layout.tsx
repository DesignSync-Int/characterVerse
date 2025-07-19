import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CharacterVerse - Rate & Discover Fictional Characters",
  description:
    "The ultimate platform for rating and discovering fictional characters across comics, anime, movies, TV shows, games, and mythology. Like IMDb for characters.",
  keywords:
    "characters, rating, comics, anime, movies, TV shows, games, mythology, fictional characters",
  authors: [{ name: "CharacterVerse Team" }],
  openGraph: {
    title: "CharacterVerse - Rate & Discover Fictional Characters",
    description:
      "The ultimate platform for rating and discovering fictional characters across all universes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
