import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Terms and Conditions | GaadiMech</title>
        <meta name="description" content="Read GaadiMech's terms and conditions for using our car service platform and services." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-[#FF7200] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="text-gray-600 mt-2">Effective: Date</p>
        </div>

        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-bold">1. Acceptance</h2>
          <p>
            By using GaadiMech.com, you agree to these terms. Violations may result in account termination.
          </p>

          <h2 className="text-xl font-bold">2. User Responsibilities</h2>
          <p>Prohibited actions:</p>
          <ul>
            <li>Scraping content or reverse-engineering code</li>
            <li>Posting unlawful/harmful material</li>
          </ul>

          <h2 className="text-xl font-bold">3. Purchases</h2>
          <ul>
            <li>
              <strong>Payment:</strong> All transactions in INR via secure gateways
            </li>
            <li>
              <strong>Shipping:</strong> Delivery timelines (3-7 business days) and liability limitations
            </li>
          </ul>

          <h2 className="text-xl font-bold">4. Intellectual Property</h2>
          <ul>
            <li>
              <strong>Ownership:</strong> All site content (logos, text) is our exclusive property (© Year).
            </li>
            <li>
              <strong>Licenses:</strong> Users grant us royalty-free rights to UGC (user-generated content).
            </li>
          </ul>

          <h2 className="text-xl font-bold">5. Disclaimers</h2>
          <ul>
            <li>
              <strong>Services:</strong> Provided "as is" without warranties (see Refunds Policy for issues)
            </li>
            <li>
              <strong>Third-Party Links:</strong> No liability for external sites
            </li>
          </ul>

          <h2 className="text-xl font-bold">6. Governing Law</h2>
          <p>
            Disputes resolved under Indian law in Jurisdiction Name courts.
          </p>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              For questions about these terms, contact us at:{' '}
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

export default Terms;