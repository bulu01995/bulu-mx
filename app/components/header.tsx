"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const services = [
    "Loan",
    "Insurance",
    "Govt. Scheme",
    "Job",
    "Labour",
    "Shop",
    "Online Service",
    "Traveling",
    "Shopping",
    "All Service Insurance",
    "Download File",
  ]

  return (
    <header className="bg-[#1F4E79] text-white">
      {/* Top section with logo and navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and tagline */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">BULU ENTERPRISES</h1>
            <p className="text-sm md:text-base text-gray-200 mt-1">All Service Provider</p>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden absolute top-4 right-4 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation links */}
          <nav
            className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto mt-4 md:mt-0`}
          >
            <Link href="/" className="hover:text-[#00A8E8] transition-colors duration-200">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#00A8E8] transition-colors duration-200">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#00A8E8] transition-colors duration-200">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>

      {/* Services section */}
      <div className="container mx-auto px-4 py-6 border-t border-[#163E60]">
        <h2 className="text-xl font-semibold text-center mb-4">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {services.map((service, index) => (
            <button
              key={index}
              className="bg-[#1F4E79] hover:bg-[#163E60] text-white py-2 px-4 rounded-full border border-[#3A6EA5] transition-colors duration-200 text-sm md:text-base"
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Social icons section */}
      <div className="container mx-auto px-4 py-3 border-t border-[#163E60]">
        <div className="flex justify-end space-x-4">
          <a href="#" className="hover:text-[#00A8E8] transition-colors duration-200" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-[#00A8E8] transition-colors duration-200" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-[#00A8E8] transition-colors duration-200" aria-label="Instagram">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}
