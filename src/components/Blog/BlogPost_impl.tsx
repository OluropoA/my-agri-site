"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BlogPost } from './BlogList_impl';
import BlogCommentForm from './BlogCommentForm_impl';

interface Comment {
  id: string;
  body: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  } | null;
}

interface BlogPostDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  comments: Comment[];
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, relatedPosts, comments }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  // Parse tags
  const tags = post.tags.split(',').map(tag => tag.trim()).filter(Boolean);

  // Share options
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Post Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Link 
            href={`/blog?category=${post.category}`} 
            className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-sm font-medium hover:bg-brand-green/20 transition-colors font-primary"
          >
            {post.category}
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4 leading-tight font-primary">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-brand-charcoal/70 gap-4 md:gap-6 font-secondary">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
          </div>
          
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author?.name || 'Dr. Apalowo'}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{calculateReadingTime(post.content)} min read</span>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      {post.coverImage && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      
      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12 prose-headings:text-brand-charcoal prose-headings:font-primary prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline font-secondary prose-strong:text-brand-charcoal">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center text-brand-charcoal/80 font-primary">
            <Tag className="h-4 w-4 mr-2" />
            <span>Tags:</span>
          </div>
          {tags.map((tag, index) => (
            <Link 
              key={index} 
              href={`/blog?tag=${tag}`}
              className="bg-brand-ivory/50 text-brand-charcoal/80 px-3 py-1 rounded-full text-sm hover:bg-brand-ivory transition-colors font-secondary"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      
      {/* Share Section */}
      <div className="border-t border-gray-200 pt-6 pb-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-brand-charcoal/80 mr-4 font-primary">Share this article:</span>
            <div className="relative">
              <button 
                onClick={() => setShowShareOptions(!showShareOptions)} 
                className="flex items-center text-brand-charcoal/70 hover:text-brand-green"
              >
                <Share2 className="h-5 w-5" />
              </button>
              
              {showShareOptions && (
                <div className="absolute left-0 mt-2 flex gap-2 bg-white p-2 rounded-md shadow-md z-10">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-brand-blue text-white rounded-full hover:opacity-90"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-brand-gold text-white rounded-full hover:opacity-90"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-brand-green text-white rounded-full hover:opacity-90"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <section className="border-t border-gray-200 pt-10 mb-12">
        <h2 className="text-2xl font-bold text-brand-charcoal mb-6 font-primary">Comments ({comments.length})</h2>
        
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-brand-ivory/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-brand-green text-white rounded-full flex items-center justify-center">
                      <span className="font-medium">{comment.user?.name.charAt(0) || 'U'}</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-brand-charcoal font-primary">{comment.user?.name || 'Anonymous'}</h4>
                      <p className="text-xs text-brand-charcoal/60 font-secondary">{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-brand-charcoal/80 font-secondary">{comment.body}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-brand-charcoal/70 font-secondary">Be the first to comment on this article.</p>
        )}
        
        {/* Comment Form */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-brand-charcoal mb-4 font-primary">Leave a Comment</h3>
          <BlogCommentForm postId={post.id} />
        </div>
      </section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-6 font-primary">Related Articles</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-40 bg-gray-100">
                    {relatedPost.coverImage ? (
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-brand-green/10 to-brand-emerald/20">
                        <span className="text-brand-green font-semibold font-primary">Dr. Apalowo's Blog</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-brand-charcoal group-hover:text-brand-green line-clamp-2 transition-colors font-primary">
                      {relatedPost.title}
                    </h3>
                    <div className="text-sm text-brand-charcoal/60 mt-2 font-secondary">{formatDate(relatedPost.createdAt)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPostDetail;
