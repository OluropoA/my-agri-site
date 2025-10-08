import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';

export default function UniversityResearchPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="University Research" 
        subtitle="Research Activities at Nnamdi Azikiwe University"
        backgroundImage="/images/research-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-brand-charcoal/80 font-secondary">
            <p>
              At Nnamdi Azikiwe University, our research focuses on addressing critical agricultural 
              challenges through innovative solutions. Our work spans multiple areas including:
            </p>

            <ul>
              <li>Plant pathology and disease management</li>
              <li>Sustainable farming practices</li>
              <li>Food security initiatives</li>
              <li>Agricultural biotechnology</li>
            </ul>

            <p>
              Through collaborative research projects with students and fellow faculty members, 
              we're working to develop practical solutions that can be implemented by local farmers 
              and agricultural practitioners.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}