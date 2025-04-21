import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Copy, Plus } from "lucide-react";
import {
  CONTRACT_ADDRESS,
  NETWORK_NAME,
  ARBISCAN_URL,
  TOKEN_SUPPLY,
  REMAINING_FREE_TOKENS,
  images,
} from "@/assets/images";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { ethers } from "ethers";


export default function TokenDetails() {
  const { t } = useTranslation();

  const copyContractAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      title: t("token.addressCopied") || "Address copied",
      description: CONTRACT_ADDRESS,
      duration: 3000,
    });
  };
  const [remainingTokens, setRemainingTokens] = useState<string | null>(null);

  useEffect(() => {
    const fetchRemainingTokens = async () => {
      try {
        if (!window.ethereum) return;
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // เชื่อม MetaMask
  
        const contract = new ethers.Contract(CONTRACT_ADDRESS, [
          "function remainingAirdrop() view returns (uint256)"
        ], provider);
  
        const rawRemaining = await contract.remainingAirdrop();
        const formatted = ethers.utils.formatUnits(rawRemaining, 18);
        setRemainingTokens(Math.floor(Number(formatted)).toString());
      } catch (err) {
        console.error("❌ Error fetching remaining tokens:", err);
      }
    };
  
    fetchRemainingTokens();
  }, []);
  

  const addToMetaMask = async () => {
    const tokenAddress = CONTRACT_ADDRESS;
    const tokenSymbol = "SNR";
    const tokenDecimals = 18;
    const tokenImage = "https://snookergame.xyz/logo.png";
  
    try {
      if (!window.ethereum) {
        toast({
          title: t("token.metamaskNotFound") || "MetaMask not found",
          description: t("token.pleaseInstallMetaMask") || "Please install MetaMask",
          duration: 3000,
          variant: "destructive",
        });
        return;
      }
  
      // ✅ เพิ่ม Token เข้า MetaMask
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
  
      if (wasAdded) {
        toast({
          title: t("token.addedToMetaMask") || "Token added",
          description: t("token.checkYourWallet") || "Check your MetaMask",
          duration: 3000,
        });
      } else {
        toast({
          title: t("token.errorAddingToken") || "Error adding token",
          description: t("token.userRejected") || "User rejected",
          duration: 3000,
          variant: "destructive",
        });
      }
    } catch (error) {
      //console.error("MetaMask Error:", error);
      //toast({
      //  title: t("token.errorAddingToken") || "Error adding token",
      //  description: (error as any)?.message || JSON.stringify(error),
      //  duration: 3000,
      //  variant: "destructive",
      //});
    }
  };

  const openDex = () => {
    window.open("https://pancakeswap.finance/swap", "_blank");
  };

  return (
    <section
      id="token-details"
      className="py-16 bg-[#14191F] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,79,43,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Kanit'] font-bold text-3xl md:text-4xl mb-4">
            <span className="text-[#F8BF23]">SNR</span> Token Details
          </h2>
          <p className="text-gray-400 text-lg">
            Essential information about the SNR token on {NETWORK_NAME} network
          </p>
        </motion.div>

        <motion.div
          className="bg-[#1E2530] border border-[#2D3748] rounded-xl p-6 md:p-8 max-w-4xl mx-auto mb-12 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2D3748]">
            <div className="flex items-center space-x-3">
              <img src={images.logoIcon} alt="SNR" className="w-10 h-10" />
              <div>
                <h3 className="font-['Kanit'] font-semibold text-xl">
                  SNR
                </h3>
                <p className="text-gray-400 text-sm">SnookerGame</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={images.arbitrumLogo}
                alt="Arbitrum Network"
                className="w-6 h-6"
              />
              <span className="text-gray-300">{NETWORK_NAME}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-gray-400 text-sm mb-1">Contract Address</h4>
              <div className="flex items-center">
                <p className="text-sm text-white bg-[#2D3748] py-2 px-3 rounded-lg truncate mr-2 flex-grow">
                  {CONTRACT_ADDRESS}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyContractAddress}
                  className="bg-[#2D3748] hover:bg-[#3D4A5F] text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-gray-400 text-sm mb-1">Token Supply</h4>
              <p className="text-white bg-[#2D3748] py-2 px-3 rounded-lg">
                {TOKEN_SUPPLY.toLocaleString()} SNR
              </p>
            </div>
          </div>

          <div className="bg-[#0D4F2B]/20 border border-[#0D4F2B]/30 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h4 className="font-medium text-[#F8BF23] mb-1">
                  Free Token Claiming
                </h4>
                <p className="text-gray-300 text-sm">
                  Remaining tokens available for free claiming
                </p>
              </div>
              <div className="mt-4 md:mt-0">
              <p className="text-[#F8BF23] font-bold text-xl">
                {remainingTokens !== null ? `${Number(remainingTokens).toLocaleString()} SNR` : "Loading..."}
              </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="bg-[#2D3748] hover:bg-[#3D4A5F] text-white border-[#4A5568]"
              onClick={() => window.open(ARBISCAN_URL, "_blank")}
            >
              View on Arbiscan <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              className="bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F] font-medium"
              onClick={addToMetaMask}
            >
              <img
                src="https://snookergame.xyz/metamask-icon.svg"
                alt="MetaMask"
                className="w-4 h-4 mr-2"
              />
              Add to MetaMask
            </Button>

            <Button
              className="bg-[#0D4F2B] hover:bg-[#156B3F] text-white font-medium"
              onClick={openDex}
            >
              <Plus className="mr-2 h-4 w-4" /> Buy SNR Token
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
