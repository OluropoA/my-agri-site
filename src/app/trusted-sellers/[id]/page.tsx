import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Globe, 
  Check,
  CalendarDays,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';
import { PageHero, Section } from '@/components/Layout/Layout';
import FeedbackSection from '@/components/Sellers/FeedbackSection';

// Get dynamic metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const seller = await getSellerById(params.id);
  
  if (!seller) {
    return {
      title: 'Seller Not Found - Dr. Oluropo Apalowo',
    };
  }
  
  return {
    title: `${seller.name} - Trusted Seller | Dr. Oluropo Apalowo`,
    description: seller.description,
  };
}

// Mock raw data for sellers - same as in the trusted-sellers/page.tsx
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
        website: 'https://www.greenfields.ng'
      },
      socialMedia: {
        facebook: 'https://facebook.com/greenfieldsng',
        instagram: 'https://instagram.com/greenfields_ng',
        twitter: 'https://twitter.com/greenfields_ng'
      },
      type: 'Farmer',
      verified: true,
      averageRating: 4.8,
      feedbackCount: 156,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
      yearEstablished: 2003,
      additionalInfo: 'Green Fields Farm Ltd. is a pioneer in sustainable and organic farming practices in the Lagos area. The farm uses environmentally friendly methods to grow high-quality produce that is distributed to local markets and restaurants. They also offer farm tours and agricultural training for students and aspiring farmers.',
      gallery: [
        'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8',
        'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399'
      ]
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
        website: 'https://www.sunshinepoultry.com'
      },
      socialMedia: {
        facebook: 'https://facebook.com/sunshinepoultry',
        instagram: 'https://instagram.com/sunshine_poultry'
      },
      type: 'Farmer',
      verified: true,
      averageRating: 4.5,
      feedbackCount: 89,
      imageUrl: 'https://images.unsplash.com/photo-1563874093519-ca5eda5cd875',
      yearEstablished: 2010,
      additionalInfo: 'Sunshine Poultry has grown from a small family operation to one of the leading suppliers of free-range poultry products in Southwestern Nigeria. Their commitment to animal welfare and quality has earned them numerous awards in the agricultural sector.',
      gallery: [
        'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7',
        'https://images.unsplash.com/photo-1569597970793-69532a1135a5',
        'https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba'
      ]
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
        website: 'https://www.bestseeds.ng'
      },
      socialMedia: {
        twitter: 'https://twitter.com/bestseeds_ng',
        facebook: 'https://facebook.com/bestseedsng'
      },
      type: 'Distributor',
      verified: true,
      averageRating: 4.7,
      feedbackCount: 234,
      imageUrl: 'https://images.unsplash.com/photo-1620655135631-f76985089bc8',
      yearEstablished: 2015,
      additionalInfo: 'Best Seeds Nigeria works closely with agricultural research institutions to develop and distribute high-yielding, disease-resistant seed varieties adapted to local growing conditions. They provide technical support and training to farmers on proper seed handling and crop management.',
      gallery: [
        'https://images.unsplash.com/photo-1574943320809-36a3687f8d3e',
        'https://images.unsplash.com/photo-1533792344354-8ca6b82d0dd5',
        'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea'
      ]
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
        phone: '+234 804 567 8901'
      },
      socialMedia: {
        facebook: 'https://facebook.com/organicfertilizers'
      },
      type: 'Processor',
      verified: false,
      averageRating: 4.2,
      feedbackCount: 45,
      imageUrl: 'https://images.unsplash.com/photo-1585202300815-8c441947a8ea',
      yearEstablished: 2018
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
        phone: '+234 805 678 9012'
      },
      socialMedia: {
        facebook: 'https://facebook.com/freshharvestcoop',
        instagram: 'https://instagram.com/freshharvest_ng'
      },
      type: 'Farmer',
      verified: true,
      averageRating: 4.6,
      feedbackCount: 167,
      imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c4759b101fa',
      yearEstablished: 2012,
      additionalInfo: 'Fresh Harvest Cooperative unites over 250 small-scale farmers in the Jos Plateau region. By pooling resources and sharing knowledge, they have been able to improve production methods and gain better access to markets. The cooperative focuses on crops that thrive in the cool highland climate.',
      gallery: [
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
        'https://images.unsplash.com/photo-1595855759920-86582958918e',
        'https://images.unsplash.com/photo-1505471768190-275e2ad7abf9'
      ]
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
        website: 'https://www.agritech.ng'
      },
      socialMedia: {
        twitter: 'https://twitter.com/agritech_ng',
        linkedin: 'https://linkedin.com/company/agritech-ng'
      },
      type: 'Equipment Provider',
      verified: true,
      averageRating: 4.4,
      feedbackCount: 78,
      imageUrl: 'https://images.unsplash.com/photo-1584179234953-0b776df7d29c',
      yearEstablished: 2019,
      additionalInfo: 'AgriTech Solutions is bridging the gap between technology and traditional farming in Nigeria. They design and implement affordable technological solutions that help smallholder farmers increase productivity and reduce post-harvest losses.',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
        'https://images.unsplash.com/photo-1562408590-e32931084e23'
      ]
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
        phone: '+234 807 890 1234'
      },
      socialMedia: {
        facebook: 'https://facebook.com/palmoil_processors'
      },
      type: 'Processor',
      verified: false,
      averageRating: 4.0,
      feedbackCount: 34,
      imageUrl: 'https://images.unsplash.com/photo-1575386674304-a1d4a4915ec6',
      yearEstablished: 2014
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
        phone: '+234 808 901 2345'
      },
      socialMedia: {
        facebook: 'https://facebook.com/dairymasters_ng',
        instagram: 'https://instagram.com/dairymasters'
      },
      type: 'Processor',
      verified: true,
      averageRating: 4.9,
      feedbackCount: 203,
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
      yearEstablished: 2016,
      additionalInfo: 'Dairy Masters is revolutionizing the local dairy industry with their modern processing techniques and commitment to quality. They source milk from their own herd of grass-fed cattle as well as from local farmers who meet their strict quality standards.',
      gallery: [
        'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79',
        'https://images.unsplash.com/photo-1523473827533-2a64d0d36748',
        'https://images.unsplash.com/photo-1529635493067-f018b84f8ffa'
      ]
    }
  ];
}

// Get seller by ID
async function getSellerById(id: string) {
  const rawSellers = await getRawSellers();
  return rawSellers.find(seller => seller.id === id);
}

// Format star rating
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`h-4 w-4 ${
              i < fullStars 
                ? 'text-brand-gold' 
                : i === fullStars && hasHalfStar 
                  ? 'text-brand-gold' 
                  : 'text-gray-300'
            }`} 
            fill={i < fullStars || (i === fullStars && hasHalfStar) ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
      <span className="ml-1 text-brand-charcoal/70 text-sm">({rating.toFixed(1)})</span>
    </div>
  );
}

// Format phone number
const formatPhone = (phone: string | undefined): string => {
  if (!phone) return "N/A";
  try {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  } catch {
    return phone;
  }
};

export default async function SellerDetailPage({ params }: { params: { id: string } }) {
  const seller = await getSellerById(params.id);
  
  if (!seller) {
    notFound();
  }
  
  return (
    <div className="min-h-screen">
      <PageHero 
        title={seller.name} 
        subtitle={seller.description}
        backgroundImage="/images/seller-detail-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        <div className="mb-8">
          <Link 
            href="/trusted-sellers"
            className="inline-flex items-center text-brand-green hover:text-brand-emerald transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to all sellers</span>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-brand-brown/15 p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-brand-charcoal font-primary">{seller.name}</h1>
                {seller.verified && (
                  <div className="flex items-center text-brand-gold bg-brand-gold/10 px-2 py-1 rounded text-xs font-medium font-primary">
                    <Check className="h-3 w-3 mr-1" />
                    Verified Seller
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* Location */}
                  <div className="flex items-start mb-4 text-brand-charcoal font-secondary">
                    <MapPin className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0 text-brand-emerald" />
                    <div>
                      <p className="font-medium">{seller.location.city}, {seller.location.state}</p>
                      <p className="text-brand-charcoal/70">{seller.location.address}</p>
                    </div>
                  </div>
                  
                  {/* Products */}
                  <div className="mb-4">
                    <h2 className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-1 font-primary">Products & Services</h2>
                    <ul className="list-disc list-inside text-brand-charcoal/80 space-y-1">
                      {seller.products.map((product, index) => (
                        <li key={index} className="font-secondary">{product}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Rating */}
                  {seller.averageRating && (
                    <div className="mb-4">
                      <h2 className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-1 font-primary">Rating</h2>
                      <StarRating rating={seller.averageRating} />
                    </div>
                  )}
                </div>
                
                <div>
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-3 font-primary">Contact Information</h2>
                    
                    {seller.contactInfo.phone && (
                      <div className="flex items-start mb-3 text-brand-charcoal font-secondary">
                        <Phone className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-brand-emerald" />
                        <a href={`tel:${seller.contactInfo.phone}`} className="hover:text-brand-green">{formatPhone(seller.contactInfo.phone)}</a>
                      </div>
                    )}
                    
                    {seller.contactInfo.website && (
                      <div className="flex items-start mb-3 text-brand-charcoal font-secondary">
                        <Globe className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-brand-emerald" />
                        <a href={seller.contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">{seller.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</a>
                      </div>
                    )}
                    
                    {seller.yearEstablished && (
                      <div className="flex items-start mb-3 text-brand-charcoal font-secondary">
                        <CalendarDays className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-brand-emerald" />
                        <span>Established in {seller.yearEstablished}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Social Media Links */}
                  {seller.socialMedia && Object.keys(seller.socialMedia).length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-3 font-primary">Social Media</h2>
                      <div className="flex gap-3">
                        {seller.socialMedia.facebook && (
                          <a
                            href={seller.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-facebook hover:opacity-80"
                            aria-label="Facebook"
                          >
                            <Facebook className="h-5 w-5" />
                          </a>
                        )}
                        {seller.socialMedia.twitter && (
                          <a
                            href={seller.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-twitter hover:opacity-80"
                            aria-label="Twitter"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {seller.socialMedia.instagram && (
                          <a
                            href={seller.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-instagram hover:opacity-80"
                            aria-label="Instagram"
                          >
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Seller Type */}
                  <div className="mt-4">
                    <h2 className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-1 font-primary">Category</h2>
                    <div className="text-brand-charcoal/80 font-secondary">{seller.type}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
              {/* Description */}
              {seller.additionalInfo && (
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-brand-brown/15 p-6">
                  <h2 className="text-lg font-bold text-brand-charcoal mb-3 font-primary">About {seller.name}</h2>
                  <p className="text-brand-charcoal/80 font-secondary whitespace-pre-line">{seller.additionalInfo}</p>
                </div>
              )}

              {/* Feedback Section */}
              <FeedbackSection
                sellerId={seller.id}
                currentRating={seller.averageRating}
                totalFeedback={seller.feedbackCount}
              />
              
              {/* Image Gallery */}            {/* Image Gallery */}
            {seller.gallery && seller.gallery.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-brand-brown/15 p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-4 font-primary">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {seller.gallery.map((imageUrl, index) => (
                    <div key={index} className="h-48 relative rounded-md overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={`${seller.name} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Image and CTA */}
          <div>
            {/* Featured Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-brand-brown/15 mb-6">
              <div className="h-64 relative">
                {seller.imageUrl ? (
                  <Image
                    src={seller.imageUrl}
                    alt={seller.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact CTA */}
            <div className="bg-brand-ivory rounded-xl overflow-hidden shadow-md border border-brand-brown/15 p-6">
              <h2 className="text-lg font-bold text-brand-charcoal mb-4 font-primary">Get in Touch</h2>
              <p className="text-brand-charcoal/80 mb-6 font-secondary">
                Interested in the products or services offered by {seller.name}? Reach out directly for more information.
              </p>
              <div className="space-y-3">
                {seller.contactInfo.phone && (
                  <a 
                    href={`tel:${seller.contactInfo.phone}`}
                    className="flex items-center justify-center w-full bg-brand-green hover:bg-brand-emerald text-white py-2 px-4 rounded-md transition-colors duration-200 font-primary"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                )}
                
                {seller.contactInfo.website && (
                  <a 
                    href={seller.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-white border border-brand-brown text-brand-brown hover:bg-brand-brown/5 py-2 px-4 rounded-md transition-colors duration-200 font-primary"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                )}
                
                {/* Social Media Links */}
                {seller.socialMedia && Object.keys(seller.socialMedia).length > 0 && (
                  <div className="flex justify-center gap-4 mt-4">
                    {seller.socialMedia.facebook && (
                      <a
                        href={seller.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-facebook hover:opacity-80"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                    )}
                    {seller.socialMedia.twitter && (
                      <a
                        href={seller.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-twitter hover:opacity-80"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                    {seller.socialMedia.instagram && (
                      <a
                        href={seller.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-instagram hover:opacity-80"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
