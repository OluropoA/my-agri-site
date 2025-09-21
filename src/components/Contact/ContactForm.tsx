"use client";

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Twitter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as string | null }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null }
    });

    try {
      // This would actually send to an API endpoint
      // For now, just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: "Message sent successfully!" }
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Something went wrong. Please try again later." }
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div className="bg-brand-green rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 font-primary">Contact Information</h3>
        
        <p className="text-brand-ivory/90 mb-8 font-secondary">
          Feel free to reach out with research inquiries, collaboration opportunities,
          or questions about my work in agricultural science.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-white/10 rounded-full">
              <Mail className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <p className="font-medium font-primary">Email</p>
              <p className="text-brand-ivory/90 font-secondary">oluropo.apalowo@unizik.edu.ng</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-white/10 rounded-full">
              <Phone className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <p className="font-medium font-primary">Phone</p>
              <p className="text-brand-ivory/90 font-secondary">+234 806 214 xxxx</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-white/10 rounded-full">
              <MapPin className="h-6 w-6 text-brand-gold" />
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
      
      {/* Contact Form */}
      <div>
        <h3 className="text-2xl font-bold text-brand-charcoal mb-6 font-primary">Send a Message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-1 font-primary">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-brand-gold focus:border-brand-green font-secondary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-1 font-primary">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-brand-gold focus:border-brand-green font-secondary"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-brand-charcoal mb-1 font-primary">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-brand-gold focus:border-brand-green font-secondary"
            >
              <option value="">Select a subject</option>
              <option value="Research Inquiry">Research Inquiry</option>
              <option value="Collaboration Opportunity">Collaboration Opportunity</option>
              <option value="Speaking Engagement">Speaking Engagement</option>
              <option value="Student Inquiry">Student Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal mb-1 font-primary">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-brand-gold focus:border-brand-green font-secondary"
            ></textarea>
          </div>
          
          <Button
            type="submit"
            className="bg-brand-green hover:bg-brand-emerald text-white font-primary"
            disabled={status.submitting}
          >
            {status.submitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          {status.info.msg && (
            <div className={`mt-4 text-sm ${status.info.error ? 'text-red-500' : 'text-green-500'}`}>
              {status.info.msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
