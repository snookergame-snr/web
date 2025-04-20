import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import FeaturesSection from '@/components/features-section';
import RoadmapSection from '@/components/roadmap-section';
import TokenDetails from '@/components/token-details';
import WhitepaperSection from '@/components/whitepaper-section';
import FAQSection from '@/components/faq-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);

  return (
    <div className="min-h-screen bg-[#14191F] text-white font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TokenDetails />
        <WhitepaperSection />
        <RoadmapSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
