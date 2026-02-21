import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Onboarding() {
  const [currentPhase, setCurrentPhase] = useState(0);

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

  const phase = phases[currentPhase];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-teal-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Healthcare Revenue Cycle Management
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4">
              Complete 10-Phase Journey from Patient Registration to Payment Closure
            </p>
            <p className="text-base sm:text-lg md:text-xl font-semibold">
              AI Health Zon
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Phase Display */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">All 10 Phases</h2>
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
    </div>
  );
}
