import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Section } from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';

export default function SellerNotFound() {
  return (
    <div className="min-h-screen">
      <Section bgColor="white">
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-full bg-brand-ivory flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-brand-green">404</span>
          </div>
          
          <h1 className="text-3xl font-bold text-brand-charcoal font-primary">Seller Not Found</h1>
          
          <p className="text-brand-charcoal/70 max-w-md font-secondary">
            We couldn't find the seller you're looking for. They may have been removed from our trusted sellers directory.
          </p>
          
          <Link href="/trusted-sellers" className="mt-8">
            <Button className="bg-brand-green hover:bg-brand-emerald text-white font-primary inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trusted Sellers
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
