import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Wallet, Play } from 'lucide-react';
import { images } from '@/assets/images';

export default function CTASection() {
  const { t } = useTranslation();

  const handleConnectWallet = () => {
    alert("Connect Wallet functionality would be implemented here");
  };

  const handleStartPlaying = () => {
    alert("Start Playing functionality would be implemented here");
  };

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, #0D4F2B, #14191F)`
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${images.snookerPlayer4})` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Kanit'] font-bold text-3xl md:text-4xl mb-6">
            {t('cta.title')} <span className="text-[#F8BF23]">SnookerGame</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button 
              className="w-full sm:w-auto bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] text-lg font-bold px-8 py-4 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-lg shadow-[#F8BF23]/20"
              onClick={handleConnectWallet}
            >
              <Wallet className="mr-2 h-5 w-5" /> {t('cta.buttons.connectWallet')}
            </Button>
            
            <Button 
              variant="outline"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-bold px-8 py-4 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-lg border border-white/30"
              onClick={handleStartPlaying}
            >
              <Play className="mr-2 h-5 w-5" /> {t('cta.buttons.startPlaying')}
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#0D4F2B]"></div>
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#0D4F2B]"></div>
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#0D4F2B]"></div>
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#0D4F2B]"></div>
              <div className="w-12 h-12 rounded-full bg-[#2D3748] border-2 border-[#0D4F2B] flex items-center justify-center text-sm font-medium">
                +2.5k
              </div>
            </div>
            <span className="ml-4 text-gray-300">{t('cta.community')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
