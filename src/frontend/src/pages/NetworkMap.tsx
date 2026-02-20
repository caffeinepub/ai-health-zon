import { MapPin, Users, Truck, Building2, Heart, Loader2 } from 'lucide-react';
import { useGetApprovedStakeholderLocations } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Location } from '../backend';

interface LocationWithCount extends Location {
  count: number;
  types: {
    professionals: number;
    vendors: number;
    ambulances: number;
    ngos: number;
  };
}

export default function NetworkMap() {
  const { data: locations = [], isLoading, error } = useGetApprovedStakeholderLocations();

  // Aggregate locations by city and state
  const aggregatedLocations: LocationWithCount[] = locations.reduce((acc: LocationWithCount[], loc: Location) => {
    const existing = acc.find(l => l.city === loc.city && l.state === loc.state);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        ...loc,
        count: 1,
        types: {
          professionals: 0,
          vendors: 0,
          ambulances: 0,
          ngos: 0,
        },
      });
    }
    return acc;
  }, []);

  // Sort by count descending
  const sortedLocations = aggregatedLocations.sort((a, b) => b.count - a.count);

  const totalStakeholders = locations.length;
  const uniqueCities = aggregatedLocations.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/world-map-bg.dim_1200x600.png)' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Live Network Map</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Growing Healthcare Network
            </h1>
            <p className="text-lg text-muted-foreground">
              Visualizing our approved stakeholders across India. Every marker represents verified healthcare professionals, vendors, ambulance services, and NGOs committed to transforming healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Stakeholders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalStakeholders}</div>
                <p className="text-xs text-muted-foreground mt-1">Approved members</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cities Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{uniqueCities}</div>
                <p className="text-xs text-muted-foreground mt-1">Unique locations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-lg font-semibold">Active</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Auto-updating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legend Section */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stakeholder Types</CardTitle>
              <CardDescription>Color-coded markers represent different types of network members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium">Healthcare Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Vendors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">Ambulance Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-purple-500" />
                  <span className="text-sm font-medium">NGOs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map Visualization Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Network Locations
              </CardTitle>
              <CardDescription>
                All approved stakeholder locations across India
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading network data...</span>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-destructive">Failed to load network locations</p>
                </div>
              ) : sortedLocations.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <MapPin className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <div>
                    <h3 className="text-lg font-semibold">No Locations Yet</h3>
                    <p className="text-muted-foreground">
                      Approved stakeholders will appear here automatically
                    </p>
                  </div>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedLocations.map((location, index) => (
                      <Card key={`${location.city}-${location.state}-${index}`} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-base flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                {location.city}
                              </CardTitle>
                              <CardDescription className="text-sm mt-1">
                                {location.state}, {location.country}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              {location.count}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Total Members
                              </span>
                              <span className="font-semibold">{location.count}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500" title="Healthcare Professionals" />
                              <div className="h-2 w-2 rounded-full bg-green-500" title="Vendors" />
                              <div className="h-2 w-2 rounded-full bg-red-500" title="Ambulance Services" />
                              <div className="h-2 w-2 rounded-full bg-purple-500" title="NGOs" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Admin-Approved Network</h3>
                  <p className="text-muted-foreground">
                    All stakeholders shown on this map have been verified and approved by our admin team. 
                    The map updates automatically when new members join our network after approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
