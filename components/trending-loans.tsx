"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TrendingLoans() {
  const { t } = useLanguage()

  const loans = [
    {
      titleKey: "personalLoan" as const,
      descriptionKey: "personalLoanDesc" as const,
      rate: "10.49%",
      color: "red-500",
      bgColor: "bg-red-500",
      textColor: "text-red-500",
      borderColor: "border-red-500",
      image: "/images/personal-loan.svg",
      link: "/personal-loan",
    },
    {
      titleKey: "homeLoan" as const,
      descriptionKey: "homeLoanDesc" as const,
      rate: "8.35%",
      color: "indigo-500",
      bgColor: "bg-indigo-500",
      textColor: "text-indigo-500",
      borderColor: "border-indigo-500",
      image: "/images/home-loan.svg",
      link: "/home-loan",
    },
    {
      titleKey: "loanAgainstProperty" as const,
      descriptionKey: "propertyLoanDesc" as const,
      rate: "9.2%",
      color: "blue-500",
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
      borderColor: "border-blue-500",
      image: "/images/property-loan.svg",
      link: "/loan-against-property",
    },
    {
      titleKey: "businessLoan" as const,
      descriptionKey: "businessLoanDesc" as const,
      rate: "14%",
      color: "purple-500",
      bgColor: "bg-purple-500",
      textColor: "text-purple-500",
      borderColor: "border-purple-500",
      image: "/images/business-loan.svg",
      link: "/business-loan",
    },
  ]

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-extralight mb-4">{t("trendingLoans")}</h2>
        <p className="text-gray-600 mb-8 max-w-4xl font-thin leading-relaxed">{t("trendingDescription")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loans.map((loan, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative h-full">
              <div className={`${loan.textColor} font-thin text-xl mb-1`}>{t(loan.titleKey)}</div>
              <div className={`w-12 h-1 ${loan.bgColor} mb-4 rounded-full`}></div>
              <p className="text-gray-600 mb-4 font-thin">{t(loan.descriptionKey)}</p>

              <div className="flex items-end justify-between mb-4">
                <div className={`${loan.bgColor} text-white font-thin text-xl px-4 py-2 rounded-md`}>{loan.rate}</div>
                <div className="h-32 w-32 relative">
                  <Image
                    src={loan.image || "/placeholder.svg"}
                    alt={t(loan.titleKey)}
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>
              </div>

              <Link href={loan.link} className={`inline-flex items-center ${loan.textColor} font-thin hover:underline`}>
                {t("applyNow")} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
