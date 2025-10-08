import { Metadata } from 'next';
import { GraduationCap, Award, Users, Globe, ChevronRight } from 'lucide-react'
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

  const achievements = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Ph.D. Crop Protection",
      description: "University of Ilorin, 2023",
      color: "bg-brand-green/10 text-brand-green"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "IUPAC N-GAGE Champion",
      description: "Youth Innovation Award, 2019",
      color: "bg-brand-gold/10 text-brand-gold"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Academic Staff",
      description: "Nnamdi Azikiwe University",
      color: "bg-brand-emerald/10 text-brand-emerald"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "International Researcher",
      description: "IITA, Belgium Training",
      color: "bg-brand-brown/10 text-brand-brown"
    }
  ]

  const expertise = [
    "Crop Protection & Plant Pathology",
    "Nematology & Root-Knot Nematode Management",
    "Plant Virology & Virus Identification",
    "Sustainable Agriculture Practices",
    "Botanical Pest Control Methods",
    "Climate Change Adaptation",
    "AI Applications in Agriculture",
    "Integrated Pest Management"
  ]

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

            {/* Expertise Areas */}
            <div>
              <h4 className="text-lg font-semibold text-brand-charcoal mb-4 font-primary mt-16">Areas of Expertise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((area, index) => (
                  <div key={index} className="flex items-center space-x-3 py-1.5">
                    <div className="w-2 h-2 bg-brand-green rounded-full flex-shrink-0"></div>
                    <span className="text-brand-charcoal/80 font-secondary">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div className="space-y-6 pt-16">
              <h4 className="text-lg font-semibold text-brand-charcoal font-primary">Education</h4>
              
              <div className="space-y-6">
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

          {/* Achievements & Photo */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Photo - Only visible on desktop */}
            <div className="hidden lg:block relative aspect-[3/4] lg:h-[660px] rounded-xl overflow-hidden shadow-md border border-brand-brown/20 mb-16">
              <Image
                src="/images/dr-apalowo-hero.jpg"
                alt="Dr. Oluropo Apalowo, an agricultural scientist, smiling in a red turtleneck and checkered blazer"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent"></div>
            </div>
            <SectionHeading title="Key Achievements" />
            
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-brand-brown/10 hover:shadow-md transition-all hover:border-brand-brown/20">
                  <div className={`p-3 rounded-lg ${achievement.color}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-1 font-primary">{achievement.title}</h4>
                    <p className="text-brand-charcoal/70 font-secondary">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Section>
      
      {/* Research Philosophy Section */}
      <Section bgColor="light">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 overflow-hidden rounded-xl shadow-md border border-brand-brown/20">
            <Image 
              src="/images/research-field.jpg" 
              alt="Dr. Apalowo conducting field research"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-emerald/30"></div>
          </div>
          <div>
            <SectionHeading 
              title="My Approach to Agricultural Science" 
              subtitle="Making research work for real people"
            />
            <div className="space-y-4 text-brand-charcoal/80 font-secondary">
              <p>
                I believe that science should work for everyone, not just other scientists. That&apos;s why my approach focuses on creating solutions that farmers can actually use in their fields, not just ideas that look good on paper.
              </p>
              <p>
                Growing up in Nigeria, I&apos;ve seen firsthand how agricultural challenges impact communities. My work combines rigorous science with practical know-how, making sure that what works in the lab can also work for a smallholder farmer with limited resources.
              </p>
              <div className="pt-4">
                <ul className="space-y-3">
                  {[
                    "Research you can use, not just read about", 
                    "Bringing farmers and scientists together", 
                    "Solutions that work for people and the planet"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-brand-gold mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

