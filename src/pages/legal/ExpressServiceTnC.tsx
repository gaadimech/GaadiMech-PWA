import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ExpressServiceTnC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Express Service Terms and Conditions | GaadiMech</title>
        <meta name="description" content="Terms and conditions for GaadiMech's Express 90 MINS Car Service package." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-[#FF7200] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">GaadiMech Express 90 MINS Car Service - Terms and Conditions</h1>
          <p className="text-gray-600 mt-2">Effective: March 21, 2024</p>
        </div>

        <div className="prose prose-sm max-w-none">
          <p>
            The following terms and conditions govern the "90 Mins me Service nahi to Free" guarantee and all services provided by GaadiMech.com. By booking our Express 90 MINS Car Service, you acknowledge and agree to be bound by these terms:
          </p>

          <h2 className="text-xl font-bold">Service Guarantee</h2>
          
          <ol className="list-decimal pl-5">
            <li>The 90-minute service timer commences when the vehicle enters our service bay at the workshop and the service advisor confirms the start of work, not when the vehicle arrives at our premises.</li>
            <li>The service guarantee does not include vehicle pickup and drop-off time, customer consultation time, or payment processing time.</li>
            <li>GaadiMech.com reserves the right, in its absolute discretion and without liability, to refuse any booking for the Express 90 MINS Car Service.</li>
            <li>The 90-minute guarantee applies only to standard service packages as defined in our service menu. Additional repairs or services discovered during inspection will require separate time estimates and are not covered under the 90-minute guarantee.</li>
          </ol>

          <h2 className="text-xl font-bold">Service Limitations</h2>
          
          <ol className="list-decimal pl-5" start={5}>
            <li>The guarantee is void if:
              <ul className="list-disc pl-5">
                <li>The vehicle has non-standard modifications</li>
                <li>Additional repairs are authorized during the service</li>
                <li>Parts replacement beyond standard service items is required</li>
                <li>The vehicle condition prevents safe completion within the timeframe</li>
              </ul>
            </li>
            <li>GaadiMech.com shall not be liable for any delays caused by circumstances beyond our reasonable control, including but not limited to: parts availability, extreme weather conditions, natural disasters, civil unrest, or other force majeure events.</li>
          </ol>

          <h2 className="text-xl font-bold">Payment and Charges</h2>
          
          <ol className="list-decimal pl-5" start={7}>
            <li>Payment for the Express 90 MINS Car Service must be made in full before the vehicle is released. For major repairs, an advance payment of up to 50% of the estimated cost may be required.</li>
            <li>If the 90-minute guarantee is not met for reasons within our control, the basic service labor charge will be waived. Parts, consumables, and any additional authorized work will remain chargeable.</li>
            <li>Demurrage/garage charges will apply for vehicles not collected within 48 hours of service completion.</li>
            <li>All prices are subject to change. GaadiMech.com will notify account customers in writing before implementing any price increases exceeding the current inflation rate.</li>
          </ol>

          <h2 className="text-xl font-bold">Customer Obligations</h2>
          
          <ol className="list-decimal pl-5" start={11}>
            <li>The customer warrants that all information provided regarding the vehicle is accurate and complete. Any misrepresentation that affects service delivery time will void the 90-minute guarantee.</li>
            <li>Customers must respond to requests for additional repair approvals within 3 hours of notification. Failure to respond will pause the 90-minute timer until approval is received.</li>
            <li>Customers must ensure the vehicle is in a serviceable condition upon arrival. Excessively dirty vehicles or those requiring special preparation before service may not qualify for the 90-minute guarantee.</li>
          </ol>

          <h2 className="text-xl font-bold">Liability</h2>
          
          <ol className="list-decimal pl-5" start={14}>
            <li>GaadiMech.com shall only be liable for losses suffered by a customer that are a direct result of our breach of these terms and conditions. We shall have no liability for any consequential losses, including but not limited to loss of income, travel expenses, or alternative transportation costs.</li>
            <li>All services carry a warranty against defects arising from faulty workmanship or parts for a period of 6 months or 10,000 kilometers, whichever occurs first, in accordance with the Consumer Protection Act.</li>
            <li>This warranty is void if the vehicle is serviced or repaired by another workshop after our service.</li>
            <li>In case of disputes regarding service quality or guarantee claims, GaadiMech.com may engage an independent third party (such as the Automotive Research Association of India or other recognized authority) to determine the validity of the claim.</li>
          </ol>

          <h2 className="text-xl font-bold">General Provisions</h2>
          
          <ol className="list-decimal pl-5" start={18}>
            <li>GaadiMech.com may exercise a lien on the vehicle until all outstanding charges are settled.</li>
            <li>These terms represent the entire agreement between GaadiMech.com and the customer regarding the Express 90 MINS Car Service and may only be varied by written agreement between the parties.</li>
            <li>GaadiMech.com reserves the right to amend these terms and conditions at any time. Current terms will always be available on our website.</li>
          </ol>

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

export default ExpressServiceTnC; 