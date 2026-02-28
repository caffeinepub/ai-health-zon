import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function HealthcareJourneyStory() {
  const navigate = useNavigate();

  const journeyStages = [
    {
      phase: 'Discovery',
      title: 'Find the Right Care',
      description: 'Browse our network directory to discover verified hospitals, specialists, and healthcare providers.',
      capabilities: ['Network Directory', 'Network Map', 'Members'],
    },
    {
      phase: 'Registration',
      title: 'Seamless Onboarding',
      description: 'Patient registration with complete demographic and insurance verification.',
      capabilities: ['Phase 1: Registration', 'Clean Claim Intelligence'],
    },
    {
      phase: 'Treatment',
      title: '10-Phase RCM Journey',
      description: 'From clinical evaluation through treatment, surgery, and post-operative care with complete documentation.',
      capabilities: ['Phases 2-9: Clinical to Discharge', 'Knowledge Board'],
    },
    {
      phase: 'Validation',
      title: 'Claim Intelligence',
      description: '10-layer validation ensures every claim is clean, accurate, and denial-proof before submission.',
      capabilities: ['Clean Claim Intelligence', 'Treatment Validation'],
    },
    {
      phase: 'Support',
      title: 'Comprehensive Care',
      description: 'Access 12 support categories from diagnostics to mental health, pharmacy to home healthcare.',
      capabilities: ['Healthcare Support System', 'Ambulance Services'],
    },
    {
      phase: 'Reconciliation',
      title: 'Revenue Recovery',
      description: 'Phase 10 reconciliation with automated payment posting and AR management.',
      capabilities: ['Phase 10: Reconciliation', 'Revenue Optimization'],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-royal-teal/5 via-white to-royal-teal/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-royal-teal">
            The Complete Healthcare Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Follow the patient journey from discovery to recovery—every phase supported by our integrated platform
          </p>
        </div>

        {/* RCM Journey Visual */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/rcm-journey-visual.dim_800x400.png"
              alt="10-Phase RCM Journey"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-teal/80 to-transparent flex items-end">
              <div className="p-8 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  10-Phase Revenue Cycle Management
                </h3>
                <p className="text-white/90 text-lg">
                  From patient registration to final reconciliation—complete visibility and control
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Stages */}
        <div className="max-w-6xl mx-auto space-y-8">
          {journeyStages.map((stage, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="flex-1">
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-royal-teal/20 hover:border-royal-teal/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-bold bg-royal-teal text-white px-3 py-1 rounded-full mr-3">
                      {stage.phase}
                    </span>
                    <h3 className="text-2xl font-bold text-royal-teal">{stage.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">{stage.description}</p>
                  <div className="space-y-2">
                    {stage.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-royal-teal mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-royal-teal text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/rcm-solutions' })}
            className="bg-royal-teal hover:bg-royal-teal/90 text-white min-h-[44px] text-lg px-8"
          >
            Explore the 10-Phase RCM Process <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
