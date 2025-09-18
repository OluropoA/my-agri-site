import Image from "next/image";
import Link from "next/link";
import HomeHero, { HomeStats, ResearchAreas } from "@/components/Home/HomeHero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/Layout/Layout";

async function getLatestPosts() {
  // This would normally fetch from the database
  // For now, we'll return mock data
  return [
    {
      id: '1',
      title: 'Sustainable Farming Practices in Nigeria',
      slug: 'sustainable-farming-practices',
      excerpt: 'Exploring eco-friendly farming methods that boost productivity while preserving the environment.',
      category: 'Sustainability',
      date: '2025-09-10'
    },
    {
      id: '2',
      title: 'Impact of Climate Change on Crop Yields',
      slug: 'climate-change-crop-yields',
      excerpt: 'How shifting weather patterns are affecting agricultural output and strategies for adaptation.',
      category: 'Climate Change',
      date: '2025-09-05'
    },
    {
      id: '3',
      title: 'Advancements in Agricultural Technology',
      slug: 'agricultural-technology-advancements',
      excerpt: 'New innovations in agri-tech that are revolutionizing farming practices across Africa.',
      category: 'Technology',
      date: '2025-08-28'
    }
  ];
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div>
      {/* Hero section */}
      <HomeHero />
      
      {/* Stats section */}
      <HomeStats />
      
      {/* Welcome Message */}
      <div className="py-12 border-y border-brand-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-green mb-6 font-primary">Welcome!</h2>
            <p className="text-xl text-brand-charcoal/80 font-secondary leading-relaxed">
              Whether you're a farmer, a student, a researcher, a buyer, a seller, or simply curious about agriculture and food security, there's something here for you.
            </p>
          </div>
        </div>
      </div>

      {/* Research Areas */}
      <ResearchAreas />
      
      {/* Introduction section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <SectionHeading 
                title="Agricultural Research & Innovation" 
                subtitle="Bridging scientific discovery with practical applications for African agriculture"
              />
              <p className="mt-6 text-lg text-brand-charcoal/80 font-secondary">
                As an agricultural scientist specializing in plant pathology and crop protection, I am dedicated to developing sustainable solutions that enhance food security while preserving our environment. Through rigorous research and practical applications, my work aims to bridge the gap between scientific discovery and real-world farming challenges.
              </p>
              <div className="mt-8">
                <Button asChild variant="link" className="group pl-0">
                  <Link href="/about">
                    Learn more about my background
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="relative h-64 w-full rounded-lg shadow-xl overflow-hidden lg:h-96 ring-1 ring-brand-green/20">
                <Image
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="Agricultural research"
                  width={600}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest blog posts */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Latest Blog Posts" 
            subtitle="Stay updated with the latest research, insights and agricultural trends" 
            align="center"
            className="mb-12"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <div key={post.id} className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-brand-green/10 text-brand-green font-primary">
                        {post.category}
                      </span>
                    </div>
                    <div className="text-sm text-brand-charcoal/60 font-secondary">
                      {post.date}
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h3 className="text-xl font-bold font-primary text-brand-charcoal mb-3 group-hover:text-brand-green transition-colors">{post.title}</h3>
                    <p className="text-brand-charcoal/70 font-secondary">{post.excerpt}</p>
                  </Link>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-brand-green font-medium font-primary hover:text-brand-emerald group">
                      Read full article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">
                View all blog posts
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Market watch preview */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-brand-green to-brand-emerald p-8 md:p-12 lg:p-16 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/patterns/market-pattern.svg')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-primary mb-4">Market Watch</h2>
              <p className="text-xl text-white/80 font-secondary max-w-2xl mx-auto mb-8">Weekly agricultural market updates and price trends to help you make informed decisions</p>
              <Button asChild variant="secondary" size="lg" className="bg-white text-brand-green border-white hover:bg-white/90">
                <Link href="/market-watch">
                  View Market Data
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
