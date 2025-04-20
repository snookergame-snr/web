import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { 
  DiscordLogoIcon, 
  TwitterLogoIcon, 
  GitHubLogoIcon 
} from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';
import { images } from '@/assets/images';

export default function Footer() {
  const { t } = useTranslation();

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
    <footer className="bg-[#1E2530] border-t border-[#2D3748] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={images.logoIcon} alt="SnookerGame Logo" className="w-10 h-10" />
              <span className="font-['Kanit'] font-bold text-xl text-white">SnookerGame</span>
            </div>
            <p className="text-gray-400 mb-4">เกมสนุกเกอร์ Web3 สุดมันส์ แข่งเดิมพัน รับเงินจริง บนบล็อกเชน Arbitrum</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#F8BF23] transition">
                <DiscordLogoIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F8BF23] transition">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F8BF23] transition">
                <TwitterLogoIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F8BF23] transition">
                <GitHubLogoIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-['Kanit'] font-semibold text-lg mb-4">{t('footer.sections.game.title')}</h4>
            <ul className="space-y-3">
              {(t('footer.sections.game.links', { returnObjects: true }) as string[]).map((link: string, index: number) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Kanit'] font-semibold text-lg mb-4">{t('footer.sections.nftToken.title')}</h4>
            <ul className="space-y-3">
              {(t('footer.sections.nftToken.links', { returnObjects: true }) as string[]).map((link: string, index: number) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Kanit'] font-semibold text-lg mb-4">{t('footer.sections.about.title')}</h4>
            <ul className="space-y-3">
              {(t('footer.sections.about.links', { returnObjects: true }) as string[]).map((link: string, index: number) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2D3748] pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">{t('footer.copyright')}</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">{t('footer.legal.privacy')}</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">{t('footer.legal.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
