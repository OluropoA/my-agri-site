"use client";

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { PriceEntry } from './MarketTable_impl';

interface PriceTrendsProps {
  currentPrices: PriceEntry[];
  historicalPrices: PriceEntry[];
}

export default function PriceTrends({ currentPrices, historicalPrices }: PriceTrendsProps) {
  // Calculate price changes
  const [priceChanges, setPriceChanges] = useState<{
    commodity: string;
    percentChange: number;
    priceChange: number;
    unit: string;
    state: string;
  }[]>([]);

  // Format currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    // Get the most recent historical price for each commodity (from last month)
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    // Group historical prices by commodity and state
    const historicalByKey = historicalPrices.reduce<Record<string, PriceEntry[]>>((acc, price) => {
      const key = `${price.commodity}-${price.state}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(price);
      return acc;
    }, {});
    
    // Calculate price changes for current commodities
    const changes = currentPrices.map(currentPrice => {
      const key = `${currentPrice.commodity}-${currentPrice.state}`;
      const history = historicalByKey[key] || [];
      
      // Sort by date and get the price from one month ago
      history.sort((a, b) => new Date(a.weekStart).getTime() - new Date(b.weekStart).getTime());
      const previousPrice = history.find(p => new Date(p.weekStart) <= oneMonthAgo)?.price || currentPrice.price;
      
      const priceChange = currentPrice.price - previousPrice;
      const percentChange = (priceChange / previousPrice) * 100;
      
      return {
        commodity: currentPrice.commodity,
        percentChange,
        priceChange,
        unit: currentPrice.unit,
        state: currentPrice.state
      };
    });
    
    // Sort by percentage change (absolute value)
    changes.sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange));
    
    setPriceChanges(changes);
  }, [currentPrices, historicalPrices]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/10">
        <h3 className="text-lg font-bold text-brand-charcoal mb-3 flex items-center">
          <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
          Top Price Increases
        </h3>
        <div className="space-y-4">
          {priceChanges
            .filter(item => item.percentChange > 0)
            .slice(0, 3)
            .map((item, index) => (
              <div key={index} className="border-l-4 border-green-400 pl-3 py-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.commodity}</span>
                  <span className="text-green-600 font-bold">
                    +{item.percentChange.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-brand-charcoal/70">
                  <span>{item.state}</span>
                  <span>{formatPrice(item.priceChange)} / {item.unit}</span>
                </div>
              </div>
            ))}
          {priceChanges.filter(item => item.percentChange > 0).length === 0 && (
            <p className="text-brand-charcoal/60 italic text-sm">No price increases found</p>
          )}
        </div>
      </div>
      
      {/* Top Losers */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-brand-brown/10">
        <h3 className="text-lg font-bold text-brand-charcoal mb-3 flex items-center">
          <ArrowDown className="h-5 w-5 text-red-500 mr-2" />
          Top Price Decreases
        </h3>
        <div className="space-y-4">
          {priceChanges
            .filter(item => item.percentChange < 0)
            .slice(0, 3)
            .map((item, index) => (
              <div key={index} className="border-l-4 border-red-400 pl-3 py-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.commodity}</span>
                  <span className="text-red-600 font-bold">
                    {item.percentChange.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-brand-charcoal/70">
                  <span>{item.state}</span>
                  <span>{formatPrice(item.priceChange)} / {item.unit}</span>
                </div>
              </div>
            ))}
          {priceChanges.filter(item => item.percentChange < 0).length === 0 && (
            <p className="text-brand-charcoal/60 italic text-sm">No price decreases found</p>
          )}
        </div>
      </div>
    </div>
  );
}
