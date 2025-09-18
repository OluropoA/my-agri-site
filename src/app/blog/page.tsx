import { Metadata } from 'next';
import BlogList_impl from '@/components/Blog/BlogList_impl';
import { BlogPost } from '@/components/Blog/BlogList_impl';
import { PageHero } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Blog - Dr. Oluropo Apalowo',
  description: 'Agricultural research blog posts and articles by Dr. Oluropo Apalowo, covering sustainable farming practices, climate change impacts, and agricultural innovations.',
  keywords: ['agricultural research', 'blog', 'crop protection', 'sustainable farming', 'climate change', 'agricultural technology']
};

// Mock data for blog posts
async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      id: '1',
      title: 'Sustainable Farming Practices in Nigeria',
      excerpt: 'Exploring eco-friendly farming methods that boost productivity while preserving the environment.',
      content: '<p>Sustainable farming practices are becoming increasingly important in Nigeria as we face the challenges of climate change and environmental degradation. This article explores various methods that can help farmers improve their yields while protecting the land for future generations.</p><p>From crop rotation to integrated pest management, there are numerous techniques that can be implemented with minimal investment but significant returns.</p>',
      slug: 'sustainable-farming-practices',
      category: 'Sustainability',
      tags: 'farming, sustainability, eco-friendly, nigeria',
      authorId: '1',
      author: {
        name: 'Dr. Oluropo Apalowo',
        email: 'oluropo.apalowo@unizik.edu.ng'
      },
      createdAt: new Date('2025-09-10'),
      updatedAt: new Date('2025-09-10'),
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae'
    },
    {
      id: '2',
      title: 'Impact of Climate Change on Crop Yields',
      excerpt: 'How shifting weather patterns are affecting agricultural output and strategies for adaptation.',
      content: '<p>Climate change is having profound effects on agriculture in West Africa. Unpredictable rainfall patterns, rising temperatures, and extreme weather events are creating new challenges for farmers.</p>',
      slug: 'climate-change-crop-yields',
      category: 'Climate Change',
      tags: 'climate change, adaptation, crop yields, weather patterns',
      authorId: '1',
      author: {
        name: 'Dr. Oluropo Apalowo',
        email: 'oluropo.apalowo@unizik.edu.ng'
      },
      createdAt: new Date('2025-09-05'),
      updatedAt: new Date('2025-09-06'),
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1601591229693-43afbbf2b8df'
    },
    {
      id: '3',
      title: 'Advancements in Agricultural Technology',
      excerpt: 'New innovations in agri-tech that are revolutionizing farming practices across Africa.',
      content: '<p>The agricultural technology landscape is rapidly evolving, offering new solutions to age-old farming challenges. This article explores recent innovations making an impact.</p>',
      slug: 'agricultural-technology-advancements',
      category: 'Technology',
      tags: 'technology, innovation, digital agriculture, AI',
      authorId: '1',
      author: {
        name: 'Dr. Oluropo Apalowo',
        email: 'oluropo.apalowo@unizik.edu.ng'
      },
      createdAt: new Date('2025-08-28'),
      updatedAt: new Date('2025-08-28'),
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce'
    }
  ];
}

// Get blog categories
async function getBlogCategories(): Promise<string[]> {
  return ['All', 'Sustainability', 'Climate Change', 'Technology', 'Research', 'Education'];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = await getBlogCategories();
  
  return (
    <div className="bg-brand-ivory min-h-screen">
      <PageHero 
        title="Agricultural Research Blog" 
        subtitle="Insights, discoveries, and expert analysis from Dr. Oluropo Apalowo's agricultural research."
        backgroundImage="/images/blog-header.jpg"
        align="center"
        size="default"
      />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList_impl initialPosts={posts} categories={categories} />
        </div>
      </div>
    </div>
  );
}