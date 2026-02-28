import { useEffect, useState } from 'react';
import { Network, Building2, MapPin, FileCheck, Shield, HeartPulse } from 'lucide-react';

export default function ComprehensiveMetrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('metrics-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const metrics = [
    {
      icon: Network,
      value: '500+',
      label: 'Network Entities',
      description: 'Hospitals, Vendors & NGOs',
      color: 'from-royal-teal to-royal-teal/80',
    },
    {
      icon: MapPin,
      value: '100+',
      label: 'Cities Covered',
      description: 'Pan-India Network',
      color: 'from-royal-teal/90 to-royal-teal/70',
    },
    {
      icon: Building2,
      value: '10',
      label: 'Onboarding Phases',
      description: 'Complete RCM Journey',
      color: 'from-royal-teal/80 to-royal-teal/60',
    },
    {
      icon: FileCheck,
      value: '10',
      label: 'Validation Layers',
      description: 'Clean Claim Intelligence',
      color: 'from-royal-teal/90 to-royal-teal/70',
    },
    {
      icon: Shield,
      value: '8',
      label: 'Treatment Types',
      description: 'Specialized Validation',
      color: 'from-royal-teal/80 to-royal-teal/60',
    },
    {
      icon: HeartPulse,
      value: '12',
      label: 'Support Categories',
      description: 'Healthcare Services',
      color: 'from-royal-teal to-royal-teal/80',
    },
  ];

  return (
    <section id="metrics-section" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-royal-teal">
            Platform at Scale
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive coverage and capabilities across the entire healthcare ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none',
              }}
            >
              <div className={`bg-gradient-to-br ${metric.color} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 metric-value">
                  {metric.value}
                </div>
                <div className="text-xl font-semibold text-white mb-1">{metric.label}</div>
                <div className="text-white/80 text-sm">{metric.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
