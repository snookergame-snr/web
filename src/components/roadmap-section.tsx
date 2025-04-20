import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon, DiscordLogoIcon, RocketIcon, CheckIcon } from '@radix-ui/react-icons';

export default function RoadmapSection() {
  const { t } = useTranslation();

  const phases = [
    {
      number: 1,
      title: t('roadmap.phases.phase1.title'),
      description: t('roadmap.phases.phase1.description'),
      status: t('roadmap.phases.phase1.status'),
      isCompleted: true,
      isInProgress: false
    },
    {
      number: 2,
      title: t('roadmap.phases.phase2.title'),
      description: t('roadmap.phases.phase2.description'),
      status: t('roadmap.phases.phase2.status'),
      isCompleted: false,
      isInProgress: true
    },
    {
      number: 3,
      title: t('roadmap.phases.phase3.title'),
      description: t('roadmap.phases.phase3.description'),
      status: t('roadmap.phases.phase3.status'),
      isCompleted: false,
      isInProgress: false
    },
    {
      number: 4,
      title: t('roadmap.phases.phase4.title'),
      description: t('roadmap.phases.phase4.description'),
      status: t('roadmap.phases.phase4.status'),
      isCompleted: false,
      isInProgress: false
    },
    {
      number: 5,
      title: t('roadmap.phases.phase5.title'),
      description: t('roadmap.phases.phase5.description'),
      status: t('roadmap.phases.phase5.status'),
      isCompleted: false,
      isInProgress: false
    },
    {
      number: 6,
      title: t('roadmap.phases.phase6.title'),
      description: t('roadmap.phases.phase6.description'),
      status: t('roadmap.phases.phase6.status'),
      isCompleted: false,
      isInProgress: false
    },
    {
      number: 7,
      title: t('roadmap.phases.phase7.title'),
      description: t('roadmap.phases.phase7.description'),
      status: t('roadmap.phases.phase7.status'),
      isCompleted: false,
      isInProgress: false
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-[#1E2530] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,79,43,0.15),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Kanit'] font-bold text-3xl md:text-4xl mb-4">
            Roadmap <span className="text-[#F8BF23]">{t('roadmap.title')}</span>
          </h2>
          <p className="text-gray-400 text-lg">{t('roadmap.subtitle')}</p>
        </motion.div>
        
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-24 h-1 bg-[#2D3748]"></div>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-between relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {phases.map((phase, index) => (
              <motion.div 
                key={phase.number}
                className="timeline-item relative md:w-1/7 mb-10 md:mb-0"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${phase.isCompleted ? 'bg-[#0D4F2B]' : phase.isInProgress ? 'bg-[#0D4F2B]' : 'bg-[#2D3748]'} flex items-center justify-center mb-4 z-10 border-4 border-[#1E2530]`}>
                    <span className="font-bold">{phase.number}</span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-['Kanit'] font-semibold text-lg mb-2">{phase.title}</h4>
                    <p className="text-gray-400 text-sm">{phase.description}</p>
                    <span className={`inline-block mt-2 text-xs font-medium ${
                      phase.isCompleted 
                        ? 'bg-green-900/30 text-green-400'
                        : phase.isInProgress
                          ? 'bg-[#F8BF23]/30 text-[#F8BF23]'
                          : 'bg-gray-700/50 text-gray-400'
                    } py-1 px-3 rounded-full`}>
                      {phase.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20 max-w-4xl mx-auto bg-[#2D3748] rounded-2xl p-8 border border-[#4A5568]/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h3 className="font-['Kanit'] font-bold text-2xl mb-4">
                {t('roadmap.earlyAccess.title')} <span className="text-[#F8BF23]">Early Access</span>
              </h3>
              <p className="text-gray-300 mb-6">{t('roadmap.earlyAccess.description')}</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="w-full sm:w-auto bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-bold px-6 py-3 rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-lg">
                  <PaperPlaneIcon className="mr-2 h-5 w-5" /> {t('roadmap.earlyAccess.buttons.preRegister')}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-lg border border-white/30">
                  <DiscordLogoIcon className="mr-2 h-5 w-5" /> {t('roadmap.earlyAccess.buttons.joinDiscord')}
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-[#F8BF23]/20 rounded-full flex items-center justify-center">
                  <div className="w-36 h-36 bg-[#F8BF23]/40 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#F8BF23] flex items-center justify-center rounded-full">
                      <RocketIcon className="h-10 w-10 text-[#14191F]" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0D4F2B] rounded-full flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
