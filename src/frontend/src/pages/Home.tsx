import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, CheckCircle, TrendingUp, Users, Shield, Clock, FileCheck, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const heroSlides = [
    {
      image: '/assets/generated/home-hero-rcm.dim_3840x2160.png',
      title: 'Transform Your Revenue Cycle with AI-Powered Healthcare Solutions',
      subtitle: 'Reduce denials by 40%, accelerate revenue recovery, and optimize your entire revenue cycle management',
    },
    {
      image: '/assets/generated/home-hero-technology.dim_3840x2160.png',
      title: 'Advanced Healthcare Technology',
      subtitle: 'Leverage cutting-edge technology solutions for enhanced patient care and operational efficiency',
    },
    {
      image: '/assets/generated/home-hero-network.dim_3840x2160.png',
      title: 'Connecting Healthcare Ecosystem',
      subtitle: 'Join our comprehensive network connecting all healthcare stakeholders across India',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: 'Verified Excellence',
      description: 'Connect with certified professionals and accredited hospitals across India',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Maximize revenue with AI-powered denial prevention and automated workflows',
    },
    {
      icon: Shield,
      title: 'Comprehensive Network',
      description: 'Access complete healthcare ecosystem on a single unified platform',
    },
    {
      icon: Clock,
      title: 'Efficiency & Speed',
      description: 'Accelerate claim processing and reduce administrative burden',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 dedicated support from healthcare revenue cycle specialists',
    },
    {
      icon: Shield,
      title: 'Compliance Assured',
      description: 'Full regulatory compliance with enterprise-grade security',
    },
  ];

  const solutions = [
    {
      title: 'Revenue Cycle Management',
      description: 'Optimize your revenue cycle with AI-powered solutions that reduce denials and accelerate payments',
      image: '/assets/generated/solutions-rcm.dim_1200x800.png',
      link: '/solutions',
      hash: 'rcm',
      prominent: true,
    },
    {
      title: 'Healthcare Technology',
      description: 'Advanced technology solutions that integrate seamlessly with your existing systems',
      image: '/assets/generated/solutions-technology.dim_1200x800.png',
      link: '/solutions',
      hash: 'technology',
      prominent: false,
    },
    {
      title: 'Connecting Platform',
      description: 'Comprehensive network connecting all healthcare stakeholders on a single platform',
      image: '/assets/generated/solutions-connecting-platform.dim_1200x800.png',
      link: '/solutions',
      hash: 'network',
      prominent: false,
    },
  ];

  const metrics = [
    { value: '10M+', label: 'Claims Processed' },
    { value: '$500M+', label: 'Revenue Recovered' },
    { value: '200+', label: 'Hospitals Served' },
    { value: '98%', label: 'Accuracy Rate' },
  ];

  const handleNavigateWithHash = (path: string, hash: string) => {
    navigate({ to: path }).then(() => {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Carousel */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-3xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/95 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      onClick={() => setDemoModalOpen(true)}
                      className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white shadow-xl min-h-[44px]"
                    >
                      Book a Demo
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate({ to: '/solutions' })}
                      className="bg-white/95 hover:bg-white text-enterprise-blue border-2 border-white min-h-[44px]"
                    >
                      Explore Solutions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/assets/generated/home-why-choose.dim_1920x1080.png"
            alt="Why Choose Us Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-enterprise-blue">
              Why Choose AI Health Zon
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare excellence with our comprehensive RCM-first platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="border-2 border-enterprise-grey hover:border-enterprise-blue/50 transition-all duration-200 hover:shadow-lg bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-enterprise-blue/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-enterprise-blue" />
                  </div>
                  <CardTitle className="text-xl text-enterprise-blue">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-16 md:py-24 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-enterprise-blue">
              Our Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed for enterprise excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {solutions.map((solution, index) => (
              <Card
                key={index}
                className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl border-2 hover:border-enterprise-blue/50 ${
                  solution.prominent ? 'lg:col-span-1 lg:row-span-1' : ''
                }`}
                onClick={() => handleNavigateWithHash(solution.link, solution.hash)}
              >
                <div className={`relative ${solution.prominent ? 'h-80' : 'h-64'}`}>
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-enterprise-blue">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 mb-4">{solution.description}</CardDescription>
                  <Button variant="ghost" className="text-enterprise-blue hover:text-enterprise-blue/80 p-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Claim Intelligence Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="relative order-2 lg:order-1">
              <img
                src="/assets/generated/claim-intelligence-hero.dim_1200x600.png"
                alt="Clean Claim Intelligence"
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-royal-teal/10 flex items-center justify-center mr-4">
                  <FileCheck className="w-6 h-6 text-royal-teal" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-royal-teal">
                  Clean Claim Intelligence
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Protect your revenue with our advanced 10-layer validation intelligence system that ensures claim accuracy before submission
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Revenue Protection: Prevent denials before they happen',
                  'Claim Accuracy: 10-layer validation intelligence',
                  'Denial Prevention: Proactive error detection',
                  'Compliance Assurance: Regulatory standards met',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-royal-teal mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                onClick={() => navigate({ to: '/clean-claim-intelligence' })}
                className="bg-royal-teal hover:bg-royal-teal/90 text-white min-h-[44px]"
              >
                Explore Clean Claim Intelligence <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Board Section */}
      <section className="py-20 md:py-32 bg-enterprise-grey">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-royal-teal/10 flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-royal-teal" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-royal-teal">
                  Knowledge Board
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Your comprehensive resource for hospital licensing, regulatory compliance, and accreditation standards across India
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Hospital Licensing: Complete state-specific requirements',
                  'NABH Standards: Accreditation guidelines and processes',
                  'Regulatory Compliance: Stay updated with latest regulations',
                  'Compliance Checklist: Step-by-step implementation guides',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-royal-teal mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                onClick={() => navigate({ to: '/knowledge-board' })}
                className="bg-royal-teal hover:bg-royal-teal/90 text-white min-h-[44px]"
              >
                Explore Knowledge Board <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hospital-licenses-hero.dim_1920x1080.png"
                alt="Knowledge Board"
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RCM Highlight Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-enterprise-blue">
                Maximize Revenue, Minimize Hassle
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Transform your revenue cycle with AI-powered solutions that deliver measurable results
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Reduce denials by 40% with predictive analytics',
                  'Accelerate revenue recovery by 30%',
                  'Automate claim workflows end-to-end',
                  'Real-time AR tracking and insights',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-enterprise-blue mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                onClick={() => handleNavigateWithHash('/solutions', 'rcm')}
                className="bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px]"
              >
                Explore RCM Solutions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/home-rcm-highlight.dim_1920x1080.png"
                alt="Revenue Cycle Management"
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 md:py-24 bg-enterprise-grey relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/generated/home-impact-metrics.dim_1920x1080.png"
            alt="Impact Metrics Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-enterprise-blue">
              Proven Impact
            </h2>
            <p className="text-lg text-gray-600">Delivering measurable results for healthcare organizations</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-enterprise-blue mb-2">
                  {metric.value}
                </div>
                <div className="text-base md:text-lg text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-enterprise-blue">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Revenue Cycle?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a consultation today and discover how we can optimize your healthcare revenue cycle
          </p>
          <Button
            size="lg"
            onClick={() => setDemoModalOpen(true)}
            className="bg-white text-enterprise-blue hover:bg-white/90 min-h-[44px] text-base font-bold"
          >
            Book a Demo
          </Button>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-enterprise-blue">Book a Demo</DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setDemoModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
