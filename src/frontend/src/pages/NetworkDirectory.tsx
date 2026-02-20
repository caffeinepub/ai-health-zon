import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Search, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useGetAllHospitals, useGetAllVendors, useGetAllNgos } from '../hooks/useQueries';

export default function NetworkDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');

  const { data: hospitals = [], isLoading: hospitalsLoading } = useGetAllHospitals();
  const { data: vendors = [], isLoading: vendorsLoading } = useGetAllVendors();
  const { data: ngos = [], isLoading: ngosLoading } = useGetAllNgos();

  const isLoading = hospitalsLoading || vendorsLoading || ngosLoading;

  const allEntities = [
    ...hospitals.map(h => ({ ...h, type: 'Hospital', category: 'Hospitals & Clinics' })),
    ...vendors.map(v => ({ ...v, type: 'Vendor', category: v.category })),
    ...ngos.map(n => ({ ...n, type: 'NGO', category: n.focusArea }))
  ];

  const filteredEntities = allEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || entity.type.toLowerCase() === categoryFilter.toLowerCase();
    const matchesLocation = !locationFilter || entity.location.city.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Network Directory</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Search and connect with healthcare professionals, hospitals, vendors, and service providers
            in our comprehensive network.
          </p>

          {/* Search and Filters */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hospital">Hospitals & Clinics</SelectItem>
                      <SelectItem value="vendor">Vendors</SelectItem>
                      <SelectItem value="ngo">NGOs</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading directory...</p>
              </div>
            ) : filteredEntities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEntities.map((entity, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1">{entity.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{entity.type} • {entity.category}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {entity.location.city}, {entity.location.state}, {entity.location.country}
                        </span>
                      </div>
                      {entity.contact && (
                        <>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{entity.contact.phone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{entity.contact.email}</span>
                          </div>
                        </>
                      )}
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
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
