
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, TrendingUp, Clock } from 'lucide-react';

const mockFavorites = [
  {
    id: 1,
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    homeOdds: 2.05,
    drawOdds: 3.20,
    awayOdds: 3.80,
    time: '16:30',
    status: 'upcoming'
  },
  {
    id: 2,
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Boston Celtics',
    awayTeam: 'Miami Heat',
    homeOdds: 1.90,
    awayOdds: 1.95,
    time: '21:00',
    status: 'upcoming'
  }
];

const Favorites = ({ onAddBet }) => {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFavorite = (matchId: number) => {
    setFavorites(prev => prev.filter(match => match.id !== matchId));
  };

  const handleAddBet = (match: any, type: string, odds: number) => {
    const bet = {
      id: `${match.id}-${type}`,
      matchId: match.id,
      type,
      odds,
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      selection: type === 'home' ? match.homeTeam : type === 'away' ? match.awayTeam : 'Draw',
      stake: 0
    };
    onAddBet(bet);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Star className="w-6 h-6 mr-2 text-warning fill-current" />
          Favorites
        </h2>
        <Badge variant="outline">
          {favorites.length} matches
        </Badge>
      </div>

      <div className="space-y-4">
        {favorites.map((match) => (
          <div key={match.id} className="betting-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs">
                  {match.sport}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {match.league}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {match.time}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-warning hover:text-warning/80"
                  onClick={() => removeFavorite(match.id)}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{match.homeTeam}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{match.awayTeam}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                className="odds-button"
                onClick={() => handleAddBet(match, 'home', match.homeOdds)}
              >
                <div className="text-xs text-muted-foreground">Home</div>
                <div className="font-bold">{match.homeOdds.toFixed(2)}</div>
              </button>
              
              {match.drawOdds && (
                <button
                  className="odds-button"
                  onClick={() => handleAddBet(match, 'draw', match.drawOdds)}
                >
                  <div className="text-xs text-muted-foreground">Draw</div>
                  <div className="font-bold">{match.drawOdds.toFixed(2)}</div>
                </button>
              )}
              
              <button
                className="odds-button"
                onClick={() => handleAddBet(match, 'away', match.awayOdds)}
              >
                <div className="text-xs text-muted-foreground">Away</div>
                <div className="font-bold">{match.awayOdds.toFixed(2)}</div>
              </button>
            </div>
          </div>
        ))}

        {favorites.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No favorite matches yet.</p>
            <p className="text-sm">Add matches to favorites to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
