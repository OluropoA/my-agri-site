"use client";

import { Map } from 'lucide-react';
import { useState } from 'react';
import { PriceEntry } from './MarketTable_impl';

interface PriceMapProps {
  priceEntries: PriceEntry[];
  commodities: string[];
}

export default function PriceMap({ priceEntries, commodities }: PriceMapProps) {
  const [selectedCommodity, setSelectedCommodity] = useState<string>(commodities[0] || '');
  
  // Format currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Get price data for the selected commodity
  const getPriceData = () => {
    const filteredEntries = priceEntries.filter(
      entry => entry.commodity === selectedCommodity
    );
    
    // Group by state and get average price
    const stateData: Record<string, { price: number; count: number }> = {};
    
    filteredEntries.forEach(entry => {
      if (!stateData[entry.state]) {
        stateData[entry.state] = { price: 0, count: 0 };
      }
      
      stateData[entry.state].price += entry.price;
      stateData[entry.state].count += 1;
    });
    
    // Calculate average and find min/max
    const priceByState = Object.entries(stateData).map(([state, data]) => ({
      state,
      price: data.price / data.count
    }));
    
    priceByState.sort((a, b) => a.price - b.price);
    
    return {
      priceByState,
      cheapestState: priceByState.length > 0 ? priceByState[0].state : '',
      expensiveState: priceByState.length > 0 ? priceByState[priceByState.length - 1].state : '',
      minPrice: priceByState.length > 0 ? priceByState[0].price : 0,
      maxPrice: priceByState.length > 0 ? priceByState[priceByState.length - 1].price : 0,
    };
  };
  
  const priceData = getPriceData();
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-brand-brown/10">
      <h3 className="text-lg font-bold text-brand-charcoal mb-4 flex items-center">
        <Map className="h-5 w-5 text-brand-emerald mr-2" />
        Price Hotspots Map
      </h3>
      
      {/* Commodity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-brand-charcoal mb-2">Select Commodity</label>
        <select
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        >
          {commodities.map((commodity) => (
            <option key={commodity} value={commodity}>{commodity}</option>
          ))}
        </select>
      </div>
      
      {/* Map Placeholder - In a real implementation, this would be a proper Nigeria map */}
      <div className="relative h-64 bg-brand-ivory/30 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="mb-1">Interactive price map would display here</p>
          <p className="text-xs">(Nigeria map showing price variations by state)</p>
        </div>
      </div>
      
      {/* Price Hotspots Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
          <h4 className="text-sm font-medium text-brand-charcoal mb-1">Cheapest State</h4>
          <p className="font-bold text-green-700">{priceData.cheapestState || 'N/A'}</p>
          <p className="text-xs text-green-600">{formatPrice(priceData.minPrice)}</p>
        </div>
        
        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
          <h4 className="text-sm font-medium text-brand-charcoal mb-1">Most Expensive</h4>
          <p className="font-bold text-red-700">{priceData.expensiveState || 'N/A'}</p>
          <p className="text-xs text-red-600">{formatPrice(priceData.maxPrice)}</p>
        </div>
      </div>
      
      {/* Price List by State */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-brand-charcoal mb-2">All States</h4>
        <div className="max-h-36 overflow-y-auto pr-2">
          {priceData.priceByState.map((item) => (
            <div 
              key={item.state}
              className="flex justify-between items-center border-b border-gray-100 py-1 text-sm"
            >
              <span>{item.state}</span>
              <span className="font-medium">{formatPrice(item.price)}</span>
            </div>
          ))}
          
          {priceData.priceByState.length === 0 && (
            <p className="text-center py-2 text-gray-500 italic text-sm">
              No price data available for {selectedCommodity}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
