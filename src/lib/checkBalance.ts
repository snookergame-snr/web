import { ethers } from "ethers";
import { RPC_URL, CONTRACT_ADDRESS } from '@/assets/images';

// ✅ ที่อยู่ Smart Contract ของเหรียญ SNR
const SNR_TOKEN_ADDRESS = CONTRACT_ADDRESS;

// ✅ ABI ที่จำเป็น
const SNR_TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const getSnrBalance = async (wallet: string): Promise<string> => {
  // ✅ ตรวจสอบว่า wallet ถูกต้อง
  if (!ethers.utils.isAddress(wallet)) {
    throw new Error("Invalid wallet address");
  }

  // ✅ ใช้ provider ที่ถูกต้องตามเครือข่าย (Arbitrum, etc.)
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  // ✅ สร้าง instance ของ contract
  const contract = new ethers.Contract(SNR_TOKEN_ADDRESS, SNR_TOKEN_ABI, provider);

  // ✅ ดึงยอด balance และ format ตาม decimal
  const balance = await contract.balanceOf(wallet);
  const decimals = await contract.decimals();
  return ethers.utils.formatUnits(balance, decimals);
};
