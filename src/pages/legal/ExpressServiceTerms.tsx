import React from 'react';
import { Link } from 'react-router-dom';

const ExpressServiceTerms = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <Link 
              to="/express-rzp-atc-cart" 
              className="text-gray-600 hover:text-gray-800 mr-6 text-sm"
            >
              ← Back to Booking
            </Link>
            <h1 className="text-lg font-medium text-gray-900">Express Service Terms & Conditions</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              TERMS AND CONDITIONS FOR EXPRESS SERVICE BOOKING
            </h1>
            <p className="text-gray-700">
              GaadiMech Express Service Platform
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Last Updated: {new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Important Notice */}
          <div className="border border-gray-300 p-4 mb-6">
            <p className="font-bold text-gray-900 mb-2">IMPORTANT NOTICE</p>
            <p className="text-gray-700 text-sm">
              By proceeding with the Express Service booking and payment, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and Conditions in their entirety.
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-6">
            {/* Section 1: Definitions */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                1. DEFINITIONS AND INTERPRETATION
              </h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>"Company"</strong> means GaadiMech, a vehicle service platform operating under applicable Indian laws.</p>
                <p><strong>"Customer"</strong> means any individual or entity availing Express Service through the Platform.</p>
                <p><strong>"Express Service"</strong> means the premium automotive service package offered by the Company with priority booking and expedited service delivery.</p>
                <p><strong>"Booking Fee"</strong> means the advance payment made by the Customer to secure a priority time slot for Express Service.</p>
                <p><strong>"Platform"</strong> means the GaadiMech website, mobile application, and related digital interfaces.</p>
                <p><strong>"Service Provider"</strong> means authorized third-party workshops and technicians empaneled with the Company.</p>
              </div>
            </section>

            {/* Section 2: Booking Fee Policy */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                2. BOOKING FEE AND NON-REFUNDABILITY
              </h2>
              <div className="space-y-3">
                <div className="border border-gray-300 p-3">
                  <h4 className="font-bold text-gray-900 mb-2">NON-REFUNDABLE BOOKING FEE</h4>
                  <p className="text-gray-700 text-sm">
                    The Booking Fee paid for securing a priority Express Service slot is <strong>NON-REFUNDABLE</strong> 
                     under all circumstances, including but not limited to:
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Customer-initiated cancellation of the booked service</li>
                  <li>Customer failure to appear at the scheduled appointment time</li>
                  <li>Customer's change of mind regarding the service</li>
                  <li>Technical issues on the Customer's end preventing service delivery</li>
                  <li>Force majeure events beyond the Company's control</li>
                  <li>Vehicle-related issues discovered at the time of service that prevent completion</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Payment Adjustment:</strong> The Booking Fee shall be adjusted against the final service invoice. 
                  The Customer acknowledges that this fee secures priority slot allocation and compensates the Company 
                  for administrative costs and opportunity costs of slot reservation.
                </p>
              </div>
            </section>

            {/* Section 3: Slot Rescheduling */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                3. SLOT RESCHEDULING POLICY
              </h2>
              <div className="space-y-3">
                <div className="border border-gray-300 p-3">
                  <h4 className="font-bold text-gray-900 mb-2">COMPLIMENTARY RESCHEDULING</h4>
                  <p className="text-gray-700 text-sm">
                    Customers may reschedule their Express Service appointment without additional charges, 
                    subject to availability and the conditions specified herein.
                  </p>
                </div>
                <div className="text-gray-700 space-y-3">
                  <p><strong>Rescheduling Conditions:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Rescheduling requests must be made at least 2 (two) hours prior to the originally scheduled appointment time</li>
                    <li>Rescheduling is subject to availability of alternative slots within a 7-day period from the original booking date</li>
                    <li>Only one (1) rescheduling per booking is permitted without additional charges</li>
                    <li>Subsequent rescheduling requests may incur administrative charges at the Company's discretion</li>
                    <li>Last-minute rescheduling requests (less than 2 hours notice) may not be accommodated</li>
                  </ul>
                  <p><strong>Rescheduling Process:</strong> Customers must contact the Company through official customer support channels 
                  to initiate rescheduling. Rescheduling via third-party platforms or unauthorized channels shall not be recognized.</p>
                </div>
              </div>
            </section>

            {/* Section 4: Service Delivery and Liability Limitations */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                4. SERVICE DELIVERY AND LIABILITY LIMITATIONS
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="border border-gray-300 p-3">
                  <h4 className="font-bold text-gray-900 mb-2">LIABILITY DISCLAIMER</h4>
                  <p className="text-gray-700 text-sm">
                    The Company acts as an intermediary platform connecting Customers with authorized Service Providers. 
                    The Company's liability is strictly limited as outlined below.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4.1 Service Provider Responsibility</h4>
                  <p>The actual automotive services are performed by independent third-party Service Providers. 
                  The Company does not directly provide automotive repair or maintenance services and shall not be liable for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Quality of workmanship performed by Service Providers</li>
                    <li>Use of genuine or non-genuine parts by Service Providers</li>
                    <li>Damage to vehicle during service delivery</li>
                    <li>Delays in service completion beyond estimated timeframes</li>
                    <li>Post-service vehicle performance issues</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4.2 Maximum Liability Cap</h4>
                  <p>In no event shall the Company's total liability to the Customer exceed the amount of Booking Fee paid by the Customer. 
                  This limitation applies regardless of the form of action, whether in contract, tort, strict liability, or otherwise.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4.3 Consequential Damages Exclusion</h4>
                  <p>The Company expressly disclaims liability for any indirect, incidental, consequential, special, or punitive damages, 
                  including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Loss of use of vehicle</li>
                    <li>Loss of profits or business interruption</li>
                    <li>Cost of substitute transportation</li>
                    <li>Emotional distress or inconvenience</li>
                    <li>Damage to other property</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Customer Obligations */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                5. CUSTOMER OBLIGATIONS AND REPRESENTATIONS
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>By availing Express Service, the Customer represents and warrants that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>They are the legal owner of the vehicle or have proper authorization from the owner</li>
                  <li>All vehicle-related documentation (registration, insurance) is valid and current</li>
                  <li>The vehicle is in roadworthy condition and safe for transportation to the service location</li>
                  <li>All personal belongings have been removed from the vehicle prior to service</li>
                  <li>Any pre-existing vehicle damage has been disclosed to the Service Provider</li>
                  <li>They will be available for communication during the scheduled service window</li>
                  <li>Payment for the remaining service amount will be made as per agreed terms</li>
                </ul>
              </div>
            </section>

            {/* Section 6: Force Majeure */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                6. FORCE MAJEURE
              </h2>
              <div className="text-gray-700">
                <p>The Company shall not be liable for any failure or delay in performance under these Terms due to events beyond its reasonable control, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Acts of God, natural disasters, extreme weather conditions</li>
                  <li>Government regulations, orders, or restrictions</li>
                  <li>Labor strikes, lockouts, or other industrial actions</li>
                  <li>Technical failures, internet outages, or cyber attacks</li>
                  <li>Pandemics, epidemics, or public health emergencies</li>
                  <li>War, terrorism, civil unrest, or similar events</li>
                </ul>
              </div>
            </section>

            {/* Section 7: Data and Privacy */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                7. DATA PROTECTION AND PRIVACY
              </h2>
              <div className="text-gray-700">
                <p>Customer data collected during the booking process shall be processed in accordance with the Company's Privacy Policy. 
                By proceeding with the booking, the Customer consents to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Collection and processing of personal and vehicle information</li>
                  <li>Sharing of necessary information with Service Providers for service delivery</li>
                  <li>Communication via phone, SMS, email, and WhatsApp for service-related purposes</li>
                  <li>Use of information for service improvement and quality assurance</li>
                </ul>
              </div>
            </section>

            {/* Section 8: Dispute Resolution */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                8. DISPUTE RESOLUTION AND GOVERNING LAW
              </h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">8.1 Governing Law</h4>
                  <p>These Terms shall be governed by and construed in accordance with the laws of India, 
                  without regard to conflict of law principles.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">8.2 Jurisdiction</h4>
                  <p>Any disputes arising out of or in connection with these Terms shall be subject to the exclusive 
                  jurisdiction of the courts in Jaipur, Rajasthan, India.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">8.3 Mandatory Arbitration</h4>
                  <p>All disputes exceeding INR 50,000 in value shall be resolved through binding arbitration under the 
                  Arbitration and Conciliation Act, 2015, with arbitration proceedings to be conducted in Jaipur, Rajasthan.</p>
                </div>
              </div>
            </section>

            {/* Section 9: Modification and Severability */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                9. MODIFICATION AND SEVERABILITY
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Modification:</strong> The Company reserves the right to modify these Terms at any time without prior notice. 
                Continued use of the Platform after such modifications constitutes acceptance of the revised Terms.</p>
                <p><strong>Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, 
                such provision shall be struck and the remaining provisions shall remain in full force and effect.</p>
              </div>
            </section>

            {/* Section 10: Contact Information */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                10. CONTACT INFORMATION
              </h2>
              <div>
                <div className="border border-gray-300 p-3">
                  <p className="text-gray-700 mb-2">For any queries regarding these Terms or Express Service:</p>
                  <p className="text-gray-700 mb-1">Customer Support: +91-7300042410</p>
                  <p className="text-gray-700 mb-1">Email: support@gaadimech.com</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Business Hours: Monday to Saturday, 9:00 AM to 7:00 PM IST
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="border border-gray-300 p-3 mb-4">
              <p className="text-gray-700 text-center">
                By proceeding with your Express Service booking, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
            <p className="text-center text-sm text-gray-600">
              © {new Date().getFullYear()} GaadiMech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressServiceTerms; 