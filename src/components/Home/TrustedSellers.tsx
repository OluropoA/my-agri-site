import Link from 'next/link';
import { ArrowRight, Star, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TrustedSellers() {
  const sellers = [
    {
      id: 1,
      name: "Adebayo Farm Produce",
      location: "Lagos, Nigeria",
      specialties: ["Rice", "Yam", "Plantain"],
      rating: 4.8,
      reviews: 156,
      phone: "+234 803 123 4567",
      verified: true
    },
    {
      id: 2,
      name: "Green Valley Farms",
      location: "Kano, Nigeria", 
      specialties: ["Tomatoes", "Onions", "Peppers"],
      rating: 4.6,
      reviews: 89,
      phone: "+234 807 987 6543",
      verified: true
    },
    {
      id: 3,
      name: "Okafor Agro Services",
      location: "Onitsha, Nigeria",
      specialties: ["Cassava", "Cocoyam", "Maize"],
      rating: 4.9,
      reviews: 203,
      phone: "+234 806 555 7890",
      verified: true
    },
    {
      id: 4,
      name: "Sunrise Agricultural Hub",
      location: "Ibadan, Nigeria",
      specialties: ["Cocoa", "Palm Oil"],
      rating: 4.4,
      reviews: 67,
      phone: "+234 805 444 3210",
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-4">
            Trusted Sellers
          </h2>
          <p className="text-xl text-brand-charcoal/70 font-secondary max-w-2xl mx-auto">
            Connect with verified agricultural suppliers and vendors across Nigeria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-brand-charcoal font-primary text-lg mb-2">
                    {seller.name}
                  </h3>
                  <div className="flex items-center text-sm text-brand-charcoal/60 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {seller.location}
                  </div>
                </div>
                {seller.verified && (
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Verified
                  </div>
                )}
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-brand-charcoal">
                    {seller.rating}
                  </span>
                  <span className="ml-1 text-sm text-brand-charcoal/60">
                    ({seller.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-brand-charcoal/60 font-secondary mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {seller.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-brand-green/10 text-brand-green text-xs font-medium px-2 py-1 rounded-md"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-brand-charcoal/60 mb-4">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-mono">{seller.phone}</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-brand-green border-brand-green hover:bg-brand-green hover:text-white"
              >
                Contact Seller
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/trusted-sellers">
              View All Sellers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
