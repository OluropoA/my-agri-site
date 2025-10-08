"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Phone, Check, ChevronDown, Star, Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Type definitions
export interface Seller {
  id: string;
  name: string;
  products: string;
  state: string;
  phone: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  type: 'Farmer' | 'Processor' | 'Distributor' | 'Equipment Provider';
  verified: boolean;
  description: string;
  feedbackCount?: number;
  averageRating?: number;
  createdAt: Date;
}

interface SellerListProps {
  sellers: Seller[];
  states: string[];
  productCategories: string[];
}

const SellerList: React.FC<SellerListProps> = ({
  sellers,
  states,
  productCategories
}) => {
  // State for filtering and search
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>(sellers);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState<{
    state: boolean;
    product: boolean;
  }>({
    state: false,
    product: false
  });
  
  // Effect to filter sellers based on search and filters
  useEffect(() => {
    let result = [...sellers];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(seller => 
        seller.name.toLowerCase().includes(query) ||
        seller.products.toLowerCase().includes(query) ||
        seller.description.toLowerCase().includes(query) ||
        seller.state.toLowerCase().includes(query)
      );
    }
    
    // Apply state filter
    if (stateFilter !== 'all') {
      result = result.filter(seller => seller.state === stateFilter);
    }
    
    // Apply product filter
    if (productFilter !== 'all') {
      result = result.filter(seller => 
        seller.products.toLowerCase().includes(productFilter.toLowerCase())
      );
    }
    
    // Apply verified filter
    if (verifiedOnly) {
      result = result.filter(seller => seller.verified);
    }
    
    setFilteredSellers(result);
  }, [sellers, searchQuery, stateFilter, productFilter, verifiedOnly]);
  
  // Toggle filter dropdown
  const toggleFilterMenu = (key: keyof typeof filterMenuOpen) => {
    setFilterMenuOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Format phone number
  const formatPhone = (phone: string | undefined): string => {
    if (!phone) return "N/A";
    try {
      // Handle phone numbers safely
      return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    } catch {
      // If any error occurs, return the original value
      return phone;
    }
  };
  
  // Truncate text
  const truncate = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search sellers by name, products, or location..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-green font-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* State Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilterMenu('state')}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span>{stateFilter === 'all' ? 'All States' : stateFilter}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {filterMenuOpen.state && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setStateFilter('all');
                        toggleFilterMenu('state');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        stateFilter === 'all' ? 'bg-brand-green text-white font-primary' : 'text-brand-charcoal hover:bg-gray-100 font-secondary'
                      }`}
                    >
                      All States
                    </button>
                    {states.map((state) => (
                      <button
                        key={state}
                        onClick={() => {
                          setStateFilter(state);
                          toggleFilterMenu('state');
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          stateFilter === state ? 'bg-brand-green text-white font-primary' : 'text-brand-charcoal hover:bg-gray-100 font-secondary'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Product Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilterMenu('product')}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span>{productFilter === 'all' ? 'All Products' : productFilter}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {filterMenuOpen.product && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1 max-h-60 overflow-auto">
                    <button
                      onClick={() => {
                        setProductFilter('all');
                        toggleFilterMenu('product');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        productFilter === 'all' ? 'bg-brand-green text-white font-primary' : 'text-brand-charcoal hover:bg-gray-100 font-secondary'
                      }`}
                    >
                      All Products
                    </button>
                    {productCategories.map((product) => (
                      <button
                        key={product}
                        onClick={() => {
                          setProductFilter(product);
                          toggleFilterMenu('product');
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          productFilter === product ? 'bg-brand-green text-white font-primary' : 'text-brand-charcoal hover:bg-gray-100 font-secondary'
                        }`}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Verified Only Toggle */}
            <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={() => setVerifiedOnly(!verifiedOnly)}
                className="h-4 w-4 text-brand-green focus:ring-brand-gold border-gray-200 rounded"
              />
              <span className="ml-2 text-sm">Verified Only</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">
          {filteredSellers.length} {filteredSellers.length === 1 ? 'Seller' : 'Sellers'} Found
        </h3>
      </div>
      
      {/* Sellers Grid */}
      {filteredSellers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <div 
              key={seller.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-brand-brown/15"
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-brand-charcoal font-primary">{seller.name}</h3>
                  {seller.verified && (
                    <div className="flex items-center text-brand-gold bg-brand-gold/10 px-2 py-1 rounded text-xs font-medium font-primary">
                      <Check className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                
                {/* Location */}
                <div className="flex items-start text-brand-charcoal/70 font-secondary">
                  <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-brand-sage" />
                  <span>{seller.state}</span>
                </div>
                
                {/* Products */}
                <div>
                  <h4 className="text-xs font-medium text-brand-charcoal/60 uppercase tracking-wider mb-1 font-primary">Products</h4>
                  <p className="text-brand-charcoal/80 font-secondary">{seller.products}</p>
                </div>
                
                {/* Description */}
                <p className="text-sm text-brand-charcoal/70 font-secondary">
                  {truncate(seller.description, 100)}
                </p>
                
                {/* Contact & Social */}
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={`tel:${seller.phone}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-gray-50 hover:bg-gray-100"
                  >
                    <Phone className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">{formatPhone(seller.phone)}</span>
                  </a>
                  {seller.socialMedia?.facebook && (
                    <a 
                      href={seller.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-facebook hover:bg-gray-100"
                    >
                      <Facebook className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {seller.socialMedia?.twitter && (
                    <a 
                      href={seller.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-twitter hover:bg-gray-100"
                    >
                      <Twitter className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {seller.socialMedia?.instagram && (
                    <a 
                      href={seller.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-instagram hover:bg-gray-100"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                
                {/* Seller Type & Rating */}
                <div className="flex items-center justify-between mt-2 text-xs text-brand-charcoal/70">
                  <span className="font-medium">{seller.type}</span>
                  {seller.averageRating && seller.feedbackCount && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-brand-gold" />
                      <span>{seller.averageRating.toFixed(1)}</span>
                      <span>({seller.feedbackCount})</span>
                    </div>
                  )}
                </div>
                
                {/* View Profile Button */}
                <div className="pt-2">
                  <Link href={`/trusted-sellers/${seller.id}`}>
                    <Button
                      variant="outline"
                      className="w-full border-brand-green text-brand-green hover:bg-brand-green/5 font-primary"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-brand-ivory p-8 text-center rounded-lg border border-brand-brown/15">
          <h3 className="text-lg font-medium text-brand-charcoal mb-2 font-primary">No sellers found</h3>
          <p className="text-brand-charcoal/70 mb-4 font-secondary">
            Try adjusting your search criteria or filters to find trusted agricultural sellers.
          </p>
          <Button
            variant="default"
            onClick={() => {
              setSearchQuery('');
              setStateFilter('all');
              setProductFilter('all');
              setVerifiedOnly(false);
            }}
            className="bg-brand-green hover:bg-brand-emerald text-white font-primary"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SellerList;
