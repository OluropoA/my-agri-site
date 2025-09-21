"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

function MarketCommentForm({ marketId: _marketId }: { marketId: string }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a comment.'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: null });
    
    try {
      // In a real implementation, this would be a fetch call to an API endpoint
      // For now, we'll just simulate a successful submission
      
      // Mock API call
      // const response = await fetch('/api/comments/market', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     marketId,
      //     body: comment,
      //   }),
      // });
      
      // if (!response.ok) throw new Error('Failed to submit comment');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form state
      setComment('');
      setSubmitStatus({
        type: 'success',
        message: 'Your comment has been submitted successfully.'
      });
      
      // In a real app, you would update the comments list with the newly added comment
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting your comment. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Comment</h3>
      
      {session ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your insights on this week's market analysis..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D5016] focus:border-[#2D5016]"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Commenting as <span className="font-medium">{session.user?.name}</span>
            </div>
            <Button 
              type="submit" 
              className="bg-[#2D5016] hover:bg-[#2D5016]/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  Post Comment
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          
          {submitStatus.message && (
            <div className={`mt-3 p-3 rounded-md ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}
        </form>
      ) : (
        <div className="text-center py-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Sign in to comment</h4>
          <p className="text-gray-600 mb-4">
            You need to be signed in to leave a comment on this market analysis.
          </p>
          <Button 
            asChild
            className="bg-[#2D5016] hover:bg-[#2D5016]/90 text-white"
          >
            <a href="/login">Sign In</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MarketCommentForm;
