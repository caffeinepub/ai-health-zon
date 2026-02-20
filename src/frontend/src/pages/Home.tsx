import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, CheckCircle, Users, Building2, Ambulance, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Health Zon
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              AI Health Zon is an AI-powered healthcare platform delivering Revenue Cycle Management,
              Healthcare Technology solutions, and a Healthcare Connecting Platform that links hospitals
              with doctors, nurses, radiologists, physiotherapists, dietitians, ambulance services,
              diagnostics, pharmacies, vendors, insurance partners, NGOs, and compliance experts on one
              unified digital platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">
                  Request Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/directory">Join Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Verticals Overview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Three Verticals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mb-4 mx-auto">
                  <img src="/assets/generated/rcm-icon.dim_256x256.png" alt="RCM" className="w-full h-full object-contain" />
                </div>
                <CardTitle className="text-center">Revenue Cycle Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>AI-powered billing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Claims management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Denial management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Revenue optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mb-4 mx-auto">
                  <img src="/assets/generated/tech-icon.dim_256x256.png" alt="Technology" className="w-full h-full object-contain" />
                </div>
                <CardTitle className="text-center">Healthcare Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>AI dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>System integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Compliance support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mb-4 mx-auto">
                  <img src="/assets/generated/network-icon.dim_256x256.png" alt="Network" className="w-full h-full object-contain" />
                </div>
                <CardTitle className="text-center">Connecting Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Workforce connections</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ambulance services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Labs, pharmacies, vendors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>NGOs and partners</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <p className="text-muted-foreground">Create your account and provide your details</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified</h3>
                <p className="text-muted-foreground">Get verified by our team</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>

              <div className="text-center md:col-start-3">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Using</h3>
                <p className="text-muted-foreground">Access the full platform and connect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get Started</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link to="/careers" className="group">
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="group-hover:text-primary transition-colors">Careers</CardTitle>
                  <CardDescription>Find healthcare opportunities</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/vendors" className="group">
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <Building2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="group-hover:text-primary transition-colors">Vendors</CardTitle>
                  <CardDescription>Register as a vendor</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/ambulance" className="group">
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <Ambulance className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="group-hover:text-primary transition-colors">Ambulance</CardTitle>
                  <CardDescription>Emergency services</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/ngos" className="group">
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="group-hover:text-primary transition-colors">NGOs</CardTitle>
                  <CardDescription>Community support</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="h-32 flex items-center justify-center text-muted-foreground">
                    <p className="text-center italic">Testimonial coming soon</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Future-ready AI healthcare ecosystem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in building the future of healthcare connectivity and innovation
          </p>
        </div>
      </section>
    </div>
  );
}
