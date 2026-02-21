import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  HealthcareProfessionalRequest,
  VendorRequest,
  NgoRequest,
  AmbulanceRequest,
  Location,
  HealthcareProfessional,
  Vendor,
  Ngo,
} from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: any) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Check
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Registration Request Mutations
export function useSubmitHealthcareProfessionalRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: HealthcareProfessionalRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitHealthcareProfessionalRegistration(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingHealthcareProfessionals'] });
    },
  });
}

export function useSubmitVendorRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: VendorRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitVendorRegistration(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingVendors'] });
    },
  });
}

export function useSubmitNgoRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: NgoRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitNgoRegistration(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingNgos'] });
    },
  });
}

export function useSubmitAmbulanceRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: AmbulanceRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitAmbulanceRegistration(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingAmbulances'] });
    },
  });
}

// Admin Queries - Pending Requests
export function useGetPendingHealthcareProfessionals() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['pendingHealthcareProfessionals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingHealthcareProfessionalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingVendors() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['pendingVendors'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingVendorRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingNgos() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['pendingNgos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNgoRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingAmbulances() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['pendingAmbulances'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingAmbulanceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

// Approval/Rejection Mutations
export function useApproveHealthcareProfessional() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveHealthcareProfessional(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingHealthcareProfessionals'] });
      queryClient.invalidateQueries({ queryKey: ['healthcareProfessionals'] });
      queryClient.invalidateQueries({ queryKey: ['approvedMembers'] });
    },
  });
}

export function useRejectHealthcareProfessional() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectHealthcareProfessional(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingHealthcareProfessionals'] });
    },
  });
}

export function useApproveVendor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveVendor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingVendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['approvedMembers'] });
    },
  });
}

export function useRejectVendor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectVendor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingVendors'] });
    },
  });
}

export function useApproveNgo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveNgo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingNgos'] });
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
      queryClient.invalidateQueries({ queryKey: ['approvedMembers'] });
    },
  });
}

export function useRejectNgo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectNgo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingNgos'] });
    },
  });
}

export function useApproveAmbulance() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveAmbulance(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingAmbulances'] });
    },
  });
}

export function useRejectAmbulance() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectAmbulance(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingAmbulances'] });
    },
  });
}

// Directory Queries
export function useGetHealthcareProfessionalsByRole(role: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['healthcareProfessionals', role],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthcareProfessionalsByRole(role);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllVendors() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVendors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllNgos() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['ngos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNgos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllHospitals() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['hospitals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHospitals();
    },
    enabled: !!actor && !isFetching,
  });
}

// Location-based Query
export function useGetApprovedStakeholderLocations() {
  const { actor, isFetching } = useActor();

  return useQuery<Location[]>({
    queryKey: ['approvedStakeholderLocations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedStakeholderLocations();
    },
    enabled: !!actor && !isFetching,
  });
}

// Demo Booking
export function useSaveDemoBookingRequest() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: {
      name: string;
      hospitalName: string;
      designation: string;
      mobile: string;
      email: string;
      city: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveDemoBookingRequest(request);
    },
  });
}

// Patient Journey Sample Documents
export function useGetHospitalPatientJourneySampleDocuments(hospitalId: string, phaseNumber?: number) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['patientJourneySampleDocuments', hospitalId, phaseNumber],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHospitalPatientJourneySampleDocuments(
        hospitalId,
        phaseNumber !== undefined ? BigInt(phaseNumber) : null
      );
    },
    enabled: !!actor && !isFetching && !!hospitalId,
  });
}

// Unified Members Query
export function useGetAllApprovedMembers() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['approvedMembers'],
    queryFn: async () => {
      if (!actor) return [];

      // Fetch all approved stakeholders
      const [professionals, vendors, ngos] = await Promise.all([
        actor.getHealthcareProfessionalsByRole(''),
        actor.getAllVendors(),
        actor.getAllNgos(),
      ]);

      // Filter for verified members only and create unified structure
      const unifiedMembers = [
        ...professionals
          .filter((p: HealthcareProfessional) => p.verified)
          .map((p: HealthcareProfessional) => ({
            memberType: 'professional' as const,
            data: p,
          })),
        ...vendors
          .filter((v: Vendor) => v.verified)
          .map((v: Vendor) => ({
            memberType: 'vendor' as const,
            data: v,
          })),
        ...ngos
          .filter((n: Ngo) => n.verified)
          .map((n: Ngo) => ({
            memberType: 'ngo' as const,
            data: n,
          })),
      ];

      return unifiedMembers;
    },
    enabled: !!actor && !isFetching,
  });
}
