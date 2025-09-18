"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/components/Blog/BlogList_impl';

// Mock data for blog posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Sustainable Farming Practices in Nigeria',
    excerpt: 'Exploring eco-friendly farming methods that boost productivity while preserving the environment.',
    content: 'Full content here...',
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
    content: 'Full content here...',
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
    content: 'Full content here...',
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
  },
  {
    id: '4',
    title: 'Managing Root-Knot Nematodes in Vegetable Crops',
    excerpt: 'Effective strategies for controlling one of the most destructive plant parasites affecting Nigerian agriculture.',
    content: 'Full content here...',
    slug: 'managing-root-knot-nematodes',
    category: 'Pest Management',
    tags: 'nematodes, pest control, vegetables, plant health',
    authorId: '1',
    author: {
      name: 'Dr. Oluropo Apalowo',
      email: 'oluropo.apalowo@unizik.edu.ng'
    },
    createdAt: new Date('2025-08-15'),
    updatedAt: new Date('2025-08-17'),
    published: true
  },
  {
    id: '5',
    title: 'Draft: Future of Agricultural Education in Nigeria',
    excerpt: 'Examining trends and opportunities in agricultural education and training.',
    content: 'Draft content here...',
    slug: 'agricultural-education-nigeria',
    category: 'Education',
    tags: 'education, training, universities, students',
    authorId: '1',
    author: {
      name: 'Dr. Oluropo Apalowo',
      email: 'oluropo.apalowo@unizik.edu.ng'
    },
    createdAt: new Date('2025-09-12'),
    updatedAt: new Date('2025-09-12'),
    published: false
  }
];

// Get all categories from posts
const allCategories = Array.from(new Set(mockPosts.map(post => post.category)));

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filterMenuOpen, setFilterMenuOpen] = useState<{
    category: boolean;
    status: boolean;
  }>({
    category: false,
    status: false
  });

  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  // Toggle filter menu
  const toggleFilterMenu = (key: keyof typeof filterMenuOpen) => {
    setFilterMenuOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter posts based on search, category and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && post.published) ||
      (statusFilter === 'draft' && !post.published);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle post deletion (mock)
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Button asChild className="bg-[#2D5016] hover:bg-[#2D5016]/90 text-white">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blog posts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D5016] focus:border-[#2D5016]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilterMenu('category')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span>{categoryFilter === 'all' ? 'All Categories' : categoryFilter}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {filterMenuOpen.category && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCategoryFilter('all');
                        toggleFilterMenu('category');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        categoryFilter === 'all' ? 'bg-[#2D5016] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setCategoryFilter(category);
                          toggleFilterMenu('category');
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          categoryFilter === category ? 'bg-[#2D5016] text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilterMenu('status')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span>
                  {statusFilter === 'all' ? 'All Status' : 
                   statusFilter === 'published' ? 'Published' : 'Draft'}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {filterMenuOpen.status && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        toggleFilterMenu('status');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'all' ? 'bg-[#2D5016] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Status
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('published');
                        toggleFilterMenu('status');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'published' ? 'bg-[#2D5016] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Published
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('draft');
                        toggleFilterMenu('status');
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'draft' ? 'bg-[#2D5016] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Draft
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-gray-400 hover:text-gray-500"
                          title="View"
                          target="_blank"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link 
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No blog posts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPosts.length}</span> of <span className="font-medium">{filteredPosts.length}</span> results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={true}
              className="border-gray-300 text-gray-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 bg-white"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={true}
              className="border-gray-300 text-gray-400"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
