import Link from 'next/link';
import { ArrowRight, Microscope, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StaggerContainer, StaggerItem, SlideUp } from '@/components/Effects/MotionWrapper';

export default function ResearchHighlights() {
  const researchAreas = [
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Most Recent Article",
      description: "Stay up to date with our latest research findings and agricultural insights.",
      color: "bg-blue-100 text-blue-600",
      link: "/blog"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Research Focus",
      description: "Exploring critical areas in sustainable agriculture and crop protection.",
      color: "bg-green-100 text-green-600",
      link: "/research"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-4">
            Research Focus Areas
          </h2>
          <SlideUp>
            <p className="text-xl text-brand-charcoal/70 font-secondary max-w-2xl mx-auto">
              Exploring critical areas at the intersection of crop protection and sustainable agriculture
            </p>
          </SlideUp>
        </div>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
        <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
          {researchAreas.map((area, index) => (
            <StaggerItem key={index} className="min-w-[280px] w-[85vw] md:w-auto snap-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 h-full flex flex-col">
              <div className={`p-4 ${area.color} text-center`}>
                <div className="flex justify-center">
                  {area.icon}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-brand-charcoal font-primary mb-3">
                    {area.title}
                  </h3>
                  <p className="text-brand-charcoal/70 font-secondary mb-4 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
                <Link
                  href={area.link}
                  className="inline-flex items-center text-brand-green font-medium hover:text-brand-emerald font-primary text-sm mt-auto"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

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
