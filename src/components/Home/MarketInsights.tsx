import Link from 'next/link';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomePriceChart from './HomePriceChart';
import { SlideUp, FadeIn } from '@/components/Effects/MotionWrapper';

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



  return (
    <section className="py-20 bg-brand-ivory/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SlideUp>
            <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-4">
              Market Watch
            </h2>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-xl text-brand-charcoal/70 font-secondary max-w-2xl mx-auto">
              Stay informed with real-time agricultural commodity prices and market trends
            </p>
          </SlideUp>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Main Chart Section - Full width on mobile, 8 cols on desktop */}
          <div className="lg:col-span-8">
            <FadeIn delay={0.2}>
              <HomePriceChart />
            </FadeIn>
          </div>

          {/* Side Cards - Horizontal Scroll on Mobile, Vertical Stack on Desktop */}
          <div className="lg:col-span-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 gap-4 lg:flex-col lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0 lg:gap-4 lg:space-y-4 scrollbar-hide">
              {marketData.map((item, index) => (
                <FadeIn key={index} delay={0.2 + (index * 0.1)} className="min-w-[260px] w-[80vw] lg:w-full snap-center">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow h-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-brand-charcoal font-primary">
                        {item.commodity}
                      </h3>
                      <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${item.trend === 'up' ? 'bg-red-100 text-red-700' :
                        item.trend === 'down' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {getTrendIcon(item.trend)}
                        <span className="ml-1">{Math.abs(item.change)}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xl font-bold text-brand-green font-primary">
                          {item.price}
                        </div>
                        <div className="text-xs text-brand-charcoal/60 font-secondary">
                          {item.location} • {item.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
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
