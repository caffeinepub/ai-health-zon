import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Package, Loader2 } from 'lucide-react';
import { useSubmitVendorRegistration, useGetAllVendors } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { VendorRequest } from '../backend';
import { lookupPinCode } from '../utils/pinCodeLookup';

export default function Vendors() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    products: '',
    phone: '',
    email: '',
    pinCode: '',
    city: '',
    district: '',
    state: '',
    country: 'India',
    postOffice: '',
  });
  const [pinLookupLoading, setPinLookupLoading] = useState(false);

  const submitRegistration = useSubmitVendorRegistration();
  const { data: vendors = [], isLoading } = useGetAllVendors();

  const categories = [
    'Medical Equipment', 'Pharmaceuticals', 'Laboratory Supplies',
    'Hospital Furniture', 'IT Solutions', 'Facility Management'
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

    // Validate that PIN code has been filled and location fields are populated
    if (!formData.district || !formData.state || !formData.postOffice) {
      toast.error('Please enter a valid PIN code to auto-fill location details');
      return;
    }

    const request: VendorRequest = {
      id: `vendor_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      products: formData.products.split(',').map(p => p.trim()),
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
      toast.success('Vendor registration submitted successfully! Your request is pending admin approval.');
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        products: '',
        phone: '',
        email: '',
        pinCode: '',
        city: '',
        district: '',
        state: '',
        country: 'India',
        postOffice: '',
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Healthcare Vendors</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Connect with verified healthcare vendors and suppliers for medical equipment,
            pharmaceuticals, and hospital supplies.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Benefits */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Hospital Network</h3>
                      <p className="text-sm text-muted-foreground">Access to verified hospitals</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Direct Inquiries</h3>
                      <p className="text-sm text-muted-foreground">Receive purchase requests</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Verified Badge</h3>
                      <p className="text-sm text-muted-foreground">Build trust with customers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Register as Vendor</CardTitle>
                  <CardDescription>Join our network of healthcare suppliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Company Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger className="bg-[#006B7D] text-white border-white/30 focus:border-white [&>span]:text-white">
                          <SelectValue placeholder="Select category" className="text-white placeholder:text-white/70" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#006B7D] text-white border-white/30">
                          {categories.map((cat) => (
                            <SelectItem 
                              key={cat} 
                              value={cat}
                              className="text-white focus:bg-white/20 focus:text-white"
                            >
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="products">Products/Services (comma-separated) *</Label>
                      <Textarea
                        id="products"
                        placeholder="e.g., Surgical instruments, Hospital beds, Medical imaging equipment"
                        value={formData.products}
                        onChange={(e) => setFormData({ ...formData, products: e.target.value })}
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

          {/* Verified Vendors Directory */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Verified Vendors</h2>
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-4">Loading vendors...</p>
              </div>
            ) : vendors.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No verified vendors yet. Be the first to register!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <Card key={vendor.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{vendor.name}</span>
                        {vendor.verified && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </CardTitle>
                      <CardDescription>{vendor.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Products:</strong> {vendor.products.join(', ')}</p>
                        <p><strong>Location:</strong> {vendor.location.city}, {vendor.location.state}</p>
                        <p><strong>Contact:</strong> {vendor.contact.phone}</p>
                        <p><strong>Email:</strong> {vendor.contact.email}</p>
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
