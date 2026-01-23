import { Metadata } from 'next';
import { PageHero, Section } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Terms of Use - Dr. Oluropo Apalowo',
  description: 'Terms of use for the Dr. Oluropo Apalowo website.',
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-brand-ivory min-h-screen">
      <PageHero
        title="Terms of Use"
        subtitle="Guidelines for using this website and its content."
        align="center"
      />

      <Section bgColor="white">
        <div className="prose max-w-3xl mx-auto text-brand-charcoal/80 font-secondary">
          <p>
            This website is provided for informational purposes. Content may be updated at any
            time without notice. By using this site, you agree to use it responsibly and not to
            misuse or reproduce content without permission.
          </p>
          <p>
            If you have questions about these terms, please contact us using the information
            provided on the Contact page.
          </p>
        </div>
      </Section>
    </div>
  );
}
