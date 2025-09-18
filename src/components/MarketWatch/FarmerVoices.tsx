"use client";

import { MessageCircle, Quote } from 'lucide-react';
import Image from 'next/image';

interface FarmerQuote {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  imageUrl?: string;
  date: Date;
}

interface FarmerVoicesProps {
  quotes: FarmerQuote[];
}

export default function FarmerVoices({ quotes }: FarmerVoicesProps) {
  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-brand-brown/10">
      <h3 className="text-lg font-bold text-brand-charcoal mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 text-brand-gold mr-2" />
        Farmer & Market Voices
      </h3>
      
      <div className="space-y-6">
        {quotes.map((quote) => (
          <div key={quote.id} className="flex space-x-4">
            <div className="flex-shrink-0">
              {quote.imageUrl ? (
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={quote.imageUrl}
                    alt={quote.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Quote className="h-6 w-6" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="bg-brand-ivory/50 p-4 rounded-lg relative">
                <div className="absolute left-0 top-4 -translate-x-2 transform rotate-45 w-2 h-2 bg-brand-ivory/50"></div>
                <p className="text-brand-charcoal/80 text-sm italic mb-3">{quote.quote}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-medium text-brand-charcoal">{quote.name}</p>
                    <p className="text-xs text-brand-charcoal/60">{quote.role}, {quote.location}</p>
                  </div>
                  <p className="text-xs text-brand-charcoal/50">{formatDate(quote.date)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
