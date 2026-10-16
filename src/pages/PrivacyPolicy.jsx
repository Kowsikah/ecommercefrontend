import PolicyLayout, { CONTACT_EMAIL } from '../components/PolicyLayout.jsx';

const SECTIONS = [
  {
    h: 'Information we collect',
    p: 'We collect only what we need to serve you:',
    list: [
      'Account details: name, email address and password (stored securely, never in plain text).',
      'Order details: shipping name, address, phone number and the items you purchase.',
      'Messages you send us through the contact form, email or WhatsApp.',
      'Basic technical data such as browser type and pages visited, to keep the site working well.',
    ],
  },
  {
    h: 'How we use your information',
    list: [
      'To process, ship and confirm your orders.',
      'To respond to your questions and provide support.',
      'To send order updates and important service messages.',
      'To improve our website, products and customer experience.',
      'To prevent fraud and keep our website secure.',
    ],
  },
  {
    h: 'Payments',
    p: 'Payments are processed by trusted third-party payment providers. We do not store your full card, UPI or banking credentials on our servers.',
  },
  {
    h: 'Sharing your information',
    p: 'We do not sell or rent your personal information. We share it only with service providers who help us run the business, such as delivery partners and payment processors, and only as much as they need to do their job. We may also disclose information if required by law.',
  },
  {
    h: 'Cookies and local storage',
    p: 'We use basic cookies and browser storage to keep you logged in and remember the items in your cart. You can clear or block these in your browser settings, though some features may stop working.',
  },
  {
    h: 'Data security',
    p: 'We use reasonable technical and organisational measures to protect your data. No online system is completely secure, but we work to keep your information safe.',
  },
  {
    h: 'Data retention',
    p: 'We keep your information only as long as needed to fulfil orders, meet legal and accounting requirements, and resolve disputes.',
  },
  {
    h: 'Your rights',
    p: `You may ask us to access, correct or delete your personal data, or withdraw your consent to its use, at any time by emailing ${CONTACT_EMAIL}. We will respond within a reasonable time.`,
  },
  {
    h: 'Children',
    p: 'Our website is intended for adults. Our products may be used by children, but orders and accounts should be created by a parent or guardian.',
  },
  {
    h: 'Changes to this policy',
    p: 'We may update this policy from time to time. The “Last updated” date at the top shows when it was last changed.',
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      intro="At Be in Love, your privacy matters to us. This policy explains what information we collect when you use our website, how we use it, and the choices you have."
      sections={SECTIONS}
    />
  );
}
