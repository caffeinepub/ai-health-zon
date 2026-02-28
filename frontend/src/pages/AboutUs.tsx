import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Heart, Globe, Users, Lightbulb, Shield, Leaf, Sprout, HandHeart, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemoBookingForm from '@/components/DemoBookingForm';

export default function AboutUs() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const values = [
    {
      icon: Heart,
      title: 'Health Equity',
      description: 'Ensuring every individual has access to quality healthcare regardless of their background, location, or economic status.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology and creative solutions to transform healthcare delivery and outcomes.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building strong partnerships across the healthcare ecosystem to create integrated, patient-centered care.',
    },
    {
      icon: Shield,
      title: 'Quality Care',
      description: 'Maintaining the highest standards of medical excellence, safety, and compassionate service in every interaction.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Creating healthcare solutions that are environmentally responsible and economically viable for long-term impact.',
    },
    {
      icon: HandHeart,
      title: 'Transparency',
      description: 'Operating with honesty, integrity, and open communication to build trust with all stakeholders.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Forest Background */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/generated/about-hero-forest.dim_1920x1080.png" 
            alt="Health Garden Forest" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Organic gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-garden-green-dark/85 via-garden-green-medium/75 to-garden-leaf-accent/70"></div>
          
          {/* Animated organic elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 animate-water-ripple"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-white/5 animate-water-ripple" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/3 left-1/2 w-40 h-40 rounded-full bg-white/5 animate-water-ripple" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <Sprout className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Building A Healthy World
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 drop-shadow-lg max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Where healthcare grows naturally—accessible, sustainable, and life-giving for all
            </p>
            <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="bg-white text-garden-green-dark hover:bg-garden-light min-h-[56px] px-8 text-lg font-bold shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Join Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-garden-light to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-garden-dark">
              Our Purpose
            </h2>
            <p className="text-lg md:text-xl text-garden-text max-w-2xl mx-auto">
              Rooted in compassion, growing toward a healthier future
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <Card className="group border-2 border-garden-green-light/50 hover:border-garden-green-medium transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl bg-white">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src="/assets/generated/forest-values.dim_1200x800.png" 
                  alt="Our Mission" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-garden-green-medium/60 via-garden-green-medium/20 to-transparent"></div>
              </div>
              <CardHeader className="pb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-garden-green-light to-garden-green-medium flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl text-garden-green-dark mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg md:text-xl leading-relaxed text-gray-700">
                  To create a healthy world by building a comprehensive healthcare ecosystem that connects patients, 
                  professionals, and institutions. We make quality healthcare accessible, affordable, and efficient—
                  growing naturally to reach every individual who needs it, like a thriving garden sustaining life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-2 border-garden-green-light/50 hover:border-garden-green-medium transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl bg-white">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src="/assets/generated/forest-values.dim_1200x800.png" 
                  alt="Our Vision" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-garden-leaf-accent/60 via-garden-leaf-accent/20 to-transparent"></div>
              </div>
              <CardHeader className="pb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-garden-leaf-accent to-garden-green-medium flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl text-garden-green-dark mb-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg md:text-xl leading-relaxed text-gray-700">
                  A world where health is a universal right, not a privilege. We envision thriving communities where 
                  healthcare systems work in harmony, technology empowers wellness, and every person has the opportunity 
                  to live their healthiest life in a sustainable, equitable healthcare environment.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setDemoModalOpen(true)}
              className="bg-garden-green-medium hover:bg-garden-green-dark text-white min-h-[52px] px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Discover How We're Creating Change
            </Button>
          </div>
        </div>
      </section>

      {/* Core Values Section with Organic Pattern Background */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/generated/about-values-pattern.dim_1200x800.png" 
            alt="Values Background Pattern" 
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-garden-light/80 to-garden-meadow/60"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-garden-dark">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-garden-text max-w-2xl mx-auto">
              The principles that guide us toward a healthy world
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="group text-center border-2 border-garden-green-light/40 hover:border-garden-green-medium transition-all duration-500 hover:shadow-2xl bg-white/95 backdrop-blur-sm hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-garden-green-light to-garden-green-medium flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-garden-dark mb-2">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background with organic gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-garden-green-medium via-garden-green-dark to-garden-brown-trunk"></div>
        
        {/* Decorative organic elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-garden-leaf-accent/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Ready to Build a Healthy World Together?
            </h2>
            <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              Join us in our mission to make healthcare accessible, sustainable, and life-giving for all
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="bg-white text-garden-green-dark hover:bg-garden-light min-h-[56px] px-8 text-lg font-bold shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/contact' })}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-h-[56px] px-8 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Contact Us Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-garden-green-dark">Book a Demo</DialogTitle>
          </DialogHeader>
          <DemoBookingForm onSuccess={() => setDemoModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
