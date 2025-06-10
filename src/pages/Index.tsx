
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BettingDashboard from '@/components/BettingDashboard';
import LiveOdds from '@/components/LiveOdds';
import BettingSlip from '@/components/BettingSlip';
import BetHistory from '@/components/BetHistory';
import Favorites from '@/components/Favorites';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Zap, History, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedBets, setSelectedBets] = useState([]);
  const [activeTab, setActiveTab] = useState('odds');
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const addToBettingSlip = (bet) => {
    setSelectedBets(prev => {
      const exists = prev.find(b => b.id === bet.id);
      if (exists) return prev;
      return [...prev, bet];
    });
    toast({
      title: "Bet Added",
      description: `${bet.selection} added to betting slip`,
    });
  };

  const removeBet = (betId) => {
    setSelectedBets(prev => prev.filter(bet => bet.id !== betId));
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    const mockUser = {
      username: email.split('@')[0],
      email,
      balance: 1250.50,
      level: 'Gold',
      totalBets: 42,
      winRate: 67.3
    };
    setUser(mockUser);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${mockUser.username}`,
    });
  };

  const handleSignup = (email: string, password: string, username: string) => {
    // Simulate signup
    const mockUser = {
      username,
      email,
      balance: 100.00, // Welcome bonus
      level: 'Bronze',
      totalBets: 0,
      winRate: 0
    };
    setUser(mockUser);
    toast({
      title: "Welcome to StakeBet!",
      description: `Account created for ${username}. Welcome bonus: $100`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedBets([]);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <Header 
        user={user}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
      />
      
      {/* Hero Section - Only show if not logged in */}
      {!user && <Hero />}

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-8 text-center">
              <TrendingUp className="w-12 h-12 text-neon-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">$2.4B+</h3>
              <p className="text-muted-foreground">Total Volume</p>
            </div>
            <div className="glass rounded-xl p-8 text-center">
              <Users className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">500K+</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="glass rounded-xl p-8 text-center">
              <Zap className="w-12 h-12 text-neon-purple mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">99.5%</h3>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Betting Interface */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Betting Categories */}
            <div className="lg:col-span-1">
              <BettingDashboard />
            </div>

            {/* Middle Column - Main Content with Tabs */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="odds">Live Odds</TabsTrigger>
                  <TabsTrigger value="favorites" disabled={!user}>
                    <Star className="w-4 h-4 mr-1" />
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="history" disabled={!user}>
                    <History className="w-4 h-4 mr-1" />
                    History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="odds" className="mt-6">
                  <LiveOdds onAddBet={addToBettingSlip} />
                </TabsContent>
                
                <TabsContent value="favorites" className="mt-6">
                  {user ? (
                    <Favorites onAddBet={addToBettingSlip} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Please log in to view your favorites</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="mt-6">
                  {user ? (
                    <BetHistory />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Please log in to view your bet history</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Betting Slip */}
            <div className="lg:col-span-1">
              <BettingSlip 
                selectedBets={selectedBets} 
                onRemoveBet={removeBet} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                StakeBet
              </h3>
              <p className="text-muted-foreground">
                The most trusted and innovative betting platform in the industry.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sports</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Football</li>
                <li>Basketball</li>
                <li>Tennis</li>
                <li>Esports</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Casino</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Slots</li>
                <li>Live Dealer</li>
                <li>Table Games</li>
                <li>Originals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Live Chat</li>
                <li>Contact Us</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 StakeBet. All rights reserved. | Gamble Responsibly</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
