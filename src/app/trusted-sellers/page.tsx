import { Metadata } from 'next';
import SellerList from '@/components/Sellers/SellerList_impl';
import { PageHero, Section } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Trusted Sellers - Dr. Oluropo Apalowo',
  description: 'Directory of verified agricultural producers, suppliers, and sellers endorsed by Dr. Oluropo Apalowo.',
  keywords: ['verified sellers', 'agricultural suppliers', 'Nigerian farmers', 'trusted producers']
};

// Mock raw data for sellers
async function getRawSellers() {
  return [
    {
      id: '1',
      name: 'Green Fields Farm Ltd.',
      location: {
        state: 'Lagos',
        city: 'Ikorodu',
        address: '25 Agric Road'
      },
      products: ['Rice', 'Cassava', 'Vegetables'],
      description: 'Family-owned farm with over 20 years of experience growing organic vegetables and staple crops.',
      contactInfo: {
        phone: '+234 801 234 5678',
        email: 'info@greenfields.ng',
        website: 'https://www.greenfields.ng'
      },
      verified: true,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae'
    },
    {
      id: '2',
      name: 'Sunshine Poultry',
      location: {
        state: 'Oyo',
        city: 'Ibadan',
        address: '15 Ring Road'
      },
      products: ['Eggs', 'Chicken', 'Turkey'],
      description: 'Specializing in free-range poultry products with no antibiotics or growth hormones.',
      contactInfo: {
        phone: '+234 802 345 6789',
        email: 'sales@sunshinepoultry.com'
      },
      verified: true,
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1563874093519-ca5eda5cd875'
    },
    {
      id: '3',
      name: 'Best Seeds Nigeria',
      location: {
        state: 'Kaduna',
        city: 'Zaria',
        address: '7 ABU Road'
      },
      products: ['Seeds', 'Seedlings', 'Farm inputs'],
      description: 'Providing high-quality seeds for various crops including drought-resistant varieties.',
      contactInfo: {
        phone: '+234 803 456 7890',
        email: 'contact@bestseeds.ng',
        website: 'https://www.bestseeds.ng'
      },
      verified: true,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Organic Fertilizers Ltd.',
      location: {
        state: 'Edo',
        city: 'Benin',
        address: '32 Sapele Road'
      },
      products: ['Organic fertilizers', 'Compost', 'Soil amendments'],
      description: 'Manufacturing eco-friendly fertilizers from organic waste materials for sustainable farming.',
      contactInfo: {
        phone: '+234 804 567 8901',
        email: 'info@organicfertilizers.com'
      },
      verified: false,
      rating: 4.2
    },
    {
      id: '5',
      name: 'Fresh Harvest Cooperative',
      location: {
        state: 'Plateau',
        city: 'Jos',
        address: '45 Bauchi Road'
      },
      products: ['Potatoes', 'Vegetables', 'Fruits'],
      description: 'A cooperative of small-scale farmers specializing in highland crops from the Jos Plateau.',
      contactInfo: {
        phone: '+234 805 678 9012',
        email: 'sales@freshharvest.org'
      },
      verified: true,
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c4759b101fa'
    },
    {
      id: '6',
      name: 'AgriTech Solutions',
      location: {
        state: 'FCT',
        city: 'Abuja',
        address: '10 Garki II'
      },
      products: ['Farm equipment', 'Irrigation systems', 'Tech services'],
      description: 'Providing modern agricultural technology solutions to smallholder farmers.',
      contactInfo: {
        phone: '+234 806 789 0123',
        email: 'support@agritech.ng',
        website: 'https://www.agritech.ng'
      },
      verified: true,
      rating: 4.4
    },
    {
      id: '7',
      name: 'Palm Oil Processors',
      location: {
        state: 'Rivers',
        city: 'Port Harcourt',
        address: '21 Aba Road'
      },
      products: ['Palm oil', 'Palm kernel oil', 'Biofuel'],
      description: 'Sustainably processing palm products with fair trade practices.',
      contactInfo: {
        phone: '+234 807 890 1234',
        email: 'orders@palmoil.com'
      },
      verified: false,
      rating: 4.0
    },
    {
      id: '8',
      name: 'Dairy Masters',
      location: {
        state: 'Ogun',
        city: 'Abeokuta',
        address: '5 Ibara GRA'
      },
      products: ['Fresh milk', 'Yogurt', 'Cheese'],
      description: 'Artisanal dairy products from grass-fed cattle with no artificial additives.',
      contactInfo: {
        phone: '+234 808 901 2345',
        email: 'info@dairymasters.ng'
      },
      verified: true,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150'
    }
  ];
}

// Transform raw sellers data to match the Seller interface
async function getSellers() {
  const rawSellers = await getRawSellers();
  
  return rawSellers.map(seller => ({
    id: seller.id,
    name: seller.name,
    products: Array.isArray(seller.products) ? seller.products.join(', ') : '',
    state: seller.location.state,
    phone: seller.contactInfo.phone || '',
    email: seller.contactInfo.email || '',
    verified: seller.verified,
    description: seller.description,
    createdAt: new Date()
  }));
}

// Helper functions to extract unique values
async function getUniqueStates() {
  const rawSellers = await getRawSellers();
  return Array.from(new Set(rawSellers.map(seller => seller.location.state))).sort();
}

async function getUniqueProducts() {
  const rawSellers = await getRawSellers();
  const allProducts = rawSellers.flatMap(seller => seller.products);
  return Array.from(new Set(allProducts)).sort();
}

export default async function TrustedSellersPage() {
  const sellers = await getSellers();
  const states = await getUniqueStates();
  const products = await getUniqueProducts();
  
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Trusted Agricultural Sellers" 
        subtitle="Connect with verified suppliers, producers, and sellers in Nigeria's agricultural sector."
        backgroundImage="/images/sellers-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        <SellerList 
          sellers={sellers} 
          states={states} 
          productCategories={products} 
        />
      </Section>
    </div>
  );
}
