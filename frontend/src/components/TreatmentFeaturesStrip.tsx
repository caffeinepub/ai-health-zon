import { Brain, FolderCheck, AlertTriangle, ShieldX, Receipt } from 'lucide-react';

export default function TreatmentFeaturesStrip() {
  const features = [
    { icon: Brain, label: 'Auto-Activated Checklist' },
    { icon: FolderCheck, label: 'Mandatory Documents Enforced' },
    { icon: AlertTriangle, label: 'Deviation Flagging' },
    { icon: ShieldX, label: 'Claim Block Until Compliance' },
    { icon: Receipt, label: 'Audit-Ready Evidence' },
  ];

  return (
    <div className="py-12 bg-gray-50 rounded-lg">
      <h3 className="text-2xl font-bold text-[#006B7D] text-center mb-8">
        How These Cards Work
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8 px-4">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center max-w-[150px]">
            <feature.icon className="w-10 h-10 text-[#006B7D] mb-3" strokeWidth={1.5} />
            <span className="text-sm font-medium text-gray-700 leading-tight">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
