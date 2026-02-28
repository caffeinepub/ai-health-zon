import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { CheckCircle, Upload, Briefcase, Loader2 } from 'lucide-react';
import { useSubmitHealthcareProfessionalRegistration } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { HealthcareProfessionalRequest } from '../backend';
import { ExternalBlob } from '../backend';
import { lookupPinCode } from '../utils/pinCodeLookup';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    pinCode: '',
    location: { 
      city: '', 
      district: '',
      state: '', 
      country: 'India',
      postOffice: ''
    },
    phone: '',
    email: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pinLookupLoading, setPinLookupLoading] = useState(false);

  const submitRegistration = useSubmitHealthcareProfessionalRegistration();

  const jobRoles = [
    'Doctor', 'Nurse', 'Radiologist', 'Physiotherapist', 'Dietitian',
    'Medical Coder', 'RCM Staff', 'Insurance Staff', 'Security', 'Housekeeping', 'Admin'
  ];

  // Auto-fill location fields when PIN code is entered
  useEffect(() => {
    const fetchLocationFromPin = async () => {
      if (formData.pinCode.length === 6) {
        setPinLookupLoading(true);
        const result = await lookupPinCode(formData.pinCode);
        setPinLookupLoading(false);

        if (result.success) {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              district: result.district,
              state: result.state,
              postOffice: result.postOffice,
            }
          }));
        } else if (result.error) {
          toast.error(result.error);
        }
      }
    };

    fetchLocationFromPin();
  }, [formData.pinCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error('Please upload your CV');
      return;
    }

    // Validate that PIN code has been filled and location fields are populated
    if (!formData.location.district || !formData.location.state || !formData.location.postOffice) {
      toast.error('Please enter a valid PIN code to auto-fill location details');
      return;
    }

    try {
      const cvBytes = new Uint8Array(await cvFile.arrayBuffer());
      const cvBlob = ExternalBlob.fromBytes(cvBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const request: HealthcareProfessionalRequest = {
        id: `prof_${Date.now()}`,
        name: formData.name,
        role: formData.role,
        specialties: [],
        experience: BigInt(formData.experience || 0),
        location: {
          city: formData.location.city,
          state: formData.location.state,
          country: formData.location.country,
        },
        contact: {
          phone: formData.phone,
          email: formData.email,
          address: '',
          website: '',
        },
        credentials: [cvBlob],
        status: { __kind__: 'pending' } as any,
        requester: null as any,
      };

      await submitRegistration.mutateAsync(request);
      toast.success('Application submitted successfully! Your request is pending admin approval.');
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        experience: '',
        pinCode: '',
        location: { 
          city: '', 
          district: '',
          state: '', 
          country: 'India',
          postOffice: ''
        },
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
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 focus:border-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-white">Job Role *</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger className="bg-[#006B7D] text-white border-white/30 focus:border-white [&>span]:text-white">
                          <SelectValue placeholder="Select your role" className="text-white placeholder:text-white/70" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#006B7D] text-white border-white/30">
                          {jobRoles.map((role) => (
                            <SelectItem 
                              key={role} 
                              value={role}
                              className="text-white focus:bg-white/20 focus:text-white"
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience" className="text-white">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 focus:border-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="pinCode" className="text-white">PIN Code *</Label>
                      <div className="relative">
                        <Input
                          id="pinCode"
                          type="text"
                          maxLength={6}
                          pattern="\d{6}"
                          placeholder="Enter 6-digit PIN code"
                          value={formData.pinCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setFormData({ ...formData, pinCode: value });
                          }}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 focus:border-white"
                          required
                        />
                        {pinLookupLoading && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white" />
                        )}
                      </div>
                      <p className="text-xs text-white/70 mt-1">
                        Location details will be auto-filled based on PIN code
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postOffice" className="text-white">Post Office *</Label>
                        <Input
                          id="postOffice"
                          value={formData.location.postOffice}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-white">City *</Label>
                        <Input
                          id="city"
                          value={formData.location.city}
                          onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 focus:border-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="district" className="text-white">District *</Label>
                        <Input
                          id="district"
                          value={formData.location.district}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-white">State *</Label>
                        <Input
                          id="state"
                          value={formData.location.state}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-white">Nation *</Label>
                        <Input
                          id="country"
                          value={formData.location.country}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-white">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-[#006B7D] text-white placeholder:text-white/70 border-white/30 focus:border-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cv" className="text-white">Upload CV/Resume *</Label>
                      <div className="mt-2">
                        <Input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                          className="bg-[#006B7D] text-white file:text-white file:bg-white/20 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md hover:file:bg-white/30 border-white/30 focus:border-white"
                          required
                        />
                        {cvFile && (
                          <p className="text-sm text-white/70 mt-2">
                            Selected: {cvFile.name}
                          </p>
                        )}
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="mt-2">
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-white h-2 rounded-full transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-sm text-white/70 mt-1">
                              Uploading: {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-white text-[#006B7D] hover:bg-white/90 font-bold" 
                      disabled={submitRegistration.isPending}
                    >
                      {submitRegistration.isPending ? 'Submitting...' : 'Submit Application'}
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
