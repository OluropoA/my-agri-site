import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

const defaultSEO = {
  title: 'Dr. Oluropo Apalowo | Agricultural Scientist & Researcher',
  description: 'Leading agricultural scientist specializing in nematology, plant virology, and sustainable farming practices. Research, insights, and market intelligence for modern agriculture.',
  keywords: [
    'agricultural science',
    'nematology',
    'plant virology', 
    'sustainable farming',
    'crop protection',
    'agricultural research',
    'Nigeria agriculture',
    'food security',
    'climate-smart agriculture',
    'integrated pest management',
    'Dr. Oluropo Apalowo',
    'Nnamdi Azikiwe University'
  ],
  image: '/images/og-default.jpg',
  url: 'https://oluropoapalowo.com',
  type: 'website' as const,
  author: 'Dr. Oluropo Apalowo',
  locale: 'en_NG',
  siteName: 'Dr. Oluropo Apalowo - Agricultural Science'
};

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false
}: SEOProps = {}): Metadata {
  const seoTitle = title 
    ? `${title} | Dr. Oluropo Apalowo` 
    : defaultSEO.title;
  
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = [...defaultSEO.keywords, ...keywords, ...tags];
  const seoImage = image || defaultSEO.image;
  const seoUrl = url || defaultSEO.url;
  const seoAuthor = author || defaultSEO.author;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: seoAuthor }],
    creator: seoAuthor,
    publisher: 'Nnamdi Azikiwe University',
    
    // Robots
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    
    // Open Graph
    openGraph: {
      type,
      locale: defaultSEO.locale,
      url: seoUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [seoAuthor],
        section,
        tags: [...keywords, ...tags]
      })
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@oluropoapalowo', // Add your Twitter handle
      creator: '@oluropoapalowo',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage]
    },

    // Additional meta tags
    other: {
      'theme-color': '#2D5016', // Your brand green color
      'msapplication-TileColor': '#2D5016',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      
      // Geographic targeting
      'geo.region': 'NG-AN', // Nigeria - Anambra
      'geo.placename': 'Awka, Nigeria',
      'geo.position': '6.2106;7.0677', // Awka coordinates
      'ICBM': '6.2106, 7.0677',
      
      // Language and content
      'content-language': 'en-NG',
      'audience': 'all',
      'distribution': 'global',
      'rating': 'general',
      
      // Academic/Research specific
      'citation_author': seoAuthor,
      'citation_author_institution': 'Nnamdi Azikiwe University',
      'DC.creator': seoAuthor,
      'DC.publisher': 'Nnamdi Azikiwe University',
      'DC.type': type === 'article' ? 'Text.Article' : 'Text',
      'DC.format': 'text/html',
      'DC.language': 'en-NG'
    }
  };

  return metadata;
}

// Structured Data generators
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Oluropo Apalowo',
    jobTitle: 'Agricultural Scientist',
    affiliation: {
      '@type': 'Organization',
      name: 'Nnamdi Azikiwe University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Awka',
        addressRegion: 'Anambra State',
        addressCountry: 'Nigeria'
      }
    },
    knowsAbout: [
      'Nematology',
      'Plant Virology',
      'Sustainable Agriculture',
      'Crop Protection',
      'Integrated Pest Management',
      'Climate-Smart Agriculture'
    ],
    url: 'https://oluropoapalowo.com',
    sameAs: [
      'https://twitter.com/oluropoapalowo',
      'https://linkedin.com/in/oluropoapalowo',
      'https://scholar.google.com/citations?user=XXXXXXX'
    ]
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Dr. Oluropo Apalowo - Agricultural Science',
    description: defaultSEO.description,
    url: 'https://oluropoapalowo.com',
    logo: 'https://oluropoapalowo.com/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-803-123-4567',
      contactType: 'customer service',
      email: 'oluropo.apalowo@unizik.edu.ng'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Awka',
      addressRegion: 'Anambra State',
      addressCountry: 'Nigeria'
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Oluropo Apalowo'
    }
  };
}

export function generateArticleSchema({
  title,
  description,
  author = 'Dr. Oluropo Apalowo',
  publishedTime,
  modifiedTime,
  image,
  url,
  keywords = []
}: {
  title: string;
  description: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  url: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
      affiliation: 'Nnamdi Azikiwe University'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Oluropo Apalowo - Agricultural Science',
      logo: {
        '@type': 'ImageObject',
        url: 'https://oluropoapalowo.com/images/logo.png'
      }
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    image: image || defaultSEO.image,
    url,
    keywords: keywords.join(', '),
    inLanguage: 'en-NG',
    about: [
      {
        '@type': 'Thing',
        name: 'Agricultural Science'
      },
      {
        '@type': 'Thing', 
        name: 'Sustainable Farming'
      }
    ]
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
