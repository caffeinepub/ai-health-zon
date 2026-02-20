import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X, Heart, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsCallerAdmin, useGetPendingRequestCount } from '../hooks/useQueries';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const { data: isAdmin = false } = useIsCallerAdmin();
  const { data: pendingCount = 0 } = useGetPendingRequestCount();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/healthcare-support', label: 'Support System' },
    { to: '/directory', label: 'Directory' },
    { to: '/network-map', label: 'Network Map', icon: Globe },
    { to: '/careers', label: 'Careers' },
    { to: '/vendors', label: 'Vendors' },
    { to: '/ambulance', label: 'Ambulance' },
    { to: '/ngos', label: 'NGOs' },
    { to: '/contact', label: 'Contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ to: '/dashboard', label: 'Dashboard' });
  }

  if (isAuthenticated && isAdmin) {
    navLinks.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-2.5">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-semibold text-lg tracking-tight gradient-text">AI Health Zon</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 relative flex items-center gap-1.5 ${
                  currentPath === link.to
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.label}
                {link.to === '/admin' && pendingCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {pendingCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center space-x-3">
          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            variant={isAuthenticated ? 'outline' : 'default'}
            size="sm"
            className={
              isAuthenticated 
                ? 'border-border hover:bg-muted hover:text-foreground transition-colors duration-200' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200'
            }
          >
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-sm hover:bg-muted text-foreground transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/98 backdrop-blur">
          <div className="container mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-3 rounded-sm text-sm font-medium transition-colors duration-200 ${
                    currentPath === link.to
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                  {link.to === '/admin' && pendingCount > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {pendingCount}
                    </Badge>
                  )}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border/40">
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                className="w-full"
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
