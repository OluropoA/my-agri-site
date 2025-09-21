import type { Metadata } from "next";
import { Montserrat, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import AppFooter from "@/components/Layout/AppFooter";
import ClientProviders from "@/components/Layout/ClientProviders";
import ClientBackgroundEffect from "@/components/Effects/ClientBackgroundEffect";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import StructuredData from "@/components/SEO/StructuredData";
import { generateMetadata, generatePersonSchema, generateOrganizationSchema } from "@/lib/seo";

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

export const metadata: Metadata = generateMetadata({
  title: "Agricultural Scientist & Researcher",
  description: "Leading agricultural scientist specializing in nematology, plant virology, and sustainable farming practices. Research, insights, and market intelligence for modern agriculture.",
  keywords: [
    "agricultural research",
    "sustainable farming Nigeria",
    "crop protection specialist",
    "agricultural technology",
    "food security research"
  ],
  url: "https://oluropoapalowo.com",
  type: "website"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en-NG" className={`${montserrat.variable} ${openSans.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Structured Data */}
        <StructuredData data={[personSchema, organizationSchema]} />
        
        {/* Favicons and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
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
