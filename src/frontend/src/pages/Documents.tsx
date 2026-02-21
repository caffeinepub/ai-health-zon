import { useNavigate } from '@tanstack/react-router';
import { FileText, Eye, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetDocuments } from '../hooks/useQueries';

export default function Documents() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: documents = [], isLoading } = useGetDocuments();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please login to view your documents</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'uploaded':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> Uploaded</Badge>;
      case 'processing':
        return <Badge className="gap-1 bg-yellow-500"><Loader2 className="h-3 w-3 animate-spin" /> Processing</Badge>;
      case 'processed':
      case 'completed':
        return <Badge className="gap-1 bg-green-600"><CheckCircle className="h-3 w-3" /> Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (timestamp: bigint) => {
    if (timestamp === 0n) return 'Just now';
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">My Documents</h1>
          <p className="text-lg text-muted-foreground">
            View and manage your uploaded documents
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent className="space-y-6">
              <img 
                src="/assets/generated/document-list.dim_1200x800.png" 
                alt="No documents"
                className="max-w-md w-full mx-auto rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-semibold mb-2">No Documents Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your first document to get started with structured data extraction
                </p>
                <Button onClick={() => navigate({ to: '/document-home' })}>
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary" />
                    {getStatusBadge(doc.metadata.status)}
                  </div>
                  <CardTitle className="text-lg mt-4 line-clamp-2">
                    {doc.metadata.filename}
                  </CardTitle>
                  <CardDescription>
                    {doc.metadata.filetype.toUpperCase()} • {formatDate(doc.metadata.uploadTime)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {doc.metadata.status.toLowerCase() === 'processed' || doc.metadata.status.toLowerCase() === 'completed' ? (
                    <Button 
                      className="w-full" 
                      onClick={() => navigate({ to: `/documents/${doc.id}` })}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Output
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Processing...
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
