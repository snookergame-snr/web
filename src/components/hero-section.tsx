import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Wallet, Gift, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { images } from '@/assets/images';

export default function HeroSection() {
  const { t } = useTranslation();

  const handleConnectWallet = () => {
    alert("Connect Wallet functionality would be implemented here");
  };

  const handleClaimToken = () => {
    alert("Claim Token functionality would be implemented here");
  };

  const handleStartPlaying = () => {
    alert("Start Playing functionality would be implemented here");
  };

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-24 md:min-h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(14, 25, 31, 0.75), rgba(14, 25, 31, 0.85)), url(${images.snookerPlayer1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#F8BF23]/20 backdrop-blur-sm border border-[#F8BF23]/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-[#F8BF23] font-medium text-sm">{t('hero.badge')}</span>
          </motion.div>
          
          <motion.h1 
            className="font-['Kanit'] font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('hero.heading')}<br /> 
            <span className="text-[#F8BF23]">{t('hero.subheading')}</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              className="w-full md:w-auto bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] text-lg font-bold px-6 py-7 rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-lg shadow-[#F8BF23]/20"
              onClick={handleConnectWallet}
            >
              <Wallet className="mr-2 h-5 w-5" /> {t('hero.buttons.connectWallet')}
            </Button>
            
            <Button 
              variant="outline"
              className="w-full md:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-bold px-6 py-7 rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-lg border border-white/30"
              onClick={handleClaimToken}
            >
              <Gift className="mr-2 h-5 w-5" /> {t('hero.buttons.claimFree')}
            </Button>
            
            <Button 
              className="w-full md:w-auto bg-[#0D4F2B] hover:bg-[#156B3F] text-white text-lg font-bold px-6 py-7 rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-lg shadow-[#0D4F2B]/20"
              onClick={handleStartPlaying}
            >
              <Play className="mr-2 h-5 w-5" /> {t('hero.buttons.startPlaying')}
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#F8BF23]">10K+</span>
              <span className="text-sm text-gray-400">{t('hero.stats.players')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#F8BF23]">100K+</span>
              <span className="text-sm text-gray-400">{t('hero.stats.gamesPlayed')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#F8BF23]">2M</span>
              <span className="text-sm text-gray-400">{t('hero.stats.freeTokens')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button 
          className="w-14 h-14 rounded-full bg-[#F8BF23] shadow-lg flex items-center justify-center transform hover:-translate-y-1 transition"
          onClick={handleConnectWallet}
        >
          <Wallet className="text-[#14191F] h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}
