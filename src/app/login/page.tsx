import { Metadata } from 'next';
import LoginForm from '@/components/Auth/LoginForm';
import { PageHero, Section } from '@/components/Layout/Layout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login - Dr. Oluropo Apalowo',
  description: 'Sign in to access your account on Dr. Oluropo Apalowo\'s agricultural science platform.',
  keywords: ['login', 'sign in', 'account access', 'agricultural portal']
};

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Sign In" 
        subtitle="Access your account to manage your agricultural data"
        backgroundImage="/images/auth-header.jpg"
        align="center"
        minHeight="small"
      />
      
      <Section bgColor="white" className="-mt-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100">
            <LoginForm />
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-brand-charcoal/70 font-secondary">
                Don't have an account?{' '}
                <Link href="/register" className="text-brand-green hover:text-brand-emerald font-semibold font-primary">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
