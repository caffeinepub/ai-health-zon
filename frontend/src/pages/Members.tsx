import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Loader2, Users } from 'lucide-react';
import { useGetAllApprovedMembers } from '../hooks/useQueries';
import MemberDetailView from '../components/MemberDetailView';
import type { HealthcareProfessional, Vendor, Ngo } from '../backend';

export type UnifiedMember = {
  memberType: 'professional' | 'vendor' | 'ngo';
  data: HealthcareProfessional | Vendor | Ngo;
};

export default function Members() {
  const { data: members = [], isLoading } = useGetAllApprovedMembers();
  const [selectedMember, setSelectedMember] = useState<UnifiedMember | null>(null);

  const getMemberTypeBadge = (type: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      professional: { label: 'Healthcare Professional', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      vendor: { label: 'Vendor', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      ngo: { label: 'NGO', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    };
    return variants[type] || variants.professional;
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/members-hero.dim_1920x600.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Users className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Network Members
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Connect with verified healthcare professionals, trusted vendors, and impactful NGOs
              across our comprehensive healthcare ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-2">No Members Yet</h3>
              <p className="text-muted-foreground">
                Check back soon as we onboard verified members to our network
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {members.length} Verified Members
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse our directory of approved stakeholders and discover collaboration opportunities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member, index) => {
                  const typeBadge = getMemberTypeBadge(member.memberType);
                  const memberData = member.data;
                  
                  return (
                    <Card
                      key={`${member.memberType}-${memberData.id}-${index}`}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      onClick={() => setSelectedMember(member)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          {/* Profile Image */}
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 overflow-hidden">
                            <img
                              src="/assets/generated/member-placeholder.dim_400x400.png"
                              alt={memberData.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Name */}
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {memberData.name}
                          </h3>

                          {/* Type Badge */}
                          <Badge className={`mb-3 ${typeBadge.className}`}>
                            {typeBadge.label}
                          </Badge>

                          {/* Additional Info */}
                          <div className="text-sm text-muted-foreground space-y-1">
                            {'role' in memberData && (
                              <p className="font-medium text-foreground">{memberData.role}</p>
                            )}
                            {'category' in memberData && (
                              <p className="font-medium text-foreground">{memberData.category}</p>
                            )}
                            {'focusArea' in memberData && (
                              <p className="font-medium text-foreground">{memberData.focusArea}</p>
                            )}
                            <p className="text-xs">
                              {memberData.location.city}, {memberData.location.state}
                            </p>
                          </div>

                          {/* Click to view more */}
                          <p className="text-xs text-primary mt-4 font-medium">
                            Click to know more →
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Member Detail Dialog */}
      {selectedMember && (
        <MemberDetailView
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
