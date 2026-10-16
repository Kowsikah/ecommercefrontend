import PolicyLayout, { CONTACT_EMAIL } from '../components/PolicyLayout.jsx';

const SECTIONS = [
  {
    h: 'Our promise',
    p: 'We want you to love your Be in Love hair oil. If something is wrong with your order, we will make it right.',
  },
  {
    h: 'When you are eligible for a refund or replacement',
    list: [
      'The product arrived damaged, broken or leaking.',
      'You received the wrong product or a wrong quantity.',
      'The product is defective or has expired.',
    ],
  },
  {
    h: 'When we cannot offer a refund',
    p: 'As hair oil is a personal-care product, we are unable to accept returns or give refunds for:',
    list: [
      'Bottles that have been opened, used or partly used.',
      'Change of mind or personal preference after delivery.',
      'Damage caused after delivery through misuse or improper storage.',
      'Requests made after the reporting window below.',
    ],
  },
  {
    h: 'How to request a refund',
    p: 'Report the issue within 48 hours of delivery:',
    list: [
      `Email ${CONTACT_EMAIL} or message us on WhatsApp.`,
      'Include your Order ID and your name.',
      'Attach clear photos or an unboxing video showing the product, the damage and the packaging.',
    ],
  },
  {
    h: 'Review and resolution',
    p: 'We review every request within 2–3 business days. If approved, we will offer either a free replacement or a refund, depending on stock and your preference.',
  },
  {
    h: 'Refund timeline',
    p: 'Approved refunds are issued to your original payment method within 5–7 business days. Your bank may take a few extra days to show the credit. For Cash on Delivery orders, we will ask for your bank or UPI details to send the refund.',
  },
  {
    h: 'Shipping charges',
    p: 'If the issue was our mistake (damaged, defective or wrong item), we will refund the full amount including shipping. Shipping fees are not refunded in other cases.',
  },
];

export default function RefundPolicy() {
  return (
    <PolicyLayout
      title="Refund Policy"
      intro="Please read this policy to understand when and how you can get a refund or replacement for your Be in Love order."
      sections={SECTIONS}
    />
  );
}
