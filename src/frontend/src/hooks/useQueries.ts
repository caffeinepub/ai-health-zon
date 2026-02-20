import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  HealthcareProfessional,
  Hospital,
  Vendor,
  Ngo,
  UserProfile,
  Location,
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

export function useAddHealthcareProfessional() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (professional: HealthcareProfessional) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addHealthcareProfessional(professional);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
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

export function useAddVendor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vendor: Vendor) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addVendor(vendor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
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

export function useAddNgo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ngo: Ngo) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addNgo(ngo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
    },
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
