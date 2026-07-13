import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mistral Chat | AI-Powered Conversational Interface",
  description:
    "A modern chat application powered by Mistral AI's language models. Experience real-time conversations with advanced AI technology built with Next.js and TypeScript.",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Mistral Chat | AI-Powered Conversational Interface",
    type: "website",
    url: "https://1732-mistral-chat-app.netlify.app/",
    description:
      "Experience intelligent conversations with Mistral AI. A sleek, modern chat interface showcasing the power of Mistral's language models.",
    images: [
      {
        url: "https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/ba58715ff2e9b71aae2049e1d5c348e7c0d84753-5760x3240.png",
        width: 1200,
        height: 630,
        alt: "Mistral Chat Application - AI-Powered Conversations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mistral Chat | AI-Powered Conversational Interface",
    description:
      "A modern chat application powered by Mistral AI's language models. Built with Next.js and TypeScript.",
    images: [
      "https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/ba58715ff2e9b71aae2049e1d5c348e7c0d84753-5760x3240.png",
    ],
  },
  keywords: [
    "Mistral AI",
    "AI Chat",
    "Language Model",
    "Next.js",
    "TypeScript",
    "Chat Application",
    "Conversational AI",
    "Machine Learning",
  ],
  authors: [{ name: "AJ1732" }],
  creator: "AJ1732",
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FA520F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
