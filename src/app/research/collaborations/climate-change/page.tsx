import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';

export default function ClimateChangePage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Climate Change Campaign" 
        subtitle="Building Climate Resilience in Agriculture"
        backgroundImage="/images/research-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-brand-charcoal/80 font-secondary">
            <p>
              Our Climate Change Campaign is focused on educating and empowering local communities 
              to adopt climate-smart agricultural practices. Through this initiative, we:
            </p>

            <ul>
              <li>Conduct community workshops on climate-resilient farming</li>
              <li>Develop educational materials on sustainable agriculture</li>
              <li>Work with farmers to implement adaptive farming techniques</li>
              <li>Monitor and assess the impact of climate change on local crops</li>
            </ul>

            <p>
              This campaign represents our commitment to ensuring that agricultural practices evolve 
              to meet the challenges posed by changing climatic conditions while maintaining 
              productivity and sustainability.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}