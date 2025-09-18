import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHero, Section, SectionHeading } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Publications - Dr. Oluropo Apalowo',
  description: 'Complete list of academic publications, research papers, and scientific contributions by Dr. Oluropo Apalowo.',
  keywords: ['academic publications', 'research papers', 'agricultural science', 'plant pathology', 'nematology', 'agricultural research']
};

interface Publication {
  title: string;
  journal: string;
  year: number;
  url: string;
  authors: string;
}

export default function PublicationsPage() {
  // All publications data
  const publications: Publication[] = [
    {
      title: "Efficacy Of Aqueous And Powdered Leaf Extracts Of Chromolaena Odorata (Asterales: Asteraceae) And Ficus Mucuso (Rosales: Moraceae) Botanicals On Root-Knot Nematode Infecting Watermelon In Kwara State, Nigeria",
      journal: "Journal of Agricultural and Life Sciences",
      year: 2023,
      url: "https://jurnalalse.iuls.ro/wp-content/uploads/2024/12/ALSE4-2023-04.pdf",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Genetic Structure of Cucumber Mosaic Virus From Natural Hosts in Nigeria Reveals High Diversity and Occurrence of Putative Novel Recombinant Strains",
      journal: "Frontiers in Microbiology",
      year: 2022,
      url: "https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2022.753054/full",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Bioactivity Of Aqueous Extract Of Vernonia Amygdalina And Peperomia Pellucida On Meloidogyne Incognita Infecting Two Telfairia Occidentalis Accessions",
      journal: "African Journal of Agricultural and Allied Sciences",
      year: 2021,
      url: "https://www.ajaas.com.ng/vol-1issue1-2021-article-2-bioactivity-of-aqueous-extract-of-vernonia-amygdalina-and-peperomia-pellucida-on-meloidogyne-incognita-infecting-two-telfairia-accessions/",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Occurrence of parasitic nematodes infecting cucumber in Kwara State, Nigeria",
      journal: "Agriculture, Food, and Natural Resources Journal",
      year: 2022,
      url: "https://journals.unizik.edu.ng/afnrj/article/view/5054",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Histopathology Of Watermelon Root Infected With Root-Knot Nematode (Meloidogyne spp.)",
      journal: "FUDMA Journal of Sciences",
      year: 2022,
      url: "https://fjs.fudutsinma.edu.ng/index.php/fjs/article/view/3456",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Soil Fertility Management Strategies for Sustainable Crop Production at Ifite Ogwari, Southeastern Nigeria",
      journal: "IKR Journal of Multidisciplinary Studies",
      year: 2023,
      url: "https://ikrpublishers.com/soil-fertility-management-strategies-for-sustainable-crop-production-at-ifite-ogwari-southeastern-nigeria/",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Occurrence of Virus in Some Watermelon Growing Areas of Kwara State, Nigeria",
      journal: "Selcuk Journal of Agriculture and Food Sciences",
      year: 2022,
      url: "https://dergipark.org.tr/en/pub/selcukjafsci/issue/94079/1476097",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Assessment of carbon and nitrogen stock in soils of cassava and rice farms in the Derived Savanna of Anambra State, Southeastern Nigeria",
      journal: "Agriculture, Food, and Natural Resources Journal",
      year: 2022,
      url: "https://journals.unizik.edu.ng/afnrj/article/view/4208",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Evaluation Of The Nematicidal And Antifungal Activity Of Aqueous Extracts Of Moringa Leaves And Seed In Cucumber Field",
      journal: "Cercetari Agronomice",
      year: 2023,
      url: "https://www.uaiasi.ro/CERCET_AGROMOLD/CA4-18-05.pdf",
      authors: "Apalowo, O.R., et al."
    },
    {
      title: "Population distribution of plant parasitic nematodes associated with Jatropha and teak plantations in the University of Ilorin, Nigeria",
      journal: "Journal of Arid Agriculture",
      year: 2021,
      url: "https://jaaunimaid.ng/index.php/home/article/view/31",
      authors: "Apalowo, O.R., et al."
    }
  ];

  // Group publications by year
  const publicationsByYear = publications.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);

  // Sort years in descending order
  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Publications" 
        subtitle="Complete list of academic publications and scientific contributions"
        backgroundImage="/images/research-header.jpg"
        align="center"
      />
      
      <Section bgColor="white">
        <div className="mb-8">
          <Link href="/research" className="inline-block">
            <Button variant="outline" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Research
            </Button>
          </Link>
          
          <SectionHeading 
            title="Academic Publications" 
            subtitle="Peer-reviewed research papers and scientific contributions"
            className="mb-8"
          />
          
          <div className="space-y-12">
            {years.map(year => (
              <div key={year} className="mb-8">
                <h3 className="text-xl font-bold text-brand-green border-b border-brand-green/20 pb-2 mb-4 font-primary">
                  {year} Publications
                </h3>
                
                <div className="space-y-6">
                  {publicationsByYear[year].map((pub, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl shadow-sm p-6 border border-brand-brown/10 hover:shadow-md transition-all"
                    >
                      <h4 className="font-bold text-brand-charcoal mb-2 font-primary">{pub.title}</h4>
                      <p className="text-sm text-brand-charcoal/70 mb-4 font-secondary">{pub.journal} ({pub.year})</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <p className="text-xs text-brand-charcoal/50 font-secondary">Authors: {pub.authors}</p>
                        <a href={pub.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-brand-green border-brand-green/30 hover:bg-brand-green/5">
                            View Publication
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-brand-charcoal/70 mb-8 font-secondary italic">
            For inquiries about research collaborations or access to publications,<br />please contact Dr. Oluropo Apalowo directly.
          </p>
          <Link href="/contact" className="inline-block">
            <Button variant="default" className="bg-brand-green hover:bg-brand-emerald text-white">
              Contact Dr. Apalowo
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
