import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { CheckCircle, Ambulance as AmbulanceIcon, MapPin, Loader2 } from 'lucide-react';
import { useSubmitAmbulanceRegistration } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { AmbulanceRequest } from '../backend';
import { lookupPinCode } from '../utils/pinCodeLookup';

export default function AmbulanceServices() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pinCode: '',
    city: '',
    district: '',
    state: '',
    country: 'India',
    postOffice: '',
    services: {
      emergency: false,
      icu: false,
      event: false,
    },
  });
  const [pinLookupLoading, setPinLookupLoading] = useState(false);

  const submitRegistration = useSubmitAmbulanceRegistration();

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
            district: result.district,
            state: result.state,
            postOffice: result.postOffice,
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

    const selectedServices = Object.entries(formData.services)
      .filter(([_, selected]) => selected)
      .map(([service]) => service);

    if (selectedServices.length === 0) {
      toast.error('Please select at least one service type');
      return;
    }

    // Validate that PIN code has been filled and location fields are populated
    if (!formData.district || !formData.state || !formData.postOffice) {
      toast.error('Please enter a valid PIN code to auto-fill location details');
      return;
    }

    const request: AmbulanceRequest = {
      id: `amb_${Date.now()}`,
      name: formData.name,
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
      status: { __kind__: 'pending' } as any,
      requester: null as any,
    };

    try {
      await submitRegistration.mutateAsync(request);
      toast.success('Ambulance service registration submitted successfully! Your request is pending admin approval.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        pinCode: '',
        city: '',
        district: '',
        state: '',
        country: 'India',
        postOffice: '',
        services: {
          emergency: false,
          icu: false,
          event: false,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Ambulance Services</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Register your ambulance service to join our healthcare network.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                        Location details will be auto-filled based on PIN code
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postOffice">Post Office *</Label>
                        <Input
                          id="postOffice"
                          value={formData.postOffice}
                          className="opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="district">District *</Label>
                        <Input
                          id="district"
                          value={formData.district}
                          className="opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          className="opacity-60 cursor-not-allowed"
                          disabled
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Nation *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          className="opacity-60 cursor-not-allowed"
                          disabled
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
          </div>
        </div>
      </section>
    </div>
  );
}
