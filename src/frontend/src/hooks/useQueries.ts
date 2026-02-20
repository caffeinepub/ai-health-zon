import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  HealthcareProfessional,
  Hospital,
  Vendor,
  Ngo,
  UserProfile,
  Location,
  HealthcareProfessionalRequest,
  VendorRequest,
  NgoRequest,
  AmbulanceRequest,
} from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
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
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllHospitals() {
  const { actor, isFetching } = useActor();

  return useQuery<Hospital[]>({
    queryKey: ['hospitals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHospitals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHealthcareProfessionalsByRole(role: string) {
  const { actor, isFetching } = useActor();

  return useQuery<HealthcareProfessional[]>({
    queryKey: ['professionals', role],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthcareProfessionalsByRole(role);
    },
    enabled: !!actor && !isFetching && !!role,
  });
}

export function useGetHealthcareProfessionalsByLocation(city: string) {
  const { actor, isFetching } = useActor();

  return useQuery<HealthcareProfessional[]>({
    queryKey: ['professionals', 'location', city],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthcareProfessionalsByLocation(city);
    },
    enabled: !!actor && !isFetching && !!city,
  });
}

export function useGetAllVendors() {
  const { actor, isFetching } = useActor();

  return useQuery<Vendor[]>({
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

  return useQuery<Ngo[]>({
    queryKey: ['ngos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNgos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFilterDataByLocation(location: Location | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['filterByLocation', location],
    queryFn: async () => {
      if (!actor || !location) return null;
      return actor.filterDataByLocation(location);
    },
    enabled: !!actor && !isFetching && !!location,
  });
}

// Registration Request Submission Mutations
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

// Pending Requests Queries
export function useGetPendingHealthcareProfessionalRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<HealthcareProfessionalRequest[]>({
    queryKey: ['pendingHealthcareProfessionals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingHealthcareProfessionalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingVendorRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<VendorRequest[]>({
    queryKey: ['pendingVendors'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingVendorRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingNgoRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<NgoRequest[]>({
    queryKey: ['pendingNgos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNgoRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingAmbulanceRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<AmbulanceRequest[]>({
    queryKey: ['pendingAmbulances'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingAmbulanceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingRequestCount() {
  const { data: professionals = [] } = useGetPendingHealthcareProfessionalRequests();
  const { data: vendors = [] } = useGetPendingVendorRequests();
  const { data: ngos = [] } = useGetPendingNgoRequests();
  const { data: ambulances = [] } = useGetPendingAmbulanceRequests();

  return {
    data: professionals.length + vendors.length + ngos.length + ambulances.length,
  };
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
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
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
      queryClient.invalidateQueries({ queryKey: ['approvedStakeholderLocations'] });
    },
  });
}

// Network Map Query
export function useGetApprovedStakeholderLocations() {
  const { actor, isFetching } = useActor();

  return useQuery<Location[]>({
    queryKey: ['approvedStakeholderLocations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedStakeholderLocations();
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
