import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Stethoscope } from 'lucide-react';

export default function SurgicalProceduresSection() {
  const surgeries = [
    {
      name: 'Appendectomy',
      description: 'Surgical removal of the appendix, typically performed as an emergency procedure for acute appendicitis.',
    },
    {
      name: 'Cholecystectomy',
      description: 'Removal of the gallbladder, commonly performed laparoscopically for gallstones or cholecystitis.',
    },
    {
      name: 'Hernia Repair',
      description: 'Surgical correction of hernias including inguinal, umbilical, and ventral hernias using mesh reinforcement.',
    },
    {
      name: 'Knee Arthroscopy',
      description: 'Minimally invasive procedure to diagnose and treat knee joint problems including meniscal tears and ligament injuries.',
    },
    {
      name: 'Hip Replacement',
      description: 'Total hip arthroplasty to replace damaged hip joint with prosthetic components for severe arthritis or fractures.',
    },
    {
      name: 'Coronary Artery Bypass',
      description: 'CABG surgery to restore blood flow to the heart by grafting vessels around blocked coronary arteries.',
    },
    {
      name: 'Cataract Surgery',
      description: 'Phacoemulsification with intraocular lens implantation to restore vision by removing clouded lens.',
    },
    {
      name: 'Hysterectomy',
      description: 'Surgical removal of the uterus, performed for various gynecological conditions including fibroids and cancer.',
    },
    {
      name: 'Cesarean Section',
      description: 'Surgical delivery of a baby through incisions in the abdomen and uterus when vaginal delivery is not possible.',
    },
    {
      name: 'Spinal Fusion',
      description: 'Surgical procedure to permanently connect two or more vertebrae to eliminate painful motion and stabilize the spine.',
    },
    {
      name: 'Mastectomy',
      description: 'Surgical removal of breast tissue for treatment or prevention of breast cancer, with reconstruction options available.',
    },
    {
      name: 'Tonsillectomy',
      description: 'Removal of the tonsils, commonly performed for recurrent tonsillitis or obstructive sleep apnea in children and adults.',
    },
    {
      name: 'Prostatectomy',
      description: 'Surgical removal of part or all of the prostate gland, typically for prostate cancer or benign prostatic hyperplasia.',
    },
    {
      name: 'Thyroidectomy',
      description: 'Partial or complete removal of the thyroid gland for thyroid cancer, goiter, or hyperthyroidism.',
    },
    {
      name: 'Gastric Bypass',
      description: 'Bariatric surgery to create a small stomach pouch and reroute the small intestine for significant weight loss.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/assets/generated/surgery-icon.dim_128x128.png"
                alt="Surgery Icon"
                className="h-16 w-16 mr-3"
              />
              <h2 className="text-3xl md:text-4xl font-bold">Commonly Used Surgical Procedures</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive coverage of frequently performed surgical procedures across multiple specialties
            </p>
          </div>

          {/* Surgical Procedures Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {surgeries.map((surgery, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start text-lg">
                    <Stethoscope className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{surgery.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{surgery.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
