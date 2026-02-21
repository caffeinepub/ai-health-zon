import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { 
  Users, Ambulance, FlaskConical, Pill, Home, Brain, 
  Package, Heart, Shield, FileCheck, GraduationCap, Truck 
} from 'lucide-react';

export default function HealthcareSupportSystem() {
  const navigate = useNavigate();

  const handleInterestClick = (categoryTitle: string) => {
    switch (categoryTitle) {
      case 'Workforce Support':
        navigate({ to: '/careers' });
        break;
      case 'Vendors & Suppliers':
        navigate({ to: '/vendors' });
        break;
      case 'NGOs & Community Support':
        navigate({ to: '/ngos' });
        break;
      case 'Emergency & Ambulance':
        navigate({ to: '/ambulance' });
        break;
      default:
        toast.success(`Thank you for your interest in ${categoryTitle}!`, {
          description: 'We will reach out to you soon with more information.',
        });
        break;
    }
  };

  const supportCategories = [
    {
      icon: Users,
      image: '/assets/generated/workforce-support.dim_1200x800.png',
      title: 'Workforce Support',
      description: 'Connect with skilled healthcare professionals including doctors, nurses, radiologists, physiotherapists, dietitians, medical coders, RCM staff, insurance coordinators, security personnel, housekeeping, and administrative staff.',
      services: ['Clinical Staff', 'Non-Clinical Staff', 'Administrative Support', 'Specialized Professionals']
    },
    {
      icon: Ambulance,
      image: '/assets/generated/emergency-ambulance.dim_1200x800.png',
      title: 'Emergency & Ambulance',
      description: '24/7 emergency response services with advanced life support ambulances, basic life support units, and specialized patient transport vehicles.',
      services: ['Emergency Response', 'ICU Transport', 'Inter-facility Transfer', 'Air Ambulance']
    },
    {
      icon: FlaskConical,
      image: '/assets/generated/diagnostics-labs.dim_1200x800.png',
      title: 'Diagnostics & Labs',
      description: 'Comprehensive diagnostic services including pathology, radiology, imaging centers, and specialized testing facilities.',
      services: ['Pathology Labs', 'Radiology Centers', 'Imaging Services', 'Specialized Tests']
    },
    {
      icon: Pill,
      image: '/assets/generated/pharmacy-medicines.dim_1200x800.png',
      title: 'Pharmacy & Medicines',
      description: 'Access to hospital pharmacies, retail pharmacies, medicine suppliers, and pharmaceutical distributors.',
      services: ['Hospital Pharmacy', 'Retail Pharmacy', 'Medicine Suppliers', 'Drug Distribution']
    },
    {
      icon: Home,
      image: '/assets/generated/home-healthcare.dim_1200x800.png',
      title: 'Home Healthcare',
      description: 'Professional home healthcare services including nursing care, physiotherapy, medical equipment rental, and patient monitoring.',
      services: ['Home Nursing', 'Physiotherapy', 'Medical Equipment', 'Patient Monitoring']
    },
    {
      icon: Brain,
      image: '/assets/generated/mental-health-wellness.dim_1200x800.png',
      title: 'Mental Health & Wellness',
      description: 'Comprehensive mental health services including counseling, therapy, psychiatric care, and wellness programs.',
      services: ['Counseling', 'Therapy', 'Psychiatric Care', 'Wellness Programs']
    },
    {
      icon: Package,
      image: '/assets/generated/vendors-suppliers.dim_1200x800.png',
      title: 'Vendors & Suppliers',
      description: 'Medical equipment suppliers, pharmaceutical distributors, IT solutions providers, and facility management services.',
      services: ['Medical Equipment', 'Pharmaceuticals', 'IT Solutions', 'Facility Management']
    },
    {
      icon: Heart,
      image: '/assets/generated/ngos-community-support.dim_1200x800.png',
      title: 'NGOs & Community Support',
      description: 'Non-profit organizations providing healthcare access, patient support, health education, and community wellness programs.',
      services: ['Patient Support', 'Health Education', 'Community Programs', 'Advocacy']
    },
    {
      icon: Shield,
      image: '/assets/generated/insurance-tpa-coordination.dim_1200x800.png',
      title: 'Insurance & TPA Coordination',
      description: 'Health insurance providers, third-party administrators, and claims processing services.',
      services: ['Health Insurance', 'TPA Services', 'Claims Processing', 'Policy Management']
    },
    {
      icon: FileCheck,
      image: '/assets/generated/compliance-quality-support.dim_1200x800.png',
      title: 'Compliance & Quality Support',
      description: 'Healthcare compliance management, quality assurance, accreditation support, and regulatory guidance services.',
      services: ['Compliance Management', 'Quality Assurance', 'Accreditation Support', 'Regulatory Guidance']
    },
    {
      icon: GraduationCap,
      image: '/assets/generated/training-education.dim_1200x800.png',
      title: 'Training & Education',
      description: 'Medical training programs, continuing education, skill development, and certification courses.',
      services: ['Medical Training', 'Continuing Education', 'Skill Development', 'Certifications']
    },
    {
      icon: Truck,
      image: '/assets/generated/logistics-supply-chain.dim_1200x800.png',
      title: 'Logistics & Supply Chain',
      description: 'Medical supply logistics, cold chain management, sample transportation, and equipment delivery services.',
      services: ['Supply Chain', 'Cold Chain', 'Sample Transport', 'Equipment Delivery']
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Healthcare Support System
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Comprehensive ecosystem connecting all healthcare stakeholders for seamless collaboration and improved patient outcomes
            </p>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                12 Essential Support Categories
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive network of healthcare services and join the ecosystem that's transforming healthcare delivery
              </p>
            </div>

            <div className="space-y-8">
              {supportCategories.map((category, index) => {
                const Icon = category.icon;
                const isEven = index % 2 === 0;

                return (
                  <Card key={category.title} className="overflow-hidden">
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${isEven ? '' : 'md:grid-flow-dense'}`}>
                      {/* Image */}
                      <div className={`relative h-64 md:h-auto ${isEven ? '' : 'md:col-start-2'}`}>
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className={`p-6 md:p-8 flex flex-col justify-center ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-primary/10 rounded-lg mr-4">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold">{category.title}</h3>
                        </div>

                        <p className="text-muted-foreground mb-6">
                          {category.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">
                            Key Services
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {category.services.map((service) => (
                              <div key={service} className="flex items-center text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                                {service}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleInterestClick(category.title)}
                          className="w-full md:w-auto"
                        >
                          Show Interest to Join
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Healthcare Network?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with hospitals, professionals, and service providers across the healthcare ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => navigate({ to: '/network-directory' })}>
                Explore Network Directory
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/contact' })} className="bg-transparent border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
