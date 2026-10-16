import PolicyLayout, { CONTACT_EMAIL } from '../components/PolicyLayout.jsx';

const SECTIONS = [
  {
    h: 'Cancelling before dispatch',
    p: `You can cancel your order any time before it is dispatched. Email ${CONTACT_EMAIL} or message us on WhatsApp with your Order ID as soon as possible. We will confirm the cancellation by email or message.`,
  },
  {
    h: 'Cancelling after dispatch',
    p: 'Once your order has been shipped, it can no longer be cancelled. If the parcel arrives damaged or incorrect, please see our Refund Policy.',
  },
  {
    h: 'Refunds for cancelled orders',
    list: [
      'Prepaid orders cancelled before dispatch are refunded in full to the original payment method within 5–7 business days.',
      'Cash on Delivery orders cancelled before dispatch have nothing to refund.',
    ],
  },
  {
    h: 'Refused or undelivered parcels',
    p: 'If you refuse delivery or are unreachable after repeated attempts, the order may be returned to us. In such cases, shipping charges may be deducted from any refund, and repeated refusals of Cash on Delivery orders may lead to that payment option being disabled for your account.',
  },
  {
    h: 'Cancellation by Be in Love',
    p: 'We may cancel an order if an item is out of stock, we cannot deliver to your address, a payment fails or fraud is suspected. If we cancel, we will let you know and refund any amount paid in full.',
  },
  {
    h: 'Changing your order',
    p: 'To change your address or quantity, contact us before dispatch. We will do our best, but changes cannot be guaranteed once packing has begun.',
  },
];

export default function CancellationPolicy() {
  return (
    <PolicyLayout
      title="Cancellation Policy"
      intro="Changed your mind? Here is how order cancellation works at Be in Love."
      sections={SECTIONS}
    />
  );
}
