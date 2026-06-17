'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';

interface CartItem {
  product: { id: string; name: string; price: number };
  quantity: number;
}

interface Props {
  items: CartItem[];
  total: number;
}

export default function PayPalCheckoutButton({ items, total }: Props) {
  const router = useRouter();
  const { clearCart } = useCartStore();

  const paypalItems = items.map(({ product, quantity }) => ({
    name: product.name,
    price: product.price,
    quantity,
  }));

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'paypal', height: 48 }}
        fundingSource="paypal"
        createOrder={async () => {
          const res = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: paypalItems }),
          });
          const data = await res.json();
          if (!data.id) throw new Error(data.error || 'Failed to create order');
          return data.id;
        }}
        onApprove={async (data) => {
          const res = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: data.orderID }),
          });
          const result = await res.json();
          if (result.status === 'COMPLETED') {
            clearCart();
            router.push('/order/success');
          }
        }}
        onError={(err) => {
          console.error('[paypal] button error:', err);
        }}
      />
    </PayPalScriptProvider>
  );
}
