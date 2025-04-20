import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, FileText, Book, PieChart, BarChart, Coins } from 'lucide-react';

export default function WhitepaperSection() {
  const { t } = useTranslation();

  return (
    <section id="whitepaper" className="py-20 bg-[#1E2530] relative overflow-hidden">
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
            SnookerGame <span className="text-[#F8BF23]">Whitepaper</span>
          </h2>
          <p className="text-gray-400 text-lg">Detailed documentation about the SnookerGame project, vision, and tokenomics</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="bg-[#14191F] border border-[#2D3748] rounded-xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-[#2D3748]">
                <h3 className="font-['Kanit'] font-semibold text-2xl mb-3">Whitepaper Contents</h3>
                <p className="text-gray-400 mb-4">Explore the comprehensive documentation covering all aspects of the SnookerGame ecosystem</p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-[#0D4F2B]/20 rounded-full flex items-center justify-center mt-1 mr-3">
                      <FileText className="h-4 w-4 text-[#F8BF23]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Executive Summary</h4>
                      <p className="text-gray-400 text-sm">Vision, mission, and goals of the SnookerGame platform</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-[#0D4F2B]/20 rounded-full flex items-center justify-center mt-1 mr-3">
                      <Book className="h-4 w-4 text-[#F8BF23]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Game Mechanics</h4>
                      <p className="text-gray-400 text-sm">Detailed explanation of gameplay, betting systems, and NFT integration</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-[#0D4F2B]/20 rounded-full flex items-center justify-center mt-1 mr-3">
                      <PieChart className="h-4 w-4 text-[#F8BF23]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Tokenomics</h4>
                      <p className="text-gray-400 text-sm">Distribution, utility, and economics of the SNR token</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-[#0D4F2B]/20 rounded-full flex items-center justify-center mt-1 mr-3">
                      <BarChart className="h-4 w-4 text-[#F8BF23]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Market Analysis</h4>
                      <p className="text-gray-400 text-sm">Competitive landscape and growth opportunities</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-[#0D4F2B]/20 rounded-full flex items-center justify-center mt-1 mr-3">
                      <Coins className="h-4 w-4 text-[#F8BF23]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Revenue Model</h4>
                      <p className="text-gray-400 text-sm">Sustainability plan and revenue generation mechanisms</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#14191F] p-6 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-400">Version 1.2 — April 2025</p>
                  <p className="text-sm text-gray-400">20 pages, 4.2 MB (PDF)</p>
                </div>
                <Button 
                  className="bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-medium px-6"
                  onClick={() => window.open('/whitepaper.pdf', '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="bg-[#14191F] border border-[#2D3748] rounded-xl p-8 shadow-xl">
                <div className="bg-[#F8BF23]/10 inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full backdrop-blur-sm border border-[#F8BF23]/30">
                  <span className="text-[#F8BF23] font-medium text-sm">Tokenomics</span>
                </div>
                
                <h3 className="font-['Kanit'] font-semibold text-2xl mb-4">SNR Token Distribution</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Game Rewards</span>
                      <span className="text-[#F8BF23]">40%</span>
                    </div>
                    <div className="h-2 bg-[#2D3748] rounded-full">
                      <div className="h-2 bg-[#F8BF23] rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Community Airdrop</span>
                      <span className="text-[#F8BF23]">20%</span>
                    </div>
                    <div className="h-2 bg-[#2D3748] rounded-full">
                      <div className="h-2 bg-[#F8BF23] rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Team & Development</span>
                      <span className="text-[#F8BF23]">15%</span>
                    </div>
                    <div className="h-2 bg-[#2D3748] rounded-full">
                      <div className="h-2 bg-[#F8BF23] rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Marketing</span>
                      <span className="text-[#F8BF23]">10%</span>
                    </div>
                    <div className="h-2 bg-[#2D3748] rounded-full">
                      <div className="h-2 bg-[#F8BF23] rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Liquidity Pool</span>
                      <span className="text-[#F8BF23]">10%</span>
                    </div>
                    <div className="h-2 bg-[#2D3748] rounded-full">
                      <div className="h-2 bg-[#F8BF23] rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Reserve Fund</span>
                      <span className="text-[#F8BF23]">5%</span>
                    </div>
                    <div className="h-2 bg-[#2D3748] rounded-full">
                      <div className="h-2 bg-[#F8BF23] rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm">Total Supply: 100,000,000 SNR</p>
              </div>
              
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#0D4F2B]/30 rounded-full filter blur-2xl"></div>
              <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-[#F8BF23]/20 rounded-full filter blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}