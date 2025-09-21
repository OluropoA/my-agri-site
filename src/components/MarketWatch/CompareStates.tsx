"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PriceEntry } from './MarketTable_impl';

interface CompareStatesProps {
  priceEntries: PriceEntry[];
  states: string[];
  commodities: string[];
}

export default function CompareStates({ priceEntries, states, commodities }: CompareStatesProps) {
  const [selectedCommodity, setSelectedCommodity] = useState<string>(commodities[0] || '');
  const [selectedStates, setSelectedStates] = useState<string[]>(states.slice(0, Math.min(3, states.length)));

  // Toggle state selection
  const toggleState = (state: string) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter(s => s !== state));
    } else {
      // Limit to 5 states max for comparison
      if (selectedStates.length < 5) {
        setSelectedStates([...selectedStates, state]);
      }
    }
  };

  // Format currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get prices for the selected commodity across states
  const getComparisonData = () => {
    return selectedStates.map(state => {
      const entry = priceEntries.find(
        entry => entry.state === state && entry.commodity === selectedCommodity
      );
      
      return {
        state,
        price: entry?.price || 0,
        unit: entry?.unit || '',
        market: entry?.market || 'N/A'
      };
    }).sort((a, b) => a.price - b.price); // Sort by price ascending
  };

  const comparisonData = getComparisonData();

  // Calculate price difference percentage between states
  const getPriceDifferencePercent = (price: number, lowestPrice: number) => {
    if (lowestPrice === 0) return 0;
    return ((price - lowestPrice) / lowestPrice) * 100;
  };

  const lowestPrice = comparisonData.length > 0 ? comparisonData[0].price : 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-brand-brown/10">
      <h3 className="text-lg font-bold text-brand-charcoal mb-4">Compare Prices Across States</h3>
      
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
      
      {/* States Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-brand-charcoal mb-2">
          Select States to Compare (max 5)
        </label>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => toggleState(state)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStates.includes(state)
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
      
      {/* Comparison Results */}
      {selectedStates.length > 0 && selectedCommodity ? (
        <div>
          <h4 className="font-semibold text-brand-charcoal mb-3">
            {selectedCommodity} Price Comparison
          </h4>
          
          <div className="space-y-3">
            {comparisonData.map((item, index) => (
              <div 
                key={item.state}
                className={`p-3 rounded-md ${index === 0 ? 'bg-green-50 border border-green-100' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.state}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.market})</span>
                  </div>
                  <span className={`font-bold ${index === 0 ? 'text-green-600' : ''}`}>
                    {formatPrice(item.price)}
                  </span>
                </div>
                
                {index > 0 && (
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">
                      +{getPriceDifferencePercent(item.price, lowestPrice).toFixed(1)}% more than {comparisonData[0].state}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {comparisonData.length > 1 && (
            <div className="mt-4 text-sm text-gray-600 italic">
              {selectedCommodity} is cheapest in {comparisonData[0].state} ({formatPrice(comparisonData[0].price)} per {comparisonData[0].unit})
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          Select a commodity and at least one state to compare prices
        </div>
      )}
    </div>
  );
}
