import { Metadata } from 'next';
import LoginForm from '@/components/Auth/LoginForm';
import { PageHero, Section } from '@/components/Layout/Layout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Access - Dr. Oluropo Apalowo',
  description: 'Administrative access portal for authorized personnel only.',
  keywords: ['admin', 'login', 'administrative access'],
  robots: 'noindex, nofollow' // Prevent search engines from indexing this page
};

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Administrative Access" 
        subtitle="Authorized personnel only - Please enter your credentials"
        backgroundImage="/images/auth-header.jpg"
        align="center"
        minHeight="small"
      />
      
      <Section bgColor="white" className="-mt-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100">
            <LoginForm />
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-brand-charcoal/50 font-secondary">
                This is a restricted area for authorized administrators only.
                <br />
                <Link href="/" className="text-brand-green hover:text-brand-emerald font-medium">
                  Return to main site
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
