import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLocation } from "wouter";
import { useWallet } from '@/contexts/WalletContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ethers } from "ethers";
import { images } from '@/assets/images';
import {
  Wallet,
  Settings,
  Menu,
  BellRing,
  Send,
  Target,
  Users,
  MessageSquare,
  Trophy,
  ArrowLeftCircle,
  Eye,
  Clock,
  Shield,
  Zap,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Bell,
  UserPlus,
  Medal,
  VolumeX,
  Volume2,
  Check,
  Bot,
  AlertTriangle,
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';




interface OnlinePlayer {
  id: string;
  address: string;
  username?: string;
  status: 'playing' | 'idle';
  lastActive: Date;
  avatarUrl: string;
  snrBalance: number;
  totalWins?: number;
}

interface Match {
  id: string;
  host: string;
  hostAddress: string;
  avatarUrl: string;
  waitingTime: number; // in seconds
  fee: number;
  spectators: number;
  type: 'pvp' | 'bot';
  difficulty?: 'easy' | 'normal' | 'hard' | 'expert' | 'master';
  status?: 'waiting' | 'active' | 'completed';
  bonusReward?: number;
}

interface ChatMessage {
  id: string;
  sender: string;
  senderAddress: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface ActivityEvent {
  id: string;
  type: 'join' | 'finish' | 'claim' | 'invite';
  address: string;
  details: string;
  timestamp: Date;
}

interface LeaderboardUser {
  id: string;
  address: string;
  username?: string;
  avatarUrl: string;
  snrBalance: number;
  dailyWinnings: number;
  rank: number;
}

interface Invitation {
  id: string;
  from: string;
  fromAddress: string;
  fromAvatar: string;
  timestamp: Date;
  fee: number;
  accepted?: boolean;
  declined?: boolean;
}


export default function LobbyPage() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [autoJoin, setAutoJoin] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [playerFilter, setPlayerFilter] = useState<'all' | 'idle' | 'playing'>('all');
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [matchmakingProgress, setMatchmakingProgress] = useState(0);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentInvitation, setCurrentInvitation] = useState<Invitation | null>(null);
  const [selectedBotDifficulty, setSelectedBotDifficulty] = useState<'easy' | 'normal' | 'hard' | 'expert' | 'master'>('normal');
  const notificationSound = useRef<HTMLAudioElement | null>(null);
  const { walletAddress, snrBalance } = useWallet();
  
  useEffect(() => {
    const checkWallet = async () => {
      if (!walletAddress) return;
  
      if (!ethers.utils.isAddress(walletAddress)) {
        alert(`❌ Wallet address ไม่ถูกต้อง`);
        return;
      }
  
      try {
        const balance = await getSnrBalance(walletAddress);
        console.log("💰 SNR Raw Balance:", balance);
  
        const floatBalance = parseFloat(balance);
        setSnrBalance(floatBalance.toFixed(2));
      } catch (err) {
        console.error("❌ ไม่สามารถตรวจสอบยอด SNR ได้", err);
      }
    };
  
    checkWallet();
  }, [walletAddress]);
  
  
 
  const shortAddress = (addr: string) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'N/A';
  };

  

  useEffect(() => {
    const loadBalance = async () => {
      if (walletAddress && ethers.utils.isAddress(walletAddress)) {
        try {
          const balance = await getSnrBalance(walletAddress); // ✅ ใช้ฟังก์ชันที่ถูกต้อง
          setSnrBalance(parseFloat(balance).toFixed(2));
        } catch (err) {
          console.error("Error fetching SNR:", err);
          setSnrBalance("0");
        }
      }
    };

    loadBalance();
  }, [walletAddress]);



  // Mock data
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([
    { id: '1', address: '0x65A2...3f8f9', username: 'SnookerPro', status: 'playing', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=1', snrBalance: 1000, totalWins: 47 },
    { id: '2', address: '0x7B4C...9a2b3', username: 'BilliardKing', status: 'idle', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=2', snrBalance: 2500, totalWins: 31 },
    { id: '3', address: '0x321F...76d4e', username: 'CueChamp', status: 'idle', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=3', snrBalance: 850, totalWins: 19 },
    { id: '4', address: '0x9E8D...5c7d2', username: 'PocketRocket', status: 'playing', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=4', snrBalance: 3200, totalWins: 56 },
    { id: '5', address: '0x45F1...2e3d4', username: 'BreakMaster', status: 'idle', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=5', snrBalance: 720, totalWins: 12 },
    { id: '6', address: '0xAB23...8f9e0', username: 'SnookerLegend', status: 'playing', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=6', snrBalance: 5100, totalWins: 87 },
    { id: '7', address: '0x78C5...1d2e3', username: 'TableShark', status: 'idle', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=7', snrBalance: 1350, totalWins: 24 },
    { id: '8', address: '0x3F7D...4e5f6', username: 'CueArtist', status: 'playing', lastActive: new Date(), avatarUrl: 'https://i.pravatar.cc/150?img=8', snrBalance: 2800, totalWins: 42 },
  ]);
  
  const [matches, setMatches] = useState<Match[]>([
    { 
      id: '1', 
      host: 'SnookerPro', 
      hostAddress: '0x65A2...3f8f9', 
      avatarUrl: 'https://i.pravatar.cc/150?img=1', 
      waitingTime: 45, 
      fee: 50, 
      spectators: 2,
      type: 'pvp',
      status: 'waiting'
    },
    { 
      id: '2', 
      host: 'BilliardKing', 
      hostAddress: '0x9E8D...5c7d2', 
      avatarUrl: 'https://i.pravatar.cc/150?img=4', 
      waitingTime: 15, 
      fee: 100, 
      spectators: 1,
      type: 'pvp',
      status: 'waiting'
    },
    { 
      id: '3', 
      host: 'CueChamp', 
      hostAddress: '0xAB23...8f9e0', 
      avatarUrl: 'https://i.pravatar.cc/150?img=6', 
      waitingTime: 78, 
      fee: 25, 
      spectators: 4,
      type: 'pvp',
      status: 'active'
    },
    { 
      id: '4', 
      host: 'AI Bot - Easy', 
      hostAddress: 'N/A', 
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot1', 
      waitingTime: 0, 
      fee: 500, 
      spectators: 0,
      type: 'bot',
      difficulty: 'easy'
    },
    { 
      id: '5', 
      host: 'AI Bot - Normal', 
      hostAddress: 'N/A', 
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot2', 
      waitingTime: 0, 
      fee: 1000, 
      spectators: 0,
      type: 'bot',
      difficulty: 'normal'
    },
    { 
      id: '6', 
      host: 'AI Bot - Hard', 
      hostAddress: 'N/A', 
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot3', 
      waitingTime: 0, 
      fee: 2000, 
      spectators: 0,
      type: 'bot',
      difficulty: 'hard',
      bonusReward: 400
    },
    { 
      id: '7', 
      host: 'AI Bot - Expert', 
      hostAddress: 'N/A', 
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot4', 
      waitingTime: 0, 
      fee: 3000, 
      spectators: 0,
      type: 'bot',
      difficulty: 'expert',
      bonusReward: 1050
    },
    { 
      id: '8', 
      host: 'AI Bot - Master', 
      hostAddress: 'N/A', 
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot5', 
      waitingTime: 0, 
      fee: 5000, 
      spectators: 0,
      type: 'bot',
      difficulty: 'master',
      bonusReward: 2500
    },
  ]);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      sender: 'SnookerPro', 
      senderAddress: '0x65A2...3f8f9', 
      message: 'Anyone up for a high-stakes game?', 
      timestamp: new Date(Date.now() - 240000) 
    },
    { 
      id: '2', 
      sender: 'BilliardKing', 
      senderAddress: '0x9E8D...5c7d2', 
      message: 'I just won 500 SNR! Lucky break!', 
      timestamp: new Date(Date.now() - 180000)
    },
    { 
      id: '3', 
      sender: 'System', 
      senderAddress: 'SYSTEM', 
      message: 'New tournament starting in 15 minutes. Register now!', 
      timestamp: new Date(Date.now() - 120000)
    },
  ]);
  
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([
    { 
      id: '1', 
      type: 'join', 
      address: '0x7B4C...9a2b3', 
      details: 'joined Match #2', 
      timestamp: new Date(Date.now() - 60000)
    },
    { 
      id: '2', 
      type: 'finish', 
      address: '0x65A2...3f8f9', 
      details: 'won Match #5: 63-42', 
      timestamp: new Date(Date.now() - 180000)
    },
    { 
      id: '3', 
      type: 'claim', 
      address: '0x3F7D...4e5f6', 
      details: 'claimed 250 SNR tokens', 
      timestamp: new Date(Date.now() - 300000)
    },
    { 
      id: '4', 
      type: 'join', 
      address: '0x45F1...2e3d4', 
      details: 'is spectating Match #3', 
      timestamp: new Date(Date.now() - 360000)
    },
  ]);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([
    { id: '6', address: '0xAB23...8f9e0', username: 'SnookerLegend', avatarUrl: 'https://i.pravatar.cc/150?img=6', snrBalance: 5100, dailyWinnings: 1200, rank: 1 },
    { id: '4', address: '0x9E8D...5c7d2', username: 'PocketRocket', avatarUrl: 'https://i.pravatar.cc/150?img=4', snrBalance: 3200, dailyWinnings: 800, rank: 2 },
    { id: '8', address: '0x3F7D...4e5f6', username: 'CueArtist', avatarUrl: 'https://i.pravatar.cc/150?img=8', snrBalance: 2800, dailyWinnings: 450, rank: 3 },
  ]);

  // Invitations
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  
  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      senderAddress: '0x65A2...3f8f9', // Simulating the current user
      message: currentMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };
  
  // Function to filter players based on search query and status filter
  const filteredPlayers = onlinePlayers.filter(player => {
    const matchesSearch = 
      player.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (player.username && player.username.toLowerCase().includes(searchQuery.toLowerCase()));
      
    if (playerFilter === 'all') return matchesSearch;
    return matchesSearch && player.status === playerFilter;
  });
  
  // Function to handle inviting a player
  const handleInvitePlayer = (player: OnlinePlayer) => {
    // Create a new invitation
    const newInvitation: Invitation = {
      id: Date.now().toString(),
      from: 'You',
      fromAddress: '0x65A2...3f8f9',
      fromAvatar: onlinePlayers[0].avatarUrl,
      timestamp: new Date(),
      fee: 50,
    };
    
    setInvitations(prev => [...prev, newInvitation]);
    
    // Add to activity feed
    const newEvent: ActivityEvent = {
      id: Date.now().toString(),
      type: 'invite',
      address: '0x65A2...3f8f9',
      details: `invited ${player.address} to a match`,
      timestamp: new Date(),
    };
    
    setActivityFeed(prev => [newEvent, ...prev]);
    
    // Play notification sound if enabled
    if (soundEnabled && notificationSound.current) {
      notificationSound.current.play().catch(err => console.error("Error playing sound:", err));
    }
    
    // Show toast notification
    toast({
      title: 'Invitation Sent',
      description: `You invited ${player.username || player.address} to a match`,
      duration: 3000,
    });
  };
  
  // Function to start quick matchmaking
  const startQuickMatchmaking = () => {
    setShowMatchmaking(true);
    setMatchmakingProgress(0);
    
    // Simulate matchmaking progress
    const interval = setInterval(() => {
      setMatchmakingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowMatchmaking(false);
          
          // Simulate finding a match
          setTimeout(() => {
            // Create invitation
            const randomPlayer = onlinePlayers[Math.floor(Math.random() * onlinePlayers.length)];
            const newInvitation: Invitation = {
              id: Date.now().toString(),
              from: randomPlayer.username || randomPlayer.address,
              fromAddress: randomPlayer.address,
              fromAvatar: randomPlayer.avatarUrl,
              timestamp: new Date(),
              fee: 100,
            };
            
            setCurrentInvitation(newInvitation);
            setShowInvitation(true);
            
            // Play notification sound if enabled
            if (soundEnabled && notificationSound.current) {
              notificationSound.current.play().catch(err => console.error("Error playing sound:", err));
            }
          }, 500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  // Function to handle invitation response
  const handleInvitationResponse = (accept: boolean) => {
    if (!currentInvitation) return;
    
    setCurrentInvitation(prev => prev ? {
      ...prev,
      accepted: accept,
      declined: !accept
    } : null);
    
    setTimeout(() => {
      setShowInvitation(false);
      setCurrentInvitation(null);
      
      if (accept) {
        // Add activity to feed
        const newEvent: ActivityEvent = {
          id: Date.now().toString(),
          type: 'join',
          address: '0x65A2...3f8f9',
          details: `joined ${currentInvitation.from}'s match`,
          timestamp: new Date(),
        };
        
        setActivityFeed(prev => [newEvent, ...prev]);
        
        // Show toast notification
        toast({
          title: 'Match Joined',
          description: `You joined ${currentInvitation.from}'s match`,
          duration: 3000,
        });
      }
    }, 1000);
  };
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  // Simulate realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update waiting times
      setMatches(prev => 
        prev.map(match => ({
          ...match,
          waitingTime: match.waitingTime + 1
        }))
      );
      
      // Randomly change player status sometimes
      if (Math.random() > 0.8) {
        const randomIndex = Math.floor(Math.random() * onlinePlayers.length);
        const newStatus = onlinePlayers[randomIndex].status === 'playing' ? 'idle' : 'playing';
        
        setOnlinePlayers(prev => {
          const updated = [...prev];
          updated[randomIndex] = {
            ...updated[randomIndex],
            status: newStatus as 'playing' | 'idle'
          };
          return updated;
        });
      }
      
      // Occasionally add a new activity
      if (Math.random() > 0.9) {
        const randomPlayer = onlinePlayers[Math.floor(Math.random() * onlinePlayers.length)];
        const eventTypes = ['join', 'finish', 'claim'] as const;
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        let details = '';
        switch (eventType) {
          case 'join':
            details = `joined Match #${Math.floor(Math.random() * 10) + 1}`;
            break;
          case 'finish':
            details = `won Match #${Math.floor(Math.random() * 10) + 1}: ${Math.floor(Math.random() * 50) + 30}-${Math.floor(Math.random() * 30) + 10}`;
            break;
          case 'claim':
            details = `claimed ${Math.floor(Math.random() * 500) + 50} SNR tokens`;
            break;
        }
        
        const newEvent: ActivityEvent = {
          id: Date.now().toString(),
          type: eventType,
          address: randomPlayer.address,
          details,
          timestamp: new Date()
        };
        
        setActivityFeed(prev => [newEvent, ...prev.slice(0, 19)]);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [onlinePlayers]);
  
  return (
    <div className="min-h-screen bg-[#14191F] text-white font-sans antialiased">
      {/* Top Navbar */}
      <header className="bg-[#1E2530] border-b border-[#2D3748] z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <a className="flex items-center space-x-2">
                  <img src={images.logoIcon} alt="SnookerGame Logo" className="w-8 h-8" />
                  <span className="font-['Kanit'] font-semibold text-lg text-white hidden md:block">SnookerGame</span>
                </a>
              </Link>
              
              <div className="hidden md:flex items-center space-x-4 ml-8">
                <Link href="/#about">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">About</a>
                </Link>
                <Link href="/#roadmap">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">Roadmap</a>
                </Link>
                <Link href="/#whitepaper">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">Whitepaper</a>
                </Link>
                <Link href="/#faq">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">FAQ</a>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Toggle (Simplified) */}
              <button className="px-2 py-1 text-xs font-medium bg-[#2D3748] rounded hover:bg-[#3D4A5F]">
                EN | TH
              </button>
              
              {/* Wallet or Connect Button */}
              <div className="bg-[#2D3748] px-3 py-1.5 rounded-lg flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium">
                  {walletAddress ? shortAddress(walletAddress) : 'Not Connected'}
                </span>
                <span className="text-[#F8BF23] text-xs font-semibold">
                  {snrBalance !== null ? `${snrBalance} SNR` : 'Loading...'}
                </span>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-1 text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-3 pb-2 border-t border-[#2D3748] mt-3">
              <div className="flex flex-col space-y-3">
                <Link href="/#about">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">About</a>
                </Link>
                <Link href="/#roadmap">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">Roadmap</a>
                </Link>
                <Link href="/#whitepaper">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">Whitepaper</a>
                </Link>
                <Link href="/#faq">
                  <a className="text-gray-300 hover:text-white text-sm font-medium">FAQ</a>
                </Link>
                
                <div className="flex items-center justify-between pt-2">
                  <button className="px-2 py-1 text-xs font-medium bg-[#2D3748] rounded hover:bg-[#3D4A5F]">
                    EN | TH
                  </button>

                  <div className="bg-[#2D3748] px-3 py-1.5 rounded-lg flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium">
                      {walletAddress ? shortAddress(walletAddress) : 'Not Connected'}
                    </span>
                     {contextSnrBalance !== null ? `${contextSnrBalance} SNR` : 'Loading...'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content Area - 3-column layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel - Online Players (Hidden on mobile) */}
          <div className="hidden md:block w-full md:w-1/4 bg-[#1E2530] border border-[#2D3748] rounded-lg overflow-hidden">
            <div className="bg-[#14191F] px-4 py-3 flex items-center justify-between border-b border-[#2D3748]">
              <div className="flex items-center">
                <Users className="text-[#F8BF23] w-4 h-4 mr-2" />
                <h3 className="font-medium text-sm">Online Players</h3>
              </div>
              <Badge variant="outline" className="bg-[#2D3748] text-xs font-semibold">
                {onlinePlayers.length}
              </Badge>
            </div>
            
            <div className="p-3 border-b border-[#2D3748] space-y-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search players..." 
                  className="pl-8 bg-[#2D3748] border-[#3D4A5F] focus-visible:ring-[#F8BF23] text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filter Controls */}
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 px-3 py-1 rounded-md text-xs ${playerFilter === 'all' ? 'bg-[#2D3748] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setPlayerFilter('all')}
                >
                  All
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 px-3 py-1 rounded-md text-xs ${playerFilter === 'idle' ? 'bg-[#2D3748] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setPlayerFilter('idle')}
                >
                  ⏸ Idle
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 px-3 py-1 rounded-md text-xs ${playerFilter === 'playing' ? 'bg-[#2D3748] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setPlayerFilter('playing')}
                >
                  🎮 Playing
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="px-2 py-2">
                {filteredPlayers.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">No players found</p>
                  </div>
                ) : (
                  filteredPlayers.map(player => (
                    <div key={player.id} className="flex items-center justify-between p-2 hover:bg-[#2D3748]/30 rounded-md transition">
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-8 w-8 border border-[#2D3748]">
                            <img src={player.avatarUrl} alt={player.address} />
                          </Avatar>
                          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-[#1E2530] ${player.status === 'playing' ? 'bg-[#F8BF23]' : 'bg-green-500'}`}></div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{player.username || player.address}</p>
                          <div className="flex items-center text-xs text-gray-400">
                            <span>{player.status === 'playing' ? '🎮 Playing' : '⏸ Idle'}</span>
                            <span className="mx-1">•</span>
                            <span className="text-[#F8BF23]">{player.snrBalance} SNR</span>
                          </div>
                        </div>
                      </div>
                      
                      {player.status === 'idle' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 rounded-full bg-[#2D3748]/70 hover:bg-[#3D4A5F] text-white"
                          onClick={() => handleInvitePlayer(player)}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            
            {/* Leaderboard Section */}
            <div className="border-t border-[#2D3748] mt-2">
              <div className="bg-[#14191F] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="text-[#F8BF23] w-4 h-4 mr-2" />
                  <h3 className="font-medium text-sm">Top Players Today</h3>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                {leaderboard.map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-[#14191F]/50 rounded-md">
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-[#F8BF23] text-[#14191F]' : 
                        index === 1 ? 'bg-[#C0C0C0] text-[#14191F]' : 
                        'bg-[#CD7F32] text-[#14191F]'
                      }`}>
                        {player.rank}
                      </div>
                      <Avatar className="h-6 w-6 border border-[#2D3748] ml-2">
                        <img src={player.avatarUrl} alt={player.address} />
                      </Avatar>
                      <span className="ml-2 text-sm">{player.username || player.address}</span>
                    </div>
                    <span className="text-[#F8BF23] text-xs font-medium">+{player.dailyWinnings} SNR</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Center Panel - Games/Matches */}
          <div className="w-full md:w-2/4 bg-[#1E2530] border border-[#2D3748] rounded-lg overflow-hidden">
            <div className="bg-[#14191F] px-4 py-3 flex justify-between items-center border-b border-[#2D3748]">
              <div className="flex items-center">
                <h3 className="font-medium">Game Lobby</h3>
                <Badge variant="outline" className="bg-[#0D4F2B]/30 ml-2 text-xs font-semibold text-green-400">
                  {matches.length} Active
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-8 w-8 p-0 rounded-full ${autoJoin ? 'bg-[#F8BF23] text-[#14191F]' : 'bg-[#2D3748] text-white'}`}
                        onClick={() => setAutoJoin(!autoJoin)}
                      >
                        <Target className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{autoJoin ? 'Auto-Join Enabled' : 'Enable Auto-Join'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full bg-[#2D3748] text-white hover:bg-[#3D4A5F]"
                      >
                        <BellRing className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full bg-[#2D3748] text-white hover:bg-[#3D4A5F]"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Game Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <Tabs defaultValue="pvp" className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="w-full grid grid-cols-2 bg-[#2D3748]">
                  <TabsTrigger value="pvp" className="data-[state=active]:bg-[#F8BF23] data-[state=active]:text-[#14191F]">
                    🎯 PvP Matches
                  </TabsTrigger>
                  <TabsTrigger value="bot" className="data-[state=active]:bg-[#F8BF23] data-[state=active]:text-[#14191F]">
                    🤖 VS Bot
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="pvp" className="mt-0">
                <div className="p-4">
                  <Button 
                    className="w-full mb-4 bg-[#0D4F2B] hover:bg-[#156B3F] text-white"
                  >
                    + Create New Match
                  </Button>
                  
                  <ScrollArea className="h-[calc(100vh-18rem)]">
                    <div className="space-y-4">
                      {matches
                        .filter(match => match.type === 'pvp')
                        .map(match => (
                          <motion.div 
                            key={match.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#14191F] border border-[#2D3748] rounded-lg p-3 hover:border-[#3D4A5F] transition"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3 border border-[#2D3748]">
                                  <img src={match.avatarUrl} alt={match.host} />
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{match.host}</h4>
                                  <p className="text-xs text-gray-400">{match.hostAddress}</p>
                                </div>
                              </div>
                              <Badge className="bg-[#F8BF23]/10 text-[#F8BF23] border-[#F8BF23]/20">
                                <Clock className="mr-1 h-3 w-3" /> {formatTime(match.waitingTime)}s
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm mb-3">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 text-blue-400 mr-1" />
                                  <span>Open Match</span>
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 text-purple-400 mr-1" />
                                  <span>{match.spectators}</span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Zap className="h-4 w-4 text-[#F8BF23] mr-1" />
                                <span className="font-medium text-[#F8BF23]">{match.fee} SNR</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button className="w-3/4 bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F]">
                                Join Match
                              </Button>
                              <Button variant="outline" className="w-1/4 border-[#3D4A5F] hover:bg-[#2D3748]">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="bot" className="mt-0">
                <div className="p-4">
                  <ScrollArea className="h-[calc(100vh-18rem)]">
                    <div className="space-y-4">
                      {matches
                        .filter(match => match.type === 'bot')
                        .map(match => (
                          <motion.div 
                            key={match.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#14191F] border border-[#2D3748] rounded-lg p-3 hover:border-[#3D4A5F] transition"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3 border border-[#2D3748] bg-[#2D3748]">
                                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=bot" alt="AI Bot" />
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{match.host}</h4>
                                  <p className="text-xs text-gray-400">AI Opponent</p>
                                </div>
                              </div>
                              <Badge className="bg-[#0D4F2B]/20 text-green-400 border-green-500/20">
                                Ready
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm mb-3">
                              <div className="flex items-center">
                                <Shield className="h-4 w-4 text-blue-400 mr-1" />
                                <span>Bot Difficulty: Hard</span>
                              </div>
                              <div className="flex items-center">
                                <Zap className="h-4 w-4 text-[#F8BF23] mr-1" />
                                <span className="font-medium text-[#F8BF23]">{match.fee} SNR</span>
                              </div>
                            </div>
                            
                            <Button className="w-full bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F]">
                              Start Game vs Bot
                            </Button>
                          </motion.div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Panel - Chat & Activity (Toggleable on mobile) */}
          <div className={`${isMobileChatOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 bg-[#1E2530] border border-[#2D3748] rounded-lg overflow-hidden`}>
            <Tabs defaultValue="chat">
              <div className="bg-[#14191F] px-4 py-2 border-b border-[#2D3748]">
                <TabsList className="w-full grid grid-cols-2 bg-[#2D3748]">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-[#F8BF23] data-[state=active]:text-[#14191F]">
                    <MessageSquare className="h-4 w-4 mr-1" /> Chat
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-[#F8BF23] data-[state=active]:text-[#14191F]">
                    <Trophy className="h-4 w-4 mr-1" /> Activity
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="chat" className="mt-0 h-[calc(100vh-15rem)]">
                <ScrollArea className="h-[calc(100%-60px)] px-4 py-2">
                  <div className="space-y-4">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className="text-sm">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-white">{msg.sender}</span>
                          {msg.sender !== 'System' && (
                            <span className="text-xs text-gray-400 ml-2">{msg.senderAddress}</span>
                          )}
                          <span className="ml-auto text-xs text-gray-500">{formatTimeAgo(msg.timestamp)}</span>
                        </div>
                        <p className={`${msg.sender === 'System' ? 'text-[#F8BF23]' : 'text-gray-300'}`}>
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-3 border-t border-[#2D3748] bg-[#14191F]">
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="bg-[#2D3748] border-[#3D4A5F] focus-visible:ring-[#F8BF23]"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      size="icon" 
                      className="bg-[#F8BF23] hover:bg-[#FFCF47] text-[#14191F]"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-0 h-[calc(100vh-15rem)]">
                <ScrollArea className="h-full px-4 py-2">
                  <div className="space-y-2">
                    {activityFeed.map(event => (
                      <div 
                        key={event.id}
                        className="p-2 text-sm border-l-2 hover:bg-[#2D3748]/20 transition-colors rounded-sm"
                        style={{
                          borderLeftColor: 
                            event.type === 'join' ? '#3498db' : 
                            event.type === 'finish' ? '#F8BF23' : '#2ecc71'
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{event.address}</span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(event.timestamp)}</span>
                        </div>
                        <p className="text-gray-300">
                          {event.type === 'join' && '🟢 '}
                          {event.type === 'finish' && '🏁 '}
                          {event.type === 'claim' && '🏆 '}
                          {event.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Mobile Toggle for Right Panel */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#F8BF23] text-[#14191F] shadow-lg"
            onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
          >
            {isMobileChatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
          </Button>
          
          {/* Return to Home Button (Mobile only) */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden fixed bottom-6 left-6 h-12 w-12 rounded-full bg-[#2D3748] text-white shadow-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeftCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}