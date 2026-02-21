import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X, Activity, Heart } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

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
    { to: '/about', label: 'About' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/directory', label: 'Directory' },
    { to: '/healthcare-support', label: 'Support' },
    { to: '/contact', label: 'Contact' },
  ];

  const authenticatedLinks = [
    { to: '/patient-journey', label: 'Patient Journey', icon: Activity },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 shrink-0">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="font-semibold text-lg tracking-tight gradient-text whitespace-nowrap">
              AI Health Zon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated &&
              authenticatedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50 flex items-center gap-1.5"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden lg:block">
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
              className="min-w-[80px]"
            >
              {disabled ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white overflow-x-hidden max-h-screen overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated &&
              authenticatedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            <div className="pt-4 border-t">
              <Button
                onClick={() => {
                  handleAuth();
                  setMobileMenuOpen(false);
                }}
                disabled={disabled}
                variant={isAuthenticated ? 'outline' : 'default'}
                className="w-full"
              >
                {disabled ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
