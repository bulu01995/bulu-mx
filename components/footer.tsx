import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Insurance Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Insurance</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/insurance" className="text-gray-300 hover:text-white transition-colors">
                  General Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance/term-insurance" className="text-gray-300 hover:text-white transition-colors">
                  Term Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance/health-insurance" className="text-gray-300 hover:text-white transition-colors">
                  Health Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance/car-insurance" className="text-gray-300 hover:text-white transition-colors">
                  Car Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance/bike-insurance" className="text-gray-300 hover:text-white transition-colors">
                  Bike Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance/family-health-insurance"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Family Health Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance/business-insurance" className="text-gray-300 hover:text-white transition-colors">
                  Business Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance/investment-plans" className="text-gray-300 hover:text-white transition-colors">
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance/guaranteed-return-plans"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Guaranteed Return Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calculators" className="text-gray-300 hover:text-white transition-colors">
                  All Calculators
                </Link>
              </li>
              <li>
                <Link href="/emi-calculator" className="text-gray-300 hover:text-white transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/loan-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/sip-calculator" className="text-gray-300 hover:text-white transition-colors">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link href="/fd-calculator" className="text-gray-300 hover:text-white transition-colors">
                  FD Calculator
                </Link>
              </li>
              <li>
                <Link href="/ppf-calculator" className="text-gray-300 hover:text-white transition-colors">
                  PPF Calculator
                </Link>
              </li>
              <li>
                <Link href="/income-tax-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Income Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/term-insurance-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Term Insurance Calculator
                </Link>
              </li>
              <li>
                <Link href="/health-insurance-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Health Insurance Calculator
                </Link>
              </li>
              <li>
                <Link href="/car-insurance-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Car Insurance Calculator
                </Link>
              </li>
              <li>
                <Link href="/bike-insurance-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Bike Insurance Calculator
                </Link>
              </li>
              <li>
                <Link href="/travel-insurance-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Travel Insurance Calculator
                </Link>
              </li>
              <li>
                <Link href="/human-life-value-calculator" className="text-gray-300 hover:text-white transition-colors">
                  HLV Calculator
                </Link>
              </li>
              <li>
                <Link href="/nps-calculator" className="text-gray-300 hover:text-white transition-colors">
                  NPS Calculator
                </Link>
              </li>
              <li>
                <Link href="/ulip-calculator" className="text-gray-300 hover:text-white transition-colors">
                  ULIP Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Loans & Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Loans & Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/personal-loan" className="text-gray-300 hover:text-white transition-colors">
                  Personal Loan
                </Link>
              </li>
              <li>
                <Link href="/home-loan" className="text-gray-300 hover:text-white transition-colors">
                  Home Loan
                </Link>
              </li>
              <li>
                <Link href="/business-loan" className="text-gray-300 hover:text-white transition-colors">
                  Business Loan
                </Link>
              </li>
              <li>
                <Link href="/education-loan" className="text-gray-300 hover:text-white transition-colors">
                  Education Loan
                </Link>
              </li>
              <li>
                <Link href="/car-loan" className="text-gray-300 hover:text-white transition-colors">
                  Car Loan
                </Link>
              </li>
              <li>
                <Link href="/loan-against-property" className="text-gray-300 hover:text-white transition-colors">
                  Loan Against Property
                </Link>
              </li>
              <li>
                <Link href="/gold-loan" className="text-gray-300 hover:text-white transition-colors">
                  Gold Loan
                </Link>
              </li>
              <li>
                <Link href="/credit-cards" className="text-gray-300 hover:text-white transition-colors">
                  Credit Cards
                </Link>
              </li>
              <li>
                <Link href="/credit-card-calculator" className="text-gray-300 hover:text-white transition-colors">
                  Credit Card Calculator
                </Link>
              </li>
              <li>
                <Link href="/labour" className="text-gray-300 hover:text-white transition-colors">
                  Labour Services
                </Link>
              </li>
              <li>
                <Link href="/expert-chat" className="text-gray-300 hover:text-white transition-colors">
                  Expert Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/shopping" className="text-gray-300 hover:text-white transition-colors">
                  Shopping
                </Link>
              </li>
              <li>
                <Link href="/travelling" className="text-gray-300 hover:text-white transition-colors">
                  Travelling
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Payment Methods */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 text-xs font-bold">AMERICAN EXPRESS</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 text-xs font-bold">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-500 text-xs font-bold">PayTM</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-orange-500 text-xs font-bold">RuPay</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 text-xs font-bold">Net Banking</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-red-600 text-xs font-bold">MasterCard</span>
                </div>
              </div>
            </div>

            {/* Secured With */}
            <div className="text-center">
              <h4 className="text-sm font-semibold mb-3">Secured With</h4>
              <div className="bg-green-600 rounded px-3 py-2 inline-block">
                <span className="text-white text-xs font-bold">SSL SECURED</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-right">
              <h4 className="text-sm font-semibold mb-3">Follow us on</h4>
              <div className="flex justify-end gap-3">
                <a href="#" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-black p-2 rounded hover:bg-gray-800 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="bg-blue-700 p-2 rounded hover:bg-blue-800 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="bg-red-600 p-2 rounded hover:bg-red-700 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Bulu Enterprises. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Your trusted partner for loans, insurance, and financial services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
