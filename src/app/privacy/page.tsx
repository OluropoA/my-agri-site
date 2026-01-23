import { Metadata } from 'next';
import { PageHero, Section } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Privacy Policy - Dr. Oluropo Apalowo',
  description: 'Privacy policy for the Dr. Oluropo Apalowo website.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-ivory min-h-screen">
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        align="center"
      />

      <Section bgColor="white">
        <div className="prose max-w-3xl mx-auto text-brand-charcoal/80 font-secondary">
          <p>
            This website collects only the information you voluntarily provide, such as when
            contacting us or subscribing to updates. We do not sell or share your information
            with third parties.
          </p>
          <p>
            Any information provided is used solely to respond to inquiries or to deliver the
            updates you requested. You may request deletion of your information at any time by
            contacting us.
          </p>
        </div>
      </Section>
    </div>
  );
}
