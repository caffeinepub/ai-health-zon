import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function Solutions() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Solutions</h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Comprehensive healthcare solutions designed to optimize operations, enhance technology,
            and connect all stakeholders in the healthcare ecosystem.
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Vertical 1: RCM */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/assets/generated/rcm-icon.dim_256x256.png"
                    alt="RCM"
                    className="w-16 h-16 object-contain"
                  />
                  <CardTitle className="text-3xl">Revenue Cycle Management (RCM)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Optimize your revenue cycle with AI-powered solutions that reduce denials, accelerate
                  payments, and improve financial performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Eligibility & Pre-authorization</h3>
                      <p className="text-sm text-muted-foreground">
                        Real-time verification and automated pre-auth processing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Medical Billing & Coding</h3>
                      <p className="text-sm text-muted-foreground">
                        Accurate coding and compliant billing services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Claims Management & Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        End-to-end claims processing with real-time tracking
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Denial Prediction & Follow-up</h3>
                      <p className="text-sm text-muted-foreground">
                        AI-powered denial prevention and automated follow-up
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">AR & Revenue Dashboards</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive analytics and insights for revenue optimization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vertical 2: Healthcare Technology */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/assets/generated/tech-icon.dim_256x256.png"
                    alt="Technology"
                    className="w-16 h-16 object-contain"
                  />
                  <CardTitle className="text-3xl">Healthcare Technology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Advanced technology solutions that integrate seamlessly with your existing systems
                  to enhance efficiency and patient care.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">AI Dashboards & Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Intelligent insights and predictive analytics for better decisions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">HIS/EHR Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Seamless integration with existing hospital information systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">NABH & Licensing Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Compliance management and accreditation support tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Telemedicine & Remote Monitoring</h3>
                      <p className="text-sm text-muted-foreground">
                        Virtual care solutions for extended patient reach
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Data Security & Compliance</h3>
                      <p className="text-sm text-muted-foreground">
                        Enterprise-grade security with full regulatory compliance
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vertical 3: Connecting Platform */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/assets/generated/network-icon.dim_256x256.png"
                    alt="Network"
                    className="w-16 h-16 object-contain"
                  />
                  <CardTitle className="text-3xl">Healthcare Connecting Platform</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  A comprehensive network connecting all healthcare stakeholders on a single unified
                  platform for seamless collaboration and service delivery.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Workforce</h3>
                      <p className="text-sm text-muted-foreground">
                        Doctors, nurses, radiologists, physiotherapists, dietitians, coders, RCM staff
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Emergency & Ambulance Services</h3>
                      <p className="text-sm text-muted-foreground">
                        24/7 emergency response and ambulance coordination
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Diagnostics & Labs</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive diagnostic and laboratory services network
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Pharmacies & Medicine Suppliers</h3>
                      <p className="text-sm text-muted-foreground">
                        Integrated pharmacy network for medication management
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Vendors & Service Providers</h3>
                      <p className="text-sm text-muted-foreground">
                        Equipment, IT, and facility service providers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">NGOs & Community Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Community health organizations and support services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Insurance Partners & TPAs</h3>
                      <p className="text-sm text-muted-foreground">
                        Integrated insurance and third-party administrator network
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
