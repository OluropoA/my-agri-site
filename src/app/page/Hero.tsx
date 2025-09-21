import { ArrowRight, Download, Mail, MapPin, Microscope, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-brand-ivory via-white/80 to-brand-ivory/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium font-primary">
                <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
                Available for Research Collaboration
              </div>
              
              <h1 className="font-primary text-4xl lg:text-6xl font-bold text-brand-charcoal leading-tight">
                Advancing
                <span className="text-brand-green block">African Agriculture</span>
                Through Scientific Excellence
              </h1>
              
              <p className="font-secondary text-xl text-brand-charcoal/70 leading-relaxed max-w-2xl">
                &ldquo;Bridging traditional agricultural wisdom with cutting-edge scientific innovation to create 
                sustainable solutions for Africa&apos;s food security challenges.&rdquo;
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm text-brand-charcoal/70 font-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-green" />
                <span>Nnamdi Azikiwe University, Awka</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-green" />
                <span>Academic Staff, Crop Science</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-emerald text-white group font-primary"
              >
                Explore My Research
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="brown" 
                size="lg"
                className="font-primary"
                asChild
              >
                <a href="/Oluropo_Apalowo_CV.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-green/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-gold font-primary">15+</div>
                <div className="text-sm text-brand-charcoal/70 font-secondary">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-gold font-primary">5+</div>
                <div className="text-sm text-brand-charcoal/70 font-secondary">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-gold font-primary">10+</div>
                <div className="text-sm text-brand-charcoal/70 font-secondary">Conferences</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-brand-ivory to-white rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-brown/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Professional Portrait - Dr. Apalowo's photo */}
                  <div className="w-full h-full relative overflow-hidden">
                    <Image 
                      src="/images/dr-apalowo-hero.jpg" 
                      alt="Dr. Oluropo Apalowo" 
                      fill 
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent flex items-end">
                      <div className="p-6 text-white w-full">
                        <h3 className="font-primary text-xl font-medium">Dr. Oluropo Apalowo</h3>
                        <p className="font-secondary text-sm opacity-90">Agricultural Scientist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements based on Brand Identity */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-gold/40 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-brown/30 rounded-full animate-pulse-slow"></div>
            
            {/* Brand Icon Elements */}
            <div className="absolute top-12 right-12 bg-white p-2 rounded-full shadow-lg">
              <Microscope className="w-6 h-6 text-brand-sage" />
            </div>
            <div className="absolute bottom-12 left-12 bg-white p-2 rounded-full shadow-lg">
              <Leaf className="w-6 h-6 text-brand-emerald" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
