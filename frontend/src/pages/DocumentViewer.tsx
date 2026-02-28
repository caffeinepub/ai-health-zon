import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function DocumentViewer() {
  const { documentId } = useParams({ strict: false });
  const navigate = useNavigate();

  // Mock document data
  const document = {
    id: documentId,
    filename: 'patient-record-001.pdf',
    uploadDate: '2024-01-15',
    summary: 'Patient medical record with diagnosis and treatment plan',
    sections: [
      {
        heading: 'Patient Information',
        paragraphs: [
          'Name: John Doe',
          'Age: 45 years',
          'Gender: Male',
        ],
        tables: [],
        lists: [],
      },
      {
        heading: 'Diagnosis',
        paragraphs: [
          'Primary diagnosis: Hypertension',
          'Secondary diagnosis: Type 2 Diabetes',
        ],
        tables: [],
        lists: [],
      },
    ],
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting document as ${format.toUpperCase()}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/documents' })}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{document.filename}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('json')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('txt')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  TXT
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Summary</h3>
              <p className="text-muted-foreground">{document.summary}</p>
            </div>

            {document.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-3">{section.heading}</h3>
                <div className="space-y-2">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
