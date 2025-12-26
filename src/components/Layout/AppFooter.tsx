"use client";

import { Leaf, Mail, MapPin, Linkedin, Twitter, Globe, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AppFooter = () => {
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
    <footer style={{ backgroundColor: '#2D5016', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D5016' }}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-primary">Dr. Oluropo Apalowo</h3>
                <p className="text-sm font-secondary" style={{ color: '#FFFFFF' }}>Agricultural Scientist</p>
              </div>
            </div>
            
            <p className="leading-relaxed max-w-md font-secondary" style={{ color: '#FFFFFF' }}>
              Advancing agricultural science through innovative research in crop protection, 
              sustainable farming practices, and AI-driven solutions for global food security.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm" style={{ color: '#FFFFFF' }}>
                <Mail className="w-4 h-4" style={{ color: '#DAA520' }} />
                <span>contact@ropoapalowo.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" style={{ color: '#FFFFFF' }}>
                <MapPin className="w-4 h-4" style={{ color: '#DAA520' }} />
                <span>Nnamdi Azikiwe University, Awka</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg hover:opacity-80 transition-opacity duration-200" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Linkedin className="w-5 h-5" style={{ color: '#FFFFFF' }} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:opacity-80 transition-opacity duration-200" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Twitter className="w-5 h-5" style={{ color: '#FFFFFF' }} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:opacity-80 transition-opacity duration-200" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Globe className="w-5 h-5" style={{ color: '#FFFFFF' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: '#FFFFFF' }}>Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="hover:opacity-80 transition-opacity duration-200 text-sm font-secondary"
                    style={{ color: '#FFFFFF' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: '#FFFFFF' }}>Research Areas</h4>
            <ul className="space-y-3">
              {researchAreas.map((area, index) => (
                <li key={index}>
                  <a 
                    href={area.href}
                    className="hover:opacity-80 transition-opacity duration-200 text-sm font-secondary"
                    style={{ color: '#FFFFFF' }}
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-white/20" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2 font-primary" style={{ color: '#FFFFFF' }}>Stay Updated</h4>
              <p className="text-sm font-secondary" style={{ color: '#FFFFFF' }}>
                Subscribe to receive updates on latest research, publications, and insights.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 font-secondary"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderColor: 'rgba(255, 255, 255, 0.3)', 
                  color: '#FFFFFF',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              />
              <Button className="text-white font-primary" style={{ backgroundColor: '#DAA520' }}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <div className="text-sm mb-4 md:mb-0 font-secondary" style={{ color: '#FFFFFF' }}>
            © 2025 Dr. Oluropo Apalowo. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm hover:opacity-80 transition-opacity duration-200 font-secondary" style={{ color: '#FFFFFF' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:opacity-80 transition-opacity duration-200 font-secondary" style={{ color: '#FFFFFF' }}>
              Terms of Use
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg hover:opacity-80 transition-opacity duration-200 group"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" style={{ color: '#FFFFFF' }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
