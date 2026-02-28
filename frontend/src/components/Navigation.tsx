import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu, X, ChevronDown } from 'lucide-react';

const navItems = [
  {
    label: 'Solutions',
    children: [
      { label: 'RCM Solutions', path: '/rcm-solutions' },
      { label: 'Healthcare Technology', path: '/solutions' },
      { label: 'Clean Claim Intelligence', path: '/clean-claim-intelligence' },
    ],
  },
  {
    label: 'Network',
    children: [
      { label: 'Network Map', path: '/network-map' },
      { label: 'Network Directory', path: '/network-directory' },
      { label: 'Members', path: '/members' },
      { label: 'Healthcare Support', path: '/healthcare-support' },
    ],
  },
  {
    label: 'Join Us',
    children: [
      { label: 'Careers', path: '/careers' },
      { label: 'Vendors', path: '/vendors' },
      { label: 'Ambulance Services', path: '/ambulance-services' },
      { label: 'NGO Listing', path: '/ngo-listing' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Knowledge Board', path: '/knowledge-board' },
      { label: 'Patient Journey', path: '/patient-journey' },
      { label: 'Onboarding', path: '/onboarding' },
      { label: 'Documents', path: '/documents' },
    ],
  },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHomePage = currentPath === '/';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isActive = (path?: string) => path && currentPath === path;

  return (
    <div className={isHomePage ? 'pt-48' : ''}>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 font-bold text-xl text-teal-700 hover:text-teal-800 transition-colors"
            >
              <img src="/assets/generated/platform-emblem.dim_200x200.png" alt="Logo" className="h-8 w-8 object-contain" />
              <span className="hidden sm:block">Health Network</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        openDropdown === item.label
                          ? 'text-teal-700 bg-teal-50'
                          : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        {item.children.map((child) => (
                          <button
                            key={child.path}
                            onClick={() => {
                              navigate({ to: child.path });
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              isActive(child.path)
                                ? 'text-teal-700 bg-teal-50 font-medium'
                                : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
                            }`}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => navigate({ to: item.path! })}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-teal-700 bg-teal-50 font-medium'
                        : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileExpanded === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.path}
                            onClick={() => {
                              navigate({ to: child.path });
                              setMobileOpen(false);
                              setMobileExpanded(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              isActive(child.path)
                                ? 'text-teal-700 bg-teal-50 font-medium'
                                : 'text-gray-600 hover:text-teal-700 hover:bg-teal-50'
                            }`}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate({ to: item.path! });
                      setMobileOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-teal-700 bg-teal-50 font-medium'
                        : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
