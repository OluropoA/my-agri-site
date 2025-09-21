"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Share2, ThumbsUp, MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface MarketCommentaryProps {
  id: string;
  text: string;
  weekStart: Date;
  author: {
    id: string;
    name: string;
    email: string;
  } | null;
  createdAt: Date;
  comments: {
    id: string;
    body: string;
    userId: string | null;
    user: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
  }[];
}

const MarketCommentary: React.FC<MarketCommentaryProps> = ({
  id: _id,
  text,
  weekStart,
  author,
  createdAt,
  comments
}) => {
  const { data: _session } = useSession();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(15); // Mock initial like count
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  // Format time elapsed
  const getTimeElapsed = (date: Date): string => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    return formatDate(date);
  };
  
  // Handle like toggle
  const handleLikeToggle = () => {
    if (liked) {
      setLikeCount(count => count - 1);
    } else {
      setLikeCount(count => count + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Commentary header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-[#2D5016] text-white rounded-full flex items-center justify-center">
              <span className="font-medium">{author?.name?.charAt(0) || 'A'}</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">{author?.name || 'Admin'}</h4>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Week of {formatDate(weekStart)}</span>
                <span className="mx-2">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{getTimeElapsed(createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <Share2 className="h-4 w-4" />
            </button>
            
            {showShareOptions && (
              <div className="absolute right-0 mt-2 z-10 bg-white border rounded-md shadow-md p-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowShareOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                >
                  Copy link
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Commentary content */}
        <div className="prose prose-sm max-w-none">
          {text.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      {/* Commentary footer */}
      <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLikeToggle}
            className={`flex items-center text-sm ${liked ? 'text-[#2D5016] font-medium' : 'text-gray-600'}`}
          >
            <ThumbsUp className={`h-4 w-4 mr-1 ${liked ? 'fill-[#2D5016] stroke-[#2D5016]' : ''}`} />
            <span>{likeCount}</span>
          </button>
          
          <Link 
            href="#comments" 
            className="flex items-center text-sm text-gray-600"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{comments.length}</span>
          </Link>
        </div>
      </div>
      
      {/* Comments section */}
      <div id="comments" className="border-t border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments ({comments.length})</h3>
          
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="h-8 w-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-sm">{comment.user?.name?.charAt(0) || 'U'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{comment.user?.name || 'Anonymous'}</span>
                        <span className="text-xs text-gray-500">{getTimeElapsed(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.body}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4">
                      <button className="hover:text-[#2D5016]">Like</button>
                      <button className="hover:text-[#2D5016]">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Be the first to comment on this market analysis.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketCommentary;
