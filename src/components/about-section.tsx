import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gamepad, Clock, Coins, Bot } from 'lucide-react';
import { images } from '@/assets/images';

export default function AboutSection() {
  const { t } = useTranslation();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-[#1E2530] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,79,43,0.2),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
        >
          <h2 className="font-['Kanit'] font-bold text-3xl md:text-4xl mb-4">
            {t('about.title')} <span className="text-[#F8BF23]">SnookerGame</span>
          </h2>
          <p className="text-gray-400 text-lg">{t('about.subtitle')}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div 
              className="mb-8"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#156B3F] flex items-center justify-center mr-3">
                  <Gamepad className="text-white h-5 w-5" />
                </div>
                <h3 className="font-['Kanit'] font-semibold text-xl">{t('about.features.easyToPlay.title')}</h3>
              </div>
              <p className="text-gray-300 pl-12">
                {t('about.features.easyToPlay.description')}
              </p>
            </motion.div>
            
            <motion.div 
              className="mb-8"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#156B3F] flex items-center justify-center mr-3">
                  <Clock className="text-white h-5 w-5" />
                </div>
                <h3 className="font-['Kanit'] font-semibold text-xl">{t('about.features.turnBased.title')}</h3>
              </div>
              <p className="text-gray-300 pl-12">
                {t('about.features.turnBased.description')}
              </p>
            </motion.div>
            
            <motion.div 
              className="mb-8"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#156B3F] flex items-center justify-center mr-3">
                  <Coins className="text-white h-5 w-5" />
                </div>
                <h3 className="font-['Kanit'] font-semibold text-xl">{t('about.features.betting.title')}</h3>
              </div>
              <p className="text-gray-300 pl-12">
                {t('about.features.betting.description')}
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#156B3F] flex items-center justify-center mr-3">
                  <Bot className="text-white h-5 w-5" />
                </div>
                <h3 className="font-['Kanit'] font-semibold text-xl">{t('about.features.opponents.title')}</h3>
              </div>
              <p className="text-gray-300 pl-12">
                {t('about.features.opponents.description')}
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={images.snookerPlayer2}
                alt="SnookerGame Gameplay" 
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14191F]/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F8BF23] bg-gray-800"></div>
                  <div>
                    <p className="font-medium text-white">ThaiSnooker_Pro</p>
                    <p className="text-sm text-gray-300">{t('about.gameStatus.level')} 12 • 2,450 SNR</p>
                  </div>
                  <div className="ml-auto bg-[#F8BF23]/20 rounded-full px-3 py-1">
                    <p className="text-[#F8BF23] text-sm font-medium">{t('about.gameStatus.winRate')} 70%</p>
                  </div>
                </div>
                <div className="bg-[#14191F]/60 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">{t('about.gameStatus.currentGame')}</p>
                      <p className="font-medium text-white">Tournament - Quarter Finals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{t('about.gameStatus.prize')}</p>
                      <p className="font-medium text-[#F8BF23]">5,000 SNR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-6 -top-6 bg-[#F8BF23] text-[#14191F] font-bold py-2 px-4 rounded-md shadow-lg transform rotate-12">
              Web3
            </div>
            
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[#0D4F2B]/30 rounded-full filter blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
