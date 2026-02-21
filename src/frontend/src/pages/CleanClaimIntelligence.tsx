import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { CheckCircle2, Shield, Globe, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import DemoBookingForm from '../components/DemoBookingForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function CleanClaimIntelligence() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const validationLayers = [
    {
      number: 1,
      title: 'Patient Identity & Eligibility Intelligence',
      subtitle: 'Ensures claims originate from valid, eligible beneficiaries.',
      features: [
        'Multi-ID & demographic verification',
        'Active policy & coverage validation',
        'Duplicate admission detection',
        'Prior utilization & exhaustion checks',
        'Beneficiary misuse indicators',
      ],
    },
    {
      number: 2,
      title: 'Pre-Authorization & Policy Logic Engine',
      subtitle: 'Prevents denials caused by policy violations.',
      features: [
        'Coverage & exclusion interpretation',
        'Package & STG eligibility checks',
        'Co-pay / sub-limit logic',
        'Frequency & waiting-period rules',
        'Predictive denial alerts',
      ],
    },
    {
      number: 3,
      title: 'Clinical Validity & Medical Necessity Engine',
      subtitle: 'Protects claims using clinical reasoning — not just codes.',
      features: [
        'Diagnosis ↔ procedure validation',
        'Length-of-stay benchmarking',
        'Drug & investigation relevance checks',
        'ICU necessity evaluation',
        'Suspicious treatment pattern detection',
      ],
    },
    {
      number: 4,
      title: 'Medical Coding & Classification Integrity',
      subtitle: 'Eliminates coding-driven rejections.',
      features: [
        'ICD ↔ procedure consistency',
        'Deprecated / mismatched code detection',
        'Unbundling & modifier abuse prevention',
        'Duplicate / conflicting codes',
        'Coding anomaly models',
      ],
    },
    {
      number: 5,
      title: 'Treatment & Billing Consistency Controls',
      subtitle: 'Controls overbilling & tariff violations.',
      features: [
        'Scheme tariff enforcement',
        'Mutually exclusive billing prevention',
        'High-value medicine profiling',
        'Split billing detection',
        'Billing ↔ discharge alignment',
      ],
    },
    {
      number: 6,
      title: 'Documentation & Record Integrity Validation',
      subtitle: 'Stops documentation-based claim failures.',
      features: [
        'Mandatory record completeness checks',
        'Consent ↔ procedure validation',
        'Signature / timestamp consistency',
        'Missing / inconsistent documents detection',
        'Audit-defense readiness',
      ],
    },
    {
      number: 7,
      title: 'Claim Lifecycle & Aging Intelligence',
      subtitle: 'Improves settlements & cash flow performance.',
      features: [
        'Aging bucket monitoring',
        'Settlement delay predictors',
        'Escalation & follow-up automation',
        'Rejection root-cause analytics',
        'Settlement probability scoring',
      ],
    },
    {
      number: 8,
      title: 'Advanced Fraud & Abuse Analytics',
      subtitle: 'Detects patterns invisible to manual review.',
      features: [
        'Duplicate & ghost billing detection',
        'Upcoding & manipulation analysis',
        'Provider behavior deviation profiling',
        'Policy-end abuse monitoring',
        'Network-level fraud signals',
      ],
    },
    {
      number: 9,
      title: 'Financial Accuracy & Leakage Prevention',
      subtitle: 'Protects hospital & payer financial integrity.',
      features: [
        'Charge ↔ package ↔ policy alignment',
        'Excess billing detection',
        'Rate card compliance',
        'Financial risk scoring',
        'Automated audit reports',
      ],
    },
    {
      number: 10,
      title: 'Compliance & Regulatory Safeguards',
      subtitle: 'Strengthens audit & legal defensibility.',
      features: [
        'Scheme / STG compliance monitoring',
        'Policy clause enforcement',
        'Medico-legal risk indicators',
        'High-risk claim categorization',
        'Compliance dashboards',
      ],
    },
  ];

  const differentiators = [
    'Rejection Prevention Intelligence',
    'Clinical + Financial + Policy-Aware Validation',
    'Predictive Denial & Risk Models',
    'AI-Driven Fraud Detection',
    'Audit & Compliance Protection',
  ];

  const businessImpacts = [
    { title: 'Higher claim approval rates', icon: CheckCircle2 },
    { title: 'Reduced rejection & resubmission cycles', icon: CheckCircle2 },
    { title: 'Faster settlements & improved cash flow', icon: CheckCircle2 },
    { title: 'Lower audit exposure', icon: CheckCircle2 },
    { title: 'Controlled billing leakage', icon: CheckCircle2 },
    { title: 'Stronger compliance posture', icon: CheckCircle2 },
  ];

  const stakeholders = [
    'Hospitals & Medical Colleges',
    'Multi-hospital Chains',
    'TPAs & Insurers',
    'Government Health Schemes',
    'Claim Processing Units',
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/claim-intelligence-hero.dim_1200x600.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#006B7D]/95 to-[#006B7D]/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI HEALTH ZON – AI-Driven Clean Claim Intelligence System
            </h1>
            <p className="text-2xl md:text-3xl text-white font-semibold mb-8">
              Maximize Approvals. Eliminate Rejections. Prevent Claim Losses.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              Healthcare claim rejections, payment delays, and fraud risks silently erode hospital revenues.
              AI HEALTH ZON delivers an advanced AI-powered Clean Claim & Risk Control System designed to ensure 
              clinical validity, billing accuracy, policy compliance, and fraud prevention — before claims reach the payer.
            </p>
          </div>
        </div>
      </section>

      {/* Why Hospitals Lose Revenue */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B7D] mb-6">
              Why Hospitals Lose Revenue
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Healthcare claim rejections, payment delays, and fraud risks silently erode hospital revenues.
              Hospitals typically face:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#006B7D] font-bold mt-1">•</span>
                <span>Preventable claim rejections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B7D] font-bold mt-1">•</span>
                <span>Billing & coding errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B7D] font-bold mt-1">•</span>
                <span>Policy & package mismatches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B7D] font-bold mt-1">•</span>
                <span>Delayed settlements & cash flow gaps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B7D] font-bold mt-1">•</span>
                <span>Documentation deficiencies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B7D] font-bold mt-1">•</span>
                <span>Undetected fraud & abuse patterns</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 mt-6 font-medium">
              Even small errors can trigger denials, audits, or payment reductions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[#006B7D] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl text-[#006B7D]">Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-gray-700">
                <p className="leading-relaxed">
                  <strong>AI HEALTH ZON Clean Claim Intelligence System</strong> is a multi-layer validation & decision 
                  engine that transforms claim processing from manual verification → AI-driven intelligence.
                </p>
                <p className="leading-relaxed">
                  Instead of simply flagging errors, the system <strong>predicts, prevents, and corrects</strong> risks 
                  across the entire claim lifecycle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Validation & Intelligence Layers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B7D] mb-8 text-center">
              Core Validation & Intelligence Layers
            </h2>
            
            {/* Diagram Image */}
            <div className="mb-12 flex justify-center">
              <img
                src="/assets/generated/validation-layers-diagram.dim_800x600.png"
                alt="Validation Layers Diagram"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {validationLayers.map((layer) => (
                <AccordionItem
                  key={layer.number}
                  value={`layer-${layer.number}`}
                  className="border border-gray-200 rounded-lg px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-start gap-4 text-left">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#006B7D] text-white flex items-center justify-center font-bold text-lg">
                        {layer.number}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-[#003366] mb-1">
                          {layer.title}
                        </h3>
                        <p className="text-sm text-gray-600">{layer.subtitle}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6">
                    <ul className="space-y-3 ml-14">
                      {layer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#006B7D] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* What Makes AI HEALTH ZON Different */}
      <section className="py-16 bg-gradient-to-br from-[#006B7D] to-[#004d5a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/assets/generated/validation-security-icon.dim_256x256.png"
                alt="Security Icon"
                className="h-24 w-24"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              What Makes AI HEALTH ZON Different
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Unlike traditional validation tools, AI HEALTH ZON provides:
            </p>
            <div className="space-y-4 mb-8">
              {differentiators.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3 text-white">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-2xl font-bold text-white bg-white/10 py-4 px-6 rounded-lg inline-block">
              We move beyond error detection toward decision intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Business Impact for Hospitals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B7D] mb-6 text-center">
              Business Impact for Hospitals
            </h2>
            <p className="text-lg text-gray-700 mb-10 text-center">
              Hospitals using intelligent claim validation typically achieve:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessImpacts.map((impact, idx) => (
                <Card key={idx} className="border-t-4 border-t-[#006B7D] shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <impact.icon className="h-6 w-6 text-[#006B7D] flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-700 font-medium">{impact.title}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B7D] mb-8 text-center">
              Who Benefits
            </h2>
            <div className="space-y-4">
              {stakeholders.map((stakeholder, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-[#006B7D] flex-shrink-0" />
                  <span className="text-lg text-gray-700 font-medium">{stakeholder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#006B7D] to-[#004d5a]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Transform Claim Processing into a Revenue Protection System
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Stop losing revenue to preventable errors and hidden risks. Deploy an AI-driven Clean Claim Intelligence 
              System built for modern healthcare finance.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#006B7D] hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              onClick={() => setShowDemoModal(true)}
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B7D] mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-700 mb-8 font-semibold">
              AI HEALTH ZON
            </p>
            <p className="text-lg text-gray-600 mb-8">
              AI-Powered Smart Claim Intelligence
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Globe className="h-6 w-6 text-[#006B7D]" />
                <span className="text-gray-700">Website:</span>
                <a
                  href="https://www.aihealthzon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#006B7D] hover:underline font-medium"
                >
                  www.aihealthzon.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-[#006B7D]" />
                <span className="text-gray-700">Email:</span>
                <a
                  href="mailto:info@aihealthzon.com"
                  className="text-[#006B7D] hover:underline font-medium"
                >
                  info@aihealthzon.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-6 w-6 text-[#006B7D]" />
                <span className="text-gray-700">Contact:</span>
                <a
                  href="tel:8233393456"
                  className="text-[#006B7D] hover:underline font-medium"
                >
                  8233393456
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book a Demo</DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
