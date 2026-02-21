import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Users, Network, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/assets/generated/home-hero-rcm.dim_1920x1080.png',
      title: 'Revenue Cycle Management Excellence',
      subtitle: 'Optimize your healthcare revenue cycle with AI-powered solutions and expert support',
    },
    {
      image: '/assets/generated/home-hero-technology.dim_1920x1080.png',
      title: 'Advanced Healthcare Technology',
      subtitle: 'Leverage cutting-edge technology solutions for enhanced patient care and operational efficiency',
    },
    {
      image: '/assets/generated/home-hero-connecting.dim_1920x1080.png',
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

  const valueProps = [
    {
      icon: <img src="/assets/generated/healthcare-icon.dim_64x64.png" alt="Healthcare" className="w-12 h-12" />,
      title: 'Verified Healthcare Network',
      description: 'Connect with certified professionals and accredited hospitals across India',
    },
    {
      icon: <img src="/assets/generated/tech-icon.dim_64x64.png" alt="Technology" className="w-12 h-12" />,
      title: 'Advanced Technology',
      description: 'Leverage cutting-edge healthcare technology and digital solutions',
    },
    {
      icon: <img src="/assets/generated/network-icon.dim_64x64.png" alt="Network" className="w-12 h-12" />,
      title: 'Comprehensive Services',
      description: 'Access medical tourism, research, and luxury healthcare services',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Carousel */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/95 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <Button
                    size="lg"
                    onClick={() => navigate({ to: '/directory' })}
                    className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
                  >
                    Explore Network <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
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
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Why Choose AI Health Zon
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Experience healthcare excellence with our comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {valueProps.map((prop, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4">{prop.icon}</div>
                  <CardTitle className="text-xl sm:text-2xl gradient-text-alt">{prop.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{prop.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text-vibrant">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From medical professionals to research facilities, we connect you with the best healthcare resources
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Stethoscope, title: 'Healthcare Professionals', path: '/careers' },
              { icon: Users, title: 'Corporate Healthcare', path: '/healthcare-support' },
              { icon: Network, title: 'Vendor Network', path: '/vendors' },
              { icon: Users, title: 'NGO Partners', path: '/ngos' },
            ].map((service, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-primary/50"
                onClick={() => navigate({ to: service.path })}
              >
                <CardHeader>
                  <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                  <CardTitle className="text-base sm:text-lg gradient-text-alt">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals and organizations making a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate({ to: '/directory' })}>
              Browse Network <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/contact' })}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
