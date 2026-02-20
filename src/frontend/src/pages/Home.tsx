import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Building2,
  Users,
  Package,
  Heart,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Award,
} from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/assets/generated/hero-slide-1.dim_1920x800.png',
      title: 'Transform Healthcare Delivery',
      subtitle: 'AI-powered platform connecting all healthcare stakeholders',
    },
    {
      image: '/assets/generated/hero-slide-2.dim_1920x800.png',
      title: 'Streamline Operations',
      subtitle: 'Optimize revenue cycles and enhance efficiency',
    },
    {
      image: '/assets/generated/hero-slide-3.dim_1920x800.png',
      title: 'Connect & Grow',
      subtitle: 'Build your healthcare network with verified professionals',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/about">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/95 shadow-lg font-medium">
                        Learn More
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-medium">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 tracking-tight">
            Why Choose AI Health Zon
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Comprehensive solutions designed for modern healthcare delivery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Secure & Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enterprise-grade security with full NABH compliance and data protection standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Intelligent automation and analytics to optimize operations and decision-making.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Connected Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Seamless integration across hospitals, professionals, vendors, and services.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Trusted by leading healthcare organizations for operational excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 tracking-tight">
            Our Three Verticals
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Comprehensive healthcare solutions across three key areas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <img
                  src="/assets/generated/rcm-icon.dim_256x256.png"
                  alt="RCM"
                  className="w-16 h-16 object-contain mb-4"
                />
                <CardTitle className="text-2xl">Revenue Cycle Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Eligibility verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Medical billing & coding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Claims management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Denial prediction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardHeader>
                <img
                  src="/assets/generated/tech-icon.dim_256x256.png"
                  alt="Technology"
                  className="w-16 h-16 object-contain mb-4"
                />
                <CardTitle className="text-2xl">Healthcare Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>AI-powered dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>HIS/EHR integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>NABH support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Telemedicine platform</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardHeader>
                <img
                  src="/assets/generated/network-icon.dim_256x256.png"
                  alt="Network"
                  className="w-16 h-16 object-contain mb-4"
                />
                <CardTitle className="text-2xl">Connecting Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Healthcare professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Emergency services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Vendors & suppliers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>NGOs & community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 tracking-tight">
            Who We Serve
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Tailored solutions for every healthcare stakeholder
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Hospitals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Streamline operations, manage revenue cycles, and connect with verified professionals.
                </p>
                <Link to="/about">
                  <Button variant="link" className="p-0 h-auto text-primary font-medium">
                    Learn more →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Find opportunities, connect with hospitals, and grow your healthcare career.
                </p>
                <Link to="/careers">
                  <Button variant="link" className="p-0 h-auto text-primary font-medium">
                    Explore careers →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Reach healthcare organizations and expand your business network.
                </p>
                <Link to="/vendors">
                  <Button variant="link" className="p-0 h-auto text-primary font-medium">
                    Register now →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Coordinate programs, manage volunteers, and amplify community impact.
                </p>
                <Link to="/ngos">
                  <Button variant="link" className="p-0 h-auto text-primary font-medium">
                    Join us →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 tracking-tight">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Revenue Optimization</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered insights to maximize revenue and reduce claim denials
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay compliant with NABH standards and regulatory requirements
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Network Directory</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access verified professionals, vendors, and services nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
              Ready to Transform Your Healthcare Operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Join hundreds of healthcare organizations already benefiting from our platform
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="shadow-md font-medium">
                  Get Started
                </Button>
              </Link>
              <Link to="/solutions">
                <Button size="lg" variant="outline" className="font-medium">
                  View Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
