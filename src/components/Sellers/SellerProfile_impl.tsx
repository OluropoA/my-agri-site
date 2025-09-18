"use client";

import { useState } from 'react';
import { Check, MapPin, Phone, Mail, Calendar, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Seller } from './SellerList_impl';

interface SellerProfileProps {
  seller: Seller;
}

const SellerProfile: React.FC<SellerProfileProps> = ({ seller }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(new Date(date));
  };
  
  // Format phone
  const formatPhone = (phone: string): string => {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  };
  
  // Parse products
  const products = seller.products.split(',').map(product => product.trim());
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with back button */}
      <div className="bg-brand-green px-6 py-4 flex items-center justify-between">
        <Link 
          href="/trusted-sellers"
          className="inline-flex items-center text-white hover:text-white/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to All Sellers</span>
        </Link>
        
        <div className="relative">
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="text-white hover:text-white/80 p-2"
          >
            <Share2 className="h-5 w-5" />
          </button>
          
          {showShareOptions && (
            <div className="absolute right-0 mt-2 z-10 bg-white border rounded-md shadow-md p-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareOptions(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
              >
                Copy link
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Seller Info */}
      <div className="px-6 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-brand-charcoal font-primary">{seller.name}</h1>
            <div className="flex items-center mt-1 text-brand-charcoal/70 font-secondary">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{seller.state}</span>
            </div>
          </div>
          
          {seller.verified && (
            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <Check className="h-4 w-4 mr-1" />
              Verified Seller
            </div>
          )}
        </div>
        
        {/* Seller Details */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-brand-charcoal mb-2 font-primary">About</h2>
              <div className="prose prose-sm text-brand-charcoal/70 font-secondary">
                <p>{seller.description}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-brand-charcoal mb-2 font-primary">Products</h2>
              <div className="flex flex-wrap gap-2">
                {products.map((product, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-secondary"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-brand-charcoal mb-2 font-primary">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="p-2 bg-brand-green/10 rounded-full mr-3">
                    <Phone className="h-4 w-4 text-brand-green" />
                  </div>
                  <div>
                    <div className="text-sm text-brand-charcoal/60 font-secondary">Phone</div>
                    <a href={`tel:${seller.phone}`} className="text-brand-charcoal hover:text-brand-green font-secondary">
                      {formatPhone(seller.phone)}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-brand-green/10 rounded-full mr-3">
                    <Mail className="h-4 w-4 text-brand-green" />
                  </div>
                  <div>
                    <div className="text-sm text-brand-charcoal/60 font-secondary">Email</div>
                    <a href={`mailto:${seller.email}`} className="text-brand-charcoal hover:text-brand-green font-secondary">
                      {seller.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-brand-charcoal mb-2 font-primary">Member Since</h3>
              <div className="flex items-center text-brand-charcoal/70 font-secondary">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(seller.createdAt)}</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-brand-charcoal mb-3 font-primary">Contact Now</h3>
              <div className="space-y-3">
                <Button
                  variant="default"
                  className="w-full bg-brand-green hover:bg-brand-emerald text-white font-primary"
                  asChild
                >
                  <a href={`tel:${seller.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Seller
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-brand-green text-brand-green hover:bg-brand-green/5 font-primary"
                  asChild
                >
                  <a href={`mailto:${seller.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>
            
            {seller.verified && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-sm font-semibold text-green-800">Verified Seller</h3>
                </div>
                <p className="text-xs text-green-700">
                  This seller has been verified by our team. They have met our strict standards for quality and reliability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
