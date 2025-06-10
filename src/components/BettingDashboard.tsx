
import { Button } from '@/components/ui/button';
import { 
  Football, 
  Gamepad2, 
  Radio, 
  Trophy, 
  Zap,
  DollarSign,
  Crown,
  Target
} from 'lucide-react';

const categories = [
  {
    id: 'sports',
    name: 'Sports',
    icon: Football,
    count: 1247,
    color: 'text-neon-green',
    bgColor: 'bg-green-500/20'
  },
  {
    id: 'esports',
    name: 'Esports',
    icon: Gamepad2,
    count: 89,
    color: 'text-neon-purple',
    bgColor: 'bg-purple-500/20'
  },
  {
    id: 'live',
    name: 'Live',
    icon: Radio,
    count: 342,
    color: 'text-destructive',
    bgColor: 'bg-red-500/20'
  },
  {
    id: 'casino',
    name: 'Casino',
    icon: Crown,
    count: 2156,
    color: 'text-neon-cyan',
    bgColor: 'bg-cyan-500/20'
  },
  {
    id: 'slots',
    name: 'Slots',
    icon: Target,
    count: 1891,
    color: 'text-warning',
    bgColor: 'bg-yellow-500/20'
  },
  {
    id: 'originals',
    name: 'Originals',
    icon: Zap,
    count: 24,
    color: 'text-neon-purple',
    bgColor: 'bg-purple-500/20'
  }
];

const BettingDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-neon-green" />
          Quick Stats
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Today's Profit</span>
            <span className="font-bold text-neon-green">+$142.50</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Active Bets</span>
            <span className="font-bold text-neon-cyan">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Win Rate</span>
            <span className="font-bold text-neon-purple">67.3%</span>
          </div>
        </div>
      </div>

      {/* Betting Categories */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-neon-purple" />
          Categories
        </h2>
        <div className="space-y-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-white/10 group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <IconComponent className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.count} games
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Promotions */}
      <div className="glass rounded-xl p-6 neon-purple">
        <h3 className="font-bold mb-2">🎁 Welcome Bonus</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get 200% bonus on your first deposit up to $1000
        </p>
        <Button className="w-full btn-primary">
          Claim Now
        </Button>
      </div>
    </div>
  );
};

export default BettingDashboard;
