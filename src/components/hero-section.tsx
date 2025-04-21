// ✅ HeroSection.tsx (ใช้ useWallet แทน props)

import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Gift, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { images, CONTRACT_ADDRESS } from '@/assets/images';
import { ethers } from "ethers";
import { useLocation } from "wouter";
import { useWallet } from "@/contexts/WalletContext";

export default function HeroSection() {
  const { t } = useTranslation();
  const { walletAddress } = useWallet(); // ✅ ใช้ context แทน props
  const [, navigate] = useLocation();

  const handleClaimToken = async () => {
    if (!window.ethereum || !walletAddress) {
      alert("❌ Please connect wallet first.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, [
        "function hasClaimed(address) view returns (bool)",
        "function claimAirdrop() public",
      ], signer);

      const claimed = await contract.hasClaimed(walletAddress);
      if (claimed) {
        alert("🚫 You have already claimed your tokens.");
        return;
      }

      const tx = await contract.claimAirdrop();
      await tx.wait();

      alert("✅ Token claimed successfully!");
    } catch (err) {
      console.error("Claim error:", err);
      alert("❌ Claim failed. Please check eligibility or try again.");
    }
  };

  const handleStartPlaying = () => {
    if (!walletAddress) {
      alert("❌ Please connect your wallet first.");
      return;
    }
    //alert(walletAddress)
    alert("✅ Goto lobby Game...");
    navigate('/lobby');
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-24 md:min-h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(14, 25, 31, 0.75), rgba(14, 25, 31, 0.85)), url(${images.snookerPlayer1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    </section>
  );
}
