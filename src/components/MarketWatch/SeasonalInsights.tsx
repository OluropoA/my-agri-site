"use client";

import { CalendarClock } from 'lucide-react';

interface SeasonalInsight {
  commodity: string;
  insight: string;
  month: string;
  trend: 'increase' | 'decrease' | 'stable';
}

interface SeasonalInsightsProps {
  currentMonth: string;
}

export default function SeasonalInsights({ currentMonth }: SeasonalInsightsProps) {
  // Mock seasonal insights data - this would come from an API in a real application
  const seasonalInsights: SeasonalInsight[] = [
    {
      commodity: 'Cassava',
      insight: 'Prices usually rise in September due to planting season.',
      month: 'September',
      trend: 'increase'
    },
    {
      commodity: 'Tomatoes',
      insight: 'Prices typically fall in September as the rainy season harvest comes in.',
      month: 'September',
      trend: 'decrease'
    },
    {
      commodity: 'Rice',
      insight: 'Local rice prices are fairly stable in September before the major harvest in November.',
      month: 'September',
      trend: 'stable'
    },
    {
      commodity: 'Maize',
      insight: 'September prices for maize are often higher as many farmers prepare for the next planting cycle.',
      month: 'September',
      trend: 'increase'
    },
    {
      commodity: 'Yam',
      insight: 'The August to September period typically sees stable yam prices as old stock is sold before new harvest.',
      month: 'September',
      trend: 'stable'
    }
  ];

  // Filter insights for the current month
  const currentInsights = seasonalInsights.filter(insight => insight.month.toLowerCase() === currentMonth.toLowerCase());

  return (
    <div className="bg-brand-ivory/50 rounded-lg p-6 shadow-md border border-brand-brown/10">
      <h3 className="text-lg font-bold text-brand-charcoal mb-4 flex items-center">
        <CalendarClock className="h-5 w-5 text-brand-green mr-2" />
        Seasonal Price Insights
      </h3>
      
      <div className="space-y-4">
        {currentInsights.map((insight, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <span className={`w-3 h-3 rounded-full mr-2 ${
                insight.trend === 'increase' ? 'bg-amber-500' : 
                insight.trend === 'decrease' ? 'bg-green-500' : 'bg-blue-500'
              }`}></span>
              <h4 className="font-semibold text-brand-charcoal">{insight.commodity}</h4>
            </div>
            <p className="text-brand-charcoal/70 text-sm">{insight.insight}</p>
          </div>
        ))}
        
        {currentInsights.length === 0 && (
          <p className="text-brand-charcoal/60 italic text-sm">No seasonal insights available for {currentMonth}</p>
        )}
      </div>
    </div>
  );
}
