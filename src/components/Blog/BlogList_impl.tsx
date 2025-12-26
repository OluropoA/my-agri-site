"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Search, Filter, ChevronDown } from 'lucide-react';

// Type definitions
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  tags: string;
  authorId: string | null;
  author?: {
    name: string;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  coverImage?: string;
}

interface BlogListProps {
  initialPosts: BlogPost[];
  categories: string[];
}

const POSTS_PER_PAGE = 6;

const BlogList: React.FC<BlogListProps> = ({ initialPosts, categories }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'newest' | 'oldest'>('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts based on search query and category
  useEffect(() => {
    let filteredPosts = [...initialPosts];
    
    // Filter by search query
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filteredPosts = filteredPosts.filter(post => 
        post.category === selectedCategory
      );
    }
    
    // Sort posts
    filteredPosts.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
    
    setPosts(filteredPosts);
    setCurrentPage(1);
  }, [initialPosts, searchQuery, selectedCategory, sortOption]);

  useEffect(() => {
    const lastPage = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [posts, currentPage]);

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-brand-green" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-green font-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center px-4 py-2 border border-gray-200 rounded-md bg-white text-brand-charcoal hover:bg-brand-ivory font-primary transition-colors"
              >
                <Filter className="h-4 w-4 mr-2 text-brand-green" />
                Category
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {filterOpen && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left font-primary ${selectedCategory === 'all' ? 'bg-brand-green text-white' : 'text-brand-charcoal hover:bg-brand-ivory'}`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left font-primary ${selectedCategory === category ? 'bg-brand-green text-white' : 'text-brand-charcoal hover:bg-brand-ivory'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sort Options */}
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'newest' | 'oldest')}
              className="px-4 py-2 border border-gray-200 rounded-md bg-white text-brand-charcoal hover:bg-brand-ivory font-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-green"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results Information */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-brand-charcoal font-primary">
          {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} {selectedCategory !== 'all' ? `in ${selectedCategory}` : ''}
        </h3>
        {searchQuery && (
          <p className="text-sm text-brand-charcoal/70 font-secondary">
            Search results for: <span className="font-medium text-brand-green">&quot;{searchQuery}&quot;</span>
          </p>
        )}
      </div>
      
      {/* Blog Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              {/* Post Image */}
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 w-full bg-brand-ivory">
                  {post.coverImage ? (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-brand-green/10 to-brand-emerald/20">
                      <span className="text-brand-green font-semibold font-primary">Dr. Apalowo&apos;s Blog</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="inline-block bg-brand-green text-white text-xs font-semibold px-2 py-1 rounded-md font-primary">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
              
              {/* Post Content */}
              <div className="p-5 space-y-3">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-bold font-primary text-brand-charcoal hover:text-brand-green transition-colors duration-200">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-brand-charcoal/70 line-clamp-3 font-secondary">
                  {post.excerpt}
                </p>
                
                {/* Post Meta */}
                <div className="pt-4 flex items-center justify-between text-sm text-brand-charcoal/60 border-t border-gray-100 font-secondary">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-brand-gold" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-brand-gold" />
                    <span>{post.author?.name || 'Dr. Apalowo'}</span>
                  </div>
                </div>
                
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center mt-3 text-sm font-medium text-brand-green hover:text-brand-emerald group font-primary">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-brand-ivory rounded-lg border border-brand-green/10">
          <h3 className="text-xl font-semibold text-brand-charcoal mb-2 font-primary">No articles found</h3>
          <p className="text-brand-charcoal/70 font-secondary">
            {searchQuery 
              ? `No articles matching "${searchQuery}"` 
              : selectedCategory !== 'all'
                ? `No articles in the "${selectedCategory}" category`
                : 'No articles have been published yet'}
          </p>
        </div>
      )}
      
      {posts.length > POSTS_PER_PAGE && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => canGoPrevious && setCurrentPage((page) => page - 1)}
              disabled={!canGoPrevious}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-md text-brand-charcoal hover:bg-brand-ivory font-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex flex-wrap gap-2">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm font-medium border rounded-md font-primary transition-colors ${
                    page === currentPage
                      ? 'bg-brand-green border-brand-green text-white'
                      : 'bg-white border-gray-200 text-brand-charcoal hover:bg-brand-ivory'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => canGoNext && setCurrentPage((page) => page + 1)}
              disabled={!canGoNext}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-md text-brand-charcoal hover:bg-brand-ivory font-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BlogList;
