import { Metadata } from 'next';
import HomeHero from '@/components/Home/HomeHero';
import ResearchHighlights from '@/components/Home/ResearchHighlights';
import MarketInsights from '@/components/Home/MarketInsights';
import TrustedSellers from '@/components/Home/TrustedSellers';
import StructuredData from '@/components/SEO/StructuredData';
import { generateMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Home - Agricultural Science & Research Hub",
  description: "Discover cutting-edge agricultural research, market insights, and sustainable farming solutions. Expert knowledge in nematology, plant virology, and crop protection from Dr. Oluropo Apalowo.",
  keywords: [
    "agricultural science hub",
    "farming research Nigeria",
    "crop protection solutions",
    "agricultural market insights",
    "sustainable agriculture practices",
    "nematology research",
    "plant disease management"
  ],
  url: "https://oluropoapalowo.com",
  type: "website"
});

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://oluropoapalowo.com" }
  ]);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <HomeHero />
      <ResearchHighlights />
      <MarketInsights />
      <TrustedSellers />
    </>
  );
}
