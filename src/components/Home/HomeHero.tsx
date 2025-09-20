"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <div className="relative bg-white overflow-hidden min-h-screen flex items-center">
      {/* Subtle dotted pattern background - inspired by carrot.tech */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, #2D5016 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Content (takes up more space like carrot.tech) */}
          <div className="lg:col-span-8 space-y-12 text-left">
            {/* Massive headline in Forest Green - carrot.tech style */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#2D5016] font-primary leading-[0.9] tracking-tight max-w-5xl">
              Advancing Agricultural Science Through Innovation
            </h1>
            
            {/* Clean, readable subheading with generous spacing */}
            <p className="text-xl sm:text-2xl text-[#36454F] font-secondary leading-relaxed max-w-3xl">
              Pioneering sustainable solutions through innovative research methodologies and deep expertise in crop protection.
            </p>
            
            {/* Single primary CTA button - clean and prominent */}
            <div className="pt-8">
              <Button 
                asChild 
                size="lg" 
                className="hero-primary-button font-semibold px-10 py-5 text-xl rounded-none shadow-lg hover:shadow-xl"
              >
                <Link href="/research" className="!text-white hover:!text-white !no-underline">
                  Explore Research
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Single, clean agricultural icon */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="relative">
              {/* Single, large, clean plant icon - similar to carrot.tech's simple approach */}
              <div className="w-72 h-72 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] bg-[#2D5016] rounded-full flex items-center justify-center opacity-90">
                <Image 
                  src="/icons/plant-icon.svg" 
                  alt="Agricultural Science" 
                  width={180} 
                  height={180} 
                  className="filter brightness-0 invert lg:w-48 lg:h-48 xl:w-56 xl:h-56"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeStats() {
  const stats = [
    { number: '9+', label: 'Peer-reviewed Publications' },
    { number: '5+', label: 'Years Academic Leadership' },
    { number: '2019', label: 'IUPAC Award Winner' },
    { number: '3', label: 'Research Focus Areas' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-brand-green font-primary mb-2">
                {stat.number}
              </span>
              <span className="text-brand-charcoal font-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResearchAreas() {
  const areas = [
    {
      title: 'Nematology',
      description: 'Studying plant parasitic nematodes that threaten crop yields and developing innovative control methods.',
      icon: '🔬',
      link: '/research#nematology'
    },
    {
      title: 'Plant Virology',
      description: 'Investigating viral diseases affecting agricultural crops and creating early detection protocols.',
      icon: '🌱',
      link: '/research#virology'
    },
    {
      title: 'Sustainable Agriculture',
      description: 'Developing eco-friendly pest management using botanical extracts and conservation techniques.',
      icon: '♻️',
      link: '/research#sustainable'
    },
  ];

  return (
    <div className="bg-brand-ivory py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-4">Research Focus Areas</h2>
          <p className="text-xl text-brand-charcoal/70 font-secondary max-w-2xl mx-auto">
            Exploring critical areas at the intersection of crop protection and sustainable agriculture
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-2 bg-brand-green text-center">
                <span className="text-3xl" role="img" aria-label={area.title}>{area.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-charcoal font-primary mb-3">{area.title}</h3>
                <p className="text-brand-charcoal/70 font-secondary mb-4">{area.description}</p>
                <Link 
                  href={area.link}
                  className="inline-flex items-center text-brand-green font-medium hover:text-brand-emerald font-primary"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
