import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Coins, Box, Store, Bot, Gift, Trophy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images } from '@/assets/images';

export default function FeaturesSection() {
  const { t } = useTranslation();

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <section id="features" className="py-20 bg-[#14191F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(248,191,35,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Kanit'] font-bold text-3xl md:text-4xl mb-4">
            {t('features.title')} <span className="text-[#F8BF23]">SnookerGame</span>
          </h2>
          <p className="text-gray-400 text-lg">{t('features.subtitle')}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature cards */}
          <motion.div
            custom={0}
            variants={featureCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#2D3748] rounded-xl p-6 border border-[#4A5568]/20 transition duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-xl bg-[#0D4F2B]/30 border border-[#0D4F2B]/40 flex items-center justify-center mb-5">
              <Coins className="h-6 w-6 text-[#F8BF23]" />
            </div>
            <h3 className="font-['Kanit'] font-semibold text-xl mb-3">{t('features.items.betting.title')}</h3>
            <p className="text-gray-400">{t('features.items.betting.description')}</p>
          </motion.div>
          
          <motion.div
            custom={1}
            variants={featureCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#2D3748] rounded-xl p-6 border border-[#4A5568]/20 transition duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-xl bg-[#0D4F2B]/30 border border-[#0D4F2B]/40 flex items-center justify-center mb-5">
              <Box className="h-6 w-6 text-[#F8BF23]" />
            </div>
            <h3 className="font-['Kanit'] font-semibold text-xl mb-3">{t('features.items.nftCues.title')}</h3>
            <p className="text-gray-400">{t('features.items.nftCues.description')}</p>
          </motion.div>
          
          <motion.div
            custom={2}
            variants={featureCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#2D3748] rounded-xl p-6 border border-[#4A5568]/20 transition duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-xl bg-[#0D4F2B]/30 border border-[#0D4F2B]/40 flex items-center justify-center mb-5">
              <Store className="h-6 w-6 text-[#F8BF23]" />
            </div>
            <h3 className="font-['Kanit'] font-semibold text-xl mb-3">{t('features.items.marketplace.title')}</h3>
            <p className="text-gray-400">{t('features.items.marketplace.description')}</p>
          </motion.div>
          
          <motion.div
            custom={3}
            variants={featureCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#2D3748] rounded-xl p-6 border border-[#4A5568]/20 transition duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-xl bg-[#0D4F2B]/30 border border-[#0D4F2B]/40 flex items-center justify-center mb-5">
              <Bot className="h-6 w-6 text-[#F8BF23]" />
            </div>
            <h3 className="font-['Kanit'] font-semibold text-xl mb-3">{t('features.items.aiBot.title')}</h3>
            <p className="text-gray-400">{t('features.items.aiBot.description')}</p>
          </motion.div>
          
          <motion.div
            custom={4}
            variants={featureCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#2D3748] rounded-xl p-6 border border-[#4A5568]/20 transition duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-xl bg-[#0D4F2B]/30 border border-[#0D4F2B]/40 flex items-center justify-center mb-5">
              <Gift className="h-6 w-6 text-[#F8BF23]" />
            </div>
            <h3 className="font-['Kanit'] font-semibold text-xl mb-3">{t('features.items.freeClaim.title')}</h3>
            <p className="text-gray-400">{t('features.items.freeClaim.description')}</p>
          </motion.div>
          
          <motion.div
            custom={5}
            variants={featureCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#2D3748] rounded-xl p-6 border border-[#4A5568]/20 transition duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-xl bg-[#0D4F2B]/30 border border-[#0D4F2B]/40 flex items-center justify-center mb-5">
              <Trophy className="h-6 w-6 text-[#F8BF23]" />
            </div>
            <h3 className="font-['Kanit'] font-semibold text-xl mb-3">{t('features.items.tournaments.title')}</h3>
            <p className="text-gray-400">{t('features.items.tournaments.description')}</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto mt-16 p-8 bg-[#2D3748] rounded-2xl border border-[#4A5568]/20 shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D4F2B]/30 rounded-full filter blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="font-['Kanit'] font-bold text-2xl mb-4">
                {t('features.specialEdition.title')} <span className="text-[#F8BF23]">Edition #1</span>
              </h3>
              <p className="text-gray-300 mb-6">{t('features.specialEdition.description')}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="text-[#F8BF23] h-5 w-5 mr-2" />
                  <span>{t('features.specialEdition.stats.accuracy')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#F8BF23] h-5 w-5 mr-2" />
                  <span>{t('features.specialEdition.stats.power')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#F8BF23] h-5 w-5 mr-2" />
                  <span>{t('features.specialEdition.stats.spin')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#F8BF23] h-5 w-5 mr-2" />
                  <span>{t('features.specialEdition.stats.bonus')}</span>
                </li>
              </ul>
              <Button className="bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-bold px-6 py-3 rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-lg">
                <Box className="mr-2 h-5 w-5" /> {t('features.specialEdition.button')}
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src={images.snookerCue1}
                  alt="Special Edition Cue NFT" 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-[#F8BF23] text-[#14191F] font-bold py-1 px-3 rounded-md shadow-lg transform rotate-12">
                  Limited
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
