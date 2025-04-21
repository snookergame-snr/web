import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import FeaturesSection from '@/components/features-section';
import RoadmapSection from '@/components/roadmap-section';
import TokenDetails from '@/components/token-details';
import WhitepaperSection from '@/components/whitepaper-section';
import FAQSection from '@/components/faq-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '@/assets/images';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [snrBalance, setSnrBalance] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnected = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
  
          const contract = new ethers.Contract(CONTRACT_ADDRESS, ["function balanceOf(address) view returns (uint256)"], provider);
          const balance = await contract.balanceOf(address);
          const formatted = ethers.utils.formatUnits(balance, 18);
          setSnrBalance(parseFloat(formatted).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " SNR");
        }
      } catch (err) {
        console.error("Check wallet connection failed:", err);
      }
    };
  
    checkWalletConnected();
  }, [])


  const handleConnectWallet = async () => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ["function balanceOf(address) view returns (uint256)"], provider);
      const balance = await contract.balanceOf(address);
      const formatted = ethers.utils.formatUnits(balance, 18);
      setSnrBalance(parseFloat(formatted).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " SNR");
    } catch (err) {
      console.error("Connect Wallet Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#14191F] text-white font-sans antialiased">
      <Navbar
        walletAddress={walletAddress}
        snrBalance={snrBalance}
        onConnect={handleConnectWallet}
      />
      <main>
        <HeroSection walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
        <AboutSection />
        <FeaturesSection />
        <TokenDetails />
        <WhitepaperSection />
        <RoadmapSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
