"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function InsuranceBanner() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-2">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Link href="/life-insurance" className="block">
          <div className="relative bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-lg overflow-hidden shadow-sm h-16 md:h-20">
            {/* Left side text */}
            <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10">
              <h2 className="text-base md:text-xl font-bold text-gray-800 mb-1">{t("lookingFor")}</h2>
              <div className="relative inline-block">
                <span className="text-base md:text-xl font-bold text-gray-800">{t("lifeInsurance")}</span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-600 rounded-full transform rotate-1"></div>
              </div>
            </div>

            {/* Center illustration placeholder */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg md:text-xl">👋</span>
                </div>
              </div>
            </div>

            {/* Right side BULU bubble */}
            <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2">
              <div className="relative bg-black rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
                <span className="text-white text-base md:text-lg font-bold">BULU</span>
                {/* Speech bubble tail */}
                <div className="absolute left-3 bottom-0 transform translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black"></div>
              </div>
              {/* Cursor pointer */}
              <div className="absolute -top-1 -right-1 text-black text-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.64 21.97c-.16 0-.3-.07-.4-.2l-4-5.73c-.14-.2-.1-.47.1-.64.2-.14.47-.1.64.1l2.9 4.17 8.6-14.33c.15-.25.46-.32.7-.18.25.15.32.46.18.7l-9 15c-.1.17-.26.27-.44.29-.06.01-.12.02-.18.02z" />
                </svg>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 left-1/4 w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-60"></div>
            <div className="absolute bottom-2 right-1/4 w-2 h-2 bg-yellow-600 rounded-full opacity-40"></div>
            <div className="absolute top-3 right-1/3 w-1 h-1 bg-yellow-700 rounded-full"></div>
          </div>
        </Link>
      </div>
    </section>
  )
}
