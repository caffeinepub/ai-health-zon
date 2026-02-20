import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Building2 } from 'lucide-react';
import { useAddVendor, useGetAllVendors } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { Vendor } from '../backend';

export default function Vendors() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    products: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: '',
  });

  const addVendor = useAddVendor();
  const { data: vendors = [], isLoading } = useGetAllVendors();

  const vendorCategories = ['Equipment', 'IT & Software', 'Pharmacy', 'Facility Services'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vendor: Vendor = {
      id: `vendor_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      products: formData.products.split(',').map(p => p.trim()),
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
      await addVendor.mutateAsync(vendor);
      toast.success('Vendor registration submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        products: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        country: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register vendor. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Vendor Registration</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Join our network of trusted vendors and connect with healthcare organizations
            looking for quality products and services.
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
                      <h3 className="font-semibold mb-1">Leads</h3>
                      <p className="text-sm text-muted-foreground">Direct access to hospital procurement</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Hospital Tie-ups</h3>
                      <p className="text-sm text-muted-foreground">Build long-term partnerships</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Visibility</h3>
                      <p className="text-sm text-muted-foreground">Showcase your products and services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Register Your Business</CardTitle>
                  <CardDescription>Provide your business details to join our vendor network</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {vendorCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="products">Products/Services (comma-separated) *</Label>
                      <Textarea
                        id="products"
                        value={formData.products}
                        onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                        placeholder="e.g., Medical Equipment, Surgical Instruments, Hospital Beds"
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

                    <Button type="submit" className="w-full" disabled={addVendor.isPending}>
                      {addVendor.isPending ? 'Registering...' : 'Register as Vendor'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Vendor Directory */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Registered Vendors</h2>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading vendors...</p>
              </div>
            ) : vendors.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No vendors registered yet. Be the first!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <Card key={vendor.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                      <CardDescription>{vendor.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {vendor.location.city}, {vendor.location.state}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vendor.products.slice(0, 3).join(', ')}
                        {vendor.products.length > 3 && '...'}
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
