import { useState } from 'react';
import WebGLBackground from '@/components/WebGLBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ClipsSection from '@/components/ClipsSection';
import ModulesSection from '@/components/ModulesSection';
import WhyAlyconeSection from '@/components/WhyAlyconeSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import MouseFollower from '@/components/MouseFollower';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div className={`relative min-h-screen overflow-x-hidden ${isLoading ? 'hidden' : ''}`}>
        {/* Custom cursor */}
        <MouseFollower />
        
        {/* WebGL Animated Background */}
        <WebGLBackground />
        
        {/* Overlays */}
        <div className="vignette" />
        <div className="noise-overlay" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <HeroSection />
          <ClipsSection />
          <ModulesSection />
          <WhyAlyconeSection />
          <PricingSection />
          <TestimonialsSection />
          <FinalCTASection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
