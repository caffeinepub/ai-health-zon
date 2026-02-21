import { Outlet } from '@tanstack/react-router';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navigation />
      <main className="flex-1 w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
