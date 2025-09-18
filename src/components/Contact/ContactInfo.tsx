"use client";

import { Mail, Phone, MapPin, Linkedin, Twitter, Globe } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-gradient-to-br from-brand-emerald to-brand-green rounded-xl p-8 text-white shadow-md border border-brand-emerald/20">
      <h3 className="text-xl font-bold mb-6 font-primary">Contact Information</h3>
      
      <p className="text-brand-ivory/90 mb-8 font-secondary">
        Feel free to reach out with research inquiries, collaboration opportunities,
        or questions about my work in agricultural science.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-white/15 rounded-full shadow-inner">
            <Mail className="h-6 w-6 text-brand-gold drop-shadow-sm" />
          </div>
          <div>
            <p className="font-medium font-primary">Email</p>
            <p className="text-brand-ivory/90 font-secondary">oluropo.apalowo@unizik.edu.ng</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-white/15 rounded-full shadow-inner">
            <Phone className="h-6 w-6 text-brand-gold drop-shadow-sm" />
          </div>
          <div>
            <p className="font-medium font-primary">Phone</p>
            <p className="text-brand-ivory/90 font-secondary">+234 806 214 xxxx</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-white/15 rounded-full shadow-inner">
            <MapPin className="h-6 w-6 text-brand-gold drop-shadow-sm" />
          </div>
          <div>
            <p className="font-medium font-primary">Office</p>
            <p className="text-brand-ivory/90 font-secondary">Department of Crop Science and Horticulture,<br />Nnamdi Azikiwe University, Awka</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <p className="font-medium mb-4 font-primary">Connect on Social Media</p>
        <div className="flex space-x-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-brand-gold/80 transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-brand-gold/80 transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-brand-gold/80 transition-colors">
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
