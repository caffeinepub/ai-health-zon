import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Target, Eye, Award, Users, Shield, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function AboutUs() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'Building lasting relationships through transparency and ethical practices',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in healthcare delivery and service',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Fostering partnerships across the healthcare ecosystem',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Leveraging technology to transform healthcare accessibility',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-enterprise-grey py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-enterprise-blue">About AI Health Zon</h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Transforming healthcare delivery through technology, collaboration, and excellence
            </p>
          </div>
        </div>
      </section>

      {/* Top CTA */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
          >
            Partner With Us
          </Button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 border-enterprise-grey hover:border-enterprise-blue/50 transition-all duration-200 overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="/assets/generated/about-mission-vision.dim_1200x800.png" 
                  alt="Our Mission" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-enterprise-blue/10 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-enterprise-blue" />
                </div>
                <CardTitle className="text-3xl text-enterprise-blue">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-gray-700">
                  To create a comprehensive healthcare ecosystem that connects patients, professionals, and
                  institutions, making quality healthcare accessible, affordable, and efficient for all Indians.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-enterprise-grey hover:border-enterprise-blue/50 transition-all duration-200 overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="/assets/generated/about-mission-vision.dim_1200x800.png" 
                  alt="Our Vision" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-enterprise-blue/10 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-enterprise-blue" />
                </div>
                <CardTitle className="text-3xl text-enterprise-blue">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-gray-700">
                  To be India's most trusted healthcare platform, revolutionizing the way healthcare services are
                  discovered, delivered, and experienced across the nation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-enterprise-blue">
            Learn How We Can Help
          </h2>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
          >
            Book a Demo
          </Button>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="mb-12 max-w-4xl mx-auto">
            <img 
              src="/assets/generated/about-core-values.dim_1200x800.png" 
              alt="Our Core Values" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 border-enterprise-grey hover:border-enterprise-blue/50 transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-enterprise-blue/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-enterprise-blue" />
                  </div>
                  <CardTitle className="text-xl text-enterprise-blue">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-enterprise-blue">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Revenue Cycle?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us to learn more about our mission and how we can help your organization
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/contact' })}
            className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-enterprise-blue">Book a Demo</DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setDemoModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
