import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { GraduationCap, BookOpen, Users, Leaf, Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';
import StructuredData from '@/components/SEO/StructuredData';
import { generateMetadata, generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo';
import { SlideUp, FadeIn, StaggerContainer, StaggerItem } from '@/components/Effects/MotionWrapper';

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
        title="About Dr. 'Ropo"
        subtitle="Agricultural Scientist & Researcher"
        backgroundImage="/images/about-hero.jpg"
        align="left"
      />
      <Section bgColor="white">


        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Mobile Photo - Only visible on mobile */}
          <div className="lg:hidden mb-8">
            <FadeIn>
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
            </FadeIn>
          </div>

          {/* Story */}
          <div className="space-y-6">
            <SectionHeading
              title="My Journey in Agricultural Science"
              subtitle="Passion, purpose, and practical solutions for farming challenges"
            />

            <div className="prose prose-lg text-brand-charcoal/80 font-secondary">
              <SlideUp>
                <p>
                  Hi, I&apos;m Dr. Oluropo Apalowo, a guy passionate about solving some of agriculture&apos;s toughest challenges.
                  Although, I have a background in Plant pathology by studying those tiny but powerful organisms that silently
                  attack crops. However, my interests extend across the bigger picture of crop protection, climate change,
                  and food security.
                </p>
              </SlideUp>

              <SlideUp delay={0.1}>
                <p>
                  Beyond the laboratory and classroom, I have led many community and school campaigns on climate change,
                  raising environmental awareness and promoting climate-resilient agricultural practices. These experiences
                  have shown me the importance of bridging the gap between science and everyday life, making sure knowledge
                  serves not just researchers, but also farmers, students, and local communities.
                </p>
              </SlideUp>

              <SlideUp delay={0.2}>
                <p>
                  I am also proud to be a recipient of the IUPAC Next Generation Agricultural Innovators Award, an honor
                  that fuels my commitment to pioneering research which combines traditional agricultural methods with modern
                  technologies like artificial intelligence (AI) and precision farming techniques.
                </p>
              </SlideUp>

              <SlideUp delay={0.3}>
                <p>
                  I started this blog because I believe knowledge shouldn&apos;t stay locked in research papers. Farmers, students,
                  policymakers, and the general public all deserve access to insights that can make a real difference.
                </p>
              </SlideUp>

              <SlideUp delay={0.4}>
                <p>
                  Here, I break down research into simple, practical lessons, share updates on food prices and trusted sellers
                  across Nigeria, and highlight innovations that could shape the future of farming. My goal is to create a space
                  where science is translated to practical solution, and ideas change to action.
                </p>
              </SlideUp>
            </div>

          </div>

          {/* Photo - Only visible on desktop */}
          <div className="max-w-3xl mx-auto">
            <FadeIn>
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
            </FadeIn>


            {/* Education Section */}
            <div className="mt-16">
              <SectionHeading
                title="Education"
                subtitle="Academic Background"
                align="left"
              />

              <div className="space-y-0 mt-8 relative pl-4">
                {/* Vertical Line */}
                <div className="absolute left-[31px] top-2 bottom-4 w-0.5 bg-brand-green/20"></div>

                {[
                  { year: '2023', degree: 'Ph.D. Crop Protection', school: 'University of Ilorin, Kwara State' },
                  { year: '2016', degree: 'M.Sc. Crop Protection', school: 'University of Ilorin, Kwara State' },
                  { year: '2011', degree: 'B.Tech (Hons.) Agronomy', school: 'Ladoke Akintola University of Technology' },
                ].map((item, index) => (
                  <SlideUp key={index} delay={0.5 + (index * 0.1)}>
                    <div className="relative flex items-start gap-6 pb-12 last:pb-0 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center border-4 border-white z-10 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                        <GraduationCap className="w-5 h-5 text-brand-green group-hover:text-white" />
                      </div>
                      <div className="flex-grow bg-white p-4 rounded-lg shadow-sm border border-brand-green/10 hover:shadow-md transition-shadow -mt-2">
                        <div className="text-sm text-brand-gold font-bold font-primary mb-1">{item.year}</div>
                        <div className="font-bold text-lg text-brand-charcoal font-primary">{item.degree}</div>
                        <div className="text-brand-charcoal/70 font-secondary text-sm">{item.school}</div>
                      </div>
                    </div>
                  </SlideUp>
                ))}
              </div>
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

            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Accessible',
                  description: 'Solutions for farmers regardless of resources.',
                  icon: <Users className="w-8 h-8 text-brand-green" />
                },
                {
                  title: 'Sustainable',
                  description: 'Environmentally conscious farming practices.',
                  icon: <Leaf className="w-8 h-8 text-brand-green" />
                },
                {
                  title: 'Proven',
                  description: 'Deeply rooted in rigorous scientific research.',
                  icon: <BookOpen className="w-8 h-8 text-brand-green" />
                },
                {
                  title: 'Integrated',
                  description: ' respecting local farming knowledge.',
                  icon: <Layers className="w-8 h-8 text-brand-green" />
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-green/10 hover:shadow-md transition-shadow h-full">
                    <div className="mb-4 bg-brand-green/10 w-fit p-3 rounded-full">{item.icon}</div>
                    <h3 className="text-lg font-bold text-brand-charcoal font-primary mb-2">{item.title}</h3>
                    <p className="text-brand-charcoal/70 font-secondary text-sm">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="white" className="border-t border-brand-green/10">
        <div className="max-w-4xl mx-auto text-center">
          <SlideUp>
            <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-6">
              Ready to Dive Deeper?
            </h2>
            <p className="text-xl text-brand-charcoal/70 font-secondary mb-8 max-w-2xl mx-auto">
              Explore my latest research findings or check out practical farming advice on the blog.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90 !text-white font-semibold px-8 h-12">
                <Link href="/research">
                  Explore Research
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-green text-brand-green hover:bg-brand-green/5 font-semibold px-8 h-12">
                <Link href="/blog">
                  Read the Blog
                </Link>
              </Button>
            </div>
          </SlideUp>
        </div>
      </Section>

    </div>
  )
}

