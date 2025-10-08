import { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';
import StructuredData from '@/components/SEO/StructuredData';
import { generateMetadata, generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "About Dr. Oluropo Apalowo - Agricultural Scientist & Researcher",
  description: "Meet Dr. Oluropo Apalowo, a leading agricultural scientist at Nnamdi Azikiwe University specializing in nematology, plant virology, and sustainable farming practices. Discover his research, expertise, and contributions to agricultural science.",
  keywords: [
    "Dr. Oluropo Apalowo biography",
    "agricultural scientist Nigeria",
    "nematology expert",
    "plant virology researcher",
    "sustainable farming specialist",
    "Nnamdi Azikiwe University faculty",
    "crop protection research",
    "agricultural education Nigeria"
  ],
  url: "https://oluropoapalowo.com/about",
  type: "profile"
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://oluropoapalowo.com" },
    { name: "About", url: "https://oluropoapalowo.com/about" }
  ]);

  const personSchema = generatePersonSchema();
  return (
    <div className="min-h-screen">
      <StructuredData data={[breadcrumbSchema, personSchema]} />
      <PageHero 
        title="About Dr. Apalowo" 
        subtitle="Agricultural Scientist & Researcher"
        backgroundImage="/images/about-hero.jpg"
        align="left"
      />
      <Section bgColor="white">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Mobile Photo - Only visible on mobile */}
          <div className="lg:hidden mb-8">
            <div className="relative aspect-[3/4] h-[480px] rounded-xl overflow-hidden shadow-md border border-brand-brown/20">
              <Image
                src="/images/dr-apalowo-hero.jpg"
                alt="Dr. Oluropo Apalowo, an agricultural scientist, smiling in a red turtleneck and checkered blazer"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent"></div>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6">
            <SectionHeading 
              title="My Journey in Agricultural Science" 
              subtitle="Passion, purpose, and practical solutions for farming challenges"
            />
            
            <div className="prose prose-lg text-brand-charcoal/80 font-secondary">
              <p>
                Hi, I&apos;m Dr. Oluropo Apalowo, a guy passionate about solving some of agriculture&apos;s toughest challenges. 
                Although, I have a background in Plant pathology by studying those tiny but powerful organisms that silently 
                attack crops. However, my interests extend across the bigger picture of crop protection, climate change, 
                and food security.
              </p>
              
              <p>
                Beyond the laboratory and classroom, I have led many community and school campaigns on climate change, 
                raising environmental awareness and promoting climate-resilient agricultural practices. These experiences 
                have shown me the importance of bridging the gap between science and everyday life, making sure knowledge 
                serves not just researchers, but also farmers, students, and local communities.
              </p>
              
              <p>
                I am also proud to be a recipient of the IUPAC Next Generation Agricultural Innovators Award, an honor 
                that fuels my commitment to pioneering research which combines traditional agricultural methods with modern 
                technologies like artificial intelligence (AI) and precision farming techniques.
              </p>
              
              <p>
                I started this blog because I believe knowledge shouldn&apos;t stay locked in research papers. Farmers, students, 
                policymakers, and the general public all deserve access to insights that can make a real difference.
              </p>
              
              <p>
                Here, I break down research into simple, practical lessons, share updates on food prices and trusted sellers 
                across Nigeria, and highlight innovations that could shape the future of farming. My goal is to create a space 
                where science is translated to practical solution, and ideas change to action.
              </p>
            </div>

          </div>

          {/* Photo - Only visible on desktop */}
          <div className="max-w-3xl mx-auto">
            <div className="hidden lg:block relative aspect-[3/4] lg:h-[660px] rounded-xl overflow-hidden shadow-md border border-brand-brown/20">
              <Image
                src="/images/dr-apalowo-hero.jpg"
                alt="Dr. Oluropo Apalowo, an agricultural scientist, smiling in a red turtleneck and checkered blazer"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent"></div>
            </div>

            
            {/* Education Section */}
            <div className="mt-16">
              <SectionHeading 
                title="Education" 
                subtitle="Academic Background"
                align="left"
              />
              
              <div className="space-y-6 mt-8">
                <div className="border-l-2 border-brand-green pl-4 pb-6">
                  <div className="text-sm text-brand-gold font-medium font-primary">2023</div>
                  <div className="font-semibold text-brand-charcoal font-primary">Ph.D. Crop Protection</div>
                  <div className="text-brand-charcoal/70 font-secondary">University of Ilorin, Kwara State</div>
                </div>
                
                <div className="border-l-2 border-brand-green pl-4 pb-6">
                  <div className="text-sm text-brand-gold font-medium font-primary">2016</div>
                  <div className="font-semibold text-brand-charcoal font-primary">M.Sc. Crop Protection</div>
                  <div className="text-brand-charcoal/70 font-secondary">University of Ilorin, Kwara State</div>
                </div>
                
                <div className="border-l-2 border-brand-green pl-4 pb-6">
                  <div className="text-sm text-brand-gold font-medium font-primary">2011</div>
                  <div className="font-semibold text-brand-charcoal font-primary">B.Tech (Hons.) Agronomy</div>
                  <div className="text-brand-charcoal/70 font-secondary">Ladoke Akintola University of Technology</div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo - Only visible on desktop */}
          <div className="max-w-3xl mx-auto">
            <div className="hidden lg:block relative aspect-[3/4] lg:h-[660px] rounded-xl overflow-hidden shadow-md border border-brand-brown/20">
              <Image
                src="/images/dr-apalowo-hero.jpg"
                alt="Dr. Oluropo Apalowo, an agricultural scientist, smiling in a red turtleneck and checkered blazer"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent"></div>
            </div>

          </div>
        </div>
      </Section>

      {/* My Approach Section */}
      <Section bgColor="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            title="My Approach to Agricultural Science" 
            subtitle="Bridging research and practical solutions"
            align="center"
          />
          
          <div className="prose prose-lg mx-auto text-brand-charcoal/80 font-secondary">
            <p>
              My approach to agricultural science is deeply rooted in the belief that effective solutions must be both 
              scientifically sound and practically applicable. I focus on developing sustainable solutions that are:
            </p>

            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-green rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                <span>Accessible to farmers regardless of their resources or technical background</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-green rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                <span>Environmentally sustainable and climate-conscious</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-green rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                <span>Based on rigorous research but explained in simple terms</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-green rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                <span>Integrated with local farming practices and knowledge</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
      
    </div>
  )
}

