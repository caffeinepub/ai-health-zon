import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CheckCircle } from 'lucide-react';

export default function ClaimProtocolsSection() {
  const protocols = [
    {
      phase: 1,
      title: 'Patient Registration',
      description: 'Demographic capture, insurance card scanning, eligibility verification',
      steps: [
        'Collect complete patient demographics (name, DOB, address, contact)',
        'Scan and verify insurance cards (front and back)',
        'Perform real-time eligibility verification',
        'Obtain patient consent and HIPAA authorization',
        'Verify coordination of benefits for multiple insurances',
      ],
      requirements: [
        'Valid government-issued ID',
        'Current insurance card(s)',
        'Emergency contact information',
        'Primary care physician details',
      ],
    },
    {
      phase: 2,
      title: 'Insurance Verification',
      description: 'Coverage confirmation, benefit determination, coordination of benefits',
      steps: [
        'Verify active insurance coverage and effective dates',
        'Determine in-network vs. out-of-network benefits',
        'Identify deductible, copay, and coinsurance amounts',
        'Check for coordination of benefits with secondary insurance',
        'Document coverage limitations and exclusions',
      ],
      requirements: [
        'Insurance policy number and group ID',
        'Subscriber information',
        'Coverage effective dates',
        'Prior authorization requirements',
      ],
    },
    {
      phase: 3,
      title: 'Pre-authorization',
      description: 'Medical necessity review, prior authorization submission, approval tracking',
      steps: [
        'Review medical necessity criteria for planned procedures',
        'Gather required clinical documentation',
        'Submit prior authorization request to payer',
        'Track authorization status and follow up',
        'Document authorization number and validity period',
      ],
      requirements: [
        'Clinical notes supporting medical necessity',
        'Diagnosis codes (ICD-10)',
        'Procedure codes (CPT/HCPCS)',
        'Physician orders and treatment plan',
      ],
    },
    {
      phase: 4,
      title: 'Treatment Documentation',
      description: 'Clinical notes, procedure documentation, diagnosis recording',
      steps: [
        'Document all clinical encounters in EHR',
        'Record detailed procedure notes and operative reports',
        'Capture all diagnoses with appropriate specificity',
        'Document medical decision-making and complexity',
        'Ensure provider signatures and attestations',
      ],
      requirements: [
        'Complete history and physical examination',
        'Procedure/operative reports',
        'Progress notes and discharge summaries',
        'Diagnostic test results and imaging reports',
      ],
    },
    {
      phase: 5,
      title: 'Coding & Billing',
      description: 'ICD/CPT code assignment, charge capture, fee schedule application',
      steps: [
        'Assign accurate ICD-10 diagnosis codes',
        'Select appropriate CPT/HCPCS procedure codes',
        'Apply correct modifiers for special circumstances',
        'Capture all billable services and supplies',
        'Apply contracted fee schedules and rates',
      ],
      requirements: [
        'Complete clinical documentation',
        'Current coding guidelines (ICD-10, CPT)',
        'Payer-specific coding requirements',
        'Contracted fee schedules',
      ],
    },
    {
      phase: 6,
      title: 'Claim Submission',
      description: 'Claim generation, scrubbing, electronic submission',
      steps: [
        'Generate claims from billing system',
        'Run claim scrubbing to identify errors',
        'Correct any identified issues or missing information',
        'Submit claims electronically via clearinghouse',
        'Receive and document submission confirmation',
      ],
      requirements: [
        'Clean claim with all required fields',
        'Valid NPI and taxonomy codes',
        'Accurate patient and insurance information',
        'Supporting documentation when required',
      ],
    },
    {
      phase: 7,
      title: 'Payment Posting',
      description: 'Remittance processing, payment allocation, adjustment posting',
      steps: [
        'Receive and review electronic remittance advice (ERA)',
        'Post payments to patient accounts',
        'Apply contractual adjustments',
        'Post denials and identify reasons',
        'Reconcile payments with bank deposits',
      ],
      requirements: [
        'ERA/EOB from insurance payer',
        'Payment batch information',
        'Adjustment reason codes',
        'Denial reason codes',
      ],
    },
    {
      phase: 8,
      title: 'Denial Management',
      description: 'Denial analysis, root cause identification, corrective action',
      steps: [
        'Analyze denial reasons and patterns',
        'Identify root causes (coding, documentation, eligibility)',
        'Determine if denial is correctable or appealable',
        'Implement corrective actions to prevent recurrence',
        'Track denial rates and resolution metrics',
      ],
      requirements: [
        'Denial reason codes and descriptions',
        'Original claim and supporting documentation',
        'Payer policies and guidelines',
        'Appeal deadlines and requirements',
      ],
    },
    {
      phase: 9,
      title: 'Appeals Process',
      description: 'Appeal letter preparation, documentation gathering, resubmission',
      steps: [
        'Review denial and determine appeal strategy',
        'Gather additional supporting documentation',
        'Prepare detailed appeal letter with clinical rationale',
        'Submit appeal within payer deadline',
        'Track appeal status and follow up',
      ],
      requirements: [
        'Original claim and denial notice',
        'Additional clinical documentation',
        'Medical necessity justification',
        'Payer appeal forms and guidelines',
      ],
    },
    {
      phase: 10,
      title: 'Reconciliation',
      description: 'Account balancing, variance analysis, reporting',
      steps: [
        'Reconcile accounts receivable with general ledger',
        'Analyze payment variances and underpayments',
        'Review aging reports and outstanding balances',
        'Generate financial and operational reports',
        'Identify opportunities for revenue optimization',
      ],
      requirements: [
        'Complete payment posting',
        'Aged accounts receivable report',
        'Payer contract terms and rates',
        'Financial reporting requirements',
      ],
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Claim & Treatment Protocols
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Complete workflow from patient registration through reconciliation
            </p>
            <div className="max-w-4xl mx-auto">
              <img
                src="/assets/generated/claim-workflow.dim_800x400.png"
                alt="Claim Workflow Diagram"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Protocol Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {protocols.map((protocol) => (
              <AccordionItem
                key={protocol.phase}
                value={`phase-${protocol.phase}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center text-left">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mr-4 flex-shrink-0">
                      {protocol.phase}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{protocol.title}</h3>
                      <p className="text-sm text-muted-foreground">{protocol.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Steps */}
                    <div>
                      <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-3">
                        Key Steps
                      </h4>
                      <div className="space-y-2">
                        {protocol.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-3">
                        Requirements
                      </h4>
                      <div className="space-y-2">
                        {protocol.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
