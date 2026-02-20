import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Shield, Users, Building2, Ambulance, Heart, AlertCircle } from 'lucide-react';
import { useIsCallerAdmin, useGetPendingHealthcareProfessionalRequests, useGetPendingVendorRequests, useGetPendingNgoRequests, useGetPendingAmbulanceRequests } from '../hooks/useQueries';
import PendingRequestsList from '../components/PendingRequestsList';

export default function AdminDashboard() {
  const { data: isAdmin = false, isLoading: adminCheckLoading } = useIsCallerAdmin();
  const { data: professionalRequests = [], isLoading: profLoading } = useGetPendingHealthcareProfessionalRequests();
  const { data: vendorRequests = [], isLoading: vendorLoading } = useGetPendingVendorRequests();
  const { data: ngoRequests = [], isLoading: ngoLoading } = useGetPendingNgoRequests();
  const { data: ambulanceRequests = [], isLoading: ambulanceLoading } = useGetPendingAmbulanceRequests();

  const [activeTab, setActiveTab] = useState('professionals');

  if (adminCheckLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-center">Access Denied</CardTitle>
            <CardDescription className="text-center">
              You do not have permission to access the admin dashboard. Only administrators can view and manage stakeholder requests.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalPending = professionalRequests.length + vendorRequests.length + ngoRequests.length + ambulanceRequests.length;

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center">
                <Shield className="h-10 w-10 mr-3 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Review and manage stakeholder registration requests
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {totalPending} Pending
            </Badge>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Healthcare Professionals</p>
                    <p className="text-2xl font-bold">{professionalRequests.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vendors</p>
                    <p className="text-2xl font-bold">{vendorRequests.length}</p>
                  </div>
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ambulance Services</p>
                    <p className="text-2xl font-bold">{ambulanceRequests.length}</p>
                  </div>
                  <Ambulance className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">NGOs</p>
                    <p className="text-2xl font-bold">{ngoRequests.length}</p>
                  </div>
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requests Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="professionals" className="relative">
                Healthcare Professionals
                {professionalRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {professionalRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="vendors" className="relative">
                Vendors
                {vendorRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {vendorRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="ambulances" className="relative">
                Ambulance Services
                {ambulanceRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {ambulanceRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="ngos" className="relative">
                NGOs
                {ngoRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {ngoRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="professionals" className="mt-6">
              <PendingRequestsList
                type="professional"
                requests={professionalRequests}
                isLoading={profLoading}
              />
            </TabsContent>

            <TabsContent value="vendors" className="mt-6">
              <PendingRequestsList
                type="vendor"
                requests={vendorRequests}
                isLoading={vendorLoading}
              />
            </TabsContent>

            <TabsContent value="ambulances" className="mt-6">
              <PendingRequestsList
                type="ambulance"
                requests={ambulanceRequests}
                isLoading={ambulanceLoading}
              />
            </TabsContent>

            <TabsContent value="ngos" className="mt-6">
              <PendingRequestsList
                type="ngo"
                requests={ngoRequests}
                isLoading={ngoLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
