"use client";

import { useState, useEffect } from 'react';
import { ShoppingBasket, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceEntry } from './MarketTable_impl';

interface BasketItem {
  commodity: string;
  quantity: number;
  price: number;
  unit: string;
}

interface MealCostCalculatorProps {
  priceEntries: PriceEntry[];
  states: string[];
}

export default function MealCostCalculator({ priceEntries, states }: MealCostCalculatorProps) {
  const [selectedState, setSelectedState] = useState<string>(states[0] || '');
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [availableCommodities, setAvailableCommodities] = useState<{
    commodity: string;
    price: number;
    unit: string;
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
  
  // Update available commodities when state changes
  useEffect(() => {
    const commodities = priceEntries
      .filter(entry => entry.state === selectedState)
      .map(entry => ({
        commodity: entry.commodity,
        price: entry.price,
        unit: entry.unit
      }));
    
    setAvailableCommodities(commodities);
    
    // Reset basket when state changes
    setBasket([]);
  }, [selectedState, priceEntries]);
  
  // Add item to basket
  const addToBasket = (commodity: string, price: number, unit: string) => {
    const existingItem = basket.find(item => item.commodity === commodity);
    
    if (existingItem) {
      setBasket(basket.map(item => 
        item.commodity === commodity 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setBasket([...basket, { commodity, quantity: 1, price, unit }]);
    }
  };
  
  // Remove item from basket
  const removeFromBasket = (commodity: string) => {
    const existingItem = basket.find(item => item.commodity === commodity);
    
    if (existingItem && existingItem.quantity > 1) {
      setBasket(basket.map(item => 
        item.commodity === commodity 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      setBasket(basket.filter(item => item.commodity !== commodity));
    }
  };
  
  // Calculate total cost
  const totalCost = basket.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-brand-brown/10">
      <h3 className="text-lg font-bold text-brand-charcoal mb-4 flex items-center">
        <ShoppingBasket className="h-5 w-5 text-brand-gold mr-2" />
        Cooking Basket Cost Calculator
      </h3>
      
      {/* State Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-brand-charcoal mb-2">Select Your State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        >
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      {/* Available Items */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-brand-charcoal mb-3">Add Items to Your Basket</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableCommodities.map((item) => (
            <div 
              key={item.commodity}
              className="flex justify-between items-center p-2 border border-gray-100 rounded-md hover:bg-gray-50"
            >
              <div>
                <span className="text-sm font-medium">{item.commodity}</span>
                <span className="text-xs text-gray-500 block">{formatPrice(item.price)} / {item.unit}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addToBasket(item.commodity, item.price, item.unit)}
                className="text-brand-green hover:text-brand-green hover:bg-brand-green/10"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Basket Summary */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-brand-charcoal mb-3">Your Basket</h4>
        
        {basket.length > 0 ? (
          <>
            <div className="space-y-2 mb-4">
              {basket.map((item) => (
                <div 
                  key={item.commodity}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromBasket(item.commodity)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-6 w-6 mr-2"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <div>
                      <span className="text-sm font-medium">{item.commodity} (x{item.quantity})</span>
                      <span className="text-xs text-gray-500 block">{item.unit}</span>
                    </div>
                  </div>
                  <span className="font-medium text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="font-medium">Total Cost:</span>
              <span className="text-xl font-bold text-brand-charcoal">{formatPrice(totalCost)}</span>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-gray-500 italic text-sm">
            Your basket is empty. Add items above to calculate meal costs.
          </div>
        )}
      </div>
    </div>
  );
}
