import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Role-based Access Control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Common Types
  public type Location = {
    city : Text;
    state : Text;
    country : Text;
  };

  public type ContactInfo = {
    phone : Text;
    email : Text;
    address : Text;
    website : Text;
  };

  public type MedicalRecord = {
    recordId : Text;
    patientId : Text;
    patientName : Text;
    diagnosis : Text;
    treatment : Text;
    documents : [Storage.ExternalBlob];
  };

  public type ResearchProject = {
    projectId : Text;
    title : Text;
    abstract : Text;
    researchers : [Text];
    institution : Text;
    fundingSource : Text;
    ethicsApproval : Bool;
    dataFiles : [Storage.ExternalBlob];
  };

  // Profiles & Directory Types
  public type HealthcareProfessional = {
    id : Text;
    name : Text;
    role : Text;
    specialties : [Text];
    experience : Nat;
    location : Location;
    contact : ContactInfo;
    verified : Bool;
    credentials : [Storage.ExternalBlob];
  };

  public type Hospital = {
    id : Text;
    name : Text;
    address : Text;
    services : [Text];
    accreditation : Text;
    contact : ContactInfo;
    location : Location;
    phisoCourses : [Text];
    phisoPractices : [Text];
    radiologyCriteria : Text;
  };

  public type Vendor = {
    id : Text;
    name : Text;
    category : Text;
    products : [Text];
    verified : Bool;
    contact : ContactInfo;
    location : Location;
  };

  public type Ngo = {
    id : Text;
    name : Text;
    focusArea : Text;
    services : [Text];
    registrationNo : Text;
    verified : Bool;
    contact : ContactInfo;
    location : Location;
  };

  // Medical Records & Research Types
  public type RecordFilter = {
    patientId : ?Text;
    diagnosis : ?Text;
    dateRange : ?{
      startDate : Text;
      endDate : Text;
    };
  };

  public type ResearchFilter = {
    keyword : ?Text;
    institution : ?Text;
    ethicsApproval : ?Bool;
  };

  // Comprehensive Health Record Type
  public type HealthRecord = {
    id : Text;
    userId : Text;
    personalInfo : {
      name : Text;
      dob : Text;
      gender : Text;
      bloodType : Text;
    };
    medicalHistory : [Text];
    allergies : [Text];
    medications : [Text];
    labResults : [MedicalRecord];
    imagingStudies : [Storage.ExternalBlob];
    documents : [Storage.ExternalBlob];
  };

  // Medical Tourism Types
  public type TourismService = {
    id : Text;
    name : Text;
    category : Text;
    description : Text;
    cost : Nat;
    provider : Text;
    location : Location;
    verified : Bool;
  };

  public type LuxuryDebtService = {
    id : Text;
    applicantName : Text;
    serviceType : Text;
    amountRequested : Nat;
    approvalStatus : Text;
  };

  // User Profile Type (required by frontend)
  public type UserProfile = {
    professionalProfile : ?HealthcareProfessional;
    userType : Text; // "professional", "hospital", "vendor", "ngo"
  };

  // Internal Data Stores
  let userProfiles = Map.empty<Principal, UserProfile>();
  let professionalProfiles = Map.empty<Principal, HealthcareProfessional>();
  let hospitals = Map.empty<Text, Hospital>();
  let hospitalOwners = Map.empty<Text, Principal>();
  let vendors = Map.empty<Text, Vendor>();
  let vendorOwners = Map.empty<Text, Principal>();
  let ngos = Map.empty<Text, Ngo>();
  let ngoOwners = Map.empty<Text, Principal>();
  let records = Map.empty<Text, MedicalRecord>();
  let recordOwners = Map.empty<Text, Principal>();
  let researchProjects = Map.empty<Text, ResearchProject>();
  let healthRecords = Map.empty<Text, HealthRecord>();
  let healthRecordOwners = Map.empty<Text, Principal>();
  let tourismServices = Map.empty<Text, TourismService>();
  let luxuryDebtServices = Map.empty<Text, LuxuryDebtService>();

  // Required User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper for initializing sample data
  public shared ({ caller }) func initializeSampleData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can initialize sample data");
    };
    let sampleHospital : Hospital = {
      id = "h1";
      name = "Sample Hospital";
      address = "123 Main St";
      services = ["Cardiology", "Neurology"];
      accreditation = "JCI";
      contact = {
        phone = "1234567890";
        email = "info@samplehospital.com";
        address = "123 Main St";
        website = "www.samplehospital.com";
      };
      location = {
        city = "City";
        state = "State";
        country = "Country";
      };
      phisoCourses = ["Course1"];
      phisoPractices = ["Practice1"];
      radiologyCriteria = "Criteria";
    };
    hospitals.add(sampleHospital.id, sampleHospital);
    hospitalOwners.add(sampleHospital.id, caller);
  };

  module HealthcareProfessional {
    public func compare(a : HealthcareProfessional, b : HealthcareProfessional) : Order.Order {
      Text.compare(a.name, b.name);
    };

    public func compareByRole(a : HealthcareProfessional, b : HealthcareProfessional) : Order.Order {
      Text.compare(a.role, b.role);
    };
  };

  // Directory Methods - Public access for browsing
  public query func getHealthcareProfessionalsByRole(role : Text) : async [HealthcareProfessional] {
    professionalProfiles.values().toArray().filter(
      func(p) {
        p.role.contains(#text role);
      }
    );
  };

  public query func getHealthcareProfessionalsByLocation(city : Text) : async [HealthcareProfessional] {
    professionalProfiles.values().toArray().filter(
      func(p) {
        p.location.city == city;
      }
    );
  };

  public query func getHealthcareProfessionalById(id : Text) : async ?HealthcareProfessional {
    let professionalsArray = professionalProfiles.values().toArray();
    professionalsArray.find(
      func(professional) {
        professional.id == id;
      }
    );
  };

  public shared ({ caller }) func addHealthcareProfessional(professional : HealthcareProfessional) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add a professional profile");
    };

    // Check if caller already has a profile
    switch (professionalProfiles.get(caller)) {
      case (?existing) {
        Runtime.trap("You already have a professional profile");
      };
      case null {
        professionalProfiles.add(caller, professional);
      };
    };
  };

  public shared ({ caller }) func updateHealthcareProfessional(professional : HealthcareProfessional) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update profiles");
    };

    // Verify ownership
    switch (professionalProfiles.get(caller)) {
      case null {
        Runtime.trap("No professional profile found for caller");
      };
      case (?existing) {
        if (existing.id != professional.id) {
          Runtime.trap("Cannot change profile ID");
        };
        professionalProfiles.add(caller, professional);
      };
    };
  };

  // Corporate Healthcare - Admin creates, owners manage
  public shared ({ caller }) func createCorporateHealthcare(hospital : Hospital) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create hospital profiles");
    };

    if (hospitals.containsKey(hospital.id)) {
      Runtime.trap("Hospital with this ID already exists");
    };

    hospitals.add(hospital.id, hospital);
    hospitalOwners.add(hospital.id, caller);
  };

  public shared ({ caller }) func addCorporateHealthcareServices(hospitalId : Text, services : [Text]) : async () {
    // Check ownership or admin
    let isOwner = switch (hospitalOwners.get(hospitalId)) {
      case null { false };
      case (?owner) { owner == caller };
    };

    if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only hospital owner or admin can update services");
    };

    switch (hospitals.get(hospitalId)) {
      case null { Runtime.trap("Hospital not found") };
      case (?hospital) {
        let updatedHospital : Hospital = {
          id = hospital.id;
          name = hospital.name;
          address = hospital.address;
          services;
          accreditation = hospital.accreditation;
          contact = hospital.contact;
          location = hospital.location;
          phisoCourses = hospital.phisoCourses;
          phisoPractices = hospital.phisoPractices;
          radiologyCriteria = hospital.radiologyCriteria;
        };
        hospitals.add(hospitalId, updatedHospital);
      };
    };
  };

  // Vendor Management
  public shared ({ caller }) func addVendor(vendor : Vendor) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register as vendors");
    };

    if (vendors.containsKey(vendor.id)) {
      Runtime.trap("Vendor with this ID already exists");
    };

    vendors.add(vendor.id, vendor);
    vendorOwners.add(vendor.id, caller);
  };

  public query func getAllVendors() : async [Vendor] {
    vendors.values().toArray();
  };

  // NGO Management
  public shared ({ caller }) func addNgo(ngo : Ngo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register NGOs");
    };

    if (ngos.containsKey(ngo.id)) {
      Runtime.trap("NGO with this ID already exists");
    };

    ngos.add(ngo.id, ngo);
    ngoOwners.add(ngo.id, caller);
  };

  public query func getAllNgos() : async [Ngo] {
    ngos.values().toArray();
  };

  public query func getNgosByFocusArea(focusArea : Text) : async [Ngo] {
    ngos.values().toArray().filter(
      func(n) {
        n.focusArea.contains(#text focusArea);
      }
    );
  };

  // Record Management - Protected, owner or admin access
  public shared ({ caller }) func createRecord(record : MedicalRecord) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create records");
    };

    if (records.containsKey(record.recordId)) {
      Runtime.trap("Record with this ID already exists");
    };

    records.add(record.recordId, record);
    recordOwners.add(record.recordId, caller);
  };

  public shared ({ caller }) func updateRecord(record : MedicalRecord) : async () {
    // Check ownership or admin
    let isOwner = switch (recordOwners.get(record.recordId)) {
      case null { false };
      case (?owner) { owner == caller };
    };

    if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only record owner or admin can update records");
    };

    if (not records.containsKey(record.recordId)) {
      Runtime.trap("Record not found");
    };
    records.add(record.recordId, record);
  };

  public query ({ caller }) func getRecord(recordId : Text) : async MedicalRecord {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access records");
    };

    // Check ownership or admin
    let isOwner = switch (recordOwners.get(recordId)) {
      case null { false };
      case (?owner) { owner == caller };
    };

    if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only record owner or admin can view this record");
    };

    switch (records.get(recordId)) {
      case (null) { Runtime.trap("Record not found") };
      case (?record) { record };
    };
  };

  public shared ({ caller }) func deleteRecord(recordId : Text) : async () {
    // Check ownership or admin
    let isOwner = switch (recordOwners.get(recordId)) {
      case null { false };
      case (?owner) { owner == caller };
    };

    if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only record owner or admin can delete records");
    };

    if (not records.containsKey(recordId)) {
      Runtime.trap("Record not found");
    };
    records.remove(recordId);
    recordOwners.remove(recordId);
  };

  public query ({ caller }) func getAllRecords() : async [MedicalRecord] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all records");
    };
    records.values().toArray();
  };

  public query ({ caller }) func getMyRecords() : async [MedicalRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access records");
    };

    let myRecordIds = recordOwners.entries().toArray().filter(
      func((id, owner)) { owner == caller }
    ).map(func((id, _)) { id });

    myRecordIds.map(
      func(id) {
        switch (records.get(id)) {
          case null { Runtime.trap("Record not found") };
          case (?record) { record };
        };
      }
    );
  };

  public query ({ caller }) func searchRecords(filter : RecordFilter) : async [MedicalRecord] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search all records");
    };

    let allRecords = records.values().toArray();
    let filteredByPatient = switch (filter.patientId) {
      case (null) { allRecords };
      case (?patientId) {
        allRecords.filter(
          func(record) {
            record.patientId.contains(#text patientId);
          }
        );
      };
    };

    let filteredByDiagnosis = switch (filter.diagnosis) {
      case (null) { filteredByPatient };
      case (?diagnosis) {
        filteredByPatient.filter(
          func(record) {
            record.diagnosis.contains(#text diagnosis);
          }
        );
      };
    };

    filteredByDiagnosis;
  };

  // Research Management - Admin creates, public can search
  public shared ({ caller }) func createResearchProject(project : ResearchProject) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create research projects");
    };
    researchProjects.add(project.projectId, project);
  };

  public query func getResearchProject(projectId : Text) : async ?ResearchProject {
    researchProjects.get(projectId);
  };

  public query func searchResearchProjects(filter : ResearchFilter) : async [ResearchProject] {
    let allProjects = researchProjects.values().toArray();
    let filteredByKeyword = switch (filter.keyword) {
      case (null) { allProjects };
      case (?keyword) {
        allProjects.filter(
          func(project) {
            project.title.contains(#text keyword) or project.abstract.contains(#text keyword);
          }
        );
      };
    };

    let filteredByInstitution = switch (filter.institution) {
      case (null) { filteredByKeyword };
      case (?institution) {
        filteredByKeyword.filter(
          func(project) {
            project.institution.contains(#text institution);
          }
        );
      };
    };

    let filteredByEthicsApproval = switch (filter.ethicsApproval) {
      case (null) { filteredByInstitution };
      case (?ethicsApproval) {
        filteredByInstitution.filter(
          func(project) {
            project.ethicsApproval == ethicsApproval;
          }
        );
      };
    };

    filteredByEthicsApproval;
  };

  // Health Records Management - Owner or admin access
  public shared ({ caller }) func createHealthRecord(record : HealthRecord) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create health records");
    };

    if (healthRecords.containsKey(record.id)) {
      Runtime.trap("Health record with this ID already exists");
    };

    healthRecords.add(record.id, record);
    healthRecordOwners.add(record.id, caller);
  };

  public query ({ caller }) func getHealthRecord(recordId : Text) : async HealthRecord {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access health records");
    };

    // Check ownership or admin
    let isOwner = switch (healthRecordOwners.get(recordId)) {
      case null { false };
      case (?owner) { owner == caller };
    };

    if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only record owner or admin can view this health record");
    };

    switch (healthRecords.get(recordId)) {
      case (null) { Runtime.trap("Health record not found") };
      case (?record) { record };
    };
  };

  // Medical Tourism & Luxury Debt - Admin manages
  public shared ({ caller }) func addTourismService(service : TourismService) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add tourism services");
    };
    tourismServices.add(service.id, service);
  };

  public query func getAllTourismServices() : async [TourismService] {
    tourismServices.values().toArray();
  };

  public shared ({ caller }) func applyForLuxuryDebt(application : LuxuryDebtService) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can apply for luxury debt services");
    };
    luxuryDebtServices.add(application.id, application);
  };

  public query ({ caller }) func getLuxuryDebtApplications() : async [LuxuryDebtService] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all applications");
    };
    luxuryDebtServices.values().toArray();
  };

  // Telehealth Directory - Public access
  public query func getAllHospitals() : async [Hospital] {
    hospitals.values().toArray();
  };

  public query func getHospitalsByLocation(city : Text) : async [Hospital] {
    hospitals.values().toArray().filter(
      func(h) {
        h.location.city == city;
      }
    );
  };

  // Utility and Misc - Public access for directory browsing
  public query func filterDataByLocation(location : Location) : async {
    hospitals : [Hospital];
    professionals : [HealthcareProfessional];
    vendors : [Vendor];
    ngos : [Ngo];
    services : [TourismService];
  } {
    func matchesLocation(l : Location, target : Location) : Bool {
      l.city == target.city and l.state == target.state and l.country == target.country;
    };

    let filteredHospitals = hospitals.values().toArray().filter(
      func(h) { matchesLocation(h.location, location) }
    );

    let filteredProfessionals = professionalProfiles.values().toArray().filter(
      func(p) { matchesLocation(p.location, location) }
    );

    let filteredVendors = vendors.values().toArray().filter(
      func(v) { matchesLocation(v.location, location) }
    );

    let filteredNgos = ngos.values().toArray().filter(
      func(n) { matchesLocation(n.location, location) }
    );

    let filteredServices = tourismServices.values().toArray().filter(
      func(s) { matchesLocation(s.location, location) }
    );

    {
      hospitals = filteredHospitals;
      professionals = filteredProfessionals;
      vendors = filteredVendors;
      ngos = filteredNgos;
      services = filteredServices;
    };
  };
};
