import { useState } from 'react';
import TreatmentCard from './TreatmentCard';
import TreatmentChecklistModal from './TreatmentChecklistModal';
import { Activity, Scissors, Zap, Droplet, CircleDot, Stethoscope } from 'lucide-react';

interface ChecklistItem {
  title: string;
  description: string;
  validationCriteria: string[];
}

interface TreatmentData {
  icon: typeof Activity;
  title: string;
  description: string;
  bulletPoints: string[];
  footerTag: string;
  hoverBenefit: string;
  checklistDetails: ChecklistItem[];
}

export default function TreatmentValidationCards() {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const treatments: TreatmentData[] = [
    {
      icon: Activity,
      title: 'ICU Clean Claims',
      description: 'Critical care claims validated daily with clinical justification and ICU-specific documentation.',
      bulletPoints: [
        'ICU admission & daily progress notes',
        'Ventilator & ABG validation',
        'ICU LOS vs package mapping',
        'Photo & timestamp evidence',
      ],
      footerTag: 'Prevents: ICU day cuts & ventilator denials',
      hoverBenefit: 'Eliminates ICU day disputes with photo-verified evidence and complete clinical documentation',
      checklistDetails: [
        {
          title: 'ICU Admission Justification',
          description: 'Validate clinical necessity for ICU admission with supporting documentation',
          validationCriteria: [
            'ICU admission note with clinical indication',
            'Severity scoring (APACHE/SOFA) if applicable',
            'Consultant approval for ICU admission',
            'Initial vital signs and clinical parameters',
          ],
        },
        {
          title: 'Daily Progress Documentation',
          description: 'Ensure comprehensive daily monitoring and treatment records',
          validationCriteria: [
            'Daily progress notes by intensivist',
            'Vital signs monitoring charts',
            'Medication administration records',
            'Nursing care documentation',
          ],
        },
        {
          title: 'Ventilator Support Validation',
          description: 'Document mechanical ventilation necessity and parameters',
          validationCriteria: [
            'Ventilator settings and mode documentation',
            'ABG reports justifying ventilation',
            'Weaning protocol records',
            'Extubation criteria assessment',
          ],
        },
      ],
    },
    {
      icon: Scissors,
      title: 'Surgical / Operative Claims',
      description: 'End-to-end validation of surgical procedures from pre-op to discharge.',
      bulletPoints: [
        'Pre-op assessment & consent',
        'OT notes & surgeon details',
        'Implant & consumable checks',
        'Post-op documentation',
      ],
      footerTag: 'Prevents: Procedure downgrades & OT objections',
      hoverBenefit: 'Prevents procedure downgrades with complete OT documentation and implant verification',
      checklistDetails: [
        {
          title: 'Pre-operative Assessment',
          description: 'Complete pre-surgical evaluation and clearance documentation',
          validationCriteria: [
            'Pre-anesthetic evaluation report',
            'Fitness certificate from physician',
            'Informed consent with procedure details',
            'Pre-operative investigations (CBC, ECG, X-ray)',
          ],
        },
        {
          title: 'Operative Documentation',
          description: 'Comprehensive intra-operative records and surgeon notes',
          validationCriteria: [
            'Detailed operative notes by surgeon',
            'Anesthesia chart with monitoring',
            'Implant stickers and batch numbers',
            'Consumables usage documentation',
          ],
        },
        {
          title: 'Post-operative Care',
          description: 'Post-surgical monitoring and recovery documentation',
          validationCriteria: [
            'Post-op orders and monitoring',
            'Recovery room notes',
            'Complication management records',
            'Discharge summary with procedure details',
          ],
        },
      ],
    },
    {
      icon: Zap,
      title: 'Radiotherapy Claims',
      description: 'Fraction-wise tracking and justification for radiation oncology treatments.',
      bulletPoints: [
        'Simulation & planning CT',
        'Approved RT plan',
        'Fraction/session logs',
        'IMRT / VMAT justification',
      ],
      footerTag: 'Prevents: Fraction reductions & RT disputes',
      hoverBenefit: 'Ensures accurate fraction billing with complete planning and session documentation',
      checklistDetails: [
        {
          title: 'Treatment Planning',
          description: 'Comprehensive radiotherapy planning and simulation records',
          validationCriteria: [
            'CT simulation report',
            'Treatment planning system output',
            'Radiation oncologist approval',
            'Target volume delineation',
          ],
        },
        {
          title: 'Fraction Delivery',
          description: 'Session-wise documentation of radiation delivery',
          validationCriteria: [
            'Daily fraction delivery logs',
            'Machine parameters verification',
            'Patient positioning records',
            'Quality assurance checks',
          ],
        },
        {
          title: 'Advanced Technique Justification',
          description: 'Clinical justification for IMRT/VMAT techniques',
          validationCriteria: [
            'Medical necessity documentation',
            'Tumor location and complexity',
            'Dose distribution analysis',
            'Approval from radiation oncologist',
          ],
        },
      ],
    },
    {
      icon: Droplet,
      title: 'Chemotherapy Claims',
      description: 'Cycle-based validation for high-value oncology drug claims.',
      bulletPoints: [
        'Treatment protocol & cycles',
        'Drug dosage (BSA-based)',
        'Pharmacy issue records',
        'Administration & monitoring',
      ],
      footerTag: 'Prevents: Drug mismatch & cycle denials',
      hoverBenefit: 'Prevents drug mismatch denials with protocol-based validation and BSA calculations',
      checklistDetails: [
        {
          title: 'Treatment Protocol',
          description: 'Approved chemotherapy regimen and cycle planning',
          validationCriteria: [
            'Oncologist-approved protocol',
            'Cycle schedule documentation',
            'Histopathology report',
            'Staging investigations',
          ],
        },
        {
          title: 'Drug Dosage Calculation',
          description: 'BSA-based dosage calculation and verification',
          validationCriteria: [
            'Body surface area calculation',
            'Dose calculation worksheet',
            'Pharmacist verification',
            'Dose modification justification if any',
          ],
        },
        {
          title: 'Administration Records',
          description: 'Complete chemotherapy administration documentation',
          validationCriteria: [
            'Pharmacy drug issue records',
            'Administration time and route',
            'Pre and post-medication records',
            'Adverse event monitoring',
          ],
        },
      ],
    },
    {
      icon: CircleDot,
      title: 'Dialysis Claims',
      description: 'Session-wise compliance tracking for dialysis treatments.',
      bulletPoints: [
        'Dialysis prescription',
        'Session logs & frequency',
        'Consumables tracking',
        'Access & complication notes',
      ],
      footerTag: 'Prevents: Session cuts & package breaches',
      hoverBenefit: 'Ensures accurate session billing with complete prescription and consumables documentation',
      checklistDetails: [
        {
          title: 'Dialysis Prescription',
          description: 'Nephrologist prescription and treatment plan',
          validationCriteria: [
            'Nephrologist prescription order',
            'Dialysis frequency and duration',
            'Dialysate composition',
            'Dry weight and ultrafiltration goals',
          ],
        },
        {
          title: 'Session Documentation',
          description: 'Individual session records and monitoring',
          validationCriteria: [
            'Pre and post-dialysis vitals',
            'Session duration and parameters',
            'Vascular access documentation',
            'Complications or events during session',
          ],
        },
        {
          title: 'Consumables Management',
          description: 'Tracking of dialysis consumables and supplies',
          validationCriteria: [
            'Dialyzer and bloodline usage',
            'Consumables batch numbers',
            'Reuse documentation if applicable',
            'Pharmacy issue records',
          ],
        },
      ],
    },
    {
      icon: Stethoscope,
      title: 'Medical Management Claims',
      description: 'Non-surgical inpatient claims validated for medical necessity.',
      bulletPoints: [
        'Admission justification',
        'Investigation & treatment linkage',
        'Daily progress notes',
        'Discharge summary accuracy',
      ],
      footerTag: 'Prevents: Medical necessity denials',
      hoverBenefit: 'Prevents medical necessity denials with complete clinical justification and treatment linkage',
      checklistDetails: [
        {
          title: 'Admission Justification',
          description: 'Clinical necessity for hospital admission',
          validationCriteria: [
            'Admission note with diagnosis',
            'Clinical severity indicators',
            'Reason for hospitalization',
            'Emergency vs planned admission',
          ],
        },
        {
          title: 'Investigation-Treatment Linkage',
          description: 'Correlation between investigations and treatment',
          validationCriteria: [
            'Investigation reports supporting diagnosis',
            'Treatment plan based on findings',
            'Specialist consultation notes',
            'Medication rationale',
          ],
        },
        {
          title: 'Progress Documentation',
          description: 'Daily clinical progress and treatment response',
          validationCriteria: [
            'Daily progress notes by treating physician',
            'Response to treatment documentation',
            'Complication management',
            'Discharge summary with complete details',
          ],
        },
      ],
    },
  ];

  const handleViewChecklist = (treatment: TreatmentData) => {
    setSelectedTreatment(treatment);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treatment, idx) => (
          <TreatmentCard
            key={idx}
            icon={treatment.icon}
            title={treatment.title}
            description={treatment.description}
            bulletPoints={treatment.bulletPoints}
            footerTag={treatment.footerTag}
            hoverBenefit={treatment.hoverBenefit}
            onViewChecklist={() => handleViewChecklist(treatment)}
          />
        ))}
      </div>

      {selectedTreatment && (
        <TreatmentChecklistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          treatmentType={selectedTreatment.title}
          checklistDetails={selectedTreatment.checklistDetails}
        />
      )}
    </>
  );
}
