import { Metadata } from 'next';
import MarketTable, { PriceEntry } from '@/components/MarketWatch/MarketTable_impl';
import PriceChart from '@/components/MarketWatch/PriceChart_impl';
import MarketCommentary from '@/components/MarketWatch/MarketCommentary_impl';
import MarketCommentForm from '@/components/MarketWatch/MarketCommentForm_impl';
import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';
import PriceTrends from '@/components/MarketWatch/PriceTrends';
import SeasonalInsights from '@/components/MarketWatch/SeasonalInsights';
import CompareStates from '@/components/MarketWatch/CompareStates';
import InflationTracker from '@/components/MarketWatch/InflationTracker';
import FarmerVoices from '@/components/MarketWatch/FarmerVoices';
import MealCostCalculator from '@/components/MarketWatch/MealCostCalculator';
import PriceMap from '@/components/MarketWatch/PriceMap';

export const metadata: Metadata = {
  title: 'Market Watch - Dr. Oluropo Apalowo',
  description: 'Weekly agricultural market updates, price trends, and analysis by Dr. Oluropo Apalowo.',
  keywords: ['agricultural markets', 'food prices', 'market trends', 'price analysis', 'Nigeria agriculture']
};

// Mock data for prices
async function getPriceEntries(): Promise<PriceEntry[]> {
  return [
    {
      id: '1',
      market: 'Mile 12',
      state: 'Lagos',
      commodity: 'Maize',
      price: 35000,
      unit: '100kg bag',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    },
    {
      id: '2',
      market: 'Mile 12',
      state: 'Lagos',
      commodity: 'Rice',
      price: 75000,
      unit: '50kg bag',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    },
    {
      id: '3',
      market: 'Mile 12',
      state: 'Lagos',
      commodity: 'Cassava',
      price: 12000,
      unit: '50kg bag',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    },
    {
      id: '4',
      market: 'Bodija',
      state: 'Oyo',
      commodity: 'Maize',
      price: 32000,
      unit: '100kg bag',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    },
    {
      id: '5',
      market: 'Bodija',
      state: 'Oyo',
      commodity: 'Rice',
      price: 72000,
      unit: '50kg bag',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    },
    {
      id: '6',
      market: 'Oja Oba',
      state: 'Ekiti',
      commodity: 'Yam',
      price: 5000,
      unit: 'Tuber',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    },
    {
      id: '7',
      market: 'New Benin',
      state: 'Edo',
      commodity: 'Plantain',
      price: 2500,
      unit: 'Bunch',
      weekStart: new Date('2025-09-08'),
      createdAt: new Date('2025-09-10')
    }
  ];
}

// Mock data for price history
async function getPriceHistory(): Promise<PriceEntry[]> {
  return [
    ...Array(12).fill(0).map((_, i) => ({
      id: `hist-maize-${i}`,
      market: 'Mile 12',
      state: 'Lagos',
      commodity: 'Maize',
      price: 32000 + (Math.random() * 5000 - 2500),
      unit: '100kg bag',
      weekStart: new Date(2025, 6, 1 + i * 7), // Weekly data starting from July 2025
      createdAt: new Date(2025, 6, 1 + i * 7)
    })),
    ...Array(12).fill(0).map((_, i) => ({
      id: `hist-rice-${i}`,
      market: 'Mile 12',
      state: 'Lagos',
      commodity: 'Rice',
      price: 72000 + (Math.random() * 10000 - 5000),
      unit: '50kg bag',
      weekStart: new Date(2025, 6, 1 + i * 7),
      createdAt: new Date(2025, 6, 1 + i * 7)
    })),
    ...Array(12).fill(0).map((_, i) => ({
      id: `hist-cassava-${i}`,
      market: 'Mile 12',
      state: 'Lagos',
      commodity: 'Cassava',
      price: 11000 + (Math.random() * 2000 - 1000),
      unit: '50kg bag',
      weekStart: new Date(2025, 6, 1 + i * 7),
      createdAt: new Date(2025, 6, 1 + i * 7)
    }))
  ];
}

// Mock data for market commentary
async function getMarketCommentary() {
  return {
    id: '1',
    text: `This week's agricultural commodities market has shown notable fluctuations across several key staples. The price of maize has risen by approximately 3% due to increasing demand from poultry farmers and food processors. This uptick comes despite the ongoing harvest season, suggesting that production volumes may be lower than initially projected.\n\nRice prices have remained relatively stable with only a slight increase of 1.2%, which is lower than the general inflation rate. This stability can be attributed to improved local production following government initiatives to boost rice farming, coupled with steady imports from Asian markets.\n\nCassava, a key crop for both food security and industrial uses, has seen a more significant price increase of nearly 8%. This surge is largely due to higher demand from processing industries, particularly ethanol and starch manufacturers, combined with transportation challenges affecting supply chain efficiency.\n\nLooking ahead, we anticipate continued pressure on maize prices as we move toward the end of the harvest season. Cassava prices may stabilize as more smallholder farmers bring their produce to market in response to current favorable prices. Rice is expected to maintain its relative stability, though any changes in import policies could quickly alter this outlook.\n\nFarmers are advised to consider staggered selling strategies for maize to capitalize on potential further price increases, while buyers might benefit from securing longer-term supply contracts at current rates before any additional upward movements.`,
    weekStart: new Date('2025-09-08'),
    author: {
      id: '101',
      name: 'Dr. Oluropo Apalowo',
      email: 'oluropo.apalowo@unizik.edu.ng'
    },
    createdAt: new Date('2025-09-10'),
    comments: [
      {
        id: '201',
        body: "Great analysis! I've noticed similar trends in the eastern markets, especially with cassava prices. The industrial demand is really changing the dynamics for smallholders.",
        userId: '301',
        user: {
          id: '301',
          name: 'Chinedu Okonkwo'
        },
        createdAt: new Date('2025-09-11')
      },
      {
        id: '202',
        body: 'Do you think the government intervention in the rice sector is sustainable long-term? I worry about what happens when these subsidies and programs eventually end.',
        userId: '302',
        user: {
          id: '302',
          name: 'Aminat Ibrahim'
        },
        createdAt: new Date('2025-09-12')
      }
    ]
  };
}

// Helper functions to extract unique values
async function getUniqueStates(): Promise<string[]> {
  const entries = await getPriceEntries();
  return Array.from(new Set(entries.map(entry => entry.state)));
}

async function getUniqueMarkets(): Promise<string[]> {
  const entries = await getPriceEntries();
  return Array.from(new Set(entries.map(entry => entry.market)));
}

async function getUniqueCommodities(): Promise<string[]> {
  const entries = await getPriceEntries();
  return Array.from(new Set(entries.map(entry => entry.commodity)));
}

// Mock data for farmer quotes
async function getFarmerQuotes() {
  return [
    {
      id: '1',
      name: 'Adamu Ibrahim',
      role: 'Farmer',
      location: 'Kano',
      quote: "This week, yam is costly because of transport strikes. We can't move produce from the farms to the markets easily, so prices have gone up significantly.",
      date: new Date('2025-09-10')
    },
    {
      id: '2',
      name: 'Chinwe Okafor',
      role: 'Market Trader',
      location: 'Enugu',
      quote: 'Rice prices are finally stabilizing after months of increases. The recent government import policies are making a difference in local availability.',
      date: new Date('2025-09-12')
    },
    {
      id: '3',
      name: 'Mohammed Bello',
      role: 'Distributor',
      location: 'Lagos',
      quote: 'Tomato supply from the north has improved this week. Expect prices to drop further if the good weather continues and transport costs remain stable.',
      date: new Date('2025-09-15')
    }
  ];
}

// Mock inflation index data
async function getInflationData() {
  return {
    currentIndex: 312.5,
    previousMonthIndex: 305.2,
    previousYearIndex: 278.9
  };
}

export default async function MarketWatchPage() {
  // Fetch all necessary data
  const priceEntries = await getPriceEntries();
  const priceHistory = await getPriceHistory();
  const commentary = await getMarketCommentary();
  const farmerQuotes = await getFarmerQuotes();
  const inflationData = await getInflationData();
  
  // Get unique filter values
  const states = await getUniqueStates();
  const markets = await getUniqueMarkets();
  const commodities = await getUniqueCommodities();
  
  // Get current week
  const currentWeek = new Date('2025-09-08');
  // Get current month
  const currentMonth = currentWeek.toLocaleDateString('en-US', {month: 'long'});
  
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Agricultural Market Watch" 
        subtitle="Weekly food price updates, market trends, and expert analysis to keep you informed about Nigeria's agricultural markets."
        backgroundImage="/images/market-watch-header.jpg"
        align="center"
      />
      
      {/* Price Trends and Inflation Overview Section */}
      <Section bgColor="white">
        <div className="mb-8">
          <SectionHeading 
            title="Market Overview" 
            subtitle={`Week of ${currentWeek.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}`} 
            className="mb-6"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inflation Tracker */}
            <InflationTracker
              currentIndex={inflationData.currentIndex}
              previousMonthIndex={inflationData.previousMonthIndex}
              previousYearIndex={inflationData.previousYearIndex}
            />
            
            {/* Price Trends (Gainers & Losers) */}
            <PriceTrends
              currentPrices={priceEntries}
              historicalPrices={priceHistory}
            />
          </div>
        </div>
      </Section>
      
      {/* Market Table Section */}
      <Section bgColor="light">
        <div className="mb-16">
          <SectionHeading 
            title="Current Market Prices" 
            subtitle="Filter by state, market, or commodity to find specific prices" 
            className="mb-6"
          />
          <MarketTable
            priceEntries={priceEntries}
            states={states}
            markets={markets}
            commodities={commodities}
            weekStart={currentWeek}
          />
        </div>
      </Section>

      {/* Comparison and Insights Section */}
      <Section bgColor="white">
        <div className="mb-12">
          <SectionHeading 
            title="Market Insights" 
            subtitle="Compare prices and understand market trends"
            className="mb-8"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Compare States */}
            <div className="lg:col-span-2">
              <CompareStates
                priceEntries={priceEntries}
                states={states}
                commodities={commodities}
              />
            </div>
            
            {/* Seasonal Insights */}
            <div>
              <SeasonalInsights currentMonth={currentMonth} />
            </div>
          </div>
        </div>
      </Section>
      
      {/* Price Chart Section */}
      <Section bgColor="light">
        <div className="mb-8">
          <SectionHeading 
            title="Price Trends" 
            subtitle="Historical price movements for key agricultural commodities" 
            className="mb-6"
          />
          <PriceChart
            priceHistory={priceHistory}
            states={states}
            markets={markets}
            commodities={commodities}
          />
        </div>
      </Section>
      
      {/* Interactive Tools Section */}
      <Section bgColor="white">
        <div className="mb-12">
          <SectionHeading 
            title="Interactive Tools" 
            subtitle="Visualize and calculate food costs"
            className="mb-8"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Nigeria Price Map */}
            <PriceMap
              priceEntries={priceEntries}
              commodities={commodities}
            />
            
            {/* Meal Cost Calculator */}
            <MealCostCalculator
              priceEntries={priceEntries}
              states={states}
            />
          </div>
        </div>
      </Section>
        
      {/* Market Insights Section */}
      <Section bgColor="light">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <SectionHeading 
              title="Weekly Market Analysis" 
              subtitle="Expert commentary on current market conditions and future trends" 
              className="mb-6"
            />
            <div className="space-y-8">
              <MarketCommentary
                id={commentary.id}
                text={commentary.text}
                weekStart={commentary.weekStart}
                author={commentary.author}
                createdAt={commentary.createdAt}
                comments={commentary.comments}
              />
              
              <MarketCommentForm marketId={commentary.id} />
            </div>
          </div>
          
          <div>
            <SectionHeading 
              title="Farmer Voices" 
              subtitle="Insights from the field"
              className="mb-6"
            />
            <FarmerVoices quotes={farmerQuotes} />
          </div>
        </div>
      </Section>
    </div>
  );
}
