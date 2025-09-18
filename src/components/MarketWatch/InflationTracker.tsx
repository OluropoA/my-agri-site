"use client";

import { TrendingUp, Info } from 'lucide-react';
import { useState } from 'react';

interface InflationTrackerProps {
  currentIndex: number;
  previousMonthIndex: number;
  previousYearIndex: number;
}

export default function InflationTracker({ 
  currentIndex, 
  previousMonthIndex, 
  previousYearIndex 
}: InflationTrackerProps) {
  const [showInfo, setShowInfo] = useState(false);
  
  // Calculate percentage changes
  const monthlyChange = ((currentIndex - previousMonthIndex) / previousMonthIndex) * 100;
  const yearlyChange = ((currentIndex - previousYearIndex) / previousYearIndex) * 100;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-brand-brown/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-brand-charcoal flex items-center">
          <TrendingUp className="h-5 w-5 text-brand-green mr-2" />
          Food Price Inflation Tracker
        </h3>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-400 hover:text-gray-600"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>
      
      {showInfo && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
          <p>The Food Price Inflation Index tracks the overall movement of food prices across Nigeria. 
          The index is calculated based on a basket of common food items weighted by importance in the 
          average Nigerian diet.</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-center mb-4 md:mb-0">
          <div className="text-3xl font-bold text-brand-charcoal">{currentIndex.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Current Index</div>
        </div>
        
        <div className="flex justify-between md:space-x-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${monthlyChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {monthlyChange >= 0 ? '+' : ''}{monthlyChange.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">vs Last Month</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${yearlyChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {yearlyChange >= 0 ? '+' : ''}{yearlyChange.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">vs Last Year</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              monthlyChange > 5 ? 'bg-red-500' : 
              monthlyChange > 2 ? 'bg-amber-500' : 
              monthlyChange > 0 ? 'bg-yellow-400' : 
              'bg-green-500'
            }`}
            style={{ width: `${Math.min(Math.max(monthlyChange * 3, 5), 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low Inflation</span>
          <span>High Inflation</span>
        </div>
      </div>
    </div>
  );
}
