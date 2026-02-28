import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function HeroEcosystem() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const ecosystemNodes = [
    { id: 'rcm', label: 'RCM Solutions', route: '/rcm-solutions', x: '15%', y: '25%' },
    { id: 'clean-claim', label: 'Clean Claim Intelligence', route: '/clean-claim-intelligence', x: '75%', y: '20%' },
    { id: 'network', label: 'Network Directory', route: '/network-directory', x: '20%', y: '65%' },
    { id: 'support', label: 'Healthcare Support', route: '/healthcare-support-system', x: '80%', y: '70%' },
    { id: 'knowledge', label: 'Knowledge Board', route: '/knowledge-board', x: '50%', y: '80%' },
  ];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden bg-gradient-to-br from-enterprise-blue via-primary to-enterprise-blue">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/assets/generated/healthcare-ecosystem-concept.dim_1200x600.png"
          alt="Healthcare Ecosystem"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        {ecosystemNodes.map((node, idx) => {
          const nextNode = ecosystemNodes[(idx + 1) % ecosystemNodes.length];
          return (
            <line
              key={`line-${node.id}`}
              x1={node.x}
              y1={node.y}
              x2={nextNode.x}
              y2={nextNode.y}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-connection-line"
              style={{ animationDelay: `${idx * 0.2}s` }}
            />
          );
        })}
      </svg>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Complete Healthcare Ecosystem
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/95">
            Connecting every aspect of healthcare delivery through intelligent automation and comprehensive support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/rcm-solutions' })}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-h-[44px] font-bold"
            >
              Explore RCM Solutions
            </Button>
          </div>
        </div>

        {/* Interactive Ecosystem Nodes */}
        <div className="relative h-[400px] md:h-[500px] max-w-5xl mx-auto">
          {ecosystemNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => navigate({ to: node.route })}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: node.x, top: node.y }}
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50 animate-ecosystem-node">
                  <span className="text-white text-xs md:text-sm font-semibold text-center px-2">
                    {node.label}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Booking Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-enterprise-blue">
              Book a Demo
            </DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setDemoModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
