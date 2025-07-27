"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Shield, Percent, CreditCard, Plane, ShoppingBag, Star, ArrowRight, Info } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface CreditCardOffer {
  id: string
  name: string
  bank: string
  image: string
  annualFee: string
  joiningFee: string
  approvalTag?: string
  benefits: Array<{
    icon: any
    title: string
    description: string
  }>
  keyFeatures: string[]
  applyLink: string
}

export default function CreditCardsSection() {
  const { t } = useLanguage()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const creditCards: CreditCardOffer[] = [
    {
      id: "icici-platinum",
      name: "ICICI PLATINUM Credit Card",
      bank: "ICICI Bank",
      image: "/images/icici-platinum-card.webp",
      annualFee: "No Joining or Annual Fee",
      joiningFee: "₹0",
      approvalTag: "100% Paperless Approval",
      benefits: [
        {
          icon: Gift,
          title: "Enjoy a pre-flight experience with",
          description:
            "complimentary access to airport lounges and a 1% fuel surcharge waiver on eligible transactions at HPCL outlets.",
        },
        {
          icon: Percent,
          title: "Exclusive discounts and offers at",
          description:
            "partnered restaurants. The card also rewards you with 2 ICICI reward points for every Rs. 100 spent, except on fuel purchases.",
        },
        {
          icon: CreditCard,
          title: "Cashback on your accumulated points,",
          description: "converting them into valuable cash.",
        },
      ],
      keyFeatures: [
        "Mix of discounts, deals, and perks",
        "Experience the next level of luxury",
        "Safety and flexibility",
      ],
      applyLink: "/apply/icici-platinum",
    },
    {
      id: "idfc-millenia",
      name: "IDFC First Millenia Credit Card",
      bank: "IDFC First Bank",
      image: "/images/idfc-millennia-cards.png",
      annualFee: "No Annual or Joining Fee",
      joiningFee: "₹0",
      approvalTag: "100% Paperless Approval",
      benefits: [
        {
          icon: Gift,
          title: "Grab welcome gift vouchers worth more",
          description:
            "than INR 500 for purchases above INR 15,000 within the first three months of IDFC First Millenia Credit card.",
        },
        {
          icon: Percent,
          title: "Includes an array of benefits such as a",
          description:
            "25% discount on movie tickets, railway lounge visits, roadside assistance, fuel surcharge waiver, and much more.",
        },
        {
          icon: Plane,
          title: "Enjoy the provision of lifetime free usage",
          description: "and low interest rates.",
        },
      ],
      keyFeatures: [
        "Innovative Credit Card for young professionals",
        "Attractive and chic design",
        "Array of lucrative benefits",
      ],
      applyLink: "/apply/idfc-millenia",
    },
    {
      id: "standard-chartered",
      name: "Standard Chartered Platinum Rewards Credit Card",
      bank: "Standard Chartered",
      image: "/images/standard-chartered-card.png",
      annualFee: "Minimum of NR 250 Annual fees",
      joiningFee: "₹250",
      approvalTag: "100% Paperless Approval",
      benefits: [
        {
          icon: Gift,
          title: "The variant comes with the provision of",
          description:
            "additional lifetime credit cards. So gift your family members the perks of supplementary credit cards with lifetime free access today!",
        },
        {
          icon: Shield,
          title: "Enjoy the satisfaction of secure",
          description:
            "payments with the Platinum Rewards Credit Cards, wherein transactions are contactless and guarded.",
        },
        {
          icon: Percent,
          title: "No processing fee on outstanding",
          description: "payment conversion into EMIs.",
        },
      ],
      keyFeatures: [
        "Attractive rewards on every payment",
        "Access various avenues including dining, shopping, and more",
        "Accumulate reward points",
      ],
      applyLink: "/apply/standard-chartered",
    },
    {
      id: "yes-bank",
      name: "YES BANK Credit Card",
      bank: "YES Bank",
      image: "/images/yes-bank-cards.png",
      annualFee: "Annual fee may apply",
      joiningFee: "Varies",
      benefits: [
        {
          icon: Star,
          title: "Stunning rewards and cashback on",
          description: "multiple categories including fuel, dining, and online shopping transactions.",
        },
        {
          icon: Shield,
          title: "Comprehensive insurance coverage",
          description: "and fraud protection for secure transactions and peace of mind.",
        },
        {
          icon: Gift,
          title: "Exclusive offers and discounts at",
          description: "partner merchants and premium lifestyle benefits.",
        },
      ],
      keyFeatures: ["Multiple reward categories", "Premium lifestyle benefits", "Comprehensive protection"],
      applyLink: "/apply/yes-bank",
    },
  ]

  return (
    <div className="py-12 px-4 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Credit Cards Offers</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Scroll through some of the best hand-picked credit card offers
        </p>
      </div>

      {/* Credit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {creditCards.map((card) => (
          <Card
            key={card.id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Card Image and Badge */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 flex justify-center items-center h-32">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    width={200}
                    height={120}
                    className="object-contain max-w-full h-full"
                  />
                </div>
                {card.approvalTag && (
                  <Badge className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1">
                    {card.approvalTag}
                  </Badge>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{card.name}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{card.keyFeatures.join(". ")}</p>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900">Annual Fee: {card.annualFee}</p>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {card.benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <benefit.icon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-700 font-medium">{benefit.title}</p>
                        <p className="text-xs text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                  >
                    Know more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs">
                    Apply Now
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Information Sections */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* What is a Credit Card */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-blue-600" />
            What is a Credit Card?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            A credit card is a payment card that allows the cardholder to borrow money from a financial institution to
            make purchases. The cardholder can then pay back the borrowed amount, along with any interest and fees, over
            time or in full. Credit cards often come with rewards programs, such as cashback or points for travel or
            merchandise, and offer convenience and security when making purchases.
          </p>
        </div>

        {/* Different Types of Credit Cards */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Different Types of Credit Cards in India</h2>
          <p className="text-gray-700 mb-6">
            One can come across a few variants of credit cards available for customers in India. These types of credit
            cards are listed below.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Plane className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Travel Credit Cards</h3>
                  <p className="text-gray-600 text-sm">
                    These cards offer rewards and discounts on airfare, hotel bookings, and other travel-related
                    expenses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Rewards Credit Cards</h3>
                  <p className="text-gray-600 text-sm">
                    These cards offer reward points on every purchase, which can be redeemed for gifts, merchandise, and
                    other benefits.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShoppingBag className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Shopping Credit Cards</h3>
                  <p className="text-gray-600 text-sm">
                    Designed for frequent shoppers, these cards offer cashback and rewards on retail purchases.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Percent className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cashback Credit Cards</h3>
                  <p className="text-gray-600 text-sm">
                    These cards provide direct cashback on purchases, making them ideal for everyday spending.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
