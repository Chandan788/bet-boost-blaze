
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Wallet, Bell } from 'lucide-react';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

interface HeaderProps {
  user: any;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, username: string) => void;
  onLogout: () => void;
}

const Header = ({ user, onLogin, onSignup, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                StakeBet
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#sports" className="text-foreground hover:text-primary transition-colors">
                Sports
              </a>
              <a href="#casino" className="text-foreground hover:text-primary transition-colors">
                Casino
              </a>
              <a href="#live" className="text-foreground hover:text-primary transition-colors">
                Live
              </a>
              <a href="#promotions" className="text-foreground hover:text-primary transition-colors">
                Promotions
              </a>
            </nav>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {/* Balance Display */}
                  <div className="glass rounded-lg px-4 py-2 flex items-center space-x-2">
                    <Wallet className="w-4 h-4 text-neon-green" />
                    <span className="font-semibold text-neon-green">
                      ${user.balance.toFixed(2)}
                    </span>
                  </div>

                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
                  </Button>

                  {/* User Profile */}
                  <UserProfile user={user} onLogout={onLogout} />
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                    Login
                  </Button>
                  <Button className="btn-primary" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#sports" className="text-foreground hover:text-primary transition-colors">
                  Sports
                </a>
                <a href="#casino" className="text-foreground hover:text-primary transition-colors">
                  Casino
                </a>
                <a href="#live" className="text-foreground hover:text-primary transition-colors">
                  Live
                </a>
                <a href="#promotions" className="text-foreground hover:text-primary transition-colors">
                  Promotions
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                  {user ? (
                    <>
                      <div className="glass rounded-lg px-4 py-2 flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-neon-green" />
                        <span className="font-semibold text-neon-green">
                          ${user.balance.toFixed(2)}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={onLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                        Login
                      </Button>
                      <Button className="btn-primary" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={onLogin}
        onSignup={onSignup}
      />
    </>
  );
};

export default Header;
