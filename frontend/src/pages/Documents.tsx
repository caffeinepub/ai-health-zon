import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FileText, Eye } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function Documents() {
  const navigate = useNavigate();

  // Mock documents data
  const documents = [
    {
      id: '1',
      filename: 'patient-record-001.pdf',
      status: 'Completed',
      uploadDate: '2024-01-15',
    },
    {
      id: '2',
      filename: 'medical-report-002.pdf',
      status: 'Processing',
      uploadDate: '2024-01-16',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Processing':
        return 'secondary';
      case 'Failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Documents</h1>
          <Button onClick={() => navigate({ to: '/document-processing' })}>
            Upload New Document
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="w-8 h-8 text-primary" />
                  <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                </div>
                <CardTitle className="text-lg mt-4">{doc.filename}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                </p>
                {doc.status === 'Completed' && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate({ to: `/documents/${doc.id}` })}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Document
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {documents.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No documents uploaded yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
