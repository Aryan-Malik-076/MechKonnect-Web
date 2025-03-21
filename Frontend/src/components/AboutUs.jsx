import React from "react";
import Navbar from "./navbar";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-6"
            >
              About MechKonnect
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Revolutionizing the automotive service industry through cutting-edge technology and trusted connections
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8"
            >
              <a href="#story" className="inline-block bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
                Our Journey
              </a>
            </motion.div>
          </div>
        </div>

        {/* Our Story */}
        <div id="story" className="py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 text-center text-gray-800"
            >
              Our Story
            </motion.h2>
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  MechKonnect was founded in 2024 by automotive enthusiast and tech entrepreneur Aryan Haider,Uzair Safdar and Abdul Rehman following a frustrating experience that many vehicle owners can relate to — being stranded on a highway with a broken-down car and no reliable way to find immediate help.
                </p>
                <p className="text-lg leading-relaxed">
                  After spending hours trying to find a trustworthy mechanic during that emergency breakdown, Alex realized there was a significant gap in the market: no streamlined way to connect vehicle owners with verified, skilled mechanics, especially in urgent situations.
                </p>
                <p className="text-lg leading-relaxed">
                  With a background in software development and a passion for solving real-world problems, Alex assembled a team of automotive industry experts and tech innovators. Together, they developed the first version of the MechKonnect platform — a mobile app that could quickly match vehicle owners with nearby certified mechanics based on the specific issue, vehicle type, and service requirements.
                </p>
                <p className="text-lg leading-relaxed">
                  What began as a simple matching service has evolved into a comprehensive ecosystem that now includes emergency roadside assistance, scheduled maintenance services, parts procurement, and a knowledge base for DIY repairs. Our platform has helped over 50,000 vehicle owners find reliable service and has partnered with more than 3,000 certified mechanics and 500 automotive workshops nationwide.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, MechKonnect stands at the intersection of traditional automotive service and cutting-edge technology. We're committed to continually improving our platform, expanding our network, and ensuring that quality automotive care is accessible to everyone, anytime they need it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center text-gray-800"
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Trust & Transparency</h3>
                <p className="text-gray-600 text-lg">
                  We rigorously verify all our partners and promote clear, honest communication between mechanics and customers at every step of the service journey.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Efficiency & Speed</h3>
                <p className="text-gray-600 text-lg">
                  Quick response times and efficient service delivery are at the core of our platform, ensuring you're never stranded for long when you need help.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Community</h3>
                <p className="text-gray-600 text-lg">
                  We're building more than a service — we're creating a community of trusted professionals and satisfied customers that's transforming automotive care.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-20 container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-gray-800"
          >
            Our Leadership Team
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Malik Aryan Haider", position: "Founder & CEO", bio: "Automotive enthusiast and tech entrepreneur with a vision to transform vehicle service." },
              { name: "Uzair Safdar", position: "CTO", bio: "Former automotive software engineer bringing 15+ years of technical expertise to our platform." },
              { name: "Abdul Rehman", position: "COO", bio: "Operations expert with extensive experience in scaling service businesses nationwide." },
            ].map((member, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-56 bg-blue-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-xl">{member.name}</h3>
                      <p className="text-blue-100">{member.position}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href="#" className="text-blue-500 hover:text-blue-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Join Us CTA */}
        <div className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Join the MechKonnect Revolution
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto mb-8"
            >
              Whether you're a vehicle owner in need of reliable service or a skilled mechanic looking to expand your client base, MechKonnect is building the future of automotive care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a href="#" className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300">
                Find a Mechanic
              </a>
              <a href="#" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-all duration-300">
                Join as a Partner
              </a>
            </motion.div>
          </div>
        </div>
        
        
      </div>
    </>
  );
};

export default AboutUs;