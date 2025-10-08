import Link from 'next/link';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketInsights() {
  const marketData = [
    {
      commodity: "Palm Oil",
      location: "Onitsha Market",
      price: "₦65,000",
      unit: "per 25L",
      change: 3.14,
      trend: "up"
    },
    {
      commodity: "Cassava Flour",
      location: "Ibadan Market", 
      price: "₦18,500",
      unit: "per bag",
      change: -2.56,
      trend: "down"
    },
    {
      commodity: "Plantain",
      location: "Lagos Market",
      price: "₦12,000", 
      unit: "per bunch",
      change: 0,
      trend: "stable"
    },
    {
      commodity: "Soybean",
      location: "Kano Market",
      price: "₦42,000",
      unit: "per bag",
      change: 4.06,
      trend: "up"
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-red-600" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-red-600";
    if (trend === "down") return "text-green-600";
    return "text-gray-500";
  };

  return (
    <section className="py-20 bg-brand-ivory/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-4">
            Market Watch
          </h2>
          <p className="text-xl text-brand-charcoal/70 font-secondary max-w-2xl mx-auto">
            Stay informed with real-time agricultural commodity prices and market trends
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-brand-charcoal font-primary text-lg mb-1">
                    {item.commodity}
                  </h3>
                  <p className="text-sm text-brand-charcoal/60 font-secondary">
                    {item.location}
                  </p>
                </div>
                <div className={`flex items-center ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-2xl font-bold text-brand-green font-primary">
                  {item.price}
                </div>
                <div className="text-sm text-brand-charcoal/60 font-secondary">
                  {item.unit}
                </div>
              </div>

              {item.change !== 0 && (
                <div className={`flex items-center text-sm font-medium ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                  <span className="ml-1">
                    {Math.abs(item.change).toFixed(2)}% from last week
                  </span>
                </div>
              )}
              
              {item.change === 0 && (
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <Minus className="h-4 w-4 mr-1" />
                  <span>No change from last week</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90 !text-white font-semibold">
            <Link href="/market-watch" className="!text-white hover:!text-white">
              View Full Market Data
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
