import { Metadata } from 'next';
import ContactForm from '@/components/Contact/ContactForm';
import ContactInfo from '@/components/Contact/ContactInfo';
import ContactMap from '@/components/Contact/ContactMap';
import { PageHero, Section } from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Contact - Dr. Oluropo Apalowo',
  description: 'Get in touch with Dr. Oluropo Apalowo for agricultural research inquiries, collaborations, and consultations.',
  keywords: ['contact', 'research inquiries', 'collaboration', 'agricultural science']
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Contact Dr. Apalowo" 
        subtitle="Have a question or interested in collaborating? Get in touch with me directly through any of the channels below."
        align="center"
        backgroundImage="/images/contact-header.jpg"
      />
      
      <Section bgColor="white">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-brand-ivory/50 shadow-lg rounded-xl p-8 border border-brand-brown/10">
              <ContactForm />
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-4">
            <ContactInfo />
          </div>
        </div>
        
      </Section>
      
      {/* Map Section */}
      <Section bgColor="light">
        <h2 className="text-2xl font-bold mb-6 font-primary text-brand-charcoal">Find Me</h2>
        <div className="h-96 rounded-xl overflow-hidden shadow-lg border border-brand-brown/20">
          <ContactMap />
        </div>
      </Section>
    </div>
  );
}