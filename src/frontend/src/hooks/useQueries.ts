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
  ProcessedDocument,
  DocumentSection,
  PatientJourneySampleDocument,
  DocumentPhase,
  DocumentType,
  DocumentMetadata,
} from '../backend';
import { ExternalBlob } from '../backend';

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

// Document Management Hooks
export function useUploadDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      filename,
      filetype,
      blob,
    }: {
      id: string;
      filename: string;
      filetype: string;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadDocument(id, filename, filetype, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

// Type for document with metadata and id
type DocumentWithMetadata = {
  id: string;
  metadata: DocumentMetadata;
};

export function useGetDocuments() {
  const { actor, isFetching } = useActor();

  return useQuery<DocumentWithMetadata[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      if (!actor) return [];
      // Since the backend doesn't have a getDocuments method, we return empty array
      // In a real implementation, you would need to add this method to the backend
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProcessDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      sections,
      summary,
    }: {
      id: string;
      sections: DocumentSection[];
      summary: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.processDocument(id, sections, summary);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['processedDocument'] });
    },
  });
}

export function useGetProcessedDocument(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ProcessedDocument | null>({
    queryKey: ['processedDocument', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProcessedDocument(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// Patient Journey Sample Document Hooks
export function useUploadPatientJourneySampleDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      phase,
      documentType,
      hospitalId,
      filename,
      blob,
    }: {
      id: string;
      phase: DocumentPhase;
      documentType: DocumentType;
      hospitalId: string;
      filename: string;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadPatientJourneySampleDocument(id, phase, documentType, hospitalId, filename, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientJourneySampleDocuments'] });
    },
  });
}

export function useGetHospitalPatientJourneySampleDocuments(hospitalId: string, phaseNumber?: number) {
  const { actor, isFetching } = useActor();

  return useQuery<PatientJourneySampleDocument[]>({
    queryKey: ['patientJourneySampleDocuments', hospitalId, phaseNumber],
    queryFn: async () => {
      if (!actor || !hospitalId) return [];
      return actor.getHospitalPatientJourneySampleDocuments(
        hospitalId,
        phaseNumber !== undefined ? BigInt(phaseNumber) : null
      );
    },
    enabled: !!actor && !isFetching && !!hospitalId,
  });
}

export function useGetAllPatientJourneySampleDocuments() {
  const { actor, isFetching } = useActor();

  return useQuery<PatientJourneySampleDocument[]>({
    queryKey: ['allPatientJourneySampleDocuments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPatientJourneySampleDocuments();
    },
    enabled: !!actor && !isFetching,
  });
}
