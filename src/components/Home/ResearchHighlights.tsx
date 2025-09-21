import Link from 'next/link';
import { ArrowRight, Microscope, Leaf, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResearchHighlights() {
  const researchAreas = [
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Nematology",
      description: "Advanced research on plant parasitic nematodes and sustainable control methods for improved crop yields.",
      color: "bg-blue-100 text-blue-600",
      link: "/research#nematology"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Plant Virology",
      description: "Comprehensive studies on plant viruses, particularly cucumber mosaic virus and cassava mosaic geminiviruses.",
      color: "bg-green-100 text-green-600",
      link: "/research#virology"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI in Agriculture",
      description: "Pioneering applications of artificial intelligence in crop protection and precision agriculture.",
      color: "bg-purple-100 text-purple-600",
      link: "/research#ai-agriculture"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Climate-Smart Agriculture",
      description: "Developing resilient agricultural systems that adapt to climate change while maintaining productivity.",
      color: "bg-amber-100 text-amber-600",
      link: "/research#climate-smart"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-4">
            Research Focus Areas
          </h2>
          <p className="text-xl text-brand-charcoal/70 font-secondary max-w-2xl mx-auto">
            Exploring critical areas at the intersection of crop protection and sustainable agriculture
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {researchAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
              <div className={`p-4 ${area.color} text-center`}>
                <div className="flex justify-center">
                  {area.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-charcoal font-primary mb-3">
                  {area.title}
                </h3>
                <p className="text-brand-charcoal/70 font-secondary mb-4 text-sm leading-relaxed">
                  {area.description}
                </p>
                <Link 
                  href={area.link}
                  className="inline-flex items-center text-brand-green font-medium hover:text-brand-emerald font-primary text-sm"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/research">
              View All Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
