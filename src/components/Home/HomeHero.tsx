"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <div className="relative bg-brand-charcoal overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/leaf-pattern.svg')] bg-repeat"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-primary leading-tight mb-6">
                Advancing African Agriculture Through Scientific Excellence
              </h1>
              <p className="text-xl text-brand-ivory/80 font-secondary mb-8 max-w-lg">
                Dr. Oluropo Apalowo combines deep expertise in crop protection with innovative research methodologies to develop sustainable, science-based solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white">
                  Explore Research
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-brand-gold/20">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/30 to-brand-emerald/30 z-10"></div>
                <Image 
                  src="/images/dr-apalowo-new.jpg" 
                  alt="Dr. Oluropo Apalowo in a checkered blazer" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="absolute -right-8 -bottom-8 bg-brand-green px-6 py-4 rounded-lg shadow-xl">
                <p className="text-white font-primary font-bold text-xl">IUPAC N-GAGE</p>
                <p className="text-white/80 font-secondary text-sm">Champion 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white w-full h-8 md:h-12">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
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
