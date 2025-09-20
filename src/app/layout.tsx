import type { Metadata } from "next";
import { Montserrat, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import AppFooter from "@/components/Layout/AppFooter";
import ClientProviders from "@/components/Layout/ClientProviders";
import ClientBackgroundEffect from "@/components/Effects/ClientBackgroundEffect";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

// Brand Fonts
const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
  weight: ["300", "400", "500", "700"]
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-secondary",
  weight: ["400", "600", "700"]
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Dr. Oluropo Apalowo | Agricultural Scientist",
  description: "Agricultural science resources, research, market trends, and expert insights by Dr. Oluropo Apalowo",
  keywords: ["agricultural science", "crop protection", "nematology", "plant virology", "sustainable farming", "AI in agriculture"],
  authors: [{ name: "Dr. Oluropo Apalowo" }],
  creator: "Dr. Oluropo Apalowo",
  publisher: "Nnamdi Azikiwe University",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://oluropoapalowo.com",
    title: "Dr. Oluropo Apalowo | Agricultural Scientist",
    description: "Agricultural science resources, research, market trends, and expert insights by Dr. Oluropo Apalowo",
    siteName: "Dr. Oluropo Apalowo"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-secondary" style={{ background: 'transparent' }}>
        <ClientProviders>
          {/* Background color transition effect - positioned at root level */}
          <ClientBackgroundEffect />
          <LayoutWrapper>
            <Header />
            <main className="flex-grow">{children}</main>
            <AppFooter />
          </LayoutWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
