import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { NavShell } from "@/components/layout/nav-shell";
import { MainShell } from "@/components/layout/main-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { TutorWidget } from "@/components/tutor/tutor-widget";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubitcoin-hub.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Qubitcoin Hub: Learn, Mine & Join the Quantum Future",
    template: "%s · Qubitcoin Hub",
  },
  description:
    "The beginner-friendly onboarding platform for Qubitcoin. Understand qPoW, set up your wallet, and start mining in minutes.",
  openGraph: {
    title: "Qubitcoin Hub",
    description:
      "Learn qPoW, set up your wallet, and start mining QTC in minutes.",
    type: "website",
    siteName: "Qubitcoin Hub",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Qubitcoin Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qubitcoin Hub",
    description:
      "Learn qPoW, set up your wallet, and start mining QTC in minutes.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="quantum-bg min-h-full flex flex-col">
        <ThemeProvider>
          <AnalyticsProvider />
          <SiteJsonLd />
          <NavShell>
            <MainShell>{children}</MainShell>
            <SiteFooter />
          </NavShell>
          <TutorWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
