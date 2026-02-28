import { useGetApprovedStakeholderLocations } from '@/hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Building2, Ambulance, Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function NetworkMap() {
  const { data: locations, isLoading } = useGetApprovedStakeholderLocations();

  // Group locations by city
  const locationGroups = locations?.reduce(
    (acc, location) => {
      const key = `${location.city}, ${location.state}`;
      if (!acc[key]) {
        acc[key] = {
          city: location.city,
          state: location.state,
          country: location.country,
          count: 0,
        };
      }
      acc[key].count++;
      return acc;
    },
    {} as Record<string, { city: string; state: string; country: string; count: number }>
  );

  const uniqueLocations = locationGroups ? Object.values(locationGroups) : [];
  const totalStakeholders = locations?.length || 0;
  const totalCities = uniqueLocations.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Map Background */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="/assets/generated/world-map-bg.dim_1200x600.png"
          alt="Network Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Our Healthcare Network
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
              Connecting healthcare stakeholders across India
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-2">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-4xl gradient-text">{totalStakeholders}</CardTitle>
                <CardDescription className="text-base">Total Stakeholders</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-4xl gradient-text-alt">{totalCities}</CardTitle>
                <CardDescription className="text-base">Cities Covered</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <Building2 className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-4xl gradient-text-vibrant">Pan India</CardTitle>
                <CardDescription className="text-base">Coverage</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Network Locations</h2>
            <p className="text-xl text-gray-600">
              Our verified stakeholders are present in these cities
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : uniqueLocations.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center gradient-text-alt">No Locations Yet</CardTitle>
                <CardDescription className="text-center">
                  Approved stakeholders will appear here
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueLocations.map((location, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl gradient-text-alt mb-1">
                          {location.city}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {location.state}, {location.country}
                        </CardDescription>
                      </div>
                      <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-base px-3 py-1">
                      {location.count} {location.count === 1 ? 'Stakeholder' : 'Stakeholders'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Legend Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
              Stakeholder Types
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, label: 'Healthcare Professionals', color: 'text-blue-600' },
                { icon: Building2, label: 'Vendors', color: 'text-green-600' },
                { icon: Ambulance, label: 'Ambulance Services', color: 'text-red-600' },
                { icon: Heart, label: 'NGOs', color: 'text-purple-600' },
              ].map((type, index) => (
                <Card key={index} className="text-center border-2">
                  <CardHeader>
                    <type.icon className={`w-10 h-10 mx-auto mb-2 ${type.color}`} />
                    <CardDescription className="font-medium">{type.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
