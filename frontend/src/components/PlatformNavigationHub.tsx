import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Building2,
  Users,
  Stethoscope,
  Truck,
  Heart,
  FileText,
  Network,
  MapPin,
  Briefcase,
  BookOpen,
  Phone,
  Info,
  ClipboardCheck,
  FileSearch,
  Ambulance,
} from 'lucide-react';

export default function PlatformNavigationHub() {
  const sections = [
    {
      category: 'Core Platform',
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
      ],
    },
    {
      category: 'Network',
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
      category: 'Services',
      items: [
        {
          title: 'Healthcare Support System',
          description: '12 comprehensive support categories for healthcare providers',
          icon: Heart,
          link: '/healthcare-support-system',
        },
        {
          title: 'Ambulance Services',
          description: 'Emergency and non-emergency ambulance network',
          icon: Ambulance,
          link: '/ambulance-services',
        },
        {
          title: 'Vendors & Suppliers',
          description: 'Medical equipment and supply vendors',
          icon: Truck,
          link: '/vendors',
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
      category: 'Join Us',
      items: [
        {
          title: 'Careers',
          description: 'Join our network as a healthcare professional',
          icon: Stethoscope,
          link: '/careers',
        },
        {
          title: 'Vendor Registration',
          description: 'Register as a medical equipment or supply vendor',
          icon: Briefcase,
          link: '/vendors',
        },
      ],
    },
    {
      category: 'Company',
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
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-enterprise-blue">
            Explore Our Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive healthcare solutions organized for easy navigation
          </p>
        </div>

        <div className="space-y-12 max-w-7xl mx-auto">
          {sections.map((section) => (
            <div key={section.category}>
              <h3 className="text-2xl font-bold mb-6 text-enterprise-blue">{section.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.title} to={item.link}>
                      <Card
                        className={`h-full hover:shadow-lg transition-all duration-200 cursor-pointer ${
                          item.featured ? 'border-2 border-primary' : ''
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            {item.featured && (
                              <span className="text-xs font-semibold px-2 py-1 bg-primary text-primary-foreground rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
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
