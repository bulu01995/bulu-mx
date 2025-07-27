"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Circle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const slides = [
    {
      titleKey: "yourDream" as const,
      headingKey: "personalLoan" as const,
      subheadingKey: "quickApproval" as const,
      features: ["paperless" as const, "lowestRate" as const],
      image: "/images/img_personal-loan.svg",
      applyLink: "/personal-loan",
    },
    {
      titleKey: "yourDream" as const,
      headingKey: "homeLoan" as const,
      subheadingKey: "friendlierHomeLoans" as const,
      features: ["quickProcessing" as const, "comprehensiveCoverage" as const],
      image: "/images/img_home-loan.svg",
      applyLink: "/home-loan",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <section className="bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center max-w-5xl mx-auto">
          {/* Left content */}
          <div className="md:w-1/2 md:pr-4">
            <h2 className="text-gray-600 text-xl font-thin">{t(currentSlideData.titleKey)}</h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin leading-tight mt-2">
              {t(currentSlideData.headingKey)}
              <br />
              <span className="text-red-600 font-thin">{t(currentSlideData.subheadingKey)}</span>
            </h1>
            <div className="space-y-3 mt-4">
              {currentSlideData.features.map((featureKey, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Circle className="h-3 w-3 text-purple-400 fill-purple-100" />
                  <span className="text-gray-700 text-lg font-thin">{t(featureKey)}</span>
                </div>
              ))}
              <div className="mt-5">
                <Link
                  href={currentSlideData.applyLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-thin py-2.5 px-8 rounded-md transition-colors inline-block text-lg"
                >
                  {t("applyNow")}
                </Link>
              </div>
            </div>
          </div>

          {/* Right content - Updated Loan Image */}
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
            <div className="relative h-64 md:h-80 w-full flex justify-center items-center">
              <Image
                src={currentSlideData.image || "/placeholder.svg"}
                alt="Bulu Enterprises Services"
                width={400}
                height={400}
                className="object-contain max-h-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Pagination dots only (arrows removed) */}
        <div className="flex justify-center mt-4 mb-2">
          <div className="flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-gray-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3">
            <div className="text-center">
              <div className="text-lg font-thin">4 Lacs</div>
              <div className="text-gray-500 text-xs font-thin">{t("happyCustomers")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-thin">30,000 CR</div>
              <div className="text-gray-500 text-xs font-thin">{t("disbursedAnnually")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-thin">150</div>
              <div className="text-gray-500 text-xs font-thin">{t("citiesCovered")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-thin">300+</div>
              <div className="text-gray-500 text-xs font-thin">{t("branches")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background dots pattern */}
      <div className="absolute top-0 left-0 w-24 h-full opacity-10 pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>
    </section>
  )
}
