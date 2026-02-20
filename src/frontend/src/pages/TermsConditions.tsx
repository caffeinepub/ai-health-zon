import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function TermsConditions() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Terms & Conditions</h1>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground mb-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Acceptance of Terms</h3>
                <p className="text-muted-foreground mb-4">
                  By accessing and using AI Health Zon's platform, you accept and agree to be bound by these Terms
                  and Conditions. If you do not agree to these terms, please do not use our services.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Use of Services</h3>
                <p className="text-muted-foreground mb-4">
                  You agree to use our services only for lawful purposes and in accordance with these Terms. You are
                  responsible for maintaining the confidentiality of your account credentials and for all activities
                  that occur under your account.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">User Responsibilities</h3>
                <p className="text-muted-foreground mb-4">
                  Users are responsible for ensuring that all information provided is accurate, current, and complete.
                  Healthcare professionals must maintain valid credentials and comply with all applicable regulations.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Intellectual Property</h3>
                <p className="text-muted-foreground mb-4">
                  All content, features, and functionality of our platform are owned by AI Health Zon and are
                  protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Limitation of Liability</h3>
                <p className="text-muted-foreground mb-4">
                  AI Health Zon shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages resulting from your use of or inability to use the service.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Modifications</h3>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes
                  by posting the new Terms on this page.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Contact Information</h3>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact us at legal@aihealthzon.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
