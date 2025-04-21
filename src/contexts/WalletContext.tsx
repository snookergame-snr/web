import { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/assets/images";
// กำหนด Type ของ Context
type WalletContextType = {
  walletAddress: string | null;
  snrBalance: string | null;
  onConnect: () => Promise<void>;
};

// สร้าง Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Export Provider
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [snrBalance, setSnrBalance] = useState<string | null>(null);

  const onConnect = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      // ✅ ใช้ Web3Provider จาก ethers v5
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // ✅ อ่าน SNR Token Balance (กรณีมี Contract จริง)
      const tokenAddress = CONTRACT_ADDRESS; // 🛠 ใส่ Address Token จริงตรงนี้
      const tokenAbi = [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ];

      const token = new ethers.Contract(tokenAddress, tokenAbi, signer);
      const rawBalance = await token.balanceOf(address);
      const decimals = await token.decimals();

      const formatted = ethers.utils.formatUnits(rawBalance, decimals);
      setSnrBalance(formatted);
    } catch (err) {
      console.error("Connect Wallet Error:", err);
    }
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
  
          // อ่าน balance ถ้าต้องการ
          const tokenAddress = CONTRACT_ADDRESS; // SNR token
          const tokenAbi = [
            "function balanceOf(address) view returns (uint256)",
            "function decimals() view returns (uint8)",
          ];
          const token = new ethers.Contract(tokenAddress, tokenAbi, signer);
          const rawBalance = await token.balanceOf(address);
          const decimals = await token.decimals();
          const formatted = ethers.utils.formatUnits(rawBalance, decimals);
          setSnrBalance(formatted);
        }
      }
    };
  
    autoConnect();
  }, []);
  return (
    <WalletContext.Provider value={{ walletAddress, snrBalance, onConnect }}>
      {children}
    </WalletContext.Provider>
  );
};

// Export Hook
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
