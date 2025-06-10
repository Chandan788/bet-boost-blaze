
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  History, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';

const mockBetHistory = [
  {
    id: 1,
    match: 'Manchester City vs Arsenal',
    selection: 'Manchester City',
    odds: 1.85,
    stake: 50,
    status: 'won',
    profit: 42.50,
    date: '2024-06-10',
    time: '15:30'
  },
  {
    id: 2,
    match: 'Lakers vs Warriors',
    selection: 'Lakers',
    odds: 2.10,
    stake: 25,
    status: 'lost',
    profit: -25,
    date: '2024-06-09',
    time: '20:00'
  },
  {
    id: 3,
    match: 'Djokovic vs Nadal',
    selection: 'Djokovic',
    odds: 1.55,
    stake: 100,
    status: 'pending',
    profit: 0,
    date: '2024-06-10',
    time: 'Live'
  }
];

const BetHistory = () => {
  const [filter, setFilter] = useState('all');

  const filteredBets = filter === 'all' 
    ? mockBetHistory 
    : mockBetHistory.filter(bet => bet.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <CheckCircle className="w-4 h-4 text-neon-green" />;
      case 'lost':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'text-neon-green';
      case 'lost':
        return 'text-destructive';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const totalProfit = mockBetHistory.reduce((sum, bet) => 
    bet.status === 'won' ? sum + bet.profit : bet.status === 'lost' ? sum + bet.profit : sum, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <History className="w-6 h-6 mr-2 text-neon-purple" />
          Bet History
        </h2>
        
        <div className="glass rounded-lg px-4 py-2">
          <div className="text-sm text-muted-foreground">Total P&L</div>
          <div className={`font-bold ${totalProfit >= 0 ? 'text-neon-green' : 'text-destructive'}`}>
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
          <TabsTrigger value="won" onClick={() => setFilter('won')}>Won</TabsTrigger>
          <TabsTrigger value="lost" onClick={() => setFilter('lost')}>Lost</TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setFilter('pending')}>Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="space-y-4 mt-6">
          {filteredBets.map((bet) => (
            <div key={bet.id} className="betting-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(bet.status)}
                  <Badge variant="outline" className="text-xs">
                    {bet.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {bet.date} • {bet.time}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-semibold">{bet.match}</div>
                <div className="text-sm text-muted-foreground">
                  Selection: <span className="text-foreground">{bet.selection}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Odds</div>
                    <div className="font-bold">{bet.odds.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Stake</div>
                    <div className="font-bold">${bet.stake}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">P&L</div>
                    <div className={`font-bold ${getStatusColor(bet.status)}`}>
                      {bet.status === 'pending' ? '-' : 
                       bet.profit >= 0 ? `+$${bet.profit.toFixed(2)}` : `-$${Math.abs(bet.profit).toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredBets.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No bets found for this filter.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BetHistory;
