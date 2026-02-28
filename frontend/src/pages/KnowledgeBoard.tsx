import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { BookOpen, FileCheck, Shield, Building2, Award, Scale, CheckCircle2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import DemoBookingForm from '../components/DemoBookingForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function KnowledgeBoard() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/hospital-licenses-hero.dim_1920x1080.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 to-[#003366]/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hospital Licensing & Regulatory Compliance Knowledge Board
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Comprehensive information on hospital licenses, regulatory requirements, and compliance standards in India. 
              Navigate the complex landscape of healthcare regulations with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#008B8B] hover:bg-[#007070] text-white"
                onClick={() => setShowDemoModal(true)}
              >
                Book a Compliance Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white/20"
                asChild
              >
                <a
                  href="https://www.researchgate.net/publication/398379014_LICENCE_REQUIRED_FOR_HOSPITALS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Research Publication
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <BookOpen className="h-8 w-8 text-[#008B8B] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-[#003366] mb-4">
                  Understanding Hospital Licensing in India
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Hospital licensing is a critical regulatory requirement that ensures healthcare facilities meet minimum 
                  standards for patient safety, quality of care, and operational excellence. In India, hospitals must 
                  obtain various licenses and registrations from multiple regulatory bodies at central, state, and local levels.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This knowledge board provides comprehensive information based on research and regulatory frameworks, 
                  including insights from the publication{' '}
                  <a
                    href="https://www.researchgate.net/publication/398379014_LICENCE_REQUIRED_FOR_HOSPITALS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#008B8B] hover:underline font-medium"
                  >
                    "Licence Required for Hospitals"
                  </a>
                  , to help healthcare administrators navigate compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">
            Types of Hospital Licenses & Registrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-t-4 border-t-[#008B8B]">
              <CardHeader>
                <Building2 className="h-10 w-10 text-[#008B8B] mb-3" />
                <CardTitle className="text-xl text-[#003366]">Clinical Establishments Act Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Mandatory registration under CEA 2010</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>State-level implementation and enforcement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Minimum standards for facilities and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Annual renewal requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#008B8B]">
              <CardHeader>
                <Shield className="h-10 w-10 text-[#008B8B] mb-3" />
                <CardTitle className="text-xl text-[#003366]">State Medical Council Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Registration with State Medical Council</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Verification of medical practitioners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Compliance with medical ethics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Professional standards maintenance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#008B8B]">
              <CardHeader>
                <FileCheck className="h-10 w-10 text-[#008B8B] mb-3" />
                <CardTitle className="text-xl text-[#003366]">AERB License (Radiation Facilities)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Atomic Energy Regulatory Board approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Required for X-ray, CT, MRI facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Radiation safety protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Qualified radiation safety officer</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#008B8B]">
              <CardHeader>
                <Scale className="h-10 w-10 text-[#008B8B] mb-3" />
                <CardTitle className="text-xl text-[#003366]">Drug License</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>License from State Drug Controller</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Pharmacy operations compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Qualified pharmacist requirement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Drug storage and dispensing standards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#008B8B]">
              <CardHeader>
                <Building2 className="h-10 w-10 text-[#008B8B] mb-3" />
                <CardTitle className="text-xl text-[#003366]">Fire Safety Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Fire Department NOC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Fire safety equipment installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Emergency evacuation plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Regular fire safety audits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#008B8B]">
              <CardHeader>
                <FileCheck className="h-10 w-10 text-[#008B8B] mb-3" />
                <CardTitle className="text-xl text-[#003366]">Biomedical Waste Authorization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>State Pollution Control Board authorization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>BMW Management Rules 2016 compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Segregation and disposal protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                    <span>Annual reporting requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <img
              src="/assets/generated/compliance-standards.dim_800x600.png"
              alt="Compliance Standards"
              className="mx-auto rounded-lg shadow-lg mb-8 max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Mid Page */}
      <section className="py-12 bg-[#008B8B]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Help with Hospital Licensing & Compliance?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Our experts can guide you through the complex regulatory landscape and ensure your facility meets all requirements.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#008B8B] hover:bg-gray-100"
            onClick={() => setShowDemoModal(true)}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

      {/* Regulatory Compliance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">
            Regulatory Compliance Requirements
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#003366] mb-6 flex items-center gap-3">
                <Award className="h-8 w-8 text-[#008B8B]" />
                Accreditation Standards
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="nabh" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-semibold text-[#003366] hover:text-[#008B8B]">
                    NABH Accreditation
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-2">
                    <p className="font-medium">National Accreditation Board for Hospitals & Healthcare Providers</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Patient-centered care standards</li>
                      <li>Quality management systems</li>
                      <li>Infection control protocols</li>
                      <li>Continuous quality improvement</li>
                      <li>Patient safety and risk management</li>
                      <li>Regular audits and assessments</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="iso" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-semibold text-[#003366] hover:text-[#008B8B]">
                    ISO Certification
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-2">
                    <p className="font-medium">International Organization for Standardization</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>ISO 9001: Quality Management Systems</li>
                      <li>ISO 14001: Environmental Management</li>
                      <li>ISO 45001: Occupational Health & Safety</li>
                      <li>Process standardization</li>
                      <li>Documentation requirements</li>
                      <li>Internal and external audits</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="jci" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-semibold text-[#003366] hover:text-[#008B8B]">
                    JCI Accreditation
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-2">
                    <p className="font-medium">Joint Commission International</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>International patient safety goals</li>
                      <li>Leadership and governance standards</li>
                      <li>Facility management and safety</li>
                      <li>Staff qualifications and education</li>
                      <li>Quality improvement and patient safety</li>
                      <li>Global healthcare excellence benchmark</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#003366] mb-6 flex items-center gap-3">
                <Scale className="h-8 w-8 text-[#008B8B]" />
                Legal Obligations
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="cea" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-semibold text-[#003366] hover:text-[#008B8B]">
                    Clinical Establishments Act 2010
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-2">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Mandatory registration of all clinical establishments</li>
                      <li>Minimum standards for infrastructure and services</li>
                      <li>Display of registration certificate</li>
                      <li>Maintenance of medical records</li>
                      <li>Patient rights and grievance redressal</li>
                      <li>Penalties for non-compliance</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pcpndt" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-semibold text-[#003366] hover:text-[#008B8B]">
                    PC-PNDT Act Compliance
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-2">
                    <p className="font-medium">Pre-Conception and Pre-Natal Diagnostic Techniques Act</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Registration for ultrasound facilities</li>
                      <li>Prohibition of sex determination</li>
                      <li>Maintenance of Form F records</li>
                      <li>Display of mandatory notices</li>
                      <li>Regular reporting to authorities</li>
                      <li>Strict penalties for violations</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="consumer" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-semibold text-[#003366] hover:text-[#008B8B]">
                    Consumer Protection Act
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-2">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Patient rights as consumers</li>
                      <li>Transparent billing and pricing</li>
                      <li>Informed consent requirements</li>
                      <li>Complaint redressal mechanisms</li>
                      <li>Medical negligence liability</li>
                      <li>Compensation for deficiency in service</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="text-center">
            <img
              src="/assets/generated/licensing-process.dim_1200x800.png"
              alt="Hospital Licensing Process"
              className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
            />
            <p className="text-gray-600 mt-4 text-sm">Hospital Licensing Process Flowchart</p>
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">
            Hospital Registration Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#003366] flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#008B8B] text-white font-bold">1</span>
                    Pre-Registration Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Review state-specific licensing requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Assess infrastructure against minimum standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Verify staff qualifications and credentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Prepare required documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#003366] flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#008B8B] text-white font-bold">2</span>
                    Application Submission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Submit application to State Health Department</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Provide building plans and layout diagrams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Submit list of medical equipment and facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Pay applicable registration fees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#003366] flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#008B8B] text-white font-bold">3</span>
                    Inspection & Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Physical inspection by regulatory authorities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Verification of infrastructure and equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Assessment of safety and hygiene standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Review of operational protocols</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#003366] flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#008B8B] text-white font-bold">4</span>
                    License Issuance & Renewal
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Issuance of registration certificate upon approval</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Display certificate prominently at facility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Annual renewal before expiry date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#008B8B] flex-shrink-0 mt-0.5" />
                      <span>Maintain compliance for continued operations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003366] to-[#004080]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ensure Your Hospital Stays Compliant
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Partner with AI Health Zon for comprehensive compliance support, licensing assistance, 
            and regulatory guidance. Our experts help you navigate the complex healthcare regulatory landscape.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#008B8B] hover:bg-[#007070] text-white"
              onClick={() => setShowDemoModal(true)}
            >
              Book Your Consultation Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
              asChild
            >
              <a href="/contact">Contact Our Compliance Team</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#003366]">
              Book a Compliance Consultation
            </DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
