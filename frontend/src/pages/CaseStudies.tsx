import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function CaseStudies() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src="/assets/generated/case-studies-hero.dim_1920x600.png"
          alt="Case Studies"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-enterprise-blue/90 to-enterprise-blue/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Case Studies</h1>
            <p className="text-lg sm:text-xl text-white/95 max-w-3xl">
              Discover how healthcare organizations are transforming their revenue cycles with AI Health Zon
            </p>
          </div>
        </div>
      </section>

      {/* Top CTA */}
      <section className="py-12 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
          >
            See How We Can Help You
          </Button>
        </div>
      </section>

      {/* Empty State */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-enterprise-blue">
              Success Stories Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Check back to see how we're helping healthcare providers optimize their revenue cycles and achieve measurable results.
            </p>
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
            >
              Schedule a Consultation to Discuss Your Needs
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-enterprise-blue">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading healthcare organizations transforming their revenue cycles
          </p>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
          >
            Book a Demo
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
