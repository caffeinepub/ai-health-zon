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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-header backdrop-blur supports-[backdrop-filter]:bg-header/98">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-2.5">
          <Heart className="h-6 w-6 text-header-foreground fill-header-foreground" />
          <span className="font-semibold text-lg text-header-foreground tracking-tight">AI Health Zon</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                  currentPath === link.to
                    ? 'bg-header-foreground/15 text-header-foreground'
                    : 'text-header-foreground/85 hover:bg-header-foreground/10 hover:text-header-foreground'
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

        <div className="hidden lg:flex items-center space-x-4">
          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            variant={isAuthenticated ? 'outline' : 'default'}
            size="sm"
            className={isAuthenticated ? 'border-header-foreground/30 text-header-foreground hover:bg-header-foreground/10 hover:border-header-foreground/50' : 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm'}
          >
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-sm hover:bg-header-foreground/10 text-header-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-header-foreground/15 bg-header">
          <div className="container mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2.5 rounded-sm text-sm font-medium transition-colors relative ${
                    currentPath === link.to
                      ? 'bg-header-foreground/15 text-header-foreground'
                      : 'text-header-foreground/85 hover:bg-header-foreground/10'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      {link.label}
                    </span>
                    {link.to === '/admin' && pendingCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {pendingCount}
                      </Badge>
                    )}
                  </span>
                </Link>
              );
            })}
            <div className="pt-3">
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                className={`w-full ${isAuthenticated ? 'border-header-foreground/30 text-header-foreground hover:bg-header-foreground/10' : 'bg-accent text-accent-foreground hover:bg-accent/90'}`}
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
