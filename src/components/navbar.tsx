import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from 'react-i18next';
import LanguageToggle from './language-toggle';
import { Menu, Wallet } from 'lucide-react';
import { images } from '@/assets/images';
import { useEffect, useState } from "react";
import { useWallet } from "@/contexts/WalletContext";

export default function Navbar() {
  const { walletAddress, snrBalance, onConnect } = useWallet(); // ✅ ย้ายมาไว้ตรงนี้
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
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
          {["about", "features", "roadmap", "faq"].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="nav-item text-gray-300 hover:text-white font-medium transition relative"
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <LanguageToggle />

          {walletAddress ? (
            <div className="hidden md:flex items-center space-x-2 bg-[#F8BF23] text-[#14191F] font-semibold px-4 py-2 rounded-xl shadow-lg">
              <Wallet className="w-4 h-4" />
              <span>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)} | {snrBalance ? snrBalance + " SNR" : '...'}
              </span>
            </div>
          ) : (
            <Button onClick={onConnect} className="hidden md:flex bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-semibold transition transform hover:-translate-y-0.5 hover:shadow-lg">
              <Wallet className="mr-2 h-4 w-4" /> {t('nav.connectWallet')}
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#1E2530] border-neutral-medium/50">
              <div className="flex flex-col space-y-6 mt-10">
                {["about", "features", "roadmap", "faq"].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-gray-300 hover:text-white font-medium transition text-left"
                  >
                    {t(`nav.${id}`)}
                  </button>
                ))}
                {walletAddress ? (
                  <div className="bg-[#F8BF23] text-[#14191F] font-semibold px-4 py-3 rounded-lg">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)} | {snrBalance ?? '...'}
                  </div>
                ) : (
                  <Button onClick={onConnect} className="bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-semibold w-full justify-start">
                    <Wallet className="mr-2 h-4 w-4" /> {t('nav.connectWallet')}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
