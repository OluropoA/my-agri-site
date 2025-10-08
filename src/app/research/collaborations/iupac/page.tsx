import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';

export default function IUPACPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="IUPAC Collaboration" 
        subtitle="Next Generation Program"
        backgroundImage="/images/research-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-brand-charcoal/80 font-secondary">
            <p>
              As part of the IUPAC Next Generation Program, we're working on innovative solutions 
              that bridge traditional agricultural practices with modern technology. Our collaboration 
              focuses on:
            </p>

            <ul>
              <li>Developing AI-powered tools for crop disease detection</li>
              <li>Creating sustainable pest management solutions</li>
              <li>Promoting eco-friendly farming practices</li>
              <li>Building international research networks</li>
            </ul>

            <p>
              Through this collaboration, we're able to access global resources and expertise 
              while contributing to the international body of agricultural research knowledge.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}