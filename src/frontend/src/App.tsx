import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Solutions from './pages/Solutions';
import HealthcareSupportSystem from './pages/HealthcareSupportSystem';
import NetworkDirectory from './pages/NetworkDirectory';
import Careers from './pages/Careers';
import Vendors from './pages/Vendors';
import AmbulanceServices from './pages/AmbulanceServices';
import NgoListing from './pages/NgoListing';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Onboarding,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
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

const healthcareSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/healthcare-support',
  component: HealthcareSupportSystem,
});

const directoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/directory',
  component: NetworkDirectory,
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

const ngosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ngos',
  component: NgoListing,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const adminRoute = createRoute({
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
  path: '/privacy',
  component: PrivacyPolicy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsConditions,
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund',
  component: RefundPolicy,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  aboutRoute,
  solutionsRoute,
  healthcareSupportRoute,
  directoryRoute,
  careersRoute,
  vendorsRoute,
  ambulanceRoute,
  ngosRoute,
  dashboardRoute,
  adminRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
