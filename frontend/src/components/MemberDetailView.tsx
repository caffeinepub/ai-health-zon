import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Mail, Phone, Globe, MapPin, Briefcase, Package, Heart } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import type { UnifiedMember } from '../pages/Members';
import type { HealthcareProfessional, Vendor, Ngo } from '../backend';

interface MemberDetailViewProps {
  member: UnifiedMember;
  onClose: () => void;
}

export default function MemberDetailView({ member, onClose }: MemberDetailViewProps) {
  const memberData = member.data;
  const isOpen = !!member;

  const getMemberIcon = () => {
    switch (member.memberType) {
      case 'professional':
        return <Briefcase className="h-6 w-6" />;
      case 'vendor':
        return <Package className="h-6 w-6" />;
      case 'ngo':
        return <Heart className="h-6 w-6" />;
    }
  };

  const getMemberTypeLabel = () => {
    switch (member.memberType) {
      case 'professional':
        return 'Healthcare Professional';
      case 'vendor':
        return 'Vendor';
      case 'ngo':
        return 'NGO';
    }
  };

  const handleWhatsAppClick = () => {
    const phone = memberData.contact.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${memberData.contact.email}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getMemberIcon()}
            <span>Member Profile</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center pb-6 border-b">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src="/assets/generated/member-placeholder.dim_400x400.png"
                  alt={memberData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{memberData.name}</h2>
              <Badge className="mb-2">{getMemberTypeLabel()}</Badge>
              {memberData.verified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✓ Verified
                </Badge>
              )}
            </div>

            {/* Professional Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Professional Information</h3>
              
              {member.memberType === 'professional' && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Role</p>
                    <p className="font-medium">{(memberData as HealthcareProfessional).role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Experience</p>
                    <p className="font-medium">
                      {Number((memberData as HealthcareProfessional).experience)} years
                    </p>
                  </div>
                  {(memberData as HealthcareProfessional).specialties.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {(memberData as HealthcareProfessional).specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {member.memberType === 'vendor' && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-medium">{(memberData as Vendor).category}</p>
                  </div>
                  {(memberData as Vendor).products.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Products & Services</p>
                      <div className="flex flex-wrap gap-2">
                        {(memberData as Vendor).products.map((product, idx) => (
                          <Badge key={idx} variant="secondary">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {member.memberType === 'ngo' && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Focus Area</p>
                    <p className="font-medium">{(memberData as Ngo).focusArea}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Registration Number</p>
                    <p className="font-medium">{(memberData as Ngo).registrationNo}</p>
                  </div>
                  {(memberData as Ngo).services.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {(memberData as Ngo).services.map((service, idx) => (
                          <Badge key={idx} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <Separator />

            {/* Location */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </h3>
              <p className="text-muted-foreground">
                {memberData.location.city}, {memberData.location.state}, {memberData.location.country}
              </p>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              
              <div className="space-y-3">
                {memberData.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{memberData.contact.phone}</span>
                  </div>
                )}
                
                {memberData.contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="break-all">{memberData.contact.email}</span>
                  </div>
                )}
                
                {memberData.contact.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={memberData.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {memberData.contact.website}
                    </a>
                  </div>
                )}
                
                {memberData.contact.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span>{memberData.contact.address}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {memberData.contact.phone && (
                  <Button
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  >
                    <SiWhatsapp className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Button>
                )}
                {memberData.contact.email && (
                  <Button onClick={handleEmailClick} variant="outline" className="flex-1">
                    <Mail className="h-5 w-5 mr-2" />
                    Email
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
