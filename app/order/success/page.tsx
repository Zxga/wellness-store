import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  searchParams: { session_id?: string };
}

export const metadata = { title: 'Order Confirmed!' };

export default function OrderSuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id || '';
  const orderNumber = sessionId ? sessionId.slice(-8).toUpperCase() : 'WH' + Date.now().toString(36).toUpperCase();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-primary" />
        </div>

        <h1 className="font-display font-800 text-3xl sm:text-4xl text-text-primary mb-3">
          Thank You! 🌿
        </h1>
        <p className="text-text-secondary text-lg mb-2">Your order has been confirmed.</p>
        <p className="text-text-secondary mb-8">
          Order #{orderNumber}
        </p>

        <div className="card p-6 text-left mb-8 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <Mail size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">Confirmation Email Sent</p>
              <p className="text-text-secondary text-sm">Check your inbox for order details and tracking info.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <Package size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">Estimated Delivery</p>
              <p className="text-text-secondary text-sm">Standard: 7–14 business days · Express: 3–5 business days</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-outline flex items-center justify-center gap-2">
            Need Help?
          </Link>
        </div>
      </div>
    </div>
  );
}
