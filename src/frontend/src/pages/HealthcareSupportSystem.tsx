import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import {
  Stethoscope,
  Building2,
  Users,
  Heart,
  FileText,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Award,
  Target,
  Lightbulb,
  Play,
} from 'lucide-react';

export default function HealthcareSupportSystem() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: Stethoscope,
      title: 'Clinical Excellence',
      description: 'Advanced medical protocols and patient care standards',
      video: '/assets/generated/healthcare-video-thumbnail-1.dim_800x450.png',
    },
    {
      icon: Building2,
      title: 'Infrastructure Development',
      description: 'Modern healthcare facilities and equipment',
      video: '/assets/generated/healthcare-video-thumbnail-2.dim_800x450.png',
    },
    {
      icon: Users,
      title: 'Staff Training',
      description: 'Continuous professional development programs',
      video: '/assets/generated/healthcare-video-thumbnail-3.dim_800x450.png',
    },
    {
      icon: Heart,
      title: 'Patient Experience',
      description: 'Compassionate care and service excellence',
      video: '/assets/generated/healthcare-video-thumbnail-4.dim_800x450.png',
    },
    {
      icon: FileText,
      title: 'Documentation & Compliance',
      description: 'Regulatory adherence and quality assurance',
      video: '/assets/generated/healthcare-video-thumbnail-1.dim_800x450.png',
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Data-driven insights and optimization',
      video: '/assets/generated/healthcare-video-thumbnail-2.dim_800x450.png',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Patient safety and quality control systems',
      video: '/assets/generated/healthcare-video-thumbnail-3.dim_800x450.png',
    },
    {
      icon: Zap,
      title: 'Technology Integration',
      description: 'Digital health solutions and automation',
      video: '/assets/generated/healthcare-video-thumbnail-4.dim_800x450.png',
    },
    {
      icon: Globe,
      title: 'Network Collaboration',
      description: 'Inter-hospital partnerships and referrals',
      video: '/assets/generated/healthcare-video-thumbnail-1.dim_800x450.png',
    },
    {
      icon: Award,
      title: 'Accreditation Support',
      description: 'NABH, JCI, and international certifications',
      video: '/assets/generated/healthcare-video-thumbnail-2.dim_800x450.png',
    },
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Growth strategies and market positioning',
      video: '/assets/generated/healthcare-video-thumbnail-3.dim_800x450.png',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Programs',
      description: 'Research initiatives and best practices',
      video: '/assets/generated/healthcare-video-thumbnail-4.dim_800x450.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Healthcare Support System
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Comprehensive solutions for hospitals, clinics, and healthcare organizations across India
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/contact' })}>
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 gradient-text-alt">
              Elevating Healthcare Standards
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our Healthcare Support System provides end-to-end solutions for medical institutions seeking to enhance
              operational efficiency, clinical outcomes, and patient satisfaction. With expertise spanning 12 critical
              domains, we partner with healthcare organizations to achieve excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories with Videos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text-vibrant">Our Service Categories</h2>
            <p className="text-xl text-gray-600">Comprehensive support across all aspects of healthcare delivery</p>
          </div>

          <div className="space-y-24">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                {/* Video Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                    <img
                      src={category.video}
                      alt={category.title}
                      className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-primary ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white text-lg font-medium drop-shadow-lg">
                        Watch: {category.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2">
                  <Card className="border-2 hover:border-primary/50 transition-all h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <category.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-3xl gradient-text-alt">{category.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-lg">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Expert consultation and implementation support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Customized solutions for your organization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Ongoing monitoring and continuous improvement</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Transform Your Healthcare Organization?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Partner with us to achieve operational excellence and superior patient outcomes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/contact' })}>
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/about' })}>
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
