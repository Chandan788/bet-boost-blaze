
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, TrendingDown, Circle } from 'lucide-react';

const mockMatches = [
  {
    id: 1,
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeOdds: 1.85,
    drawOdds: 3.40,
    awayOdds: 4.20,
    time: '15:30',
    status: 'live',
    homeScore: 1,
    awayScore: 0,
    minute: 43
  },
  {
    id: 2,
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeOdds: 2.10,
    awayOdds: 1.75,
    time: '20:00',
    status: 'upcoming',
    homeScore: null,
    awayScore: null
  },
  {
    id: 3,
    sport: 'Tennis',
    league: 'ATP',
    homeTeam: 'Djokovic',
    awayTeam: 'Nadal',
    homeOdds: 1.55,
    awayOdds: 2.45,
    time: 'Live',
    status: 'live',
    set: '2-1'
  },
  {
    id: 4,
    sport: 'Esports',
    league: 'League of Legends',
    homeTeam: 'T1',
    awayTeam: 'Gen.G',
    homeOdds: 3.20,
    awayOdds: 1.30,
    time: '18:00',
    status: 'upcoming'
  }
];

const LiveOdds = ({ onAddBet }) => {
  const [matches, setMatches] = useState(mockMatches);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Simulate odds updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => ({
        ...match,
        homeOdds: Math.max(1.10, match.homeOdds + (Math.random() - 0.5) * 0.1),
        drawOdds: match.drawOdds ? Math.max(1.10, match.drawOdds + (Math.random() - 0.5) * 0.2) : undefined,
        awayOdds: Math.max(1.10, match.awayOdds + (Math.random() - 0.5) * 0.1)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredMatches = selectedFilter === 'all' 
    ? matches 
    : matches.filter(match => match.status === selectedFilter);

  const handleAddBet = (match, type, odds) => {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-neon-green" />
          Live Odds
        </h2>
        
        {/* Filters */}
        <div className="flex space-x-2">
          {['all', 'live', 'upcoming'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={selectedFilter === filter ? 'btn-primary' : ''}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <div key={match.id} className="betting-card">
            {/* Match Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs">
                  {match.sport}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {match.league}
                </span>
                {match.status === 'live' && (
                  <Badge variant="destructive" className="text-xs flex items-center">
                    <Circle className="w-2 h-2 mr-1 fill-current animate-pulse" />
                    LIVE
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {match.status === 'live' && match.minute ? `${match.minute}'` : match.time}
              </div>
            </div>

            {/* Teams and Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{match.homeTeam}</span>
                {match.homeScore !== null && match.homeScore !== undefined && (
                  <span className="text-xl font-bold">{match.homeScore}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{match.awayTeam}</span>
                {match.awayScore !== null && match.awayScore !== undefined && (
                  <span className="text-xl font-bold">{match.awayScore}</span>
                )}
              </div>
              {match.set && (
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Set: {match.set}
                </div>
              )}
            </div>

            {/* Odds Buttons */}
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
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <TrendingDown className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No matches found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default LiveOdds;
