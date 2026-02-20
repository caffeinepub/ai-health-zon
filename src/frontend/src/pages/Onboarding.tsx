import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const stakeholders = [
    {
      name: 'Hospital',
      image: '/assets/generated/hospital-happy.dim_256x256.png',
      description: 'Leading healthcare institutions',
    },
    {
      name: 'Doctor',
      image: '/assets/generated/doctor-peaceful.dim_256x256.png',
      description: 'Experienced medical professionals',
    },
    {
      name: 'Nurse',
      image: '/assets/generated/nurse-happy.dim_256x256.png',
      description: 'Dedicated nursing staff',
    },
    {
      name: 'Vendor',
      image: '/assets/generated/vendor-content.dim_256x256.png',
      description: 'Medical equipment suppliers',
    },
    {
      name: 'Ambulance',
      image: '/assets/generated/ambulance-happy.dim_256x256.png',
      description: 'Emergency medical services',
    },
    {
      name: 'NGO',
      image: '/assets/generated/ngo-peaceful.dim_256x256.png',
      description: 'Healthcare support organizations',
    },
  ];

  useEffect(() => {
    if (currentStep < stakeholders.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        navigate({ to: '/' });
      }, 2000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, stakeholders.length, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Welcome to AI Health Zon</h1>
          <p className="text-xl text-gray-700">Building India's most comprehensive healthcare network</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 ${
                index < currentStep ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
              }`}
            >
              <div className="relative">
                <img
                  src={stakeholder.image}
                  alt={stakeholder.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                {index < currentStep && (
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2 animate-bounce">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 gradient-text-alt">{stakeholder.name}</h3>
              <p className="text-gray-600">{stakeholder.description}</p>
              {index < currentStep && (
                <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Approved & Joined</span>
                </div>
              )}
              {index === currentStep && (
                <div className="mt-4 text-primary font-medium animate-pulse">Joining network...</div>
              )}
            </div>
          ))}
        </div>

        {currentStep >= stakeholders.length && (
          <div className="text-center animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 gradient-text-vibrant">Network Complete!</h2>
              <p className="text-xl text-gray-700 mb-6">
                All stakeholders have successfully joined AI Health Zon
              </p>
              <Button size="lg" onClick={() => navigate({ to: '/' })}>
                Explore Platform
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
