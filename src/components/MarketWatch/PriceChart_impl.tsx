"use client";

import { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar, Filter, ChevronDown } from 'lucide-react';
import { PriceEntry } from './MarketTable_impl';


interface PriceChartProps {
  priceHistory: PriceEntry[];
  commodities: string[];
  states: string[];
  markets: string[];
}

const PriceChart: React.FC<PriceChartProps> = ({
  priceHistory,
  commodities,
  states,
  markets
}) => {
  // State for filters
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'1month' | '3months' | '6months' | '1year'>('3months');
  const [filterOpen, setFilterOpen] = useState<{
    commodity: boolean;
    state: boolean;
    market: boolean;
    time: boolean;
  }>({
    commodity: false,
    state: false,
    market: false,
    time: false
  });
  
  // Set default commodity if none selected
  useEffect(() => {
    if (selectedCommodities.length === 0 && commodities.length > 0) {
      setSelectedCommodities([commodities[0]]);
    }
  }, [commodities, selectedCommodities]);
  
  // Format date to readable string
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  // Get time range for filtering
  const getTimeRangeDate = (): Date => {
    const today = new Date();
    switch (timeRange) {
      case '1month':
        return new Date(today.setMonth(today.getMonth() - 1));
      case '3months':
        return new Date(today.setMonth(today.getMonth() - 3));
      case '6months':
        return new Date(today.setMonth(today.getMonth() - 6));
      case '1year':
        return new Date(today.setFullYear(today.getFullYear() - 1));
      default:
        return new Date(today.setMonth(today.getMonth() - 3));
    }
  };
  
  // Process data for chart
  const chartData = useMemo(() => {
    // Apply filters
    const timeRangeDate = getTimeRangeDate();
    const filteredData = priceHistory.filter((entry) => {
      const matchesState = selectedState === 'all' || entry.state === selectedState;
      const matchesMarket = selectedMarket === 'all' || entry.market === selectedMarket;
      const matchesTimeRange = new Date(entry.weekStart) >= timeRangeDate;
      const matchesCommodity = selectedCommodities.includes(entry.commodity);
      
      return matchesState && matchesMarket && matchesTimeRange && matchesCommodity;
    });
    
    // Group by date
    const groupedByDate = filteredData.reduce<Record<string, { date: string; [commodity: string]: number | string }>>((acc, entry) => {
      const dateKey = formatDate(entry.weekStart);
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey };
      }
      acc[dateKey][entry.commodity] = entry.price;
      return acc;
    }, {});
    
    // Convert to array and sort by date
    return Object.values(groupedByDate)
      .sort((a: { date: string }, b: { date: string }) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [priceHistory, selectedState, selectedMarket, selectedCommodities, timeRange, getTimeRangeDate]);
  
  // Generate chart colors
  const getLineColor = (index: number): string => {
    const colors = ['#2D5016', '#DAA520', '#8B4513', '#006A4E', '#87A96B', '#36454F'];
    return colors[index % colors.length];
  };
  
  // Toggle filter dropdown
  const toggleFilter = (key: keyof typeof filterOpen) => {
    setFilterOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Handle commodity toggle
  const toggleCommodity = (commodity: string) => {
    setSelectedCommodities(prev => {
      if (prev.includes(commodity)) {
        return prev.filter(c => c !== commodity);
      } else {
        return [...prev, commodity];
      }
    });
  };
  
  // Format price for tooltip
  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">Price Trends Over Time</h3>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Commodity filter */}
          <div className="relative">
            <button
              onClick={() => toggleFilter('commodity')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              <span>Commodities ({selectedCommodities.length})</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterOpen.commodity && (
              <div className="absolute right-0 mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  {commodities.map((commodity) => (
                    <label
                      key={commodity}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCommodities.includes(commodity)}
                        onChange={() => toggleCommodity(commodity)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-[#2D5016] focus:ring-[#2D5016]"
                      />
                      {commodity}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* State filter */}
          <div className="relative">
            <button
              onClick={() => toggleFilter('state')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              <span>{selectedState === 'all' ? 'All States' : selectedState}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterOpen.state && (
              <div className="absolute right-0 mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  <button
                    onClick={() => {
                      setSelectedState('all');
                      toggleFilter('state');
                    }}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                      selectedState === 'all' ? 'bg-[#2D5016] text-white' : ''
                    }`}
                  >
                    All States
                  </button>
                  {states.map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        setSelectedState(state);
                        toggleFilter('state');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        selectedState === state ? 'bg-[#2D5016] text-white' : ''
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Market filter */}
          <div className="relative">
            <button
              onClick={() => toggleFilter('market')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              <span>{selectedMarket === 'all' ? 'All Markets' : selectedMarket}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterOpen.market && (
              <div className="absolute right-0 mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  <button
                    onClick={() => {
                      setSelectedMarket('all');
                      toggleFilter('market');
                    }}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                      selectedMarket === 'all' ? 'bg-[#2D5016] text-white' : ''
                    }`}
                  >
                    All Markets
                  </button>
                  {markets.map((market) => (
                    <button
                      key={market}
                      onClick={() => {
                        setSelectedMarket(market);
                        toggleFilter('market');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        selectedMarket === market ? 'bg-[#2D5016] text-white' : ''
                      }`}
                    >
                      {market}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Time range filter */}
          <div className="relative">
            <button
              onClick={() => toggleFilter('time')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {timeRange === '1month' ? '1 Month' : 
                 timeRange === '3months' ? '3 Months' : 
                 timeRange === '6months' ? '6 Months' : '1 Year'}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterOpen.time && (
              <div className="absolute right-0 mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1">
                  {[
                    { value: '1month', label: '1 Month' },
                    { value: '3months', label: '3 Months' },
                    { value: '6months', label: '6 Months' },
                    { value: '1year', label: '1 Year' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTimeRange(option.value as '1month' | '3months' | '6months' | '1year');
                        toggleFilter('time');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        timeRange === option.value ? 'bg-[#2D5016] text-white' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg border h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis
                tickFormatter={(value) => `₦${value}`}
              />
              <Tooltip
                formatter={(value: number, name: string) => [formatPrice(value), name]}
              />
              <Legend />
              {selectedCommodities.map((commodity, index) => (
                <Line
                  key={commodity}
                  type="monotone"
                  dataKey={commodity}
                  name={commodity}
                  stroke={getLineColor(index)}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border text-center">
          <p className="text-gray-500">No data available for the selected filters.</p>
          <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or selecting different commodities.</p>
        </div>
      )}
    </div>
  );
};

export default PriceChart;
