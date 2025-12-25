"use client";

// import Link from 'next/link';
import { Mail, MapPin, Linkedin, Twitter, Leaf, Globe, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@/styles/footer.css'

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Research', href: '#research' },
    { name: 'Publications', href: '#publications' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ]

  const researchAreas = [
    { name: 'Nematology', href: '#' },
    { name: 'Plant Virology', href: '#' },
    { name: 'Crop Protection', href: '#' },
    { name: 'AI in Agriculture', href: '#' },
    { name: 'Sustainable Farming', href: '#' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-brand-green text-white" style={{ backgroundColor: '#2D5016' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-primary">Dr. Oluropo Apalowo</h3>
                <p className="text-white text-sm font-secondary">Agricultural Scientist</p>
              </div>
            </div>

            <p className="text-white leading-relaxed max-w-md font-secondary">
              Advancing agricultural science through innovative research in crop protection,
              sustainable farming practices, and AI-driven solutions for global food security.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-white">
                <Mail className="w-4 h-4 text-brand-gold" />
                <span>contact@ropoapalowo.com</span>
              </div>

              <div className="flex items-center space-x-3 text-sm text-white">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Nnamdi Azikiwe University, Awka</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-primary">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-brand-gold transition-colors duration-200 text-sm font-secondary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-primary">Research Areas</h4>
            <ul className="space-y-3">
              {researchAreas.map((area, index) => (
                <li key={index}>
                  <a
                    href={area.href}
                    className="text-white hover:text-brand-gold transition-colors duration-200 text-sm font-secondary"
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-white/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2 font-primary">Stay Updated</h4>
              <p className="text-white text-sm font-secondary">
                Subscribe to receive updates on latest research, publications, and insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-white placeholder-white/60 font-secondary"
              />
              <Button className="bg-brand-gold hover:bg-brand-gold/90 text-white font-primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-white mb-4 md:mb-0 font-secondary">
            © 2025 Dr. Oluropo Apalowo. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-white hover:text-brand-gold transition-colors duration-200 font-secondary">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white hover:text-brand-gold transition-colors duration-200 font-secondary">
              Terms of Use
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 group"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

