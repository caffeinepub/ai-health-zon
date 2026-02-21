import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function Solutions() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const rcmFeatures = [
    {
      title: 'Pre-authorization & Eligibility',
      description: 'Real-time verification and automated pre-auth processing',
      icon: '/assets/generated/rcm-features.dim_256x256.png',
    },
    {
      title: 'Medical Coding',
      description: 'Accurate coding with AI-powered validation',
      icon: '/assets/generated/rcm-features.dim_256x256.png',
    },
    {
      title: 'Denial Management',
      description: 'Predictive analytics to prevent denials before they occur',
      icon: '/assets/generated/rcm-features.dim_256x256.png',
    },
    {
      title: 'AR Tracking',
      description: 'Real-time accounts receivable monitoring and insights',
      icon: '/assets/generated/rcm-features.dim_256x256.png',
    },
    {
      title: 'Revenue Analytics',
      description: 'Comprehensive dashboards for revenue optimization',
      icon: '/assets/generated/rcm-features.dim_256x256.png',
    },
    {
      title: 'Workflow Automation',
      description: 'End-to-end automation of claim processing',
      icon: '/assets/generated/rcm-features.dim_256x256.png',
    },
  ];

  const problemStatements = [
    {
      icon: AlertCircle,
      title: 'High Denial Rates',
      description: 'Claims denied due to coding errors, missing information, or authorization issues',
    },
    {
      icon: AlertCircle,
      title: 'Payment Delays',
      description: 'Slow reimbursement cycles impacting cash flow and operations',
    },
    {
      icon: AlertCircle,
      title: 'Revenue Leakage',
      description: 'Lost revenue from unbilled services and write-offs',
    },
  ];

  const impactMetrics = [
    { value: '40%', label: 'Reduction in Denials' },
    { value: '30%', label: 'Faster Revenue Recovery' },
    { value: '25%', label: 'Increase in Collections' },
    { value: '50%', label: 'Time Savings' },
  ];

  const faqs = [
    {
      question: 'How does AI Health Zon integrate with existing systems?',
      answer: 'Our platform seamlessly integrates with major HIS/EHR systems through standard APIs and HL7 protocols, ensuring minimal disruption to your existing workflows.',
    },
    {
      question: 'What compliance standards do you support?',
      answer: 'We maintain full compliance with HIPAA, NABH, and other regulatory requirements, with enterprise-grade security and regular audits.',
    },
    {
      question: 'What is the typical ROI timeline?',
      answer: 'Most healthcare organizations see measurable ROI within 3-6 months, with significant improvements in denial rates and revenue recovery.',
    },
    {
      question: 'Do you provide training and support?',
      answer: 'Yes, we offer comprehensive onboarding, training programs, and 24/7 dedicated support from healthcare revenue cycle specialists.',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* RCM Banner */}
      <section id="rcm" className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/assets/generated/solutions-rcm.dim_1200x800.png"
          alt="Revenue Cycle Management"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-enterprise-blue/90 to-enterprise-blue/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                Revenue Cycle Management Solutions
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-white/95">
                Transform your revenue cycle with AI-powered solutions that reduce denials and accelerate revenue recovery
              </p>
              <Button
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 md:py-24 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              The Revenue Cycle Challenge
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Healthcare organizations face mounting pressure to optimize revenue while managing complex billing processes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {problemStatements.map((problem, index) => (
              <Card key={index} className="border-2 border-enterprise-grey hover:border-destructive/50 transition-all duration-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <CardTitle className="text-xl text-enterprise-blue">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              Comprehensive RCM Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              End-to-end revenue cycle management powered by AI and automation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {rcmFeatures.map((feature, index) => (
              <Card key={index} className="border-2 border-enterprise-grey hover:border-enterprise-blue/50 transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 mb-4">
                    <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <CardTitle className="text-lg text-enterprise-blue">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="py-16 md:py-24 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              Streamlined RCM Workflow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our automated workflow ensures efficient processing from patient registration to payment posting
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <img
              src="/assets/generated/rcm-workflow-diagram.dim_1600x900.png"
              alt="RCM Workflow Diagram"
              className="w-full h-auto rounded-lg shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Revenue Impact Metrics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              Measurable Revenue Impact
            </h2>
            <p className="text-lg text-gray-600">Proven results across healthcare organizations</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-enterprise-blue mb-2">{metric.value}</div>
                <div className="text-base text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Get answers to common questions about our RCM solutions</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border-2 border-enterprise-grey rounded-lg px-6">
                  <AccordionTrigger className="text-left text-enterprise-blue font-bold hover:no-underline min-h-[44px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Demo Booking CTA */}
      <section className="py-16 md:py-24 bg-enterprise-blue">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book a demo today and see how our RCM solutions can transform your revenue cycle
          </p>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] text-base font-bold"
          >
            Book a Demo
          </Button>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <img
                src="/assets/generated/solutions-technology.dim_1200x800.png"
                alt="Healthcare Technology"
                className="w-full h-auto rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-enterprise-blue">
                Healthcare Technology
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Advanced technology solutions that integrate seamlessly with your existing systems to enhance efficiency and patient care
              </p>
              <div className="space-y-4">
                {[
                  'AI Dashboards & Analytics',
                  'HIS/EHR Integration',
                  'NABH & Licensing Support',
                  'Telemedicine & Remote Monitoring',
                  'Data Security & Compliance',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-enterprise-blue mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="py-16 md:py-24 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-enterprise-blue">
                Healthcare Connecting Platform
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                A comprehensive network connecting all healthcare stakeholders on a single unified platform for seamless collaboration
              </p>
              <div className="space-y-4">
                {[
                  'Healthcare Workforce',
                  'Emergency & Ambulance Services',
                  'Diagnostics & Labs',
                  'Pharmacies & Medicine Suppliers',
                  'Vendors & Service Providers',
                  'NGOs & Community Support',
                  'Insurance Partners & TPAs',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-enterprise-blue mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/solutions-connecting-platform.dim_1200x800.png"
                alt="Healthcare Connecting Platform"
                className="w-full h-auto rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
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
