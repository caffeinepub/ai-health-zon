import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { CheckCircle2, LucideIcon } from 'lucide-react';

interface TreatmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bulletPoints: string[];
  footerTag: string;
  onViewChecklist: () => void;
  hoverBenefit: string;
}

export default function TreatmentCard({
  icon: Icon,
  title,
  description,
  bulletPoints,
  footerTag,
  onViewChecklist,
  hoverBenefit,
}: TreatmentCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 hover:border-[#006B7D] transition-all duration-300 cursor-pointer flex flex-col h-full">
            <div className="flex flex-col flex-grow">
              {/* Icon */}
              <div className="mb-4">
                <Icon className="w-12 h-12 text-[#006B7D]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

              {/* Bullet Points */}
              <ul className="space-y-2 mb-6 flex-grow">
                {bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#006B7D] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Footer Tag */}
              <div className="mb-4">
                <span className="inline-block text-sm bg-teal-50 text-[#006B7D] px-3 py-1 rounded-full font-medium">
                  {footerTag}
                </span>
              </div>

              {/* CTA Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewChecklist();
                }}
                variant="outline"
                className="w-full border-[#006B7D] text-[#006B7D] hover:bg-[#006B7D] hover:text-white transition-colors"
              >
                View Checklist
              </Button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{hoverBenefit}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
