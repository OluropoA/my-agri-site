"use client";

import { useState } from 'react';
import FeedbackForm from './FeedbackForm';

interface FeedbackSectionProps {
  sellerId: string;
  currentRating?: number;
  totalFeedback?: number;
}

export default function FeedbackSection({ sellerId, currentRating, totalFeedback }: FeedbackSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (rating: number, comment: string) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement API call to submit feedback
      console.log('Submitting feedback:', { sellerId, rating, comment });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FeedbackForm
      sellerId={sellerId}
      currentRating={currentRating}
      totalFeedback={totalFeedback}
      onSubmit={handleSubmit}
    />
  );
}