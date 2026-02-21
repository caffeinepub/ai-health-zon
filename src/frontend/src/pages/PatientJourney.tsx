import { useState } from 'react';
import { FileText, Upload, Download, Eye, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useUploadPatientJourneySampleDocument, useGetHospitalPatientJourneySampleDocuments, useGetAllHospitals } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

interface DocumentTypeInfo {
  name: string;
  description: string;
}

interface PhaseInfo {
  phaseNumber: number;
  name: string;
  image: string;
  documentTypes: DocumentTypeInfo[];
}

const PATIENT_JOURNEY_PHASES: PhaseInfo[] = [
  {
    phaseNumber: 1,
    name: 'Patient Entry & Registration',
    image: '/assets/generated/phase-registration.dim_400x300.png',
    documentTypes: [
      { name: 'Registration Form', description: 'Patient demographic and contact information' },
      { name: 'General Consent', description: 'Consent for treatment and data processing' },
    ],
  },
  {
    phaseNumber: 2,
    name: 'Initial Clinical Evaluation',
    image: '/assets/generated/phase-clinical-evaluation.dim_400x300.png',
    documentTypes: [
      { name: 'Clinical Assessment', description: 'Initial medical evaluation and examination' },
      { name: 'Progress Notes (Initial)', description: 'Initial assessment by treating consultant' },
    ],
  },
  {
    phaseNumber: 3,
    name: 'Investigation & Diagnostics',
    image: '/assets/generated/phase-diagnostics.dim_400x300.png',
    documentTypes: [
      { name: 'Microbiology Requisition Form', description: 'Laboratory test requests' },
      { name: 'Monitoring Sheet (Vitals)', description: 'Vitals, inputs-outputs, observations' },
    ],
  },
  {
    phaseNumber: 4,
    name: 'Treatment Planning',
    image: '/assets/generated/phase-treatment-planning.dim_400x300.png',
    documentTypes: [
      { name: 'Medication Chart', description: 'Prescribed medications and dosages' },
      { name: 'Progress Notes (Treatment)', description: 'Treatment plan and daily review' },
    ],
  },
  {
    phaseNumber: 5,
    name: 'Nursing Care & Monitoring',
    image: '/assets/generated/phase-nursing-care.dim_400x300.png',
    documentTypes: [
      { name: 'Nursing Chart', description: 'Nursing care documentation' },
      { name: 'Monitoring Sheet (Ongoing)', description: 'Continuous patient monitoring' },
    ],
  },
  {
    phaseNumber: 6,
    name: 'Pre-Operative Phase (If Surgical Case)',
    image: '/assets/generated/phase-preoperative.dim_400x300.png',
    documentTypes: [
      { name: 'Pre-Anaesthetic Checkup Form', description: 'Anesthesia assessment' },
      { name: 'Pre-Operative Orders', description: 'Surgical Docket Booklet' },
      { name: 'Procedure Consent', description: 'Consent for surgical procedure' },
    ],
  },
  {
    phaseNumber: 7,
    name: 'Intra-Procedure / OT Phase',
    image: '/assets/generated/phase-intraoperative.dim_400x300.png',
    documentTypes: [
      { name: 'Procedure Consent (Verified)', description: 'Verified consent before procedure' },
      { name: 'Progress Notes (Operative)', description: 'Operative and procedure notes' },
    ],
  },
  {
    phaseNumber: 8,
    name: 'Post-Procedure / Recovery Phase',
    image: '/assets/generated/phase-postoperative.dim_400x300.png',
    documentTypes: [
      { name: 'Monitoring Sheet', description: 'Post-procedure monitoring' },
      { name: 'Medication Chart', description: 'Post-procedure medications' },
      { name: 'Nursing Chart', description: 'Post-procedure nursing care' },
      { name: 'Progress Notes (Post-op)', description: 'Post-op and post-procedure notes' },
    ],
  },
  {
    phaseNumber: 9,
    name: 'Discharge Planning & Exit',
    image: '/assets/generated/phase-discharge.dim_400x300.png',
    documentTypes: [
      { name: 'Discharge Document', description: 'Discharge summary and instructions' },
      { name: 'Progress Notes (Final)', description: 'Final summary and instructions' },
    ],
  },
  {
    phaseNumber: 10,
    name: 'Legal & Record Closure',
    image: '/assets/generated/phase-legal-closure.dim_400x300.png',
    documentTypes: [
      { name: 'All Consents', description: 'General and procedure consents' },
      { name: 'Completed Charts & Forms', description: 'Filed in patient record' },
    ],
  },
];

export default function PatientJourney() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: hospitals = [] } = useGetAllHospitals();
  const userHospital = hospitals.length > 0 ? hospitals[0] : null;
  const hospitalId = userHospital?.id || '';

  const { data: sampleDocuments = [], isLoading: documentsLoading } = useGetHospitalPatientJourneySampleDocuments(hospitalId);
  const uploadMutation = useUploadPatientJourneySampleDocument();

  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: number }>({});

  const handleFileUpload = async (
    phaseNumber: number,
    phaseName: string,
    documentType: DocumentTypeInfo,
    file: File
  ) => {
    if (!isAuthenticated) {
      toast.error('Please login to upload documents');
      return;
    }

    if (!hospitalId) {
      toast.error('No hospital profile found. Please create a hospital profile first.');
      return;
    }

    const uploadKey = `${phaseNumber}-${documentType.name}`;
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadingFiles(prev => ({ ...prev, [uploadKey]: percentage }));
      });

      const documentId = `pj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await uploadMutation.mutateAsync({
        id: documentId,
        phase: {
          phaseNumber: BigInt(phaseNumber),
          name: phaseName,
        },
        documentType: {
          name: documentType.name,
          description: documentType.description,
        },
        hospitalId,
        filename: file.name,
        blob,
      });

      toast.success(`${file.name} uploaded successfully`);
      setUploadingFiles(prev => {
        const newState = { ...prev };
        delete newState[uploadKey];
        return newState;
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload: ${error.message}`);
      setUploadingFiles(prev => {
        const newState = { ...prev };
        delete newState[uploadKey];
        return newState;
      });
    }
  };

  const getDocumentsForPhaseAndType = (phaseNumber: number, documentTypeName: string) => {
    return sampleDocuments.filter(
      doc => Number(doc.phase.phaseNumber) === phaseNumber && doc.documentType.name === documentTypeName
    );
  };

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/patient-journey-hero.dim_1920x600.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        
        <div className="relative container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Patient Journey Document Library
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Organize and manage sample documents across all phases of patient care. 
              From registration through discharge, maintain a comprehensive library of 
              document templates and examples for your healthcare facility.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {!isAuthenticated ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Authentication Required</CardTitle>
                <CardDescription>
                  Please login to access the Patient Journey Document Library
                </CardDescription>
              </CardHeader>
            </Card>
          ) : !hospitalId ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Hospital Profile Required</CardTitle>
                <CardDescription>
                  Please create a hospital profile to upload and manage patient journey documents
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 gradient-text-alt">
                  10-Phase Patient Journey
                </h2>
                <p className="text-muted-foreground">
                  Upload and manage sample documents for each phase of the patient care journey
                </p>
              </div>

              <Accordion type="multiple" className="space-y-4">
                {PATIENT_JOURNEY_PHASES.map((phase) => (
                  <AccordionItem 
                    key={phase.phaseNumber} 
                    value={`phase-${phase.phaseNumber}`}
                    className="border rounded-lg overflow-hidden bg-card"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 text-left w-full">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border">
                          <img 
                            src={phase.image} 
                            alt={phase.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary">
                              {phase.phaseNumber}
                            </span>
                            <h3 className="text-lg font-semibold">
                              {phase.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {phase.documentTypes.length} document type(s)
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 mt-4">
                        {phase.documentTypes.map((docType) => {
                          const uploadKey = `${phase.phaseNumber}-${docType.name}`;
                          const uploadProgress = uploadingFiles[uploadKey];
                          const documents = getDocumentsForPhaseAndType(phase.phaseNumber, docType.name);

                          return (
                            <Card key={docType.name} className="border-l-4 border-l-primary">
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-primary" />
                                      {docType.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                      {docType.description}
                                    </CardDescription>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <input
                                      type="file"
                                      id={`upload-${phase.phaseNumber}-${docType.name}`}
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          handleFileUpload(phase.phaseNumber, phase.name, docType, file);
                                        }
                                        e.target.value = '';
                                      }}
                                      className="hidden"
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        document.getElementById(`upload-${phase.phaseNumber}-${docType.name}`)?.click();
                                      }}
                                      disabled={!!uploadProgress}
                                    >
                                      {uploadProgress !== undefined ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          {uploadProgress}%
                                        </>
                                      ) : (
                                        <>
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                {documentsLoading ? (
                                  <div className="flex items-center justify-center py-4">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                  </div>
                                ) : documents.length === 0 ? (
                                  <p className="text-sm text-muted-foreground italic">
                                    No samples uploaded yet
                                  </p>
                                ) : (
                                  <div className="space-y-2">
                                    {documents.map((doc) => (
                                      <div 
                                        key={doc.id}
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                      >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                          <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm truncate">
                                              {doc.filename}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              {new Date(Number(doc.uploadTime) / 1000000).toLocaleDateString()}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handlePreview(doc.blob.getDirectURL())}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDownload(doc.blob.getDirectURL(), doc.filename)}
                                          >
                                            <Download className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
