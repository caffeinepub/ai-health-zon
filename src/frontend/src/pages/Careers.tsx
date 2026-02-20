import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Upload, Briefcase } from 'lucide-react';
import { useAddHealthcareProfessional } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { HealthcareProfessional } from '../backend';
import { ExternalBlob } from '../backend';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    location: { city: '', state: '', country: '' },
    phone: '',
    email: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addProfessional = useAddHealthcareProfessional();

  const jobRoles = [
    'Doctor', 'Nurse', 'Radiologist', 'Physiotherapist', 'Dietitian',
    'Medical Coder', 'RCM Staff', 'Insurance Staff', 'Security', 'Housekeeping', 'Admin'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error('Please upload your CV');
      return;
    }

    try {
      const cvBytes = new Uint8Array(await cvFile.arrayBuffer());
      const cvBlob = ExternalBlob.fromBytes(cvBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const professional: HealthcareProfessional = {
        id: `prof_${Date.now()}`,
        name: formData.name,
        role: formData.role,
        specialties: [],
        experience: BigInt(formData.experience || 0),
        location: formData.location,
        contact: {
          phone: formData.phone,
          email: formData.email,
          address: '',
          website: '',
        },
        verified: false,
        credentials: [cvBlob],
      };

      await addProfessional.mutateAsync(professional);
      toast.success('Application submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        experience: '',
        location: { city: '', state: '', country: '' },
        phone: '',
        email: '',
      });
      setCvFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Careers & Opportunities</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Join our network of healthcare professionals and discover exciting career opportunities
            across hospitals and healthcare organizations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Join Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Visibility</h3>
                      <p className="text-sm text-muted-foreground">Get discovered by top hospitals</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Hospital Connections</h3>
                      <p className="text-sm text-muted-foreground">Direct access to opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Career Growth</h3>
                      <p className="text-sm text-muted-foreground">Professional development support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Job Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {jobRoles.map((role) => (
                      <li key={role}>• {role}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Profile</CardTitle>
                  <CardDescription>Fill in your details to join our healthcare network</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role *</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {jobRoles.map((role) => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.location.city}
                          onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cv">Upload CV *</Label>
                      <div className="mt-2">
                        <Input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                          required
                        />
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="mt-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{uploadProgress}% uploaded</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={addProfessional.isPending}>
                      {addProfessional.isPending ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
