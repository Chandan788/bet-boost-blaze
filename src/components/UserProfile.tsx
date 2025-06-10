
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Settings, 
  History, 
  Wallet, 
  LogOut, 
  Crown,
  Star,
  TrendingUp
} from 'lucide-react';

interface UserProfileProps {
  user: {
    username: string;
    email: string;
    balance: number;
    level: string;
    totalBets: number;
    winRate: number;
  };
  onLogout: () => void;
}

const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <div className="font-semibold text-sm">{user.username}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Crown className="w-3 h-3 mr-1" />
              {user.level}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 glass border-border/50">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold">{user.username}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <Badge variant="outline" className="text-xs mt-1">
                <Crown className="w-3 h-3 mr-1" />
                {user.level}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-background/50 mb-2">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Balance</div>
              <div className="font-bold text-neon-green">${user.balance.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Win Rate</div>
              <div className="font-bold text-neon-purple">{user.winRate}%</div>
            </div>
          </div>
        </div>
        
        <DropdownMenuItem className="cursor-pointer">
          <Wallet className="w-4 h-4 mr-2" />
          Deposit / Withdraw
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <History className="w-4 h-4 mr-2" />
          Bet History
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Star className="w-4 h-4 mr-2" />
          Favorites
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <TrendingUp className="w-4 h-4 mr-2" />
          Statistics
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer text-destructive" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
