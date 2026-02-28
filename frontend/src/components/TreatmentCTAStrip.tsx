import { Button } from './ui/button';

interface TreatmentCTAStripProps {
  onRequestDemo: () => void;
}

export default function TreatmentCTAStrip({ onRequestDemo }: TreatmentCTAStripProps) {
  const handleSeeHowItWorks = () => {
    // Scroll to the validation layers section
    const validationSection = document.getElementById('validation-layers');
    if (validationSection) {
      validationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-teal-50 py-12 px-6 rounded-lg text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        One Command Centre. Every Treatment Covered. Every Claim Protected.
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="bg-[#006B7D] hover:bg-[#004d5a] text-white px-8"
          onClick={onRequestDemo}
        >
          Request Demo
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-[#006B7D] text-[#006B7D] hover:bg-[#006B7D] hover:text-white px-8"
          onClick={handleSeeHowItWorks}
        >
          See How It Works
        </Button>
      </div>
    </div>
  );
}
