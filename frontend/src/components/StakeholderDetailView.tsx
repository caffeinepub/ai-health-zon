import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  Briefcase,
  Heart,
  Users,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import type { Hospital, Vendor, Ngo } from '../backend';

type StakeholderEntity = (Hospital | Vendor | Ngo) & {
  type: 'Hospital' | 'Vendor' | 'NGO';
  category: string;
};

interface StakeholderDetailViewProps {
  stakeholder: StakeholderEntity;
  onClose: () => void;
}

export default function StakeholderDetailView({ stakeholder, onClose }: StakeholderDetailViewProps) {
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
        return <Building2 className="h-6 w-6" />;
      case 'Vendor':
        return <Briefcase className="h-6 w-6" />;
      case 'NGO':
        return <Heart className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const openWhatsApp = () => {
    const phone = stakeholder.contact.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const openEmail = () => {
    window.location.href = `mailto:${stakeholder.contact.email}`;
  };

  const openWebsite = () => {
    let url = stakeholder.contact.website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  // Type guards
  const isHospital = (entity: StakeholderEntity): entity is Hospital & { type: 'Hospital'; category: string } => {
    return entity.type === 'Hospital';
  };

  const isVendor = (entity: StakeholderEntity): entity is Vendor & { type: 'Vendor'; category: string } => {
    return entity.type === 'Vendor';
  };

  const isNgo = (entity: StakeholderEntity): entity is Ngo & { type: 'NGO'; category: string } => {
    return entity.type === 'NGO';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 lg:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                    {getInitials(stakeholder.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-3xl font-semibold mb-2 tracking-tight">
                    {stakeholder.name}
                  </DialogTitle>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {getTypeIcon(stakeholder.type)}
                      <span className="font-medium">{stakeholder.type}</span>
                    </div>
                    <Badge variant="secondary">{stakeholder.category}</Badge>
                    {'verified' in stakeholder && stakeholder.verified && (
                      <Badge variant="outline" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <Separator className="my-6" />

            {/* Contact Information */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
                    <p className="text-base">
                      {stakeholder.contact.address}
                      <br />
                      {stakeholder.location.city}, {stakeholder.location.state}, {stakeholder.location.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                    <p className="text-base">{stakeholder.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                    <p className="text-base">{stakeholder.contact.email}</p>
                  </div>
                </div>

                {stakeholder.contact.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Website</p>
                      <p className="text-base text-primary hover:underline cursor-pointer" onClick={openWebsite}>
                        {stakeholder.contact.website}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button onClick={openWhatsApp} className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button onClick={openEmail} variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                {stakeholder.contact.website && (
                  <Button onClick={openWebsite} variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                )}
              </div>
            </section>

            <Separator className="my-6" />

            {/* Type-Specific Information */}
            {isHospital(stakeholder) && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Services & Specialties</h3>
                <div className="space-y-4">
                  {stakeholder.services.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Medical Services</p>
                      <div className="flex flex-wrap gap-2">
                        {stakeholder.services.map((service, idx) => (
                          <Badge key={idx} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {stakeholder.accreditation && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Accreditation</p>
                      <p className="text-base">{stakeholder.accreditation}</p>
                    </div>
                  )}

                  {stakeholder.phisoCourses && stakeholder.phisoCourses.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">PHISO Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {stakeholder.phisoCourses.map((course, idx) => (
                          <Badge key={idx} variant="secondary">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {stakeholder.radiologyCriteria && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Radiology Criteria</p>
                      <p className="text-base">{stakeholder.radiologyCriteria}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {isVendor(stakeholder) && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Products & Services</h3>
                <div className="space-y-4">
                  {stakeholder.products.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Available Products</p>
                      <div className="flex flex-wrap gap-2">
                        {stakeholder.products.map((product, idx) => (
                          <Badge key={idx} variant="outline">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {isNgo(stakeholder) && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Services & Programs</h3>
                <div className="space-y-4">
                  {stakeholder.services.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Programs Offered</p>
                      <div className="flex flex-wrap gap-2">
                        {stakeholder.services.map((service, idx) => (
                          <Badge key={idx} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {stakeholder.registrationNo && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Registration Number</p>
                      <p className="text-base">{stakeholder.registrationNo}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
