import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Target, Eye, Award, Users, Shield, TrendingUp, CheckCircle2, Globe } from 'lucide-react';

export default function AboutUs() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'Building lasting relationships through transparency and ethical practices',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in healthcare delivery and service',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Fostering partnerships across the healthcare ecosystem',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Leveraging technology to transform healthcare accessibility',
    },
  ];

  const services = [
    'Healthcare Professional Network',
    'Corporate Healthcare Solutions',
    'Medical Tourism Services',
    'Vendor & Supplier Network',
    'NGO Partnerships',
    'Research & Development',
    'Ambulance Services',
    'Luxury Healthcare Services',
  ];

  const metrics = [
    { value: '1000+', label: 'Healthcare Professionals' },
    { value: '500+', label: 'Partner Hospitals' },
    { value: '50+', label: 'Cities Covered' },
    { value: '10000+', label: 'Patients Served' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">About AI Health Zon</h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Transforming healthcare delivery through technology, collaboration, and excellence
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="/assets/generated/about-mission-vision.dim_1200x800.png" 
                  alt="Our Mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl gradient-text-alt">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  To create a comprehensive healthcare ecosystem that connects patients, professionals, and
                  institutions, making quality healthcare accessible, affordable, and efficient for all Indians.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="/assets/generated/about-mission-vision.dim_1200x800.png" 
                  alt="Our Vision" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl gradient-text-alt">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  To be India's most trusted healthcare platform, revolutionizing the way healthcare services are
                  discovered, delivered, and experienced across the nation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text-vibrant">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="mb-12 max-w-4xl mx-auto">
            <img 
              src="/assets/generated/about-core-values.dim_1200x800.png" 
              alt="Our Core Values" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl gradient-text-alt">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 overflow-hidden">
              <div className="relative h-80">
                <img 
                  src="/assets/generated/about-why-choose.dim_1200x800.png" 
                  alt="Why Choose Us" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl gradient-text-alt">Why Choose AI Health Zon</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  We bring together the best of healthcare technology, professional expertise, and comprehensive
                  services to create an unparalleled healthcare ecosystem that serves all stakeholders effectively.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Verticals Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Three Verticals</h2>
            <p className="text-xl text-gray-600">Comprehensive healthcare solutions across multiple domains</p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <img 
              src="/assets/generated/about-three-verticals.dim_1200x800.png" 
              alt="Our Three Verticals" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <CardTitle className="text-lg">{service}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 overflow-hidden">
              <div className="relative h-80">
                <img 
                  src="/assets/generated/about-compliance.dim_1200x800.png" 
                  alt="Compliance & Standards" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl gradient-text-alt">Compliance & Standards</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed mb-6">
                  We adhere to the highest standards of healthcare compliance, data security, and professional ethics.
                  Our platform is designed to meet regulatory requirements while ensuring patient privacy and data
                  protection.
                </CardDescription>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-primary">HIPAA Compliant</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-primary">ISO Certified</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-primary">Data Encrypted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text-vibrant">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in healthcare delivery across India</p>
          </div>

          <div className="mb-12 max-w-4xl mx-auto">
            <img 
              src="/assets/generated/about-our-impact.dim_1200x800.png" 
              alt="Our Impact" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-5xl font-bold gradient-text mb-2">{metric.value}</CardTitle>
                  <CardDescription className="text-base font-medium">{metric.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">Join Our Healthcare Network</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of India's leading healthcare platform connecting professionals, institutions, and services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate({ to: '/directory' })}>
              Explore Network
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/contact' })}>
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
