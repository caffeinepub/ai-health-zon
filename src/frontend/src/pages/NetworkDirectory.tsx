import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Search, MapPin, X, Building2, Briefcase, Heart, Users } from 'lucide-react';
import { useGetAllHospitals, useGetAllVendors, useGetAllNgos } from '../hooks/useQueries';
import StakeholderDetailView from '../components/StakeholderDetailView';
import type { Hospital, Vendor, Ngo } from '../backend';

type StakeholderEntity = (Hospital | Vendor | Ngo) & {
  type: 'Hospital' | 'Vendor' | 'NGO';
  category: string;
};

export default function NetworkDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderEntity | null>(null);

  const { data: hospitals = [], isLoading: hospitalsLoading } = useGetAllHospitals();
  const { data: vendors = [], isLoading: vendorsLoading } = useGetAllVendors();
  const { data: ngos = [], isLoading: ngosLoading } = useGetAllNgos();

  const isLoading = hospitalsLoading || vendorsLoading || ngosLoading;

  const allEntities: StakeholderEntity[] = [
    ...hospitals.map(h => ({ ...h, type: 'Hospital' as const, category: 'Healthcare Facility' })),
    ...vendors.map(v => ({ ...v, type: 'Vendor' as const, category: v.category })),
    ...ngos.map(n => ({ ...n, type: 'NGO' as const, category: n.focusArea }))
  ];

  const filteredEntities = allEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || entity.type.toLowerCase() === categoryFilter.toLowerCase();
    const matchesLocation = !locationFilter || entity.location.city.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const activeFiltersCount = [
    categoryFilter !== 'all',
    locationFilter !== '',
    searchTerm !== ''
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setLocationFilter('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Building2 className="h-5 w-5" />;
      case 'Vendor':
        return <Briefcase className="h-5 w-5" />;
      case 'NGO':
        return <Heart className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="w-full bg-background">
      {/* Header Section with Hero Image */}
      <section className="relative py-20 lg:py-28 border-b overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/generated/directory-hero.dim_1000x400.png" 
            alt="Network Directory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-white drop-shadow-lg">
            Network Directory
          </h1>
          <p className="text-lg text-white/95 max-w-3xl leading-relaxed drop-shadow-md">
            Connect with healthcare professionals, hospitals, vendors, and service providers in our comprehensive network.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hospital">Healthcare Facilities</SelectItem>
                <SelectItem value="vendor">Vendors</SelectItem>
                <SelectItem value="ngo">NGOs</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {categoryFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {categoryFilter === 'hospital' ? 'Healthcare Facilities' : categoryFilter === 'vendor' ? 'Vendors' : 'NGOs'}
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {locationFilter && (
                <Badge variant="secondary" className="gap-1">
                  Location: {locationFilter}
                  <button
                    onClick={() => setLocationFilter('')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-sm h-7"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading directory...</p>
            </div>
          ) : filteredEntities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">No results found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredEntities.length} {filteredEntities.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredEntities.map((entity, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStakeholder(entity)}
                    className="group bg-card border border-border rounded-lg p-6 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {/* Avatar/Logo */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16 flex-shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                          {getInitials(entity.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {entity.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getTypeIcon(entity.type)}
                          <span>{entity.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <Badge variant="secondary" className="mb-3">
                      {entity.category}
                    </Badge>

                    {/* Location */}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        {entity.location.city}, {entity.location.state}
                      </span>
                    </div>

                    {/* Verified Badge */}
                    {'verified' in entity && entity.verified && (
                      <div className="mt-4 pt-4 border-t">
                        <Badge variant="outline" className="text-xs">
                          ✓ Verified
                        </Badge>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Detail View Modal */}
      {selectedStakeholder && (
        <StakeholderDetailView
          stakeholder={selectedStakeholder}
          onClose={() => setSelectedStakeholder(null)}
        />
      )}
    </div>
  );
}
