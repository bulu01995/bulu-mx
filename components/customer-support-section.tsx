"use client"

import { Mail, Headphones } from "lucide-react"
import Image from "next/image"

export default function CustomerSupportSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">Have a question?</h2>
              <h3 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">Here to help.</h3>

              {/* Blue accent line */}
              <div className="w-16 h-1 bg-blue-500 mb-8"></div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our friendly customer support team is your extended family. Speak your heart out. They listen with
                undivided attention to resolve your concerns. Give us a call, request a callback or drop us an email,
                we're here to help.
              </p>

              {/* Contact Options */}
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:border-blue-300 transition-colors">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">General Enquiries</p>
                    <p className="text-gray-800 font-medium">support@buluenterprises.com</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:border-blue-300 transition-colors">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Headphones className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Customer Sales Enquiries</p>
                    <p className="text-gray-800 font-medium">+91-9142647797</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <Image
                src="/images/customer-support-illustration.png"
                alt="Customer Support Team Illustration"
                width={400}
                height={300}
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
