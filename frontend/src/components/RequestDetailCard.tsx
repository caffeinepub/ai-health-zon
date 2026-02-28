import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Mail, MessageCircle, MapPin, Phone, Calendar, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useApproveHealthcareProfessional, useRejectHealthcareProfessional, useApproveVendor, useRejectVendor, useApproveNgo, useRejectNgo, useApproveAmbulance, useRejectAmbulance } from '../hooks/useQueries';
import type { HealthcareProfessionalRequest, VendorRequest, NgoRequest, AmbulanceRequest } from '../backend';

type RequestType = 'professional' | 'vendor' | 'ambulance' | 'ngo';

interface RequestDetailCardProps {
  type: RequestType;
  request: HealthcareProfessionalRequest | VendorRequest | NgoRequest | AmbulanceRequest;
}

export default function RequestDetailCard({ type, request }: RequestDetailCardProps) {
  const [expanded, setExpanded] = useState(false);

  const approveProfessional = useApproveHealthcareProfessional();
  const rejectProfessional = useRejectHealthcareProfessional();
  const approveVendor = useApproveVendor();
  const rejectVendor = useRejectVendor();
  const approveNgo = useApproveNgo();
  const rejectNgo = useRejectNgo();
  const approveAmbulance = useApproveAmbulance();
  const rejectAmbulance = useRejectAmbulance();

  const handleApprove = async () => {
    try {
      if (type === 'professional') {
        await approveProfessional.mutateAsync(request.id);
        toast.success('Healthcare professional approved successfully!');
      } else if (type === 'vendor') {
        await approveVendor.mutateAsync(request.id);
        toast.success('Vendor approved successfully!');
      } else if (type === 'ngo') {
        await approveNgo.mutateAsync(request.id);
        toast.success('NGO approved successfully!');
      } else if (type === 'ambulance') {
        await approveAmbulance.mutateAsync(request.id);
        toast.success('Ambulance service approved successfully!');
      }
    } catch (error) {
      console.error('Approval error:', error);
      toast.error('Failed to approve request. Please try again.');
    }
  };

  const handleReject = async () => {
    try {
      if (type === 'professional') {
        await rejectProfessional.mutateAsync(request.id);
        toast.success('Request rejected.');
      } else if (type === 'vendor') {
        await rejectVendor.mutateAsync(request.id);
        toast.success('Request rejected.');
      } else if (type === 'ngo') {
        await rejectNgo.mutateAsync(request.id);
        toast.success('Request rejected.');
      } else if (type === 'ambulance') {
        await rejectAmbulance.mutateAsync(request.id);
        toast.success('Request rejected.');
      }
    } catch (error) {
      console.error('Rejection error:', error);
      toast.error('Failed to reject request. Please try again.');
    }
  };

  const isProcessing = 
    approveProfessional.isPending || rejectProfessional.isPending ||
    approveVendor.isPending || rejectVendor.isPending ||
    approveNgo.isPending || rejectNgo.isPending ||
    approveAmbulance.isPending || rejectAmbulance.isPending;

  const formatDate = (id: string) => {
    const timestamp = parseInt(id.split('_')[1]);
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openWhatsApp = () => {
    const phone = request.contact.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const openEmail = () => {
    window.open(`mailto:${request.contact.email}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{request.name}</CardTitle>
            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              <Badge variant="outline">
                {'role' in request ? request.role : type === 'vendor' ? (request as VendorRequest).category : type === 'ngo' ? (request as NgoRequest).focusArea : 'Ambulance Service'}
              </Badge>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {request.location.city}, {request.location.state}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(request.id)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4">
          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{request.contact.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{request.contact.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">
                  {request.location.city}, {request.location.state}, {request.location.country}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={openWhatsApp}>
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={openEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          <Separator />

          {/* Type-specific Details */}
          {type === 'professional' && 'experience' in request && (
            <div>
              <h3 className="font-semibold mb-3">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{request.experience.toString()} years</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Specialties</p>
                  <p className="font-medium">{request.specialties.join(', ') || 'N/A'}</p>
                </div>
              </div>
              {request.credentials && request.credentials.length > 0 && (
                <div className="mt-3">
                  <p className="text-muted-foreground mb-2">Credentials</p>
                  {request.credentials.map((credential, index) => (
                    <a
                      key={index}
                      href={credential.getDirectURL()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      View CV/Credential {index + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {type === 'vendor' && 'products' in request && (
            <div>
              <h3 className="font-semibold mb-3">Vendor Details</h3>
              <div className="text-sm">
                <p className="text-muted-foreground">Products/Services</p>
                <p className="font-medium">{(request as VendorRequest).products.join(', ')}</p>
              </div>
            </div>
          )}

          {type === 'ngo' && 'services' in request && 'registrationNo' in request && (
            <div>
              <h3 className="font-semibold mb-3">NGO Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Registration Number</p>
                  <p className="font-medium">{(request as NgoRequest).registrationNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Services</p>
                  <p className="font-medium">{(request as NgoRequest).services.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Approve'}
            </Button>
            <Button
              onClick={handleReject}
              disabled={isProcessing}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
