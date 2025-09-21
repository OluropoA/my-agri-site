import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout'
import Link from 'next/link'
import StructuredData from '@/components/SEO/StructuredData';
import { generateMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Research - Agricultural Science & Innovation",
  description: "Explore cutting-edge agricultural research in nematology, plant virology, sustainable farming, and crop protection. Discover innovative solutions for modern agricultural challenges and food security.",
  keywords: [
    "agricultural research projects",
    "nematology studies Nigeria",
    "plant virology research",
    "sustainable farming innovations",
    "crop protection research",
    "agricultural biotechnology",
    "food security research",
    "climate-smart agriculture",
    "integrated pest management research"
  ],
  url: "https://oluropoapalowo.com/research",
  type: "website"
});

export default function ResearchPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://oluropoapalowo.com" },
    { name: "Research", url: "https://oluropoapalowo.com/research" }
  ]);
  const researchAreas = [
    {
      icon: '🔬',
      title: "Nematology Research",
      description: "Advanced studies on root-knot nematodes, focusing on sustainable management strategies and biological control methods.",
      link: "#"
    },
    {
      icon: '🌱',
      title: "Plant Virology",
      description: "Comprehensive research on plant viruses, particularly cucumber mosaic virus and cassava mosaic geminiviruses.",
      link: "#"
    },
    {
      icon: '🤖',
      title: "AI in Agriculture",
      description: "Pioneering applications of artificial intelligence in crop protection and precision agriculture.",
      link: "#"
    },
    {
      icon: '🌍',
      title: "Climate-Smart Agriculture",
      description: "Developing resilient agricultural systems that adapt to climate change while maintaining productivity.",
      link: "#"
    }
  ]

  const currentProjects = [
    {
      title: "Molecular Identification of Nematodes in Talinum triangulare",
      status: "Ongoing",
      description: "Investigating nematode species affecting waterleaf cultivation and their impact on food security in Anambra State.",
      funding: "University Research Grant"
    },
    {
      title: "AI-Powered Crop Disease Detection System",
      status: "Development Phase",
      description: "Creating machine learning models for early detection of plant diseases using computer vision technology.",
      funding: "IUPAC Innovation Grant"
    },
    {
      title: "Botanical Nematicides from Indigenous Plants",
      status: "Field Trials",
      description: "Evaluating the efficacy of plant extracts from Chromolaena odorata and Vernonia amygdalina for nematode control.",
      funding: "Collaborative Research"
    }
  ]

  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <PageHero 
        title="Research Focus Areas" 
        subtitle="Advancing agricultural science through interdisciplinary research that addresses global food security challenges and environmental sustainability."
        backgroundImage="/images/research-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        {/* Research Interest */}
        <div className="mb-16">
          <SectionHeading 
            title="Research Interest" 
            subtitle=""
          />
          <div className="prose prose-lg text-brand-charcoal/80 font-secondary max-w-none">
            <p>
              I am focused on making agriculture smarter, more resilient, and farmer-friendly. My area of specialization is plant pathology, 
              where I study how tiny but destructive organisms affect crops and explore sustainable ways to manage them.
            </p>
            
            <p>
              I also work in crop protection and integrated pest management (IPM), with a strong focus on eco-friendly solutions that reduce 
              over-reliance on chemical pesticides. I am passionate about understanding how climate change is shifting pest and disease patterns 
              and what these changes mean for food security.
            </p>
            
            <p>
              Another area that excites me is the application of digital tools and artificial intelligence in agriculture. Through ideas like 
              NemaPredictAI, I explore how technology can forecast pest outbreaks and help farmers make better decisions.
            </p>
            
            <p>
              Beyond science, I am deeply interested in agricultural policy and food economics, particularly the drivers of food price 
              inflation and how well-designed policies can build more resilient and affordable food systems.
            </p>
            
            <p>
              In all of this, my aim is to connect science, technology, and policy in ways that create practical, real-world solutions for 
              farmers and communities.
            </p>
          </div>
        </div>

        {/* Research Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {researchAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-2 bg-brand-green text-center">
                <span className="text-3xl" role="img" aria-label={area.title}>{area.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-charcoal font-primary mb-3">{area.title}</h3>
                <p className="text-brand-charcoal/70 font-secondary mb-4">{area.description}</p>
                <a 
                  href={area.link}
                  className="inline-flex items-center text-brand-green font-medium hover:text-brand-emerald font-primary"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </Section>
      
      <Section bgColor="light" className="bg-gradient-to-br from-brand-ivory/70 via-white to-brand-ivory/50">
        {/* Current Projects */}
        <div className="mb-12">
          <SectionHeading 
            title="Current Research Projects" 
            subtitle="Ongoing scientific investigations and development work"
            align="center"
            className="mb-8"
          />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-brand-green/15 hover:border-brand-green/40">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium font-primary ${
                    project.status === 'Ongoing' ? 'bg-brand-green/10 text-brand-green' :
                    project.status === 'Development Phase' ? 'bg-brand-emerald/10 text-brand-emerald' :
                    'bg-brand-gold/10 text-brand-gold'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h4 className="font-bold text-brand-green mb-3 leading-tight font-primary">{project.title}</h4>
                <p className="text-brand-charcoal/70 text-sm mb-4 leading-relaxed font-secondary">{project.description}</p>
                
                <div className="text-xs text-brand-charcoal/60 font-secondary">
                  <span className="font-medium font-primary">Funding:</span> {project.funding}
                </div>
              </div>
            ))}
          </div>
        </div>

      </Section>
      
      {/* Projects and Collaborations */}
      <Section bgColor="white" className="bg-gradient-to-b from-white to-brand-ivory/30">
        <SectionHeading 
          title="Projects and Collaborations" 
          subtitle="Working together to advance agricultural science and practice"
          align="center"
          className="mb-8"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Placeholder for project/collaboration images - to be replaced with actual content */}
          <div className="rounded-xl overflow-hidden shadow-md h-64 relative border border-brand-green/15 bg-white">
            <div className="absolute inset-0 flex items-center justify-center bg-brand-green/10 p-6 text-center">
              <div>
                <div className="w-20 h-20 bg-brand-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-brand-green">Logo</span>
                </div>
                <h4 className="font-bold text-brand-green">IUPAC Collaboration</h4>
                <p className="text-sm text-brand-charcoal/70">Next Generation Program</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-md h-64 relative border border-brand-green/15 bg-white">
            <div className="absolute inset-0 flex items-center justify-center bg-brand-gold/10 p-6 text-center">
              <div>
                <div className="w-20 h-20 bg-brand-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-brand-gold">Logo</span>
                </div>
                <h4 className="font-bold text-brand-green">University Research</h4>
                <p className="text-sm text-brand-charcoal/70">Nnamdi Azikiwe University</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-md h-64 relative border border-brand-green/15 bg-white">
            <div className="absolute inset-0 flex items-center justify-center bg-brand-emerald/10 p-6 text-center">
              <div>
                <div className="w-20 h-20 bg-brand-emerald/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-brand-emerald">Logo</span>
                </div>
                <h4 className="font-bold text-brand-green">Climate Smart Initiative</h4>
                <p className="text-sm text-brand-charcoal/70">Community Outreach Program</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-brand-charcoal/70 font-secondary italic">Images and logos of affiliated organizations will be displayed here.</p>
        </div>
      </Section>
      
      {/* Publications Section */}
      <Section bgColor="light">
        <SectionHeading 
          title="Publications" 
          subtitle="Academic contributions and research papers"
          align="center"
          className="mb-8"
        />
        
        <div className="space-y-4 mb-10">
          {/* Publication 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-brown/10 hover:shadow-md transition-all">
            <h4 className="font-bold text-brand-charcoal mb-2 font-primary">Efficacy Of Aqueous And Powdered Leaf Extracts Of Chromolaena Odorata And Ficus Mucuso Botanicals On Root-Knot Nematode Infecting Watermelon</h4>
            <p className="text-sm text-brand-charcoal/70 mb-4 font-secondary">Journal of Agricultural and Life Sciences (2023)</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-xs text-brand-charcoal/50 font-secondary">Authors: Apalowo, O.R., et al.</p>
              <a href="https://jurnalalse.iuls.ro/wp-content/uploads/2024/12/ALSE4-2023-04.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5">
                  View Publication
                </Button>
              </a>
            </div>
          </div>
          
          {/* Publication 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-brown/10 hover:shadow-md transition-all">
            <h4 className="font-bold text-brand-charcoal mb-2 font-primary">Genetic Structure of Cucumber Mosaic Virus From Natural Hosts in Nigeria Reveals High Diversity and Occurrence of Putative Novel Recombinant Strains</h4>
            <p className="text-sm text-brand-charcoal/70 mb-4 font-secondary">Frontiers in Microbiology (2022)</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-xs text-brand-charcoal/50 font-secondary">Authors: Apalowo, O.R., et al.</p>
              <a href="https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2022.753054/full" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5">
                  View Publication
                </Button>
              </a>
            </div>
          </div>
          
          {/* Publication 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-brown/10 hover:shadow-md transition-all">
            <h4 className="font-bold text-brand-charcoal mb-2 font-primary">Bioactivity Of Aqueous Extract Of Vernonia Amygdalina And Peperomia Pellucida On Meloidogyne Incognita Infecting Two Telfairia Occidentalis Accessions</h4>
            <p className="text-sm text-brand-charcoal/70 mb-4 font-secondary">African Journal of Agricultural and Allied Sciences (2021)</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-xs text-brand-charcoal/50 font-secondary">Authors: Apalowo, O.R., et al.</p>
              <a href="https://www.ajaas.com.ng/vol-1issue1-2021-article-2-bioactivity-of-aqueous-extract-of-vernonia-amygdalina-and-peperomia-pellucida-on-meloidogyne-incognita-infecting-two-telfairia-accessions/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5">
                  View Publication
                </Button>
              </a>
            </div>
          </div>

          {/* Publication 4 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-brown/10 hover:shadow-md transition-all">
            <h4 className="font-bold text-brand-charcoal mb-2 font-primary">Occurrence of parasitic nematodes infecting cucumber in Kwara State, Nigeria</h4>
            <p className="text-sm text-brand-charcoal/70 mb-4 font-secondary">Agriculture, Food, and Natural Resources Journal (2022)</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-xs text-brand-charcoal/50 font-secondary">Authors: Apalowo, O.R., et al.</p>
              <a href="https://journals.unizik.edu.ng/afnrj/article/view/5054" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5">
                  View Publication
                </Button>
              </a>
            </div>
          </div>
          
          {/* Publication 5 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-brown/10 hover:shadow-md transition-all">
            <h4 className="font-bold text-brand-charcoal mb-2 font-primary">Histopathology Of Watermelon Root Infected With Root-Knot Nematode (Meloidogyne spp.)</h4>
            <p className="text-sm text-brand-charcoal/70 mb-4 font-secondary">FUDMA Journal of Sciences (2022)</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-xs text-brand-charcoal/50 font-secondary">Authors: Apalowo, O.R., et al.</p>
              <a href="https://fjs.fudutsinma.edu.ng/index.php/fjs/article/view/3456" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5">
                  View Publication
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Show More Publications button */}
        <div className="text-center">
          <p className="text-brand-charcoal/70 font-secondary mb-6">Showing 5 of 10 publications</p>
          <Link href="/publications" className="inline-block">
            <Button variant="default" className="bg-brand-green hover:bg-brand-emerald text-white">
              View All Publications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      
      {/* Research Impact Section */}
      <Section bgColor="white">
        {/* Research Impact */}
        <div className="bg-gradient-to-r from-brand-green to-brand-emerald rounded-xl p-8 md:p-12 text-white text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4 font-primary">Research Impact & Collaboration</h3>
          <p className="text-brand-ivory/90 mb-8 max-w-3xl mx-auto font-secondary">
            My research contributes to global food security through innovative solutions that benefit 
            smallholder farmers, promote environmental sustainability, and advance agricultural science.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="text-3xl font-bold mb-2 font-primary text-brand-gold">10+</div>
              <div className="text-brand-ivory/90 font-secondary">Published Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 font-primary text-brand-gold">5</div>
              <div className="text-brand-ivory/90 font-secondary">International Collaborations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 font-primary text-brand-gold">100+</div>
              <div className="text-brand-ivory/90 font-secondary">Farmers Impacted</div>
            </div>
          </div>
          
          <Link href="/publications">
            <Button variant="secondary" size="lg" className="bg-white text-brand-green hover:bg-white/90 font-primary">
              View Publications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  )
}

