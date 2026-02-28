import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function RefundPolicy() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Refund Policy</h1>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Our Refund Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground mb-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">General Policy</h3>
                <p className="text-muted-foreground mb-4">
                  AI Health Zon is committed to customer satisfaction. This Refund Policy outlines the circumstances
                  under which refunds may be issued for services purchased through our platform.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Eligibility for Refunds</h3>
                <p className="text-muted-foreground mb-4">
                  Refund requests must be submitted within 30 days of the original purchase date. Services that have
                  been fully delivered or utilized may not be eligible for refunds. Each refund request will be
                  evaluated on a case-by-case basis.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">How to Request a Refund</h3>
                <p className="text-muted-foreground mb-4">
                  To request a refund, please contact our support team at support@aihealthzon.com with your order
                  details and reason for the refund request. Our team will review your request and respond within
                  5-7 business days.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Processing Time</h3>
                <p className="text-muted-foreground mb-4">
                  Once a refund is approved, it will be processed within 10-14 business days. The refund will be
                  issued to the original payment method used for the purchase.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Non-Refundable Items</h3>
                <p className="text-muted-foreground mb-4">
                  Certain services and fees are non-refundable, including but not limited to: registration fees,
                  verification fees, and services that have been completed or delivered.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Cancellations</h3>
                <p className="text-muted-foreground mb-4">
                  You may cancel your subscription or service at any time. Cancellations will take effect at the
                  end of the current billing period, and no refunds will be provided for partial periods.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Contact Us</h3>
                <p className="text-muted-foreground">
                  For questions about our Refund Policy, please contact us at refunds@aihealthzon.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
