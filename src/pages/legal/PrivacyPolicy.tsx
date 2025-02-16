import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Privacy Policy | GaadiMech</title>
        <meta name="description" content="GaadiMech's privacy policy explains how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-[#FF7200] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last Updated: 1st Feb, 2025</p>
        </div>

        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-bold">1. Introduction</h2>
          <p>
            Company Name ("we," "us") operates GaadiMech.com. This policy explains how we collect, use, and protect your personal data under GDPR, CCPA, and other applicable laws.
          </p>

          <h2 className="text-xl font-bold">2. Data Collected & Sources</h2>
          <p>We process:</p>
          <ul>
            <li>
              <strong>Identifiers:</strong> Name, email, phone number (collected via account registration/contact forms)
            </li>
            <li>
              <strong>Commercial Data:</strong> Purchase history, payment details (processed securely via Payment Gateway Name)
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, device information, cookies (see Cookie Policy)
            </li>
          </ul>

          <h2 className="text-xl font-bold">3. Legal Basis for Processing</h2>
          <ul>
            <li>
              <strong>Contractual Necessity:</strong> To fulfill orders and provide services
            </li>
            <li>
              <strong>Consent:</strong> For marketing emails (users can opt out via unsubscribe links)
            </li>
            <li>
              <strong>Legal Compliance:</strong> Fraud prevention and tax obligations
            </li>
          </ul>

          <h2 className="text-xl font-bold">4. Data Sharing</h2>
          <p>We share data with:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Payment processors (Stripe/PayPal), logistics partners
            </li>
            <li>
              <strong>Legal Authorities:</strong> When required by law
            </li>
          </ul>

          <h2 className="text-xl font-bold">5. User Rights</h2>
          <p>You may:</p>
          <ul>
            <li>Request access to or deletion of your data</li>
            <li>Opt out of data sales (we do not sell data)</li>
            <li>Withdraw consent via email/portal</li>
          </ul>

          <h2 className="text-xl font-bold">6. Security Measures</h2>
          <ul>
            <li>AES-256 encryption for sensitive data</li>
            <li>Regular vulnerability assessments</li>
          </ul>

          <h2 className="text-xl font-bold">7. Updates</h2>
          <p>
            Policy changes notified via email or site banners 30 days in advance.
          </p>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              For privacy-related inquiries, contact us at:{' '}
              <a href="mailto:contact@gaadimech.com" className="text-[#FF7200] hover:text-[#0e5aa8]">
                contact@gaadimech.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;