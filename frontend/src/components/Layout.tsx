import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full">
      <Navigation />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
