
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BettingDashboard from '@/components/BettingDashboard';
import LiveOdds from '@/components/LiveOdds';
import BettingSlip from '@/components/BettingSlip';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Zap } from 'lucide-react';

const Index = () => {
  const [selectedBets, setSelectedBets] = useState([]);

  const addToBettingSlip = (bet) => {
    setSelectedBets(prev => {
      const exists = prev.find(b => b.id === bet.id);
      if (exists) return prev;
      return [...prev, bet];
    });
  };

  const removeBet = (betId) => {
    setSelectedBets(prev => prev.filter(bet => bet.id !== betId));
  };

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <Header />
      
      {/* Hero Section */}
      <Hero />

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

            {/* Middle Column - Live Odds */}
            <div className="lg:col-span-2">
              <LiveOdds onAddBet={addToBettingSlip} />
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
