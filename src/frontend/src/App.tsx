import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Solutions from './pages/Solutions';
import Onboarding from './pages/Onboarding';
import Careers from './pages/Careers';
import Vendors from './pages/Vendors';
import AmbulanceServices from './pages/AmbulanceServices';
import NgoListing from './pages/NgoListing';
import NetworkDirectory from './pages/NetworkDirectory';
import NetworkMap from './pages/NetworkMap';
import KnowledgeBoard from './pages/KnowledgeBoard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import HealthcareSupportSystem from './pages/HealthcareSupportSystem';
import PatientJourney from './pages/PatientJourney';
import Members from './pages/Members';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutUs,
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions',
  component: Solutions,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  component: Onboarding,
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
  path: '/ambulance',
  component: AmbulanceServices,
});

const ngoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ngos',
  component: NgoListing,
});

const networkDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/network-directory',
  component: NetworkDirectory,
});

const networkMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/network-map',
  component: NetworkMap,
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

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
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

const supportSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/healthcare-support-system',
  component: HealthcareSupportSystem,
});

const patientJourneyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient-journey',
  component: PatientJourney,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  solutionsRoute,
  onboardingRoute,
  careersRoute,
  vendorsRoute,
  ambulanceRoute,
  ngoRoute,
  networkDirectoryRoute,
  networkMapRoute,
  membersRoute,
  knowledgeBoardRoute,
  adminDashboardRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
  supportSystemRoute,
  patientJourneyRoute,
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
      <InternetIdentityProvider>
        <RouterProvider router={router} />
        <Toaster />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
