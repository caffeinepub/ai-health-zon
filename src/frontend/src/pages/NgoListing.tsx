import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Heart, Filter } from 'lucide-react';
import { useAddNgo, useGetAllNgos } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { Ngo } from '../backend';

export default function NgoListing() {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    focusArea: '',
    services: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: '',
  });
  const [locationFilter, setLocationFilter] = useState('');
  const [focusAreaFilter, setFocusAreaFilter] = useState('all');

  const addNgo = useAddNgo();
  const { data: ngos = [], isLoading } = useGetAllNgos();

  const focusAreas = ['Health NGOs', 'Blood Banks', 'Relief Organizations'];
  const programs = ['Blood Drives', 'Health Camps', 'Awareness Campaigns', 'Disaster Support'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ngo: Ngo = {
      id: `ngo_${Date.now()}`,
      name: formData.name,
      registrationNo: formData.registrationNo,
      focusArea: formData.focusArea,
      services: formData.services.split(',').map(s => s.trim()),
      verified: false,
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
    };

    try {
      await addNgo.mutateAsync(ngo);
      toast.success('NGO registered successfully!');
      
      // Reset form
      setFormData({
        name: '',
        registrationNo: '',
        focusArea: '',
        services: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        country: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register NGO. Please try again.');
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="focusArea">Focus Area *</Label>
                      <Select value={formData.focusArea} onValueChange={(value) => setFormData({ ...formData, focusArea: value })} required>
                        <SelectTrigger id="focusArea">
                          <SelectValue placeholder="Select focus area" />
                        </SelectTrigger>
                        <SelectContent>
                          {focusAreas.map((area) => (
                            <SelectItem key={area} value={area}>{area}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="services">Services (comma-separated) *</Label>
                      <Input
                        id="services"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                        placeholder="e.g., Blood donation, Health camps"
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

                  <Button type="submit" className="w-full" disabled={addNgo.isPending}>
                    {addNgo.isPending ? 'Registering...' : 'Register NGO'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* NGO Directory */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">NGO Directory</h2>
            
            {/* Filters */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                  <Select value={focusAreaFilter} onValueChange={setFocusAreaFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Focus Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Focus Areas</SelectItem>
                      {focusAreas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Filter className="h-4 w-4 mr-2" />
                    {filteredNgos.length} organizations found
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading NGOs...</p>
              </div>
            ) : filteredNgos.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No NGOs found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNgos.map((ngo) => (
                  <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{ngo.name}</CardTitle>
                      <CardDescription>{ngo.focusArea}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Reg. No: {ngo.registrationNo}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ngo.location.city}, {ngo.location.state}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Services: {ngo.services.slice(0, 2).join(', ')}
                        {ngo.services.length > 2 && '...'}
                      </p>
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
