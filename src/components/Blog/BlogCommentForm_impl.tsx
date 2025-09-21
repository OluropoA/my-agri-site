"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface BlogCommentFormProps {
  postId: string;
}

function BlogCommentForm({ postId: _postId }: { postId: string }) {
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
      // const response = await fetch('/api/comments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     postId,
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
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      {session ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-brand-charcoal mb-1 font-primary">
              Your Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this article..."
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-green font-secondary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-brand-charcoal/60 font-secondary">
              Commenting as <span className="font-medium font-primary">{session.user?.name}</span>
            </div>
            <Button 
              type="submit" 
              className="bg-brand-green hover:bg-brand-emerald text-white font-primary"
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
                ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}
        </form>
      ) : (
        <div className="text-center py-8">
          <h4 className="text-lg font-medium text-brand-charcoal mb-2 font-primary">Sign in to comment</h4>
          <p className="text-brand-charcoal/70 mb-4 font-secondary">
            You need to be signed in to leave a comment on this article.
          </p>
          <Button 
            asChild
            className="bg-brand-green hover:bg-brand-emerald text-white font-primary"
          >
            <a href="/login">Sign In</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogCommentForm;
