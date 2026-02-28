import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft, ChevronDown, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import SurgicalProceduresSection from '../components/SurgicalProceduresSection';
import ClaimProtocolsSection from '../components/ClaimProtocolsSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function RCMSolutions() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const phases = [
    {
      number: 1,
      title: 'Patient Registration',
      description: 'Capture complete patient demographics, insurance details, and consent forms',
      image: '/assets/generated/patient-registration.dim_800x600.png',
      keyPoints: [
        'Demographic data collection',
        'Insurance verification',
        'Consent management',
        'Medical history intake',
      ],
    },
    {
      number: 2,
      title: 'Financial Clearance',
      description: 'Verify insurance eligibility and obtain pre-authorization for procedures',
      image: '/assets/generated/financial-clearance.dim_800x600.png',
      keyPoints: [
        'Insurance eligibility check',
        'Pre-authorization requests',
        'Benefit verification',
        'Patient liability estimation',
      ],
    },
    {
      number: 3,
      title: 'Medical Coding',
      description: 'Assign accurate ICD-10, CPT, and HCPCS codes to all services rendered',
      image: '/assets/generated/medical-coding.dim_800x600.png',
      keyPoints: [
        'Diagnosis coding (ICD-10)',
        'Procedure coding (CPT)',
        'Supply coding (HCPCS)',
        'Modifier application',
      ],
    },
    {
      number: 4,
      title: 'Charge Capture',
      description: 'Document all billable services, procedures, and supplies accurately',
      image: '/assets/generated/billing-preparation.dim_800x600.png',
      keyPoints: [
        'Service documentation',
        'Charge entry',
        'Charge reconciliation',
        'Audit trail maintenance',
      ],
    },
    {
      number: 5,
      title: 'Claim Submission',
      description: 'Submit clean claims electronically to insurance payers',
      image: '/assets/generated/claim-submission.dim_800x600.png',
      keyPoints: [
        'Claim scrubbing',
        'Electronic submission',
        'Claim tracking',
        'Submission confirmation',
      ],
    },
    {
      number: 6,
      title: 'Claim Adjudication',
      description: 'Monitor claim status and respond to payer inquiries promptly',
      image: '/assets/generated/claim-adjudication.dim_800x600.png',
      keyPoints: [
        'Status monitoring',
        'Payer correspondence',
        'Documentation requests',
        'Appeal preparation',
      ],
    },
    {
      number: 7,
      title: 'Payment Posting',
      description: 'Record all payments, adjustments, and denials in the system',
      image: '/assets/generated/payment-posting.dim_800x600.png',
      keyPoints: [
        'Payment allocation',
        'Adjustment posting',
        'Denial documentation',
        'EOB reconciliation',
      ],
    },
    {
      number: 8,
      title: 'Denial Management',
      description: 'Analyze denials, identify root causes, and submit appeals',
      image: '/assets/generated/query-management.dim_800x600.png',
      keyPoints: [
        'Denial analysis',
        'Root cause identification',
        'Appeal submission',
        'Process improvement',
      ],
    },
    {
      number: 9,
      title: 'Patient Collections',
      description: 'Manage patient balances and payment plans professionally',
      image: '/assets/generated/payment-reconciliation.dim_800x600.png',
      keyPoints: [
        'Statement generation',
        'Payment plan setup',
        'Collection calls',
        'Financial counseling',
      ],
    },
    {
      number: 10,
      title: 'Reporting & Analytics',
      description: 'Generate insights to optimize revenue cycle performance',
      image: '/assets/generated/revenue-optimization.dim_1200x800.png',
      keyPoints: [
        'KPI dashboards',
        'Trend analysis',
        'Performance metrics',
        'Revenue forecasting',
      ],
    },
  ];

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

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const prevPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const phase = phases[currentPhase];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
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
              <p className="text-lg sm:text-xl mb-4 text-white/95">
                Complete 10-Phase Journey from Patient Registration to Payment Closure
              </p>
              <p className="text-base sm:text-lg font-semibold mb-8 text-white">
                AI Health Zon
              </p>
              
              {/* Quick Navigation */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => scrollToSection('phase-walkthrough')}
                  variant="secondary"
                  className="min-h-[44px]"
                >
                  10-Phase Walkthrough
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => scrollToSection('rcm-features')}
                  variant="secondary"
                  className="min-h-[44px]"
                >
                  RCM Features
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setDemoModalOpen(true)}
                  className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
                >
                  Book a Demo
                </Button>
              </div>
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

      {/* Interactive Phase Display */}
      <section id="phase-walkthrough" className="py-12 md:py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-enterprise-blue">Interactive Phase Walkthrough</h2>
            <p className="text-lg text-gray-600">
              Navigate through each phase of the revenue cycle management process
            </p>
          </div>

          {/* Phase Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Phase {phase.number} of {phases.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round((phase.number / phases.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(phase.number / phases.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Phase Content */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Image */}
                <div className="order-1">
                  <img
                    src={phase.image}
                    alt={phase.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="order-2 space-y-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                      Phase {phase.number}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">{phase.title}</h2>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                      Key Activities
                    </h3>
                    {phase.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
                <Button
                  onClick={prevPhase}
                  disabled={currentPhase === 0}
                  variant="outline"
                  className="flex-1 min-h-[44px]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Phase
                </Button>
                <Button
                  onClick={nextPhase}
                  disabled={currentPhase === phases.length - 1}
                  className="flex-1 min-h-[44px]"
                >
                  Next Phase
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Phase Grid Overview */}
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-enterprise-blue">All 10 Phases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {phases.map((p, idx) => (
                <button
                  key={p.number}
                  onClick={() => setCurrentPhase(idx)}
                  className={`p-4 rounded-lg border-2 transition-all text-left min-h-[100px] ${
                    currentPhase === idx
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl font-bold text-primary mb-1">{p.number}</div>
                  <div className="text-sm font-medium line-clamp-2">{p.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RCM Features */}
      <section id="rcm-features" className="py-16 md:py-24 bg-enterprise-grey scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              Comprehensive RCM Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              End-to-end revenue cycle management powered by AI and automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rcmFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 mb-4">
                    <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="text-xl text-enterprise-blue">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
              Measurable Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real results from healthcare organizations using our RCM solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm md:text-base text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surgical Procedures Section */}
      <div id="surgical-procedures" className="scroll-mt-20">
        <SurgicalProceduresSection />
      </div>

      {/* Claim Protocols Section */}
      <div id="claim-protocols" className="scroll-mt-20">
        <ClaimProtocolsSection />
      </div>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-enterprise-blue">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our RCM solutions
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-white border rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-left">
                    <span className="font-semibold text-enterprise-blue">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-enterprise-blue to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Revenue Cycle?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Schedule a demo to see how AI Health Zon can optimize your revenue cycle management
          </p>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] font-bold"
          >
            Book a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
