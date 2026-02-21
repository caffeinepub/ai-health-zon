import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Download, FileJson, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useGetProcessedDocument } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function DocumentViewer() {
  const { documentId } = useParams({ from: '/documents/$documentId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  const { data: processedDoc, isLoading } = useGetProcessedDocument(documentId);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please login to view documents</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (timestamp: bigint) => {
    if (timestamp === 0n) return 'Just now';
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportAsJSON = () => {
    if (!processedDoc) return;
    
    const exportData = {
      metadata: {
        filename: processedDoc.metadata.filename,
        filetype: processedDoc.metadata.filetype,
        uploadTime: formatDate(processedDoc.metadata.uploadTime),
        status: processedDoc.metadata.status,
      },
      summary: processedDoc.summary,
      sections: processedDoc.sections,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${processedDoc.metadata.filename.replace(/\.[^/.]+$/, '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON file downloaded');
  };

  const exportAsTXT = () => {
    if (!processedDoc) return;
    
    let textContent = `${processedDoc.metadata.filename}\n`;
    textContent += `Uploaded: ${formatDate(processedDoc.metadata.uploadTime)}\n\n`;
    textContent += `Summary:\n${processedDoc.summary}\n\n`;
    textContent += '='.repeat(80) + '\n\n';

    processedDoc.sections.forEach((section) => {
      textContent += `${section.heading}\n${'-'.repeat(section.heading.length)}\n\n`;
      
      section.paragraphs.forEach((para) => {
        textContent += `${para}\n\n`;
      });

      section.lists.forEach((list) => {
        list.items.forEach((item) => {
          textContent += `• ${item}\n`;
        });
        textContent += '\n';
      });

      section.tables.forEach((table) => {
        textContent += table.headers.join(' | ') + '\n';
        textContent += '-'.repeat(table.headers.join(' | ').length) + '\n';
        table.rows.forEach((row) => {
          textContent += row.join(' | ') + '\n';
        });
        textContent += '\n';
      });
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${processedDoc.metadata.filename.replace(/\.[^/.]+$/, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Text file downloaded');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Skeleton className="h-10 w-48 mb-8" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!processedDoc) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate({ to: '/documents' })} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Button>
          <Card>
            <CardContent className="py-12 text-center">
              <img 
                src="/assets/generated/structured-output.dim_1200x800.png" 
                alt="Document not found"
                className="max-w-md w-full mx-auto rounded-lg mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">Document Not Found</h3>
              <p className="text-muted-foreground">
                The document you're looking for doesn't exist or hasn't been processed yet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate({ to: '/documents' })} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-4 gradient-text">
                  {processedDoc.metadata.filename}
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Type: {processedDoc.metadata.filetype.toUpperCase()}</span>
                  <span>•</span>
                  <span>Uploaded: {formatDate(processedDoc.metadata.uploadTime)}</span>
                  <span>•</span>
                  <span>Status: {processedDoc.metadata.status}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button onClick={exportAsJSON} variant="outline">
                <FileJson className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
              <Button onClick={exportAsTXT} variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export TXT
              </Button>
            </div>
          </CardContent>
        </Card>

        {processedDoc.summary && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{processedDoc.summary}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Structured Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {processedDoc.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {sectionIndex > 0 && <Separator className="my-8" />}
                
                <h2 className="text-2xl font-bold mb-4 gradient-text-alt">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph, paraIndex) => (
                  <p key={paraIndex} className="mb-4 text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {section.lists.map((list, listIndex) => (
                  <ul key={listIndex} className="list-disc list-inside space-y-2 mb-4 ml-4">
                    {list.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-foreground">{item}</li>
                    ))}
                  </ul>
                ))}

                {section.tables.map((table, tableIndex) => (
                  <div key={tableIndex} className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted">
                          {table.headers.map((header, headerIndex) => (
                            <th 
                              key={headerIndex} 
                              className="border border-border px-4 py-3 text-left font-semibold"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-muted/50">
                            {row.map((cell, cellIndex) => (
                              <td 
                                key={cellIndex} 
                                className="border border-border px-4 py-3"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
