import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostDetail from '@/components/Blog/BlogPost_impl';
import { BlogPost } from '@/components/Blog/BlogList_impl';
import { Section } from '@/components/Layout/Layout';

// Mock data function to simulate fetching posts from database
async function getPosts(): Promise<BlogPost[]> {
  // This would be a real database query in a full implementation
  return [
    {
      id: '1',
      title: 'Sustainable Farming Practices in Nigeria',
      excerpt: 'Exploring eco-friendly farming methods that boost productivity while preserving the environment.',
      content: '<p>Sustainable farming practices are becoming increasingly important in Nigeria as we face the challenges of climate change and environmental degradation. This article explores various methods that can help farmers improve their yields while protecting the land for future generations.</p><p>From crop rotation to integrated pest management, there are numerous techniques that can be implemented with minimal investment but significant returns. These approaches not only benefit the environment but also improve the economic viability of small farms.</p><h2>Crop Rotation and Diversification</h2><p>One of the simplest yet most effective sustainable farming practices is crop rotation. By alternating the types of crops grown in a specific area, farmers can naturally break pest cycles, improve soil health, and reduce the need for synthetic fertilizers. Research conducted at Nigerian agricultural institutes has shown that proper crop rotation can increase yields by up to 15% while reducing pest pressure by as much as 30%.</p><p>Diversification goes hand in hand with rotation. Growing multiple crops provides insurance against crop failure, stabilizes income throughout the year, and creates a more balanced ecosystem on the farm. Traditional Nigerian farming systems often incorporated this principle naturally, with intercropping of compatible species like cassava and maize, or cowpeas and sorghum.</p><h2>Soil Conservation Techniques</h2><p>Soil erosion remains one of the biggest threats to agricultural sustainability in Nigeria. Simple conservation techniques such as contour plowing, where farmers follow the natural contours of the land when plowing, can reduce erosion by up to 50% on sloped land. Similarly, maintaining vegetative cover through cover cropping or mulching protects the soil from heavy rainfall impact.</p>',
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
      content: '<p>Climate change is having profound effects on agriculture in West Africa. Unpredictable rainfall patterns, rising temperatures, and extreme weather events are creating new challenges for farmers who rely on consistent conditions for their livelihoods.</p><p>This article examines the latest research on climate impacts specific to Nigerian agriculture and presents adaptation strategies that are showing promise in field trials. By understanding these challenges and implementing appropriate responses, farmers can build resilience into their operations.</p><h2>Observed Climate Changes in Nigeria</h2><p>Over the past three decades, Nigeria has experienced significant shifts in climate patterns that directly impact agriculture. Meteorological data shows an increase in average temperatures of approximately 1.1°C since 1980, with more dramatic increases in the northern regions. Rainfall patterns have become increasingly erratic, with a tendency toward more intense precipitation events separated by longer dry periods.</p>',
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

// Function to get a post by slug
async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Function to get related posts
async function getRelatedPosts(currentPost: BlogPost): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.split(',').some(tag => currentPost.tags.includes(tag.trim())))
    )
    .slice(0, 3);
}

// Mock comments data
async function getCommentsByPostId(postId: string) {
  return [
    {
      id: '101',
      body: "This is a great article! I've been implementing crop rotation on my farm and have seen significant improvements in soil health.",
      createdAt: new Date('2025-09-12'),
      user: {
        id: '201',
        name: 'Ibrahim Okafor'
      }
    },
    {
      id: '102',
      body: 'I would love to see more specific recommendations for small-scale farmers in southeastern Nigeria. Do you have any resources specifically for that region?',
      createdAt: new Date('2025-09-13'),
      user: {
        id: '202',
        name: 'Chioma Nweke'
      }
    }
  ];
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - Dr. Oluropo Apalowo'
    };
  }
  
  return {
    title: `${post.title} - Dr. Oluropo Apalowo's Blog`,
    description: post.excerpt,
    keywords: post.tags.split(',').map(tag => tag.trim()),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author?.name || 'Dr. Oluropo Apalowo'],
      tags: post.tags.split(',').map(tag => tag.trim())
    }
  };
}

// Main page component
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  // Return 404 if post not found
  if (!post) {
    notFound();
  }
  
  // Get related posts and comments
  const relatedPosts = await getRelatedPosts(post);
  const comments = await getCommentsByPostId(post.id);
  
  return (
    <div className="min-h-screen">
      <Section bgColor="white" className="py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <BlogPostDetail post={post} relatedPosts={relatedPosts} comments={comments} />
        </div>
      </Section>
    </div>
  );
}
