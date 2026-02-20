import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { CheckCircle, Ambulance as AmbulanceIcon, MapPin } from 'lucide-react';
import { useAddHealthcareProfessional, useGetHealthcareProfessionalsByLocation } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { HealthcareProfessional } from '../backend';

export default function AmbulanceServices() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: '',
    services: {
      emergency: false,
      icu: false,
      event: false,
    },
  });
  const [searchCity, setSearchCity] = useState('');
  const [showResults, setShowResults] = useState(false);

  const addProfessional = useAddHealthcareProfessional();
  const { data: ambulanceServices = [], isLoading, refetch } = useGetHealthcareProfessionalsByLocation(searchCity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedServices = Object.entries(formData.services)
      .filter(([_, selected]) => selected)
      .map(([service]) => service);

    if (selectedServices.length === 0) {
      toast.error('Please select at least one service type');
      return;
    }

    const professional: HealthcareProfessional = {
      id: `amb_${Date.now()}`,
      name: formData.name,
      role: 'Ambulance',
      specialties: selectedServices,
      experience: BigInt(0),
      location: {
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      contact: {
        phone: formData.phone,
        email: formData.email,
        address: '',
        website: '',
      },
      verified: false,
      credentials: [],
    };

    try {
      await addProfessional.mutateAsync(professional);
      toast.success('Ambulance service registered successfully!');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        country: '',
        services: {
          emergency: false,
          icu: false,
          event: false,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register service. Please try again.');
    }
  };

  const handleSearch = () => {
    if (searchCity) {
      setShowResults(true);
      refetch();
    }
  };

  const filteredAmbulances = ambulanceServices.filter(s => s.role === 'Ambulance');

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Ambulance Services</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Register your ambulance service or search for emergency medical transport in your area.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Benefits */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Service Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Faster Response</h3>
                      <p className="text-sm text-muted-foreground">Connect with hospitals instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Hospital Requests</h3>
                      <p className="text-sm text-muted-foreground">Receive direct service requests</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Network Listing</h3>
                      <p className="text-sm text-muted-foreground">Increase your visibility</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Register Ambulance Service</CardTitle>
                  <CardDescription>Provide your service details to join our network</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Service Provider Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Service Types *</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="emergency"
                            checked={formData.services.emergency}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, services: { ...formData.services, emergency: checked as boolean } })
                            }
                          />
                          <label htmlFor="emergency" className="text-sm cursor-pointer">
                            Emergency Services
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="icu"
                            checked={formData.services.icu}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, services: { ...formData.services, icu: checked as boolean } })
                            }
                          />
                          <label htmlFor="icu" className="text-sm cursor-pointer">
                            ICU Transport
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="event"
                            checked={formData.services.event}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, services: { ...formData.services, event: checked as boolean } })
                            }
                          />
                          <label htmlFor="event" className="text-sm cursor-pointer">
                            Event Support
                          </label>
                        </div>
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

                    <Button type="submit" className="w-full" disabled={addProfessional.isPending}>
                      {addProfessional.isPending ? 'Registering...' : 'Register Service'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Location-based Search */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Find Ambulance Services
                </CardTitle>
                <CardDescription>Search for ambulance services in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter city name..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={!searchCity || isLoading}>
                    Search
                  </Button>
                </div>

                {showResults && (
                  <div className="mt-6">
                    {isLoading ? (
                      <p className="text-center text-muted-foreground">Searching...</p>
                    ) : filteredAmbulances.length === 0 ? (
                      <p className="text-center text-muted-foreground">No ambulance services found in this location.</p>
                    ) : (
                      <div className="space-y-4">
                        {filteredAmbulances.map((service) => (
                          <Card key={service.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {service.location.city}, {service.location.state}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Services: {service.specialties.join(', ')}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    📞 {service.contact.phone}
                                  </p>
                                </div>
                                <AmbulanceIcon className="h-8 w-8 text-primary" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
