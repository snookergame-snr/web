import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  status: 'playing' | 'idle';
  avatarUrl: string;
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
}

interface ChatMessage {
  id: string;
  sender: string;
  senderAddress: string;
  message: string;
  timestamp: Date;
}

interface ActivityEvent {
  id: string;
  type: 'join' | 'finish' | 'claim';
  address: string;
  details: string;
  timestamp: Date;
}

export default function LobbyPage() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [autoJoin, setAutoJoin] = useState(false);
  
  // Mock data
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([
    { id: '1', address: '0x65A2...3f8f9', status: 'playing', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', address: '0x7B4C...9a2b3', status: 'idle', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', address: '0x321F...76d4e', status: 'idle', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', address: '0x9E8D...5c7d2', status: 'playing', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', address: '0x45F1...2e3d4', status: 'idle', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', address: '0xAB23...8f9e0', status: 'playing', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', address: '0x78C5...1d2e3', status: 'idle', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', address: '0x3F7D...4e5f6', status: 'playing', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
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
      type: 'pvp'
    },
    { 
      id: '2', 
      host: 'BilliardKing', 
      hostAddress: '0x9E8D...5c7d2', 
      avatarUrl: 'https://i.pravatar.cc/150?img=4', 
      waitingTime: 15, 
      fee: 100, 
      spectators: 1,
      type: 'pvp'
    },
    { 
      id: '3', 
      host: 'CueChamp', 
      hostAddress: '0xAB23...8f9e0', 
      avatarUrl: 'https://i.pravatar.cc/150?img=6', 
      waitingTime: 78, 
      fee: 25, 
      spectators: 4,
      type: 'pvp'
    },
    { 
      id: '4', 
      host: 'AI Bot - Hard', 
      hostAddress: 'N/A', 
      avatarUrl: '/assets/bot-profile.png', 
      waitingTime: 0, 
      fee: 75, 
      spectators: 0,
      type: 'bot'
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
                <span className="text-xs font-medium">0x65A2...3f8f9</span>
                <span className="text-[#F8BF23] text-xs font-semibold">1,000 SNR</span>
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
                    <span className="text-xs font-medium">0x65A2...3f8f9</span>
                    <span className="text-[#F8BF23] text-xs font-semibold">1,000 SNR</span>
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
            
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="px-2 py-2">
                {onlinePlayers.map(player => (
                  <div key={player.id} className="flex items-center p-2 hover:bg-[#2D3748]/30 rounded-md transition">
                    <div className="relative">
                      <Avatar className="h-8 w-8 border border-[#2D3748]">
                        <img src={player.avatarUrl} alt={player.address} />
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-[#1E2530] ${player.status === 'playing' ? 'bg-[#F8BF23]' : 'bg-green-500'}`}></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{player.address}</p>
                      <p className="text-xs text-gray-400">
                        {player.status === 'playing' ? '🎮 Playing' : '⏸ Idle'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
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