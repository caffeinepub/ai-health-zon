import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Heart, Filter, Loader2 } from 'lucide-react';
import { useSubmitNgoRegistration, useGetAllNgos } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { NgoRequest } from '../backend';
import { lookupPinCode } from '../utils/pinCodeLookup';

export default function NgoListing() {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    focusArea: '',
    services: '',
    phone: '',
    email: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
  });
  const [locationFilter, setLocationFilter] = useState('');
  const [focusAreaFilter, setFocusAreaFilter] = useState('all');
  const [pinLookupLoading, setPinLookupLoading] = useState(false);

  const submitRegistration = useSubmitNgoRegistration();
  const { data: ngos = [], isLoading } = useGetAllNgos();

  const focusAreas = ['Health NGOs', 'Blood Banks', 'Relief Organizations'];
  const programs = ['Blood Drives', 'Health Camps', 'Awareness Campaigns', 'Disaster Support'];

  // Auto-fill city and state when PIN code is entered
  useEffect(() => {
    const fetchLocationFromPin = async () => {
      if (formData.pinCode.length === 6) {
        setPinLookupLoading(true);
        const result = await lookupPinCode(formData.pinCode);
        setPinLookupLoading(false);

        if (result.success) {
          setFormData(prev => ({
            ...prev,
            city: result.city,
            state: result.state,
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

    const request: NgoRequest = {
      id: `ngo_${Date.now()}`,
      name: formData.name,
      registrationNo: formData.registrationNo,
      focusArea: formData.focusArea,
      services: formData.services.split(',').map(s => s.trim()),
      contact: {
        phone: formData.phone,
        email: formData.email,
        address: '',
        website: '',
      },
      location: {
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      status: { __kind__: 'pending' } as any,
      requester: null as any,
    };

    try {
      await submitRegistration.mutateAsync(request);
      toast.success('NGO registration submitted successfully! Your request is pending admin approval.');
      
      // Reset form
      setFormData({
        name: '',
        registrationNo: '',
        focusArea: '',
        services: '',
        phone: '',
        email: '',
        pinCode: '',
        city: '',
        state: '',
        country: 'India',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration. Please try again.');
    }
  };

  const filteredNgos = ngos.filter(ngo => {
    const matchesLocation = !locationFilter || ngo.location.city.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesFocusArea = focusAreaFilter === 'all' || ngo.focusArea === focusAreaFilter;
    return matchesLocation && matchesFocusArea;
  });

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">NGO Network</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Connect with healthcare NGOs, blood banks, and community organizations
            working to improve public health and wellbeing.
          </p>

          {/* Programs Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Community Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {programs.map((program) => (
                <Card key={program}>
                  <CardContent className="pt-6 text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">{program}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Register Your NGO</CardTitle>
                <CardDescription>Join our network of healthcare and community organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Organization Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="registrationNo">Registration Number *</Label>
                    <Input
                      id="registrationNo"
                      value={formData.registrationNo}
                      onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="focusArea">Focus Area *</Label>
                    <Select value={formData.focusArea} onValueChange={(value) => setFormData({ ...formData, focusArea: value })}>
                      <SelectTrigger className="bg-[#006B7D] text-white border-white/30 focus:border-white [&>span]:text-white">
                        <SelectValue placeholder="Select focus area" className="text-white placeholder:text-white/70" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#006B7D] text-white border-white/30">
                        {focusAreas.map((area) => (
                          <SelectItem 
                            key={area} 
                            value={area}
                            className="text-white focus:bg-white/20 focus:text-white"
                          >
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="services">Services Offered *</Label>
                    <Textarea
                      id="services"
                      placeholder="Enter services (comma-separated)"
                      value={formData.services}
                      onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      required
                    />
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
                    <Label htmlFor="pinCode">PIN Code *</Label>
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
                        required
                      />
                      {pinLookupLoading && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      City and state will be auto-filled based on PIN code
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitRegistration.isPending}>
                    {submitRegistration.isPending ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* NGO Directory */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">NGO Directory</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Input
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full sm:w-64"
                />
                <Select value={focusAreaFilter} onValueChange={setFocusAreaFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-[#006B7D] text-white border-white/30 focus:border-white [&>span]:text-white">
                    <SelectValue placeholder="All Focus Areas" className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#006B7D] text-white border-white/30">
                    <SelectItem value="all" className="text-white focus:bg-white/20 focus:text-white">
                      All Focus Areas
                    </SelectItem>
                    {focusAreas.map((area) => (
                      <SelectItem 
                        key={area} 
                        value={area}
                        className="text-white focus:bg-white/20 focus:text-white"
                      >
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading NGOs...</p>
            ) : filteredNgos.length === 0 ? (
              <p className="text-center text-muted-foreground">No NGOs found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNgos.map((ngo) => (
                  <Card key={ngo.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{ngo.name}</span>
                        {ngo.verified && (
                          <Heart className="h-5 w-5 text-primary fill-primary" />
                        )}
                      </CardTitle>
                      <CardDescription>{ngo.focusArea}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <strong>Registration:</strong> {ngo.registrationNo}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>Services:</strong> {ngo.services.join(', ')}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>Location:</strong> {ngo.location.city}, {ngo.location.state}
                        </p>
                        <p className="text-muted-foreground">
                          📞 {ngo.contact.phone}
                        </p>
                        <p className="text-muted-foreground">
                          ✉️ {ngo.contact.email}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
