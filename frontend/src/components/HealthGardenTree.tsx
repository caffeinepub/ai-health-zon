import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Heart, Users, Stethoscope, BookOpen, Briefcase, Info } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function HealthGardenTree() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

  const branches = [
    {
      id: 'rcm',
      label: 'RCM Solutions',
      description: 'Complete revenue cycle management',
      route: '/rcm-solutions',
      icon: Stethoscope,
      position: { x: 180, y: 150 },
      color: 'oklch(50% 0.12 195)',
    },
    {
      id: 'network',
      label: 'Network Directory',
      description: 'Verified healthcare professionals',
      route: '/network-directory',
      icon: Users,
      position: { x: 620, y: 130 },
      color: 'oklch(55% 0.14 160)',
    },
    {
      id: 'support',
      label: 'Healthcare Support',
      description: '12 comprehensive support categories',
      route: '/healthcare-support-system',
      icon: Heart,
      position: { x: 120, y: 320 },
      color: 'oklch(60% 0.15 145)',
    },
    {
      id: 'resources',
      label: 'Resources',
      description: 'Knowledge Board & Patient Journey',
      route: '/knowledge-board',
      icon: BookOpen,
      position: { x: 680, y: 300 },
      color: 'oklch(58% 0.13 120)',
    },
    {
      id: 'join',
      label: 'Join Us',
      description: 'Careers & Partnerships',
      route: '/careers',
      icon: Briefcase,
      position: { x: 250, y: 450 },
      color: 'oklch(52% 0.14 180)',
    },
    {
      id: 'company',
      label: 'Company',
      description: 'About Us & Contact',
      route: '/about-us',
      icon: Info,
      position: { x: 550, y: 470 },
      color: 'oklch(48% 0.12 210)',
    },
  ];

  return (
    <section className="relative min-h-[700px] md:min-h-[800px] overflow-hidden bg-gradient-to-br from-garden-sky via-garden-light to-garden-meadow">
      {/* Background Garden Image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="/assets/generated/health-garden-bg.dim_1920x1080.png"
          alt="Health Garden Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-garden-dark">
            Your Healthcare Garden
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-garden-text">
            Where every service grows together in a thriving ecosystem of care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-royal-teal text-white hover:bg-royal-teal/90 min-h-[44px] font-bold"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/rcm-solutions' })}
              className="bg-white/80 border-2 border-royal-teal text-royal-teal hover:bg-white min-h-[44px] font-bold"
            >
              Explore RCM Solutions
            </Button>
          </div>
        </div>

        {/* Health Garden Tree Visualization */}
        <div className="relative max-w-4xl mx-auto h-[500px] md:h-[600px]">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
          >
            <defs>
              {/* Gradient for tree trunk */}
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(35% 0.05 60)" />
                <stop offset="100%" stopColor="oklch(25% 0.04 50)" />
              </linearGradient>

              {/* Glow effect for branches */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Pulse animation for medical symbols */}
              <filter id="pulse">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Tree Trunk */}
            <path
              d="M 380 600 Q 390 500 395 400 Q 398 300 400 200 Q 402 300 405 400 Q 410 500 420 600 Z"
              fill="url(#trunkGradient)"
              stroke="oklch(30% 0.04 55)"
              strokeWidth="2"
            />

            {/* Tree Roots */}
            <path
              d="M 380 600 Q 350 620 320 630 M 420 600 Q 450 620 480 630 M 400 600 Q 400 630 400 650"
              stroke="oklch(30% 0.04 55)"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />

            {/* Branches with organic curves */}
            {branches.map((branch, idx) => {
              const trunkX = 400;
              const trunkY = 400 - idx * 50;
              const isLeft = branch.position.x < 400;
              const controlX = isLeft ? trunkX - 80 : trunkX + 80;
              const controlY = (trunkY + branch.position.y) / 2;

              return (
                <g key={branch.id}>
                  {/* Branch path */}
                  <path
                    d={`M ${trunkX} ${trunkY} Q ${controlX} ${controlY} ${branch.position.x} ${branch.position.y}`}
                    stroke={branch.color}
                    strokeWidth={hoveredBranch === branch.id ? '6' : '4'}
                    fill="none"
                    className="transition-all duration-300 animate-branch-sway"
                    style={{
                      animationDelay: `${idx * 0.3}s`,
                      filter: hoveredBranch === branch.id ? 'url(#glow)' : 'none',
                    }}
                  />

                  {/* Medical pulse line decoration */}
                  <path
                    d={`M ${branch.position.x - 15} ${branch.position.y - 5} l 5 -5 l 5 10 l 5 -15 l 5 10 l 5 -5`}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                    className="animate-pulse"
                    filter="url(#pulse)"
                  />
                </g>
              );
            })}

            {/* Interactive Branch Nodes */}
            {branches.map((branch) => {
              const Icon = branch.icon;
              const isHovered = hoveredBranch === branch.id;

              return (
                <g
                  key={`node-${branch.id}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredBranch(branch.id)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  onClick={() => navigate({ to: branch.route })}
                >
                  {/* Outer glow circle */}
                  {isHovered && (
                    <circle
                      cx={branch.position.x}
                      cy={branch.position.y}
                      r="55"
                      fill={branch.color}
                      opacity="0.2"
                      className="animate-pulse-ring"
                    />
                  )}

                  {/* Main node circle */}
                  <circle
                    cx={branch.position.x}
                    cy={branch.position.y}
                    r={isHovered ? '48' : '42'}
                    fill="white"
                    stroke={branch.color}
                    strokeWidth={isHovered ? '4' : '3'}
                    className="transition-all duration-300"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}
                  />

                  {/* Icon placeholder (will be rendered as HTML overlay) */}
                  <circle
                    cx={branch.position.x}
                    cy={branch.position.y}
                    r="20"
                    fill={branch.color}
                    opacity="0.15"
                  />

                  {/* Medical cross decoration */}
                  <g opacity="0.3">
                    <rect
                      x={branch.position.x - 2}
                      y={branch.position.y - 8}
                      width="4"
                      height="16"
                      fill={branch.color}
                    />
                    <rect
                      x={branch.position.x - 8}
                      y={branch.position.y - 2}
                      width="16"
                      height="4"
                      fill={branch.color}
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* HTML Overlay for Icons and Labels */}
          <div className="absolute inset-0 pointer-events-none">
            {branches.map((branch) => {
              const Icon = branch.icon;
              const isHovered = hoveredBranch === branch.id;

              return (
                <div
                  key={`overlay-${branch.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                  style={{
                    left: `${(branch.position.x / 800) * 100}%`,
                    top: `${(branch.position.y / 600) * 100}%`,
                  }}
                  onMouseEnter={() => setHoveredBranch(branch.id)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  onClick={() => navigate({ to: branch.route })}
                >
                  {/* Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`transition-all duration-300 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    >
                      <Icon
                        className="w-8 h-8 md:w-10 md:h-10"
                        style={{ color: branch.color }}
                      />
                    </div>

                    {/* Label */}
                    <div
                      className={`mt-16 text-center transition-all duration-300 ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-90'
                      }`}
                    >
                      <div
                        className="font-bold text-sm md:text-base mb-1 whitespace-nowrap"
                        style={{ color: branch.color }}
                      >
                        {branch.label}
                      </div>
                      {isHovered && (
                        <div className="text-xs text-garden-text bg-white/90 px-2 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in">
                          {branch.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Booking Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-royal-teal">
              Book a Demo
            </DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setDemoModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
