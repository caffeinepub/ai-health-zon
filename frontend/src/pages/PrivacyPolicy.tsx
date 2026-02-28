import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function PrivacyPolicy() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Privacy Policy</h1>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Our Commitment to Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground mb-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Information We Collect</h3>
                <p className="text-muted-foreground mb-4">
                  We collect information that you provide directly to us, including when you register for an account,
                  submit forms, or communicate with us. This may include your name, email address, phone number,
                  professional credentials, and other relevant information.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">How We Use Your Information</h3>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to provide, maintain, and improve our services, to communicate
                  with you, to monitor and analyze trends and usage, and to protect the security and integrity of
                  our platform.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Information Sharing</h3>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your information with service providers,
                  business partners, and other third parties as necessary to provide our services and as required
                  by law.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Data Security</h3>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Your Rights</h3>
                <p className="text-muted-foreground mb-4">
                  You have the right to access, update, or delete your personal information. You may also have the
                  right to restrict or object to certain processing of your information.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at privacy@aihealthzon.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
