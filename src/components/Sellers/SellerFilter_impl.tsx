"use client";

import { useState } from 'react';
import { Filter, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SellerFilterProps {
  states: string[];
  productCategories: string[];
  onFilterChange: (filters: {
    states: string[];
    products: string[];
    verifiedOnly: boolean;
  }) => void;
}

const SellerFilter: React.FC<SellerFilterProps> = ({
  states,
  productCategories,
  onFilterChange
}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle filter panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  // Toggle state selection
  const toggleState = (state: string) => {
    setSelectedStates(prev => {
      if (prev.includes(state)) {
        return prev.filter(s => s !== state);
      } else {
        return [...prev, state];
      }
    });
  };
  
  // Toggle product selection
  const toggleProduct = (product: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(product)) {
        return prev.filter(p => p !== product);
      } else {
        return [...prev, product];
      }
    });
  };
  
  // Apply filters
  const applyFilters = () => {
    onFilterChange({
      states: selectedStates,
      products: selectedProducts,
      verifiedOnly
    });
    setIsOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedStates([]);
    setSelectedProducts([]);
    setVerifiedOnly(false);
    
    onFilterChange({
      states: [],
      products: [],
      verifiedOnly: false
    });
  };
  
  return (
    <div className="relative">
      {/* Filter Button */}
      <Button
        variant="outline"
        className="flex items-center text-brand-charcoal font-primary border-gray-300"
        onClick={togglePanel}
      >
        <Filter className="h-4 w-4 mr-2" />
        <span>Advanced Filters</span>
        {(selectedStates.length > 0 || selectedProducts.length > 0 || verifiedOnly) && (
          <span className="ml-2 bg-brand-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-primary">
            {selectedStates.length + selectedProducts.length + (verifiedOnly ? 1 : 0)}
          </span>
        )}
      </Button>
      
      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-10 bg-white rounded-lg shadow-lg border border-brand-brown/20 w-72">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-brand-charcoal font-primary">Filters</h3>
              <button
                onClick={togglePanel}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* States Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-brand-charcoal/80 mb-2 font-primary">States</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {states.map((state) => (
                  <label
                    key={state}
                    className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand-green focus:ring-brand-gold border-gray-200 rounded"
                      checked={selectedStates.includes(state)}
                      onChange={() => toggleState(state)}
                    />
                    <span className="ml-2 text-sm text-brand-charcoal/80 font-secondary">{state}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Products Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-brand-charcoal/80 mb-2 font-primary">Products</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {productCategories.map((product) => (
                  <label
                    key={product}
                    className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand-green focus:ring-brand-gold border-gray-200 rounded"
                      checked={selectedProducts.includes(product)}
                      onChange={() => toggleProduct(product)}
                    />
                    <span className="ml-2 text-sm text-brand-charcoal/80 font-secondary">{product}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Verified Only Toggle */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-brand-charcoal/80 mb-2 font-primary">Additional Filters</h4>
              <label className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-brand-green focus:ring-brand-gold border-gray-200 rounded"
                  checked={verifiedOnly}
                  onChange={() => setVerifiedOnly(!verifiedOnly)}
                />
                <span className="ml-2 text-sm text-brand-charcoal/80 font-secondary">Verified Sellers Only</span>
              </label>
            </div>
            
            {/* Actions */}
            <div className="flex justify-between">
              <button
                onClick={resetFilters}
                className="text-brand-charcoal/70 text-sm hover:text-brand-green font-secondary"
              >
                Reset all
              </button>
              
              <Button
                variant="default"
                size="sm"
                className="bg-brand-green hover:bg-brand-emerald text-white font-primary"
                onClick={applyFilters}
              >
                <Check className="h-4 w-4 mr-1" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerFilter;
