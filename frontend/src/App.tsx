import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import HealthNetworkLanding from './pages/HealthNetworkLanding';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import Careers from './pages/Careers';
import Vendors from './pages/Vendors';
import AmbulanceServices from './pages/AmbulanceServices';
import NgoListing from './pages/NgoListing';
import NetworkMap from './pages/NetworkMap';
import NetworkDirectory from './pages/NetworkDirectory';
import HealthcareSupportSystem from './pages/HealthcareSupportSystem';
import AboutUs from './pages/AboutUs';
import DocumentHome from './pages/DocumentHome';
import Documents from './pages/Documents';
import DocumentViewer from './pages/DocumentViewer';
import PatientJourney from './pages/PatientJourney';
import Members from './pages/Members';
import KnowledgeBoard from './pages/KnowledgeBoard';
import CleanClaimIntelligence from './pages/CleanClaimIntelligence';
import RCMSolutions from './pages/RCMSolutions';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// '/' now renders HealthNetworkLanding
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HealthNetworkLanding,
});

// Former Home page moved to '/platform'
const platformRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/platform',
  component: Home,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-dashboard',
  component: AdminDashboard,
});

const rcmSolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rcm-solutions',
  component: RCMSolutions,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-conditions',
  component: TermsConditions,
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: RefundPolicy,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/careers',
  component: Careers,
});

const vendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors',
  component: Vendors,
});

const ambulanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ambulance-services',
  component: AmbulanceServices,
});

const ngoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ngo-listing',
  component: NgoListing,
});

const networkMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/network-map',
  component: NetworkMap,
});

const networkDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/network-directory',
  component: NetworkDirectory,
});

const healthcareSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/healthcare-support-system',
  component: HealthcareSupportSystem,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about-us',
  component: AboutUs,
});

const documentHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/document-processing',
  component: DocumentHome,
});

const documentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/documents',
  component: Documents,
});

const documentViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/documents/$documentId',
  component: DocumentViewer,
});

const patientJourneyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient-journey',
  component: PatientJourney,
});

const membersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/members',
  component: Members,
});

const knowledgeBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/knowledge-board',
  component: KnowledgeBoard,
});

const cleanClaimIntelligenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clean-claim-intelligence',
  component: CleanClaimIntelligence,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  platformRoute,
  dashboardRoute,
  adminDashboardRoute,
  rcmSolutionsRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
  careersRoute,
  vendorsRoute,
  ambulanceRoute,
  ngoRoute,
  networkMapRoute,
  networkDirectoryRoute,
  healthcareSupportRoute,
  aboutRoute,
  documentHomeRoute,
  documentsRoute,
  documentViewerRoute,
  patientJourneyRoute,
  membersRoute,
  knowledgeBoardRoute,
  cleanClaimIntelligenceRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
