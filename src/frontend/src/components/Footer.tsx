import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'ai-health-zon');

  return (
    <footer className="border-t border-border bg-muted/20 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2.5 mb-5">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="font-semibold text-lg tracking-tight">AI Health Zon</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              AI-powered healthcare platform connecting hospitals, professionals, and services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-5 text-sm tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-muted-foreground hover:text-foreground transition-colors">
                  Network Directory
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-5 text-sm tracking-tight">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Vendors
                </Link>
              </li>
              <li>
                <Link to="/ambulance" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ambulance Services
                </Link>
              </li>
              <li>
                <Link to="/ngos" className="text-muted-foreground hover:text-foreground transition-colors">
                  NGO Listing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5 text-sm tracking-tight">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} AI Health Zon. All rights reserved.</p>
            <p className="text-center">
              Built with <Heart className="inline h-3.5 w-3.5 text-primary fill-primary mx-0.5" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
