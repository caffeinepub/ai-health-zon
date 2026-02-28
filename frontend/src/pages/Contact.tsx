import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import Chatbot from '@/components/Chatbot';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function Contact() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91-8696766966',
      action: 'tel:+918696766966',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@aihealthzon.com',
      action: 'mailto:info@aihealthzon.com',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'India',
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-enterprise-grey py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-enterprise-blue">Contact Us</h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Get in touch to learn more about our RCM solutions
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
            Schedule a Call
          </Button>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-20 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-2 border-enterprise-grey hover:border-enterprise-blue/50 transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-enterprise-blue/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-enterprise-blue" />
                  </div>
                  <CardTitle className="text-xl text-enterprise-blue">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.action ? (
                    <a
                      href={info.action}
                      className="text-lg text-gray-700 hover:text-enterprise-blue transition-colors"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-lg text-gray-700">{info.details}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-enterprise-blue">
            Prefer a Demo?
          </h2>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
          >
            Book Now
          </Button>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-enterprise-blue">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Get in Touch Today
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We're here to answer your questions and help you get started
          </p>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
          >
            Contact Us
          </Button>
        </div>
      </section>

      <Chatbot />

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
