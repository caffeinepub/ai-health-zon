import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Ambulance, FlaskConical, Pill, Home, Brain, Building2, Heart, Shield, FileCheck, GraduationCap, Truck } from 'lucide-react';

export default function HealthcareSupportSystem() {
  const supportCategories = [
    {
      icon: Users,
      title: 'Workforce Support',
      description: 'All clinical & administrative staff',
      details: 'Comprehensive staffing solutions for doctors, nurses, technicians, and administrative personnel'
    },
    {
      icon: Ambulance,
      title: 'Emergency & Ambulance',
      description: 'Services, ICU transport, event support',
      details: '24/7 emergency response, critical care transport, and event medical coverage'
    },
    {
      icon: FlaskConical,
      title: 'Diagnostics & Labs',
      description: 'Pathology, radiology, imaging, home sample collection',
      details: 'Complete diagnostic services with advanced imaging and convenient home collection'
    },
    {
      icon: Pill,
      title: 'Pharmacy & Medicines',
      description: 'Hospital, retail, supply chain',
      details: 'Integrated pharmacy services from hospital to retail with efficient supply chain management'
    },
    {
      icon: Home,
      title: 'Home Healthcare',
      description: 'Home nursing, physiotherapy, elderly care',
      details: 'Professional healthcare services delivered in the comfort of your home'
    },
    {
      icon: Brain,
      title: 'Mental Health & Wellness',
      description: 'Counselors, rehab, psychological support',
      details: 'Comprehensive mental health services including counseling, rehabilitation, and ongoing support'
    },
    {
      icon: Building2,
      title: 'Vendors & Suppliers',
      description: 'Equipment, IT, facility services',
      details: 'Trusted vendors for medical equipment, IT solutions, and facility management'
    },
    {
      icon: Heart,
      title: 'NGOs & Community Support',
      description: 'Blood banks, NGOs, volunteers',
      details: 'Community health initiatives, blood donation drives, and volunteer coordination'
    },
    {
      icon: Shield,
      title: 'Compliance & Quality Support',
      description: 'NABH, licensing, audit support',
      details: 'Expert guidance for accreditation, licensing, and quality compliance'
    },
    {
      icon: FileCheck,
      title: 'Insurance & TPA Coordination',
      description: 'Insurance partners and third-party administrators',
      details: 'Seamless coordination with insurance providers and TPAs for claims processing'
    },
    {
      icon: GraduationCap,
      title: 'Training & Education',
      description: 'Professional development and continuing education',
      details: 'Ongoing training programs for healthcare professionals and staff development'
    },
    {
      icon: Truck,
      title: 'Logistics & Supply Chain',
      description: 'Medical supplies and equipment logistics',
      details: 'Efficient supply chain management for medical supplies and equipment'
    }
  ];

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Healthcare Support System</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Comprehensive support services covering every aspect of healthcare delivery,
            from workforce to logistics, ensuring seamless operations and quality care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-primary mb-3" />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{category.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
