import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from 'react-i18next';
import LanguageToggle from './language-toggle';
import { Menu, Wallet } from 'lucide-react';
import { images } from '@/assets/images';

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/90 backdrop-blur-md' : 'bg-transparent'} border-b border-neutral-dark/50`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <img src={images.logoIcon} alt="SnookerGame Logo" className="w-10 h-10" />
          <span className="font-['Kanit'] font-bold text-xl text-white">SnookerGame</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('about')} 
            className="nav-item text-gray-300 hover:text-white font-medium transition relative"
          >
            {t('nav.about')}
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="nav-item text-gray-300 hover:text-white font-medium transition relative"
          >
            {t('nav.features')}
          </button>
          <button 
            onClick={() => scrollToSection('roadmap')} 
            className="nav-item text-gray-300 hover:text-white font-medium transition relative"
          >
            {t('nav.roadmap')}
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="nav-item text-gray-300 hover:text-white font-medium transition relative"
          >
            {t('nav.faq')}
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          
          <Button 
            className="hidden md:flex bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-semibold transition transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Wallet className="mr-2 h-4 w-4" /> {t('nav.connectWallet')}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#1E2530] border-neutral-medium/50">
              <div className="flex flex-col space-y-6 mt-10">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-300 hover:text-white font-medium transition text-left"
                >
                  {t('nav.about')}
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-gray-300 hover:text-white font-medium transition text-left"
                >
                  {t('nav.features')}
                </button>
                <button 
                  onClick={() => scrollToSection('roadmap')} 
                  className="text-gray-300 hover:text-white font-medium transition text-left"
                >
                  {t('nav.roadmap')}
                </button>
                <button 
                  onClick={() => scrollToSection('faq')} 
                  className="text-gray-300 hover:text-white font-medium transition text-left"
                >
                  {t('nav.faq')}
                </button>
                <Button 
                  className="bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-semibold w-full justify-start"
                >
                  <Wallet className="mr-2 h-4 w-4" /> {t('nav.connectWallet')}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
