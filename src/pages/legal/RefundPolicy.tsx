import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';


const RefundPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <RefreshCcw className="w-16 h-16 text-[#FF7200] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          <p className="text-gray-600 mt-2">
            This refund policy applies to all purchases from GaadiMech, encompassing both physical products and services. GaadiMech reserves the right to amend this policy at any time without prior notice.
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-bold">1. Eligibility</h2>
          <h3>Physical Products:</h3>
          <p>
            To be eligible for a refund, physical products must be returned within 7 days of delivery. The item must be unused, in its original condition, with all original labels and packaging intact.
          </p>
          <ul>
            <li>Refunds or exchanges are only offered for defective or damaged items.</li>
            <li>You may be required to provide photographic evidence of the damage or defect.</li>
          </ul>
          <h3>Services:</h3>
          <p>
            Refunds for services are evaluated on a case-by-case basis. Approval depends on whether GaadiMech has failed to fulfill its service commitments.
          </p>

          <h2 className="text-xl font-bold">2. Refund Process</h2>
          <h3>Initiate a Return:</h3>
          <p>
            To initiate a return, contact customer care at +91-8448285289 within 7 days of delivery. You will need to provide a receipt or proof of purchase.
          </p>
          <h3>Return the Item:</h3>
          <p>
            If a return is approved, you are responsible for shipping the item to: ATFEM KhetiGaadi Pvt. Ltd. Yashawant Nagar, Near BJS College, Bakori Road, Wagholi, Pune.
          </p>
          <ul>
            <li>You must pack the items securely to prevent any loss or damage during transit.</li>
            <li>GaadiMech recommends using a reliable courier service and insuring the package.</li>
            <li>You are responsible for paying your own shipping costs for returning the item. Shipping costs are non-refundable.</li>
          </ul>
          <h3>Inspection and Approval:</h3>
          <p>
            Once your return is received and inspected, GaadiMech will notify you of the approval or rejection of your refund.
          </p>
          <h3>Refund Issuance:</h3>
          <p>
            If approved, refunds will be processed to your original method of payment within a certain number of days. GaadiMech is not responsible for delays caused by banking institutions.
          </p>

          <h2 className="text-xl font-bold">3. Non-Refundable Items and Situations</h2>
          <ul>
            <li>Opened or damaged perishable goods</li>
            <li>Digital downloads if accessed</li>
            <li>Custom-made parts</li>
            <li>Items returned without prior authorization</li>
            <li>Services that have been fully performed</li>
            <li>Any item not in its original condition, damaged, or missing parts for reasons not due to GaadiMech's error</li>
            <li>Returns made after the stipulated return period</li>
          </ul>

          <h2 className="text-xl font-bold">4. Order Cancellation</h2>
          <ul>
            <li>You may cancel your order anytime up to the given time or cut-off time of the slot for which you have placed an order on the GaadiMech platform or by calling customer service.</li>
            <li>If GaadiMech suspects any fraudulent transaction or violation of the terms and conditions, GaadiMech, at its sole discretion, may cancel such orders.</li>
          </ul>

          <h2 className="text-xl font-bold">5. Exchanges</h2>
          <ul>
            <li>GaadiMech only replaces items if they are defective or damaged.</li>
            <li>Exchanges are subject to product availability.</li>
          </ul>

          <h2 className="text-xl font-bold">6. Late or Missing Refunds</h2>
          <p>If you haven't received a refund yet:</p>
          <ul>
            <li>First check your bank account again</li>
            <li>Then contact your credit card company, as it may take some time before your refund is officially posted</li>
            <li>Next, contact your bank. There is often some processing time before a refund is posted</li>
            <li>If you've done all of this and you still have not received your refund yet, please contact GaadiMech</li>
          </ul>

          <h2 className="text-xl font-bold">7. Shipping</h2>
          <ul>
            <li>To return your product, you should mail your product to the address provided by customer service</li>
            <li>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable</li>
            <li>If you receive a refund, the cost of return shipping will be deducted from your refund</li>
          </ul>

          <h2 className="text-xl font-bold">8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India without reference to conflict of laws principles, and disputes arising in relation hereto shall be subject to the exclusive jurisdiction of the courts at Jaipur, Rajasthan.
          </p>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              For questions about our refund policy, contact us at:{' '}
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

export default RefundPolicy;