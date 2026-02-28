import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';
import HealthGardenTree from '@/components/HealthGardenTree';
import PlatformNavigationHub from '@/components/PlatformNavigationHub';
import HealthcareJourneyStory from '@/components/HealthcareJourneyStory';
import ComprehensiveMetrics from '@/components/ComprehensiveMetrics';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Health Garden Tree Hero Section */}
      <HealthGardenTree />

      {/* Platform Navigation Hub */}
      <PlatformNavigationHub />

      {/* Healthcare Journey Story */}
      <HealthcareJourneyStory />

      {/* Comprehensive Metrics */}
      <ComprehensiveMetrics />

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-enterprise-blue to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Healthcare Together?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our comprehensive healthcare ecosystem and experience the future of connected care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-h-[44px] font-bold"
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-enterprise-blue">
              Book a Demo
            </DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setDemoModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
