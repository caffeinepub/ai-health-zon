import { Card, CardContent } from './ui/card';
import RequestDetailCard from './RequestDetailCard';
import type { HealthcareProfessionalRequest, VendorRequest, NgoRequest, AmbulanceRequest } from '../backend';

type RequestType = 'professional' | 'vendor' | 'ambulance' | 'ngo';

interface PendingRequestsListProps {
  type: RequestType;
  requests: HealthcareProfessionalRequest[] | VendorRequest[] | NgoRequest[] | AmbulanceRequest[];
  isLoading: boolean;
}

export default function PendingRequestsList({ type, requests, isLoading }: PendingRequestsListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No pending requests at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestDetailCard key={request.id} type={type} request={request} />
      ))}
    </div>
  );
}
