import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from './ui/button';

interface ChecklistItem {
  title: string;
  description: string;
  validationCriteria: string[];
}

interface TreatmentChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatmentType: string;
  checklistDetails: ChecklistItem[];
}

export default function TreatmentChecklistModal({
  isOpen,
  onClose,
  treatmentType,
  checklistDetails,
}: TreatmentChecklistModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-royal-teal border-royal-teal flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-white pr-8">
            {treatmentType} - Validation Checklist
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 text-white hover:text-white/80">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto pr-4 my-4">
          <div className="space-y-6 pb-2">
            {checklistDetails.map((item, idx) => (
              <div key={idx} className="border-l-4 border-white pl-4 py-2">
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-white/90 mb-3">{item.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Validation Criteria:</p>
                  <ul className="space-y-1">
                    {item.validationCriteria.map((criteria, cidx) => (
                      <li key={cidx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/90">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t border-white/20 flex-shrink-0">
          <Button onClick={onClose} className="bg-white text-royal-teal hover:bg-white/90">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
