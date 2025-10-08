"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';

interface FeedbackFormProps {
  currentRating?: number;
  totalFeedback?: number;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export default function FeedbackForm({ sellerId, currentRating, totalFeedback, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(rating, comment);
      setSuccess(true);
      setComment('');
      setRating(0);
    } catch (_) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-brand-brown/15 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-brand-charcoal font-primary">Customer Feedback</h2>
        {currentRating && totalFeedback && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-brand-gold" />
              <span className="ml-1 font-medium">{currentRating.toFixed(1)}</span>
            </div>
            <span className="text-brand-charcoal/60">({totalFeedback})</span>
          </div>
        )}
      </div>

      {success ? (
        <div className="text-brand-green bg-brand-green/10 p-4 rounded-md mb-6">
          Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2 font-primary">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-1 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded transition-colors`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= (hoverRating || rating)
                        ? 'text-brand-gold fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Field */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider mb-2 font-primary">
              Your Comment (Optional)
            </label>
            <textarea
              id="comment"
              rows={4}
              className="block w-full rounded-md border-gray-200 focus:border-brand-green focus:ring-brand-green resize-none font-secondary"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-brand-green hover:bg-brand-emerald text-white py-2 px-4 rounded-md transition-colors duration-200 font-primary disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitting ? 'opacity-75 cursor-wait' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}