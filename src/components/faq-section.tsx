import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { 
  DiscordLogoIcon, 
  TwitterLogoIcon, 
  EnvelopeClosedIcon 
} from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';

export default function FAQSection() {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const faqItems = [
    {
      id: 'wallet',
      question: t('faq.questions.wallet.question'),
      answer: t('faq.questions.wallet.answer')
    },
    {
      id: 'howToStart',
      question: t('faq.questions.howToStart.question'),
      answer: t('faq.questions.howToStart.answer')
    },
    {
      id: 'buyTokens',
      question: t('faq.questions.buyTokens.question'),
      answer: t('faq.questions.buyTokens.answer')
    },
    {
      id: 'tokenValue',
      question: t('faq.questions.tokenValue.question'),
      answer: t('faq.questions.tokenValue.answer')
    },
    {
      id: 'devices',
      question: t('faq.questions.devices.question'),
      answer: t('faq.questions.devices.answer')
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#14191F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,191,35,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Kanit'] font-bold text-3xl md:text-4xl mb-4">
            {t('faq.title')} <span className="text-[#F8BF23]">FAQ</span>
          </h2>
          <p className="text-gray-400 text-lg">{t('faq.subtitle')}</p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
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
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="mb-6"
              >
                <AccordionItem 
                  value={item.id}
                  className="border-0"
                >
                  <AccordionTrigger 
                    className="w-full text-left p-5 bg-[#2D3748] hover:bg-[#4A5568] transition rounded-xl flex justify-between items-center border border-[#4A5568]/20 font-['Kanit'] font-medium text-lg"
                    onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden bg-[#2D3748]/50 rounded-b-xl px-5 py-4 mt-1 border border-[#4A5568]/10 text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div 
          className="mt-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-400 mb-6">{t('faq.moreQuestions')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <DiscordLogoIcon className="mr-2 h-4 w-4" /> {t('faq.socialButtons.discord')}
            </Button>
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-medium">
              <MessageCircle className="mr-2 h-4 w-4" /> {t('faq.socialButtons.telegram')}
            </Button>
            <Button variant="outline" className="bg-[#2D3748] hover:bg-[#4A5568] text-white font-medium border-[#4A5568]/20">
              <TwitterLogoIcon className="mr-2 h-4 w-4" /> {t('faq.socialButtons.twitter')}
            </Button>
            <Button variant="outline" className="bg-[#2D3748] hover:bg-[#4A5568] text-white font-medium border-[#4A5568]/20">
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" /> {t('faq.socialButtons.contact')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
