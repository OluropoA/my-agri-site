import { Metadata } from 'next';
import RegisterForm from '@/components/Auth/RegisterForm';
import Link from 'next/link';
import { PageHero, Section } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Register - Dr. Oluropo Apalowo',
  description: 'Create an account on Dr. Oluropo Apalowo\'s agricultural science platform.',
  keywords: ['register', 'sign up', 'create account', 'agricultural platform']
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Create an Account" 
        subtitle="Join our agricultural community to access exclusive content"
        backgroundImage="/images/auth-header.jpg"
        align="center"
        minHeight="small"
      />
      
      <Section bgColor="white" className="-mt-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100">
            <RegisterForm />
          
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-brand-charcoal/70 font-secondary">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-green hover:text-brand-emerald font-semibold font-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-brand-charcoal/60 font-secondary">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-brand-green hover:text-brand-emerald">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-brand-green hover:text-brand-emerald">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
