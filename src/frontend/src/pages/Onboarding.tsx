import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Stakeholder {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
}

const stakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'Hospital',
    image: '/assets/generated/hospital-happy.dim_256x256.png',
    description: 'Leading healthcare provider seeking comprehensive platform integration',
  },
  {
    id: '2',
    name: 'Dr. Sarah Mitchell',
    type: 'Doctor',
    image: '/assets/generated/doctor-peaceful.dim_256x256.png',
    description: 'Experienced physician looking for better patient management tools',
  },
  {
    id: '3',
    name: 'Nurse Emily Johnson',
    type: 'Nurse',
    image: '/assets/generated/nurse-happy.dim_256x256.png',
    description: 'Dedicated nurse seeking efficient healthcare coordination',
  },
  {
    id: '4',
    name: 'MedSupply Co.',
    type: 'Vendor',
    image: '/assets/generated/vendor-content.dim_256x256.png',
    description: 'Medical equipment supplier wanting to expand reach',
  },
  {
    id: '5',
    name: 'QuickCare Ambulance',
    type: 'Ambulance Service',
    image: '/assets/generated/ambulance-happy.dim_256x256.png',
    description: 'Emergency service provider seeking better network connections',
  },
  {
    id: '6',
    name: 'HealthCare Foundation',
    type: 'NGO',
    image: '/assets/generated/ngo-peaceful.dim_256x256.png',
    description: 'Non-profit organization focused on community health initiatives',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [approvedStakeholders, setApprovedStakeholders] = useState<string[]>([]);
  const [showComplete, setShowComplete] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const currentStakeholder = stakeholders[currentIndex];
  const isApproved = approvedStakeholders.includes(currentStakeholder?.id);

  useEffect(() => {
    if (autoPlay && !isApproving && !isApproved && currentIndex < stakeholders.length) {
      const timer = setTimeout(() => {
        handleApprove();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isApproving, isApproved, autoPlay]);

  const handleApprove = () => {
    if (isApproved) return;

    setIsApproving(true);
    
    setTimeout(() => {
      setApprovedStakeholders((prev) => [...prev, currentStakeholder.id]);
      setIsApproving(false);

      setTimeout(() => {
        if (currentIndex < stakeholders.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setShowComplete(true);
        }
      }, 1000);
    }, 1500);
  };

  const handleSkip = () => {
    navigate({ to: '/home' });
  };

  const handleContinue = () => {
    navigate({ to: '/home' });
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setApprovedStakeholders([]);
    setShowComplete(false);
    setAutoPlay(true);
  };

  if (showComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-700">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/20 rounded-full animate-ping" />
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/generated/platform-emblem.dim_200x200.png"
                alt="AI Health Zon"
                className="w-40 h-40 object-contain animate-in zoom-in duration-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Welcome to AI Health Zon!
            </h1>
            <p className="text-xl text-muted-foreground">
              All stakeholders are now connected and thriving in our unified healthcare ecosystem
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto">
            {stakeholders.map((stakeholder, index) => (
              <div
                key={stakeholder.id}
                className="flex flex-col items-center space-y-2 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img
                    src={stakeholder.image}
                    alt={stakeholder.type}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-primary bg-background rounded-full" />
                </div>
                <span className="text-xs font-medium text-center">{stakeholder.type}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={handleContinue} className="text-lg px-8">
              Enter Platform <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleReplay} className="text-lg px-8">
              Replay Animation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="/assets/generated/platform-emblem.dim_200x200.png"
              alt="AI Health Zon"
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-3xl md:text-4xl font-bold">AI Health Zon</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Watch as healthcare stakeholders join our unified platform
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Stakeholder {currentIndex + 1} of {stakeholders.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {approvedStakeholders.length} approved
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / stakeholders.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Animation Area */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Stakeholder Card */}
          <div
            className={`bg-card border-2 rounded-2xl p-8 shadow-lg transition-all duration-500 ${
              isApproved ? 'border-primary scale-105' : 'border-border'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={currentStakeholder.image}
                    alt={currentStakeholder.type}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  {isApproved && (
                    <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-300">
                      <CheckCircle className="w-12 h-12 text-primary bg-background rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                    {currentStakeholder.type}
                  </div>
                  <h3 className="text-xl font-bold">{currentStakeholder.name}</h3>
                </div>
              </div>

              <p className="text-muted-foreground">{currentStakeholder.description}</p>

              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  {isApproved ? 'Approved & Connected!' : 'Requesting to join...'}
                </span>
              </div>
            </div>
          </div>

          {/* Platform Response */}
          <div className="space-y-6">
            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/generated/platform-emblem.dim_200x200.png"
                  alt="AI Health Zon"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h4 className="font-bold text-lg">AI Health Zon Platform</h4>
                  <p className="text-sm text-muted-foreground">Processing request...</p>
                </div>
              </div>

              {isApproving && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm">Verifying credentials...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                    <span className="text-sm">Checking compliance...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
                    <span className="text-sm">Preparing network access...</span>
                  </div>
                </div>
              )}

              {isApproved && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 text-primary">
                    <CheckCircle className="w-8 h-8" />
                    <span className="font-bold text-lg">Request Approved!</span>
                  </div>
                  <div className="bg-background rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">Access Granted:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ Platform dashboard</li>
                      <li>✓ Network directory</li>
                      <li>✓ Communication tools</li>
                      <li>✓ Resource management</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <img
                      src="/assets/generated/approval-check.dim_128x128.png"
                      alt="Approved"
                      className="w-6 h-6"
                    />
                    <span className="font-medium">Stakeholder is now peaceful and happy!</span>
                  </div>
                </div>
              )}

              {!isApproving && !isApproved && (
                <div className="text-center py-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      setAutoPlay(false);
                      handleApprove();
                    }}
                    className="w-full"
                  >
                    Approve Request
                  </Button>
                </div>
              )}
            </div>

            {/* Approved Stakeholders Preview */}
            {approvedStakeholders.length > 0 && (
              <div className="bg-card border rounded-xl p-4">
                <p className="text-sm font-medium mb-3">Connected Stakeholders:</p>
                <div className="flex flex-wrap gap-2">
                  {approvedStakeholders.map((id) => {
                    const stakeholder = stakeholders.find((s) => s.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1"
                      >
                        <img
                          src={stakeholder?.image}
                          alt={stakeholder?.type}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-medium">{stakeholder?.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={handleSkip}>
            Skip Introduction
          </Button>
          <div className="flex gap-2">
            {stakeholders.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : approvedStakeholders.includes(stakeholders[index].id)
                      ? 'bg-primary/50'
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="w-24" />
        </div>
      </div>
    </div>
  );
}
