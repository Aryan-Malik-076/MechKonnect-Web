import React from "react";
import NavBar from "./navbar";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <NavBar />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Return Policy</h1>
          <p className="text-xl text-gray-300">
            Last Updated: March 21, 2025
          </p>
        </header>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Overview
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            At Mechkonnect, we stand behind the quality of our products and services. We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a straightforward return process to ensure your peace of mind.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Return Period
          </h2>
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-medium text-gray-200 mb-2">30-Day Return Window</p>
              <p className="text-gray-300">
                We accept returns within 30 days from the date of delivery or purchase. Items returned after this period may not be eligible for a refund or exchange.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Conditions for Returns
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Product Condition</h3>
                <p className="text-gray-300 mt-1">Items must be unused, unworn, and in their original condition with all tags attached and packaging intact.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Proof of Purchase</h3>
                <p className="text-gray-300 mt-1">A valid receipt or order confirmation is required for all returns. This helps us verify your purchase and process your return efficiently.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Return Shipping</h3>
                <p className="text-gray-300 mt-1">Customers are responsible for return shipping costs unless the item is defective or we made an error. We recommend using a trackable shipping method.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-200">Original Packaging</h3>
                <p className="text-gray-300 mt-1">Items should be returned in their original packaging whenever possible, including boxes, manuals, warranty cards, and accessories.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Refund Process
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-blue-600 p-4 flex items-center justify-center md:w-1/4">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <div className="p-4 md:w-3/4">
                <h3 className="text-xl font-medium text-blue-200 mb-2">Inspection</h3>
                <p className="text-gray-300">Once we receive your return, our team will inspect the item to ensure it meets our return conditions.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-blue-600 p-4 flex items-center justify-center md:w-1/4">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <div className="p-4 md:w-3/4">
                <h3 className="text-xl font-medium text-blue-200 mb-2">Approval</h3>
                <p className="text-gray-300">If your return is approved, we'll notify you via email and process your refund or exchange.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-blue-600 p-4 flex items-center justify-center md:w-1/4">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <div className="p-4 md:w-3/4">
                <h3 className="text-xl font-medium text-blue-200 mb-2">Refund Processing</h3>
                <p className="text-gray-300">Refunds will be issued to your original payment method within 7 business days of approval. Please allow additional time for the funds to appear in your account, depending on your financial institution.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Non-Returnable Items
          </h2>
          <p className="text-gray-300 mb-4">The following items cannot be returned:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center bg-gray-700 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Custom or personalized products</span>
            </li>
            <li className="flex items-center bg-gray-700 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Digital downloads or software</span>
            </li>
            <li className="flex items-center bg-gray-700 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Items with broken seals or damaged packaging</span>
            </li>
            <li className="flex items-center bg-gray-700 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Sale items marked as final sale</span>
            </li>
            <li className="flex items-center bg-gray-700 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Gift cards</span>
            </li>
            <li className="flex items-center bg-gray-700 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Safety equipment that has been used</span>
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Exchanges
          </h2>
          <p className="text-gray-300 mb-4">
            If you'd like to exchange an item for a different size, color, or product, please follow these steps:
          </p>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white text-sm font-medium">1</span>
              </span>
              <p className="text-gray-300">Contact our customer service team at returns@mechkonnect.com or (555) 123-4567 to initiate your exchange request.</p>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white text-sm font-medium">2</span>
              </span>
              <p className="text-gray-300">Return your original item following our standard return process.</p>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white text-sm font-medium">3</span>
              </span>
              <p className="text-gray-300">Once we receive your return, we'll process your exchange and ship the new item to you.</p>
            </li>
          </ol>
          <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg mt-6">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-200">
                <span className="font-medium">Note:</span> Additional shipping charges may apply for exchanges. If the exchanged item has a different price, you'll be charged or refunded the difference.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Warranty Returns
          </h2>
          <p className="text-gray-300 mb-4">
            For products covered under manufacturer warranties, please refer to the specific warranty information included with your product. In many cases, warranty claims are handled directly by the manufacturer rather than Mechkonnect.
          </p>
          <p className="text-gray-300">
            If you believe your item is defective and covered under warranty, please contact our customer service team for assistance with the warranty claim process.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            How to Initiate a Return
          </h2>
          <div className="bg-gray-700 p-6 rounded-lg">
            <ol className="space-y-4">
              <li className="flex">
                <span className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </span>
                <div>
                  <h3 className="text-xl font-medium text-blue-200 mb-1">Contact Us</h3>
                  <p className="text-gray-300">Email returns@mechkonnect.com or call (555) 123-4567 to request a Return Authorization (RA) number.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </span>
                <div>
                  <h3 className="text-xl font-medium text-blue-200 mb-1">Package Your Return</h3>
                  <p className="text-gray-300">Securely package the item in its original packaging if possible. Include your RA number and proof of purchase.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </span>
                <div>
                  <h3 className="text-xl font-medium text-blue-200 mb-1">Ship Your Return</h3>
                  <p className="text-gray-300">Send your return to the address provided by our customer service team. We recommend using a trackable shipping method.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </span>
                <div>
                  <h3 className="text-xl font-medium text-blue-200 mb-1">Wait for Processing</h3>
                  <p className="text-gray-300">Once we receive your return, please allow 3-5 business days for inspection and processing.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
            Contact Information
          </h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about our return policy, please contact our customer service team:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-gray-200">returns@mechkonnect.com</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-gray-200">(555) 123-4567</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Hours</p>
                <p className="text-gray-200">Mon-Fri: 8am-6pm EST</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Return Address</p>
                <p className="text-gray-200">Mechkonnect Returns</p>
                <p className="text-gray-200">123 Tech Blvd, Suite 456</p>
                <p className="text-gray-200">Attock, AT 94107</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-gray-400 text-sm mt-12">
          <p>© 2025 Mechkonnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;