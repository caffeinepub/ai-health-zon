import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useUploadDocument } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

export default function DocumentHome() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const uploadMutation = useUploadDocument();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to upload documents');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    for (const file of selectedFiles) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(prev => ({ ...prev, [file.name]: percentage }));
        });

        const documentId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const filetype = file.name.split('.').pop() || 'unknown';

        await uploadMutation.mutateAsync({
          id: documentId,
          filename: file.name,
          filetype,
          blob,
        });

        toast.success(`${file.name} uploaded successfully`);
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      }
    }

    setSelectedFiles([]);
    setUploadProgress({});
    navigate({ to: '/documents' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/doc-processing-hero.dim_1920x1080.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Transform Documents into Structured Data
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Convert your PDF files and scanned documents into organized, structured formats. 
              Extract tables, headings, paragraphs, and lists with ease. Export to JSON or plain text.
            </p>
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Documents
              </Button>
            ) : (
              <p className="text-lg text-muted-foreground">
                Please login to start uploading documents
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      {isAuthenticated && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text-alt">Upload Your Documents</CardTitle>
                  <CardDescription>
                    Supported formats: PDF, JPG, JPEG, PNG, TIFF
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center">
                    <img 
                      src="/assets/generated/upload-interface.dim_800x600.png" 
                      alt="Upload interface"
                      className="max-w-md w-full rounded-lg shadow-md"
                    />
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <input
                      id="file-input"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.tiff"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      {selectedFiles.length > 0 
                        ? `${selectedFiles.length} file(s) selected` 
                        : 'Click to select files or drag and drop'}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Selected Files:</h3>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          {uploadProgress[file.name] !== undefined && (
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${uploadProgress[file.name]}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{uploadProgress[file.name]}%</span>
                            </div>
                          )}
                        </div>
                      ))}
                      <Button 
                        onClick={handleUpload} 
                        disabled={uploadMutation.isPending}
                        className="w-full"
                        size="lg"
                      >
                        {uploadMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Upload All Files
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text-vibrant">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for PDF documents and scanned images in various formats including JPG, PNG, and TIFF.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Structured Output</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically organize content into headings, paragraphs, tables, and lists for easy navigation.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Upload className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Easy Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Download your structured data in JSON or plain text format for use in other applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
