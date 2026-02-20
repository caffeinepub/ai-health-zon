import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface MedicalRecord {
    documents: Array<ExternalBlob>;
    patientId: string;
    treatment: string;
    diagnosis: string;
    patientName: string;
    recordId: string;
}
export interface VendorRequest {
    id: string;
    status: RequestStatus;
    requester: Principal;
    contact: ContactInfo;
    name: string;
    category: string;
    products: Array<string>;
    location: Location;
}
export interface RecordFilter {
    patientId?: string;
    diagnosis?: string;
    dateRange?: {
        endDate: string;
        startDate: string;
    };
}
export interface Location {
    country: string;
    city: string;
    state: string;
}
export interface HealthcareProfessionalRequest {
    id: string;
    status: RequestStatus;
    requester: Principal;
    contact: ContactInfo;
    name: string;
    role: string;
    experience: bigint;
    credentials: Array<ExternalBlob>;
    specialties: Array<string>;
    location: Location;
}
export interface TourismService {
    id: string;
    verified: boolean;
    provider: string;
    cost: bigint;
    name: string;
    description: string;
    category: string;
    location: Location;
}
export interface NgoRequest {
    id: string;
    status: RequestStatus;
    requester: Principal;
    focusArea: string;
    contact: ContactInfo;
    name: string;
    registrationNo: string;
    location: Location;
    services: Array<string>;
}
export interface HealthcareProfessional {
    id: string;
    verified: boolean;
    contact: ContactInfo;
    name: string;
    role: string;
    experience: bigint;
    credentials: Array<ExternalBlob>;
    specialties: Array<string>;
    location: Location;
}
export interface HealthRecord {
    id: string;
    documents: Array<ExternalBlob>;
    labResults: Array<MedicalRecord>;
    userId: string;
    imagingStudies: Array<ExternalBlob>;
    medications: Array<string>;
    medicalHistory: Array<string>;
    personalInfo: {
        dob: string;
        bloodType: string;
        name: string;
        gender: string;
    };
    allergies: Array<string>;
}
export interface Ngo {
    id: string;
    verified: boolean;
    focusArea: string;
    contact: ContactInfo;
    name: string;
    registrationNo: string;
    location: Location;
    services: Array<string>;
}
export interface ResearchProject {
    title: string;
    researchers: Array<string>;
    institution: string;
    dataFiles: Array<ExternalBlob>;
    ethicsApproval: boolean;
    fundingSource: string;
    projectId: string;
    abstract: string;
}
export interface ContactInfo {
    email: string;
    website: string;
    address: string;
    phone: string;
}
export interface Hospital {
    id: string;
    contact: ContactInfo;
    radiologyCriteria: string;
    name: string;
    phisoCourses: Array<string>;
    accreditation: string;
    phisoPractices: Array<string>;
    address: string;
    location: Location;
    services: Array<string>;
}
export interface AmbulanceRequest {
    id: string;
    status: RequestStatus;
    requester: Principal;
    contact: ContactInfo;
    name: string;
    location: Location;
}
export interface Vendor {
    id: string;
    verified: boolean;
    contact: ContactInfo;
    name: string;
    category: string;
    products: Array<string>;
    location: Location;
}
export interface LuxuryDebtService {
    id: string;
    serviceType: string;
    applicantName: string;
    approvalStatus: string;
    amountRequested: bigint;
}
export interface ResearchFilter {
    institution?: string;
    ethicsApproval?: boolean;
    keyword?: string;
}
export interface UserProfile {
    userType: string;
    professionalProfile?: HealthcareProfessional;
}
export enum RequestStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCorporateHealthcareServices(hospitalId: string, services: Array<string>): Promise<void>;
    addNgo(ngo: Ngo): Promise<void>;
    addTourismService(service: TourismService): Promise<void>;
    addVendor(vendor: Vendor): Promise<void>;
    applyForLuxuryDebt(application: LuxuryDebtService): Promise<void>;
    approveAmbulance(id: string): Promise<void>;
    approveHealthcareProfessional(id: string): Promise<void>;
    approveNgo(id: string): Promise<void>;
    approveVendor(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCorporateHealthcare(hospital: Hospital): Promise<void>;
    createHealthRecord(record: HealthRecord): Promise<void>;
    createRecord(record: MedicalRecord): Promise<void>;
    createResearchProject(project: ResearchProject): Promise<void>;
    deleteRecord(recordId: string): Promise<void>;
    filterDataByLocation(location: Location): Promise<{
        professionals: Array<HealthcareProfessional>;
        vendors: Array<Vendor>;
        ngos: Array<Ngo>;
        hospitals: Array<Hospital>;
        services: Array<TourismService>;
    }>;
    getAllHospitals(): Promise<Array<Hospital>>;
    getAllNgos(): Promise<Array<Ngo>>;
    getAllRecords(): Promise<Array<MedicalRecord>>;
    getAllTourismServices(): Promise<Array<TourismService>>;
    getAllVendors(): Promise<Array<Vendor>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHealthRecord(recordId: string): Promise<HealthRecord>;
    getHealthcareProfessionalById(id: string): Promise<HealthcareProfessional | null>;
    getHealthcareProfessionalsByLocation(city: string): Promise<Array<HealthcareProfessional>>;
    getHealthcareProfessionalsByRole(role: string): Promise<Array<HealthcareProfessional>>;
    getHospitalsByLocation(city: string): Promise<Array<Hospital>>;
    getLuxuryDebtApplications(): Promise<Array<LuxuryDebtService>>;
    getMyRecords(): Promise<Array<MedicalRecord>>;
    getNgosByFocusArea(focusArea: string): Promise<Array<Ngo>>;
    getPendingAmbulanceRequests(): Promise<Array<AmbulanceRequest>>;
    getPendingHealthcareProfessionalRequests(): Promise<Array<HealthcareProfessionalRequest>>;
    getPendingNgoRequests(): Promise<Array<NgoRequest>>;
    getPendingVendorRequests(): Promise<Array<VendorRequest>>;
    getRecord(recordId: string): Promise<MedicalRecord>;
    getResearchProject(projectId: string): Promise<ResearchProject | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeSampleData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    rejectAmbulance(id: string): Promise<void>;
    rejectHealthcareProfessional(id: string): Promise<void>;
    rejectNgo(id: string): Promise<void>;
    rejectVendor(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchRecords(filter: RecordFilter): Promise<Array<MedicalRecord>>;
    searchResearchProjects(filter: ResearchFilter): Promise<Array<ResearchProject>>;
    submitAmbulanceRegistration(request: AmbulanceRequest): Promise<void>;
    submitHealthcareProfessionalRegistration(request: HealthcareProfessionalRequest): Promise<void>;
    submitNgoRegistration(request: NgoRequest): Promise<void>;
    submitVendorRegistration(request: VendorRequest): Promise<void>;
    updateRecord(record: MedicalRecord): Promise<void>;
}
