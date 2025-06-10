
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calculator, DollarSign, TrendingUp } from 'lucide-react';

const BettingSlip = ({ selectedBets, onRemoveBet }) => {
  const [stakes, setStakes] = useState({});
  const [betType, setBetType] = useState('single'); // single, accumulator

  const updateStake = (betId, value) => {
    setStakes(prev => ({
      ...prev,
      [betId]: parseFloat(value) || 0
    }));
  };

  const getTotalStake = () => {
    if (betType === 'single') {
      return Object.values(stakes).reduce((sum, stake) => sum + stake, 0);
    } else {
      // For accumulator, single stake for all bets
      return stakes.accumulator || 0;
    }
  };

  const getTotalOdds = () => {
    if (betType === 'single') {
      return selectedBets.reduce((sum, bet) => {
        const stake = stakes[bet.id] || 0;
        return sum + (stake * bet.odds);
      }, 0);
    } else {
      // For accumulator, multiply all odds
      const totalOdds = selectedBets.reduce((total, bet) => total * bet.odds, 1);
      return (stakes.accumulator || 0) * totalOdds;
    }
  };

  const getPotentialReturn = () => {
    return getTotalOdds();
  };

  const getPotentialProfit = () => {
    return getPotentialReturn() - getTotalStake();
  };

  return (
    <div className="space-y-6">
      {/* Betting Slip Header */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-neon-cyan" />
            Betting Slip
          </h2>
          <Badge variant="outline">
            {selectedBets.length} bet{selectedBets.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Bet Type Selector */}
        {selectedBets.length > 1 && (
          <div className="flex space-x-2 mb-6">
            <Button
              variant={betType === 'single' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBetType('single')}
              className={betType === 'single' ? 'btn-primary' : ''}
            >
              Single
            </Button>
            <Button
              variant={betType === 'accumulator' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBetType('accumulator')}
              className={betType === 'accumulator' ? 'btn-primary' : ''}
            >
              Accumulator
            </Button>
          </div>
        )}

        {/* Selected Bets */}
        {selectedBets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Click on odds to add bets to your slip</p>
          </div>
        ) : (
          <div className="space-y-4">
            {betType === 'single' ? (
              // Single Bets
              selectedBets.map((bet) => (
                <div key={bet.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{bet.match}</div>
                      <div className="text-xs text-muted-foreground">
                        {bet.selection}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {bet.odds.toFixed(2)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-destructive hover:text-destructive"
                        onClick={() => onRemoveBet(bet.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Stake ($)"
                      value={stakes[bet.id] || ''}
                      onChange={(e) => updateStake(bet.id, e.target.value)}
                      className="text-sm"
                    />
                    {stakes[bet.id] > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Potential return: ${(stakes[bet.id] * bet.odds).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Accumulator Bet
              <div className="border border-border rounded-lg p-4">
                <div className="space-y-3 mb-4">
                  {selectedBets.map((bet) => (
                    <div key={bet.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{bet.match}</div>
                        <div className="text-xs text-muted-foreground">
                          {bet.selection}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {bet.odds.toFixed(2)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 text-destructive hover:text-destructive"
                          onClick={() => onRemoveBet(bet.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Total Odds:</span>
                    <Badge variant="outline">
                      {selectedBets.reduce((total, bet) => total * bet.odds, 1).toFixed(2)}
                    </Badge>
                  </div>
                  <Input
                    type="number"
                    placeholder="Stake ($)"
                    value={stakes.accumulator || ''}
                    onChange={(e) => updateStake('accumulator', e.target.value)}
                    className="text-sm"
                  />
                  {stakes.accumulator > 0 && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Potential return: ${(stakes.accumulator * selectedBets.reduce((total, bet) => total * bet.odds, 1)).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Betting Summary */}
      {selectedBets.length > 0 && getTotalStake() > 0 && (
        <div className="glass rounded-xl p-6">
          <h3 className="font-bold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-neon-green" />
            Bet Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Stake:</span>
              <span className="font-semibold">${getTotalStake().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potential Return:</span>
              <span className="font-semibold text-neon-green">
                ${getPotentialReturn().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">Potential Profit:</span>
              <span className="font-bold text-neon-cyan">
                ${getPotentialProfit().toFixed(2)}
              </span>
            </div>
          </div>
          
          <Button className="w-full mt-6 btn-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Place Bet - ${getTotalStake().toFixed(2)}
          </Button>
        </div>
      )}

      {/* Quick Bet Amounts */}
      {selectedBets.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h3 className="font-bold mb-4">Quick Amounts</h3>
          <div className="grid grid-cols-3 gap-2">
            {[10, 25, 50, 100, 250, 500].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  if (betType === 'single') {
                    selectedBets.forEach(bet => updateStake(bet.id, amount));
                  } else {
                    updateStake('accumulator', amount);
                  }
                }}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingSlip;
