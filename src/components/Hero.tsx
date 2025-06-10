
import { Button } from '@/components/ui/button';
import { Play, Star, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto text-center relative">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center glass rounded-full px-6 py-2 mb-8">
            <Star className="w-4 h-4 text-neon-purple mr-2" />
            <span className="text-sm font-medium">
              #1 Crypto Betting Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Next Level
            </span>
            <br />
            <span className="text-foreground">Betting Experience</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join millions of users on the world's most trusted betting platform. 
            Fast payouts, live odds, and unmatched security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              Start Betting Now
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6">
              <div className="text-3xl font-bold text-neon-green mb-2">$24.8M</div>
              <div className="text-muted-foreground">Won Today</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-3xl font-bold text-neon-cyan mb-2">47,892</div>
              <div className="text-muted-foreground">Active Bets</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-3xl font-bold text-neon-purple mb-2">1.2s</div>
              <div className="text-muted-foreground">Avg Payout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
