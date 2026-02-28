import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Building2,
  Stethoscope,
  ShoppingBag,
  Heart,
  CheckCircle,
  ArrowRight,
  Network,
  MapPin,
  Users,
  Shield,
  ChevronDown,
  FileText,
  ClipboardCheck,
  FileSearch,
  Ambulance,
  Truck,
  BookOpen,
  Phone,
  Info,
  Briefcase,
} from 'lucide-react';

// ─── Utility: animated counter hook ────────────────────────────────────────
function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

// ─── Utility: intersection observer hook ───────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Ripple button ──────────────────────────────────────────────────────────
interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  to?: string;
}

function RippleButton({ children, className = '', to }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  const inner = (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </button>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {inner}
      </Link>
    );
  }
  return inner;
}

// ─── Stakeholder card ───────────────────────────────────────────────────────
interface StakeholderCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  delay: number;
  inView: boolean;
  imgSrc: string;
}

function StakeholderCard({ icon: Icon, title, description, features, delay, inView, imgSrc }: StakeholderCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-garden-aqua-100 cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, box-shadow 0.3s ease, transform 0.3s ease`,
      }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-garden-aqua-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 ease-out">
          <img src={imgSrc} alt={title} className="w-12 h-12 object-contain" onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }} />
          <Icon className="w-8 h-8 text-royal-teal absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <h3 className="text-xl font-bold text-garden-aqua-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-5 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-garden-green-medium flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Timeline step ──────────────────────────────────────────────────────────
interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  isLast: boolean;
}

function TimelineStep({ step, title, description, icon: Icon, isLast }: TimelineStepProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex gap-6 group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Left: number + line */}
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all duration-300 border-2"
          style={{
            background: hovered ? 'var(--garden-aqua-500)' : 'var(--garden-aqua-100)',
            borderColor: hovered ? 'var(--garden-aqua-500)' : 'var(--garden-aqua-200)',
            color: hovered ? '#fff' : 'var(--garden-aqua-700)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-garden-aqua-300 to-garden-aqua-100 min-h-[40px]" />
        )}
      </div>
      {/* Right: content */}
      <div
        className="pb-10 flex-1 rounded-xl p-4 -mt-1 transition-all duration-300 border"
        style={{
          borderColor: hovered ? 'var(--garden-aqua-400)' : 'transparent',
          background: hovered ? 'var(--garden-aqua-50)' : 'transparent',
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-garden-aqua-500 uppercase tracking-wider">Step {step}</span>
        </div>
        <h4 className="text-lg font-bold text-garden-aqua-800 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Metric card ────────────────────────────────────────────────────────────
interface MetricCardProps {
  icon: React.ElementType;
  target: number;
  suffix: string;
  label: string;
  description: string;
  started: boolean;
  delay: number;
  inView: boolean;
}

function MetricCard({ icon: Icon, target, suffix, label, description, started, delay, inView }: MetricCardProps) {
  const count = useCounter(target, 1500, started);
  return (
    <div
      className="bg-gradient-to-br from-garden-aqua-600 to-garden-aqua-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, box-shadow 0.3s ease`,
      }}
    >
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-5xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-lg font-semibold text-white mb-1">{label}</div>
      <div className="text-white/70 text-sm">{description}</div>
    </div>
  );
}

// ─── SVG Timeline Line ──────────────────────────────────────────────────────
function AnimatedTimelineLine({ inView }: { inView: boolean }) {
  return (
    <svg
      className="absolute left-6 top-0 h-full w-0.5 hidden md:block"
      viewBox="0 0 2 400"
      preserveAspectRatio="none"
      style={{ height: '100%' }}
    >
      <line
        x1="1" y1="0" x2="1" y2="400"
        stroke="var(--garden-aqua-300)"
        strokeWidth="2"
        strokeDasharray="400"
        strokeDashoffset={inView ? 0 : 400}
        style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
      />
    </svg>
  );
}

// ─── Navigation Hub Section ─────────────────────────────────────────────────
interface NavHubItem {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  featured?: boolean;
}

interface NavHubSection {
  category: string;
  color: string;
  items: NavHubItem[];
}

function PagesNavigationHub({ inView }: { inView: boolean }) {
  const sections: NavHubSection[] = [
    {
      category: 'Core Solutions',
      color: 'from-garden-aqua-600 to-garden-aqua-800',
      items: [
        {
          title: 'RCM Solutions',
          description: 'Complete revenue cycle management from registration to payment',
          icon: FileText,
          link: '/rcm-solutions',
          featured: true,
        },
        {
          title: 'Clean Claim Intelligence',
          description: 'AI-powered claim validation across 6 treatment types',
          icon: ClipboardCheck,
          link: '/clean-claim-intelligence',
          featured: true,
        },
        {
          title: 'Document Processing',
          description: 'AI-powered document extraction and processing',
          icon: FileSearch,
          link: '/document-processing',
        },
        {
          title: 'Healthcare Support',
          description: '12 comprehensive support categories for healthcare providers',
          icon: Heart,
          link: '/healthcare-support-system',
        },
      ],
    },
    {
      category: 'Network & Directory',
      color: 'from-garden-aqua-500 to-garden-aqua-700',
      items: [
        {
          title: 'Network Directory',
          description: 'Browse verified healthcare professionals and organizations',
          icon: Users,
          link: '/network-directory',
        },
        {
          title: 'Network Map',
          description: 'Geographic visualization of our healthcare network',
          icon: MapPin,
          link: '/network-map',
        },
        {
          title: 'Members',
          description: 'View all approved network members',
          icon: Network,
          link: '/members',
        },
      ],
    },
    {
      category: 'Join Our Network',
      color: 'from-garden-green-dark to-garden-aqua-700',
      items: [
        {
          title: 'Careers',
          description: 'Join our network as a healthcare professional',
          icon: Stethoscope,
          link: '/careers',
        },
        {
          title: 'Vendors & Suppliers',
          description: 'Register as a medical equipment or supply vendor',
          icon: Truck,
          link: '/vendors',
        },
        {
          title: 'Ambulance Services',
          description: 'Emergency and non-emergency ambulance network',
          icon: Ambulance,
          link: '/ambulance-services',
        },
        {
          title: 'NGO Partnerships',
          description: 'Community health and support organizations',
          icon: Building2,
          link: '/ngo-listing',
        },
      ],
    },
    {
      category: 'Resources',
      color: 'from-garden-aqua-700 to-garden-aqua-900',
      items: [
        {
          title: 'Knowledge Board',
          description: 'Hospital licensing, compliance, and regulatory information',
          icon: BookOpen,
          link: '/knowledge-board',
        },
        {
          title: 'Patient Journey',
          description: 'Document library across 10 healthcare phases',
          icon: FileText,
          link: '/patient-journey',
        },
      ],
    },
    {
      category: 'Company',
      color: 'from-garden-aqua-600 to-garden-green-dark',
      items: [
        {
          title: 'About Us',
          description: 'Our mission, vision, and values',
          icon: Info,
          link: '/about-us',
        },
        {
          title: 'Contact',
          description: 'Get in touch with our team',
          icon: Phone,
          link: '/contact',
        },
        {
          title: 'Vendor Registration',
          description: 'Register as a medical equipment or supply vendor',
          icon: Briefcase,
          link: '/vendors',
        },
      ],
    },
  ];

  return (
    <section
      id="explore"
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #f0fafa 0%, #ffffff 100%)' }}
    >
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'var(--garden-aqua-50)',
              color: 'var(--garden-aqua-700)',
              border: '1px solid var(--garden-aqua-200)',
            }}
          >
            <Network className="w-4 h-4" />
            Complete Platform
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-garden-aqua-800 mb-4">
            Explore All Pages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage, grow, and connect within India's leading healthcare network.
          </p>
        </div>

        <div className="space-y-14 max-w-7xl mx-auto">
          {sections.map((section, sIdx) => (
            <div
              key={section.category}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease-out ${sIdx * 100 + 200}ms, transform 0.6s ease-out ${sIdx * 100 + 200}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${section.color}`} />
                <h3 className="text-xl font-bold text-garden-aqua-800">{section.category}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.link}
                      className="group block"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(16px)',
                        transition: `opacity 0.5s ease-out ${sIdx * 100 + iIdx * 60 + 300}ms, transform 0.5s ease-out ${sIdx * 100 + iIdx * 60 + 300}ms`,
                      }}
                    >
                      <div
                        className={`h-full bg-white rounded-2xl p-6 border border-garden-aqua-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.featured ? 'ring-2 ring-garden-aqua-400' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${section.color} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {item.featured && (
                            <span
                              className="text-xs font-semibold px-2 py-1 rounded-full"
                              style={{
                                background: 'var(--garden-aqua-100)',
                                color: 'var(--garden-aqua-700)',
                              }}
                            >
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-garden-aqua-800 mb-2 group-hover:text-garden-aqua-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-garden-aqua-500 group-hover:gap-2 transition-all">
                          Explore <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function HealthNetworkLanding() {
  // Scroll state
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navSolid, setNavSolid] = useState(false);

  // Section visibility
  const { ref: stakeholdersRef, inView: stakeholdersInView } = useInView();
  const { ref: timelineRef, inView: timelineInView } = useInView();
  const { ref: metricsRef, inView: metricsInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();
  const { ref: exploreRef, inView: exploreInView } = useInView(0.05);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      setNavSolid(sy > 80);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (sy / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stakeholders = [
    {
      icon: Building2,
      title: 'Hospitals',
      imgSrc: '/assets/generated/hospital-icon.dim_64x64.png',
      description: 'Accredited hospitals and healthcare facilities joining a trusted network for streamlined RCM and compliance.',
      features: ['NABH/JCI Accreditation Support', 'RCM Integration', 'Compliance Monitoring', 'Network Visibility'],
    },
    {
      icon: Stethoscope,
      title: 'Healthcare Professionals',
      imgSrc: '/assets/generated/medical-pro-icon.dim_64x64.png',
      description: 'Doctors, nurses, and allied health professionals connecting with verified institutions and career opportunities.',
      features: ['Verified Credentials', 'Career Opportunities', 'Continuing Education', 'Professional Network'],
    },
    {
      icon: ShoppingBag,
      title: 'Vendors & Suppliers',
      imgSrc: '/assets/generated/vendor-icon.dim_64x64.png',
      description: 'Medical equipment, pharmaceutical, and supply chain vendors reaching verified healthcare buyers.',
      features: ['Verified Buyer Access', 'Procurement Matching', 'Compliance Tracking', 'Supply Chain Visibility'],
    },
    {
      icon: Heart,
      title: 'NGOs & Community',
      imgSrc: '/assets/generated/ngo-icon.dim_64x64.png',
      description: 'Non-profit organizations and community health initiatives collaborating with the healthcare ecosystem.',
      features: ['Community Outreach', 'Resource Sharing', 'Impact Reporting', 'Partnership Programs'],
    },
  ];

  const timelineSteps = [
    {
      icon: CheckCircle,
      title: 'Apply Online',
      description: 'Submit your registration request with required credentials and documentation through our secure portal.',
    },
    {
      icon: Shield,
      title: 'Verification',
      description: 'Our team verifies your credentials, licenses, and compliance documentation within 3–5 business days.',
    },
    {
      icon: CheckCircle,
      title: 'Approval',
      description: 'Receive your network approval and access credentials once verification is complete.',
    },
    {
      icon: Network,
      title: 'Onboarding',
      description: 'Complete your profile, connect with network members, and start leveraging the full platform.',
    },
  ];

  const metrics = [
    { icon: Network, target: 500, suffix: '+', label: 'Network Entities', description: 'Hospitals, Vendors & NGOs' },
    { icon: MapPin, target: 100, suffix: '+', label: 'Cities Covered', description: 'Pan-India Network' },
    { icon: Users, target: 10, suffix: '', label: 'Onboarding Phases', description: 'Complete RCM Journey' },
    { icon: Shield, target: 10, suffix: '', label: 'Validation Layers', description: 'Clean Claim Intelligence' },
    { icon: Building2, target: 8, suffix: '', label: 'Treatment Types', description: 'Specialized Validation' },
    { icon: Heart, target: 12, suffix: '', label: 'Support Categories', description: 'Healthcare Services' },
  ];

  const inPageNavLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#stakeholders', label: 'Stakeholders' },
    { href: '#timeline', label: 'Process' },
    { href: '#metrics', label: 'Impact' },
    { href: '#explore', label: 'Explore' },
    { href: '#cta', label: 'Join Us' },
  ];

  return (
    <div className="relative">
      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-1 z-[100] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--garden-aqua-400), var(--garden-green-medium))',
        }}
      />

      {/* ── Sticky In-Page Nav ── */}
      <nav
        className="fixed top-1 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navSolid
            ? 'rgba(255,255,255,0.92)'
            : 'transparent',
          backdropFilter: navSolid ? 'blur(12px)' : 'none',
          boxShadow: navSolid ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <span
            className="font-bold text-lg transition-colors duration-300"
            style={{ color: navSolid ? 'var(--garden-aqua-700)' : '#fff' }}
          >
            Health Network
          </span>
          <div className="hidden md:flex items-center gap-6">
            {inPageNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: navSolid ? 'var(--garden-aqua-700)' : 'rgba(255,255,255,0.9)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link
            to="/careers"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: navSolid ? 'var(--garden-aqua-500)' : 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
          >
            Join Network
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--garden-aqua-800) 0%, var(--garden-aqua-600) 50%, var(--garden-green-dark) 100%)' }}
      >
        {/* Parallax background layer */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/health-network-hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.45}px)`,
            willChange: 'transform',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 bg-white" style={{ filter: 'blur(60px)' }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10 bg-white" style={{ filter: 'blur(40px)' }} />

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  animation: 'heroFadeUp 0.6s ease-out 0.1s both',
                }}
              >
                <Network className="w-4 h-4" />
                India's Trusted Healthcare Network
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ animation: 'heroFadeUp 0.7s ease-out 0.2s both' }}
              >
                Connect. Collaborate.
                <span className="block" style={{ color: 'var(--garden-aqua-200)' }}>
                  Transform Healthcare.
                </span>
              </h1>

              <p
                className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed"
                style={{ animation: 'heroFadeUp 0.7s ease-out 0.35s both' }}
              >
                Join a verified network of 500+ hospitals, healthcare professionals, vendors, and NGOs working together to elevate patient care and streamline operations across India.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{ animation: 'heroFadeUp 0.7s ease-out 0.5s both' }}
              >
                <Link
                  to="/careers"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-garden-aqua-800 bg-white hover:bg-garden-aqua-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Join the Network
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#explore"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border border-white/40 hover:bg-white/10 transition-all duration-200"
                >
                  Explore Platform
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hero illustration */}
            <div
              className="hidden lg:flex justify-center items-center"
              style={{ animation: 'heroFloat 3s ease-in-out infinite' }}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    background: 'radial-gradient(circle, var(--garden-aqua-300) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                <img
                  src="/assets/generated/health-network-hero-illustration.dim_600x500.png"
                  alt="Health Network"
                  className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
            style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STAKEHOLDERS SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="stakeholders"
        ref={stakeholdersRef as React.RefObject<HTMLElement>}
        className="py-20 md:py-28 bg-gradient-to-b from-white to-garden-aqua-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'var(--garden-aqua-50)',
                color: 'var(--garden-aqua-700)',
                border: '1px solid var(--garden-aqua-200)',
              }}
            >
              <Users className="w-4 h-4" />
              Who We Serve
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-garden-aqua-800 mb-4">
              Built for Every Healthcare Stakeholder
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A unified platform designed to serve the complete healthcare ecosystem — from large hospital networks to individual practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {stakeholders.map((s, i) => (
              <StakeholderCard
                key={s.title}
                {...s}
                delay={i * 120}
                inView={stakeholdersInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TIMELINE SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="timeline"
        ref={timelineRef as React.RefObject<HTMLElement>}
        className="py-20 md:py-28"
        style={{ background: 'linear-gradient(180deg, var(--garden-aqua-50) 0%, #ffffff 100%)' }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Left: heading */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'var(--garden-aqua-50)',
                  color: 'var(--garden-aqua-700)',
                  border: '1px solid var(--garden-aqua-200)',
                }}
              >
                <Shield className="w-4 h-4" />
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-garden-aqua-800 mb-6">
                Your Path to Network Membership
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our streamlined onboarding process ensures every member is verified, compliant, and ready to contribute to India's healthcare ecosystem.
              </p>
              <Link
                to="/careers"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'var(--garden-aqua-600)' }}
              >
                Start Your Application
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: timeline */}
            <div className="relative">
              <AnimatedTimelineLine inView={timelineInView} />
              <div className="space-y-0">
                {timelineSteps.map((step, i) => (
                  <TimelineStep
                    key={step.title}
                    step={i + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isLast={i === timelineSteps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          METRICS SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="metrics"
        ref={metricsRef as React.RefObject<HTMLElement>}
        className="py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, var(--garden-aqua-900) 0%, var(--garden-aqua-700) 50%, var(--garden-green-dark) 100%)' }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <Network className="w-4 h-4" />
              Platform Scale
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Impact at Scale
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming healthcare delivery across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {metrics.map((m, i) => (
              <MetricCard
                key={m.label}
                {...m}
                started={metricsInView}
                delay={i * 100}
                inView={metricsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPLORE ALL PAGES SECTION
      ══════════════════════════════════════════════════════════════ */}
      <div ref={exploreRef as React.RefObject<HTMLDivElement>}>
        <PagesNavigationHub inView={exploreInView} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="cta"
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ animation: 'gradientShift 8s ease-in-out infinite' }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--garden-aqua-700) 0%, var(--garden-aqua-500) 40%, var(--garden-green-medium) 100%)',
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 bg-white" style={{ filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 bg-white" style={{ filter: 'blur(80px)', transform: 'translate(30%, 30%)' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Join India's Leading Healthcare Network?
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Whether you're a hospital, healthcare professional, vendor, or NGO — there's a place for you in our verified network. Start your application today.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <RippleButton
                to="/careers"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-garden-aqua-800 bg-white hover:bg-garden-aqua-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base"
              >
                Apply as Professional
                <ArrowRight className="w-5 h-5" />
              </RippleButton>

              <RippleButton
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white border-2 border-white/50 hover:bg-white/10 transition-all duration-200 text-base"
              >
                Contact Us
              </RippleButton>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { label: 'Hospitals', value: '500+' },
                { label: 'Cities', value: '100+' },
                { label: 'Professionals', value: '1000+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
