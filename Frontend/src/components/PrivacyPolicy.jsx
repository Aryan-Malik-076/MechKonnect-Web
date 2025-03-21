import React from "react";
import NavBar from "./navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <NavBar />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Last Updated: March 21, 2025
          </p>
        </header>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            At Mechkonnect, we value and respect your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services. By using Mechkonnect, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Information We Collect
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Personal Information</h3>
                <p className="text-gray-300 mt-1">Name, email address, phone number, and billing information when you register for our services or make a purchase.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Transaction Data</h3>
                <p className="text-gray-300 mt-1">Information about purchases, subscriptions, refunds, and payment methods used on our platform.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Usage Information</h3>
                <p className="text-gray-300 mt-1">Data about how you interact with Mechkonnect services, including IP address, device information, browser type, pages visited, and time spent on the platform.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Communication Data</h3>
                <p className="text-gray-300 mt-1">Messages, comments, feedback, and other information you provide when communicating with us or other users through our platform.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            How We Use Your Information
          </h2>
          <p className="text-gray-300 mb-4">We use your information for the following purposes:</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Process and fulfill your transactions and service requests</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Provide and maintain our services, including troubleshooting technical issues</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Send you service announcements, updates, and promotional communications</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Personalize your experience and recommend content or features</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Improve our services through analysis of usage patterns and feedback</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Detect, prevent, and address fraud, security breaches, or other prohibited activities</span>
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Data Sharing and Disclosure
          </h2>
          <p className="text-gray-300 mb-4">We do not sell your personal information to third parties. We may share your information in the following situations:</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>With service providers who help us deliver our services</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>To comply with legal obligations or enforce our terms of service</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>In connection with a merger, acquisition, or sale of business assets</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>With your explicit consent</span>
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Security Measures
          </h2>
          <p className="text-gray-300 mb-4">We implement robust security measures to protect your personal information, including:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-gray-200">Data encryption in transit and at rest</span>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-gray-200">Regular security audits and assessments</span>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="text-gray-200">Secure authentication protocols</span>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="text-gray-200">Access controls and staff training</span>
            </div>
          </div>
          <p className="text-gray-300 mt-4">While we strive to protect your personal information, no method of data transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to enhance our protective measures.</p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Your Privacy Rights
          </h2>
          <p className="text-gray-300 mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="font-medium text-blue-200">Access and Portability</h3>
              <p className="text-gray-300 text-sm mt-1">You can request a copy of your personal information and transfer it to another service.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="font-medium text-blue-200">Correction</h3>
              <p className="text-gray-300 text-sm mt-1">You can request that we correct inaccurate or incomplete information.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="font-medium text-blue-200">Deletion</h3>
              <p className="text-gray-300 text-sm mt-1">You can request that we delete your personal information in certain circumstances.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="font-medium text-blue-200">Objection and Restriction</h3>
              <p className="text-gray-300 text-sm mt-1">You can object to our processing of your information or ask us to restrict processing.</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">To exercise these rights, please contact us at privacy@mechkonnect.com. We will respond to your request within 30 days.</p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-300 mb-4">We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us remember your preferences, understand how you use our services, and deliver relevant content and advertisements.</p>
          <p className="text-gray-300">You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may impact the functionality of our services.</p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-300">We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and, where appropriate, sending you a notification. We encourage you to review this policy periodically.</p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Contact Us
          </h2>
          <p className="text-gray-300 mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-blue-200 font-medium">Mechkonnect Support Team</p>
            <p className="text-gray-300">Email: privacy@mechkonnect.com</p>
            <p className="text-gray-300">Phone: (555) 123-4567</p>
            <p className="text-gray-300">Pakistan Aeronautical Complex (PAC) Kamra</p>
          </div>
        </section>

        <div className="text-center text-gray-400 text-sm mt-12">
          <p>© 2025 Mechkonnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;