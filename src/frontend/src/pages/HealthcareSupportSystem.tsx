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
      image: '/assets/generated/support-workforce.dim_500x400.png',
      title: 'Workforce Support',
      description: 'Connect with skilled healthcare professionals including doctors, nurses, radiologists, physiotherapists, dietitians, medical coders, RCM staff, insurance coordinators, security personnel, housekeeping, and administrative staff.',
      services: ['Clinical Staff', 'Non-Clinical Staff', 'Administrative Support', 'Specialized Professionals']
    },
    {
      icon: Ambulance,
      image: '/assets/generated/support-emergency.dim_500x400.png',
      title: 'Emergency & Ambulance',
      description: '24/7 emergency response services with advanced life support ambulances, basic life support units, and specialized patient transport vehicles.',
      services: ['Emergency Response', 'ICU Transport', 'Inter-facility Transfer', 'Air Ambulance']
    },
    {
      icon: FlaskConical,
      image: '/assets/generated/support-diagnostics.dim_500x400.png',
      title: 'Diagnostics & Labs',
      description: 'Comprehensive diagnostic services including pathology, radiology, imaging centers, and specialized testing facilities.',
      services: ['Pathology Labs', 'Radiology Centers', 'Imaging Services', 'Specialized Tests']
    },
    {
      icon: Pill,
      image: '/assets/generated/support-pharmacy.dim_500x400.png',
      title: 'Pharmacy & Medicines',
      description: 'Access to hospital pharmacies, retail pharmacies, medicine suppliers, and pharmaceutical distributors.',
      services: ['Hospital Pharmacy', 'Retail Pharmacy', 'Medicine Suppliers', 'Drug Distribution']
    },
    {
      icon: Home,
      image: '/assets/generated/support-home-health.dim_500x400.png',
      title: 'Home Healthcare',
      description: 'Professional home healthcare services including nursing care, physiotherapy, elderly care, and post-operative support.',
      services: ['Home Nursing', 'Physiotherapy', 'Elderly Care', 'Post-Op Care']
    },
    {
      icon: Brain,
      image: '/assets/generated/support-mental-health.dim_500x400.png',
      title: 'Mental Health & Wellness',
      description: 'Mental health support services including counseling, therapy, psychiatric care, and wellness programs.',
      services: ['Counseling', 'Therapy', 'Psychiatric Care', 'Wellness Programs']
    },
    {
      icon: Package,
      image: '/assets/generated/support-vendors.dim_500x400.png',
      title: 'Vendors & Suppliers',
      description: 'Medical equipment suppliers, IT solution providers, facility management services, and healthcare technology vendors.',
      services: ['Medical Equipment', 'IT Solutions', 'Facility Management', 'Technology Vendors']
    },
    {
      icon: Heart,
      image: '/assets/generated/support-ngos.dim_500x400.png',
      title: 'NGOs & Community Support',
      description: 'Healthcare NGOs, blood banks, relief organizations, and community health programs working for public welfare.',
      services: ['Health NGOs', 'Blood Banks', 'Relief Organizations', 'Community Programs']
    },
    {
      icon: Shield,
      image: '/assets/generated/support-compliance.dim_500x400.png',
      title: 'Compliance & Quality Support',
      description: 'NABH accreditation support, quality audits, compliance management, and regulatory consulting services.',
      services: ['NABH Support', 'Quality Audits', 'Compliance Management', 'Regulatory Consulting']
    },
    {
      icon: FileCheck,
      image: '/assets/generated/support-insurance.dim_500x400.png',
      title: 'Insurance & TPA Coordination',
      description: 'Insurance partners, third-party administrators, claims processing support, and cashless treatment facilitation.',
      services: ['Insurance Partners', 'TPA Services', 'Claims Processing', 'Cashless Treatment']
    },
    {
      icon: GraduationCap,
      image: '/assets/generated/support-training.dim_500x400.png',
      title: 'Training & Education',
      description: 'Medical training programs, continuing education, skill development workshops, and certification courses.',
      services: ['Medical Training', 'Continuing Education', 'Skill Development', 'Certification Programs']
    },
    {
      icon: Truck,
      image: '/assets/generated/support-logistics.dim_500x400.png',
      title: 'Logistics & Supply Chain',
      description: 'Healthcare logistics, cold chain management, medical waste disposal, and supply chain optimization services.',
      services: ['Healthcare Logistics', 'Cold Chain', 'Waste Management', 'Supply Chain']
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Healthcare Support System
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Comprehensive support services connecting all stakeholders in the healthcare ecosystem
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/about' })}>
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-vibrant">
              12 Essential Support Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connecting healthcare providers with essential services and support systems
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-12">
            {supportCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  {index % 2 === 0 ? (
                    <>
                      <div className="relative h-64 md:h-auto">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8">
                        <CardHeader className="p-0 mb-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                              <category.icon className="w-7 h-7 text-primary" />
                            </div>
                            <CardTitle className="text-2xl md:text-3xl gradient-text-alt">
                              {category.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <CardDescription className="text-base mb-6 leading-relaxed">
                            {category.description}
                          </CardDescription>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {category.services.map((service, idx) => (
                              <div key={idx} className="flex items-center text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                                <span className="text-muted-foreground">{service}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            onClick={() => handleInterestClick(category.title)}
                            className="w-full sm:w-auto"
                          >
                            Show Interest to Join
                          </Button>
                        </CardContent>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-8 order-2 md:order-1">
                        <CardHeader className="p-0 mb-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                              <category.icon className="w-7 h-7 text-primary" />
                            </div>
                            <CardTitle className="text-2xl md:text-3xl gradient-text-alt">
                              {category.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <CardDescription className="text-base mb-6 leading-relaxed">
                            {category.description}
                          </CardDescription>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {category.services.map((service, idx) => (
                              <div key={idx} className="flex items-center text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                                <span className="text-muted-foreground">{service}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            onClick={() => handleInterestClick(category.title)}
                            className="w-full sm:w-auto"
                          >
                            Show Interest to Join
                          </Button>
                        </CardContent>
                      </div>
                      <div className="relative h-64 md:h-auto order-1 md:order-2">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Connect with Healthcare Support Services?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our comprehensive network and access all the support services you need
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/directory' })}>
                Browse Network
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/contact' })}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
