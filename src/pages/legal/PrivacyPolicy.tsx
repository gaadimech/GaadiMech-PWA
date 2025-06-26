import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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
          <Shield className="w-16 h-16 text-[#FF7200] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last Updated: February 1, 2025</p>
          <p className="text-sm text-gray-500 mt-1">Effective Date: February 1, 2025</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction and Controller Information</h2>
            <p className="mb-4">
              Mechvision Innovations Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at 21, Purani Chungi, Ashok Nagar, Jaipur, Rajasthan 302001, India, operating under the trademark "GaadiMech" ("Company," "we," "us," or "our"), is committed to protecting your privacy and personal data. This Privacy Policy ("Policy") governs the collection, use, processing, storage, and disclosure of your personal information when you use our website www.gaadimech.com, mobile applications, or any related services (collectively, the "Platform").
            </p>
            <p>
              <strong>Data Controller:</strong> Mechvision Innovations Private Limited<br/>
              <strong>Registered Office:</strong> 21, Purani Chungi, Ashok Nagar, Jaipur, Rajasthan 302001, India<br/>
              
              <strong>Contact Information:</strong> contact@gaadimech.com | +91-8448285289
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Scope and Applicability</h2>
            <p>
              This Policy applies to all personal data processed by GaadiMech through any means, including but not limited to our Platform, customer service interactions, marketing communications, and business operations. By accessing or using our Platform or services, you acknowledge that you have read, understood, and agree to be bound by this Policy and consent to our collection, use, and disclosure of your personal information as described herein.
            </p>
            <p>
              <strong>Important:</strong> If you do not agree with any part of this Policy, please discontinue use of our Platform and services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Legal Basis for Processing</h2>
            <p>We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contractual Necessity:</strong> To fulfill our contractual obligations, provide services, process bookings, and complete transactions</li>
              <li><strong>Legitimate Interests:</strong> To operate our business, improve services, prevent fraud, ensure security, and conduct analytics</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, court orders, and legal processes</li>
              <li><strong>Consent:</strong> For marketing communications, cookies (where required), and specific data processing activities requiring explicit consent</li>
              <li><strong>Vital Interests:</strong> To protect the vital interests of individuals in emergency situations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Categories of Personal Data Collected</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">4.1 Identity and Contact Information</h3>
                <ul className="list-disc pl-6">
                  <li>Full name, email address, phone number, residential address</li>
                  <li>Government-issued identification documents (as required by law)</li>
                  <li>Emergency contact information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">4.2 Vehicle and Service Information</h3>
                <ul className="list-disc pl-6">
                  <li>Vehicle details (make, model, year, registration number, VIN)</li>
                  <li>Service history, maintenance records, and vehicle condition</li>
                  <li>Service preferences and special requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4.3 Financial and Payment Information</h3>
                <ul className="list-disc pl-6">
                  <li>Payment card details (processed securely through payment gateways)</li>
                  <li>Billing address and invoice information</li>
                  <li>Transaction history and payment records</li>
                  <li>Banking details (for refunds and direct payments)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4.4 Technical and Usage Data</h3>
                <ul className="list-disc pl-6">
                  <li>IP address, device identifiers, browser type and version</li>
                  <li>Operating system, screen resolution, time zone settings</li>
                  <li>Usage patterns, page views, click-through rates</li>
                  <li>Location data (with your permission)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4.5 Communication and Interaction Data</h3>
                <ul className="list-disc pl-6">
                  <li>Customer service communications and call recordings</li>
                  <li>Reviews, ratings, feedback, and testimonials</li>
                  <li>Social media interactions and content</li>
                  <li>Survey responses and marketing preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4.6 Sensitive Personal Data</h3>
                <p>We may collect certain sensitive personal data only when necessary and with your explicit consent, including:</p>
                <ul className="list-disc pl-6">
                  <li>Insurance information and claims data</li>
                  <li>Financial information for credit assessments</li>
                  <li>Biometric data for security purposes (where applicable)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sources of Data Collection</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Direct Collection:</strong> Information you provide directly through registration, service requests, communications, and transactions</li>
              <li><strong>Automatic Collection:</strong> Data collected automatically through your use of our Platform via cookies, analytics tools, and technical systems</li>
              <li><strong>Third-Party Sources:</strong> Information from payment processors, service partners, social media platforms, and public databases</li>
              <li><strong>Referrals:</strong> Information provided by other users who refer you to our services</li>
              <li><strong>Public Sources:</strong> Publicly available information from government databases and other legitimate sources</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Purposes of Data Processing</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold mb-2">6.1 Service Provision and Operations</h3>
                <ul className="list-disc pl-6">
                  <li>Creating and managing user accounts</li>
                  <li>Processing service bookings and appointments</li>
                  <li>Coordinating with service partners and providers</li>
                  <li>Managing vehicle pickup and delivery logistics</li>
                  <li>Processing payments and managing billing</li>
                  <li>Providing customer support and technical assistance</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">6.2 Business Operations and Improvement</h3>
                <ul className="list-disc pl-6">
                  <li>Analyzing usage patterns and service performance</li>
                  <li>Developing and improving our services and Platform</li>
                  <li>Conducting market research and customer satisfaction surveys</li>
                  <li>Managing inventory and service capacity</li>
                  <li>Training staff and quality assurance</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">6.3 Legal and Security</h3>
                <ul className="list-disc pl-6">
                  <li>Complying with legal obligations and regulatory requirements</li>
                  <li>Preventing fraud, abuse, and unauthorized access</li>
                  <li>Protecting the security and integrity of our Platform</li>
                  <li>Resolving disputes and legal proceedings</li>
                  <li>Enforcing our terms and conditions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">6.4 Marketing and Communications</h3>
                <ul className="list-disc pl-6">
                  <li>Sending service updates and notifications</li>
                  <li>Marketing our services and promotional offers (with consent)</li>
                  <li>Personalizing content and recommendations</li>
                  <li>Managing loyalty programs and rewards</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p><strong>We may share your personal data with the following categories of recipients:</strong></p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">7.1 Service Partners and Providers</h3>
                <ul className="list-disc pl-6">
                  <li>Authorized mechanics and service technicians</li>
                  <li>Parts suppliers and vendors</li>
                  <li>Logistics and transportation providers</li>
                  <li>Insurance companies and assessors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">7.2 Technology and Business Service Providers</h3>
                <ul className="list-disc pl-6">
                  <li>Payment processors (Razorpay, Paytm, etc.)</li>
                  <li>Cloud hosting and data storage providers</li>
                  <li>Analytics and marketing platforms</li>
                  <li>Customer support and communication tools</li>
                  <li>Security and fraud prevention services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">7.3 Legal and Regulatory Authorities</h3>
                <ul className="list-disc pl-6">
                  <li>Government agencies and regulatory bodies</li>
                  <li>Law enforcement agencies (when legally required)</li>
                  <li>Courts and legal professionals</li>
                  <li>Tax authorities and auditors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">7.4 Corporate Transactions</h3>
                <p>In the event of a merger, acquisition, reorganization, or sale of assets, your personal data may be transferred to the acquiring entity, subject to appropriate safeguards.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p><strong>Important:</strong> We do not sell, rent, or lease your personal data to third parties for their marketing purposes without your explicit consent.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p>
              Your personal data may be transferred to and processed in countries outside India, including countries that may not have the same level of data protection laws. When we transfer your data internationally, we implement appropriate safeguards, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Standard Contractual Clauses approved by relevant authorities</li>
              <li>Adequacy decisions by competent authorities</li>
              <li>Certification schemes and codes of conduct</li>
              <li>Additional security measures and encryption</li>
            </ul>
            <p className="mt-3">
              You have the right to obtain information about these safeguards by contacting us at contact@gaadimech.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
            <div className="space-y-3">
              <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law.</p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Retention Periods:</h3>
                <ul className="list-disc pl-6">
                  <li><strong>Account Information:</strong> Until account deletion + 7 years for legal compliance</li>
                  <li><strong>Transaction Records:</strong> 7 years for tax and accounting purposes</li>
                  <li><strong>Service Records:</strong> 5 years for warranty and service history</li>
                  <li><strong>Marketing Data:</strong> Until consent withdrawal + 2 years</li>
                  <li><strong>Technical Logs:</strong> 12 months unless required for security investigations</li>
                  <li><strong>Legal Documents:</strong> As required by applicable law (typically 7-10 years)</li>
                </ul>
              </div>

              <p>
                After the retention period expires, we will securely delete or anonymize your personal data. Some information may be retained in anonymized or aggregated form for statistical and analytical purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Your Rights and Choices</h2>
            <div className="space-y-4">
              <p>You have the following rights regarding your personal data:</p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">10.1 Access and Portability</h3>
                <ul className="list-disc pl-6">
                  <li>Right to access your personal data and obtain a copy</li>
                  <li>Right to data portability in a structured, machine-readable format</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">10.2 Correction and Deletion</h3>
                <ul className="list-disc pl-6">
                  <li>Right to correct inaccurate or incomplete personal data</li>
                  <li>Right to erasure ("right to be forgotten") subject to legal limitations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">10.3 Processing Controls</h3>
                <ul className="list-disc pl-6">
                  <li>Right to restrict or object to processing of your personal data</li>
                  <li>Right to withdraw consent (where processing is based on consent)</li>
                  <li>Right to opt-out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">10.4 Complaint and Recourse</h3>
                <ul className="list-disc pl-6">
                  <li>Right to lodge a complaint with the relevant data protection authority</li>
                  <li>Right to seek judicial remedy for data protection violations</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p><strong>To exercise your rights:</strong> Contact us at contact@gaadimech.com or use the privacy controls in your account settings. We will respond to your request within 30 days.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cookies and Tracking Technologies</h2>
            <div className="space-y-3">
              <p>We use cookies and similar tracking technologies to enhance your experience on our Platform. These technologies help us:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Ensure security and prevent fraud</li>
                <li>Improve our services and user experience</li>
              </ul>

              <div>
                <h3 className="text-lg font-semibold mb-2 mt-4">Types of Cookies:</h3>
                <ul className="list-disc pl-6">
                  <li><strong>Essential Cookies:</strong> Required for basic Platform functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us analyze and improve Platform performance</li>
                  <li><strong>Functional Cookies:</strong> Enable enhanced features and personalization</li>
                  <li><strong>Marketing Cookies:</strong> Used for targeted advertising and marketing</li>
                </ul>
              </div>

              <p>
                You can manage your cookie preferences through your browser settings or our cookie management tool. Note that disabling certain cookies may affect Platform functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Security Measures</h2>
            <div className="space-y-3">
              <p>We implement comprehensive technical, organizational, and physical security measures to protect your personal data:</p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Technical Safeguards:</h3>
                <ul className="list-disc pl-6">
                  <li>AES-256 encryption for sensitive data at rest and in transit</li>
                  <li>Secure Socket Layer (SSL) certificates for data transmission</li>
                  <li>Multi-factor authentication and access controls</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Automated monitoring and intrusion detection systems</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Organizational Measures:</h3>
                <ul className="list-disc pl-6">
                  <li>Employee training on data protection and security</li>
                  <li>Strict access controls and need-to-know basis</li>
                  <li>Incident response and breach notification procedures</li>
                  <li>Regular review and update of security policies</li>
                  <li>Vendor security assessments and contractual obligations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Physical Security:</h3>
                <ul className="list-disc pl-6">
                  <li>Secure data centers with controlled access</li>
                  <li>Environmental controls and backup systems</li>
                  <li>Secure disposal of physical documents and devices</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p><strong>Data Breach Notification:</strong> In the event of a data breach that poses a risk to your rights and freedoms, we will notify relevant authorities within 72 hours and affected individuals without undue delay.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18 years. We do not knowingly collect personal data from children under 18. If we become aware that we have collected personal data from a child under 18 without proper parental consent, we will take immediate steps to delete such information. Parents or guardians who believe their child has provided personal data to us should contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Third-Party Services and Links</h2>
            <p>
              Our Platform may contain links to third-party websites, applications, or services that are not operated by us. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services you access through our Platform.
            </p>
            <p className="mt-3">
              When you interact with third-party services integrated into our Platform (such as payment processors or social media platforms), your data may be shared with these services according to their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Marketing and Communications</h2>
            <div className="space-y-3">
              <p>With your consent, we may send you marketing communications about our services, offers, and updates. You can:</p>
              <ul className="list-disc pl-6">
                <li>Opt-out of marketing emails by clicking the unsubscribe link</li>
                <li>Adjust your communication preferences in your account settings</li>
                <li>Contact us directly to update your preferences</li>
                <li>Opt-out of SMS marketing by replying "STOP" to any message</li>
              </ul>
              <p>
                Please note that you cannot opt-out of essential service communications related to your account or transactions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Automated Decision-Making and Profiling</h2>
            <p>
              We may use automated decision-making processes, including profiling, to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Assess service eligibility and pricing</li>
              <li>Detect and prevent fraud</li>
              <li>Personalize content and recommendations</li>
              <li>Improve service efficiency and quality</li>
            </ul>
            <p className="mt-3">
              You have the right to object to automated decision-making that significantly affects you and to request human intervention in the decision-making process. Contact us for more information about our automated processes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Compliance with Applicable Laws</h2>
            <p>
              This Privacy Policy is designed to comply with applicable data protection laws, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Information Technology Act, 2000 and Rules (India)</li>
              <li>The Personal Data Protection Bill (India)</li>
              <li>General Data Protection Regulation (GDPR) (European Union)</li>
              <li>California Consumer Privacy Act (CCPA) (United States)</li>
              <li>Other applicable regional and international privacy laws</li>
            </ul>
            <p className="mt-3">
              In case of conflicts between this Policy and applicable laws, the requirements of applicable laws shall prevail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Updates to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes through:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email notifications to registered users</li>
              <li>Prominent notices on our Platform</li>
              <li>In-app notifications</li>
              <li>Other appropriate communication channels</li>
            </ul>
            <p className="mt-3">
              We will provide at least 30 days' notice before material changes take effect. Your continued use of our services after the effective date constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Contact Information and Complaints</h2>
            <div className="space-y-3">
              <p>For privacy-related inquiries, requests, or complaints, please contact us:</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
              
                
                <p><strong>General Contact:</strong> <a href="mailto:contact@gaadimech.com" className="text-[#FF7200] hover:text-[#e65a00]">contact@gaadimech.com</a></p>
                <p><strong>Phone:</strong> +91-8448285289</p>
                <p><strong>Address:</strong> 21, Purani Chungi, Ashok Nagar, Jaipur, Rajasthan 302001, India</p>
                <p><strong>Business Hours:</strong> Monday to Sunday, 10:00 AM to 7:00 PM IST</p>
              </div>

              <p>
                We will acknowledge receipt of your inquiry within 5 business days and provide a substantive response within 30 days. For urgent matters, please call our helpline directly.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-2">Supervisory Authority Contact:</h3>
                <p>
                  If you are not satisfied with our response to your privacy concerns, you may lodge a complaint with the relevant data protection authority in your jurisdiction. In India, you may contact the Ministry of Electronics and Information Technology or the appropriate sector regulator.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Definitions</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person.</p>
              <p><strong>Processing:</strong> Any operation performed on personal data, including collection, use, storage, and disclosure.</p>
              <p><strong>Data Controller:</strong> The entity that determines the purposes and means of processing personal data.</p>
              <p><strong>Data Processor:</strong> The entity that processes personal data on behalf of the data controller.</p>
              <p><strong>Sensitive Personal Data:</strong> Personal data requiring special protection due to its sensitive nature.</p>
              <p><strong>Data Subject:</strong> The individual to whom personal data relates.</p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-[#FF7200] bg-opacity-10 rounded-lg border border-[#FF7200] border-opacity-30">
            <h3 className="text-lg font-semibold text-[#FF7200] mb-3">Important Notice</h3>
            <p className="text-sm text-gray-700">
              This Privacy Policy forms an integral part of our Terms and Conditions. By using our services, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you have any questions or concerns about your privacy or this Policy, please do not hesitate to contact us.
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2025 Mechvision Innovations Private Limited. All rights reserved.</p>
            <p>GaadiMech is a registered trademark of Mechvision Innovations Private Limited.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;