import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const phases = [
    {
      number: 1,
      emoji: '1️⃣',
      title: 'Patient Registration & Eligibility Verification',
      objective: 'Ensure correct patient & insurance data before treatment starts.',
      image: '/assets/generated/patient-registration.dim_800x600.png',
      processSteps: [
        'Patient demographic entry',
        'ABHA / Policy ID capture',
        'Scheme verification (TPA / Insurance / Govt panel)',
        'E-card validation (if applicable)',
        'Pre-existing condition check',
      ],
      controlPoints: [
        'ID proof upload',
        'Active policy confirmation',
        'Correct beneficiary details',
      ],
    },
    {
      number: 2,
      emoji: '2️⃣',
      title: 'Financial Clearance & Pre-Authorization',
      objective: 'Secure treatment approval before procedure.',
      image: '/assets/generated/financial-clearance.dim_800x600.png',
      processSteps: [
        'Clinical summary preparation',
        'Tentative package selection',
        'Medical documents upload',
        'Portal submission',
        'Tracking approval status',
      ],
      specialNote: 'For schemes like Ayushman Bharat, Pre-auth must follow package & guideline criteria strictly.',
      controlPoints: [
        'Correct package coding',
        'Clinical justification matching guidelines',
        'Document checklist completeness',
      ],
    },
    {
      number: 3,
      emoji: '3️⃣',
      title: 'Admission & Treatment Documentation',
      objective: 'Maintain complete medico-legal & billing support record.',
      image: '/assets/generated/treatment-documentation.dim_800x600.png',
      documentsRequired: [
        'Admission note',
        'Investigation reports',
        'Doctor daily progress notes',
        'OT notes (if surgery)',
        'Implant stickers (if applicable)',
        'Nursing charts',
      ],
      controlPoints: [
        'Time consistency',
        'Clinical correlation',
        'Avoid over-documentation mismatch',
      ],
    },
    {
      number: 4,
      emoji: '4️⃣',
      title: 'Medical Coding & Package Mapping',
      objective: 'Convert clinical data into billable codes.',
      image: '/assets/generated/medical-coding.dim_800x600.png',
      codingSteps: [
        'ICD coding',
        'Procedure mapping',
        'Package validation',
        'LOS validation (Length of Stay)',
      ],
      controlPoints: [
        'Code vs diagnosis match',
        'No unbundled billing',
        'Scheme rate compliance',
      ],
    },
    {
      number: 5,
      emoji: '5️⃣',
      title: 'Billing & Claim File Preparation',
      objective: 'Prepare clean claim file with zero deficiencies.',
      image: '/assets/generated/billing-preparation.dim_800x600.png',
      claimFileIncludes: [
        'Final bill',
        'Discharge summary',
        'Investigation reports',
        'Implant invoice (if applicable)',
        'Pre-auth approval copy',
      ],
      controlPoints: [
        'Arithmetic accuracy',
        'Same diagnosis everywhere',
        'Proper document indexing',
      ],
    },
    {
      number: 6,
      emoji: '6️⃣',
      title: 'Claim Submission',
      objective: 'Submit claim through appropriate channels.',
      image: '/assets/generated/claim-submission.dim_800x600.png',
      channels: [
        'Insurance Portal',
        'TPA Portal',
        'Govt Scheme Portal',
      ],
      processSteps: [
        'Online upload',
        'Claim ID generation',
        'Acknowledgment tracking',
      ],
      controlPoints: [
        'Submission within timeline',
        'Correct amount declaration',
        'No missing attachment',
      ],
    },
    {
      number: 7,
      emoji: '7️⃣',
      title: 'Query Management',
      objective: 'Prevent rejection & defend claim medically.',
      image: '/assets/generated/query-management.dim_800x600.png',
      processSteps: [
        'Track query timeline',
        'Root cause analysis',
        'Draft structured reply',
        'Upload additional docs',
      ],
      strongReplyStructure: [
        'Clinical necessity',
        'Radiological evidence',
        'Guideline reference',
        'Package justification',
      ],
      controlPoints: [],
    },
    {
      number: 8,
      emoji: '8️⃣',
      title: 'Claim Adjudication & Approval',
      objective: 'Review claim outcomes and validate decisions.',
      image: '/assets/generated/claim-adjudication.dim_800x600.png',
      possibleOutcomes: [
        { label: 'Full approval', variant: 'success' as const },
        { label: 'Partial deduction', variant: 'warning' as const },
        { label: 'Rejection', variant: 'destructive' as const },
      ],
      actionItems: [
        'Deduction analysis',
        'Compare against approved package',
        'Validate medical reasoning',
      ],
      controlPoints: [],
    },
    {
      number: 9,
      emoji: '9️⃣',
      title: 'Payment Posting',
      objective: 'Match approved amount with bank credit.',
      image: '/assets/generated/payment-posting.dim_800x600.png',
      processSteps: [
        'Receive remittance advice',
        'Match claim ID with payment',
        'Post to accounting system',
        'Reconcile deductions',
      ],
      controlPoints: [
        'Amount accuracy',
        'Timely posting',
        'Deduction categorization',
      ],
    },
    {
      number: 10,
      emoji: '🔟',
      title: 'Payment Reconciliation & Closure',
      objective: 'Close the revenue cycle with complete financial clarity.',
      image: '/assets/generated/payment-reconciliation.dim_800x600.png',
      processSteps: [
        'Final reconciliation report',
        'Outstanding AR tracking',
        'Deduction appeal (if needed)',
        'Case closure documentation',
      ],
      controlPoints: [
        'Zero pending claims',
        'All deductions justified',
        'Complete audit trail',
      ],
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev === phases.length - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [autoPlay, phases.length]);

  const handleNext = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      setAutoPlay(false);
    }
  };

  const handlePrev = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
      setAutoPlay(false);
    }
  };

  const currentPhaseData = phases[currentPhase];
  const isLastPhase = currentPhase === phases.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 gradient-text">
              Healthcare Revenue Cycle Management
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Complete 10-Phase Journey from Patient Registration to Payment Closure
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Phase {currentPhase + 1} of {phases.length}
            </span>
            <span className="text-xs sm:text-sm font-medium text-primary">
              {Math.round(((currentPhase + 1) / phases.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary via-secondary to-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Phase Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100">
            {/* Phase Header */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl md:text-5xl shrink-0">{currentPhaseData.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 gradient-text-alt break-words">
                    {currentPhaseData.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                    <span className="text-primary">Objective:</span> {currentPhaseData.objective}
                  </p>
                </div>
              </div>
            </div>

            {/* Phase Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Image */}
                <div className="order-2 md:order-1">
                  <img
                    src={currentPhaseData.image}
                    alt={currentPhaseData.title}
                    className="w-full h-auto rounded-lg shadow-md border border-gray-200 max-w-full"
                  />
                </div>

                {/* Details */}
                <div className="order-1 md:order-2 space-y-4 sm:space-y-6">
                  {/* Process Steps */}
                  {currentPhaseData.processSteps && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Process Steps</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.processSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Documents Required */}
                  {currentPhaseData.documentsRequired && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Documents Required</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.documentsRequired.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Coding Steps */}
                  {currentPhaseData.codingSteps && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Coding Steps</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.codingSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Claim File Includes */}
                  {currentPhaseData.claimFileIncludes && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Claim File Includes</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.claimFileIncludes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Channels */}
                  {currentPhaseData.channels && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Submission Channels</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.channels.map((channel, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{channel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Strong Reply Structure */}
                  {currentPhaseData.strongReplyStructure && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Strong Reply Structure</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.strongReplyStructure.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Possible Outcomes */}
                  {currentPhaseData.possibleOutcomes && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Possible Outcomes</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.possibleOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{outcome.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Items */}
                  {currentPhaseData.actionItems && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">Action Items</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Control Points */}
                  {currentPhaseData.controlPoints && currentPhaseData.controlPoints.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-orange-600">Control Points</h3>
                      <ul className="space-y-2">
                        {currentPhaseData.controlPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-600 shrink-0 mt-2" />
                            <span className="text-sm sm:text-base text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Special Note */}
                  {currentPhaseData.specialNote && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded">
                      <p className="text-xs sm:text-sm text-yellow-800 font-medium">{currentPhaseData.specialNote}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  onClick={handlePrev}
                  disabled={currentPhase === 0}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Phase
                </Button>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Phase {currentPhase + 1} of {phases.length}
                  </p>
                </div>

                {!isLastPhase ? (
                  <Button onClick={handleNext} className="w-full sm:w-auto">
                    Next Phase
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => navigate({ to: '/home' })} className="w-full sm:w-auto">
                    Continue to Home
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
