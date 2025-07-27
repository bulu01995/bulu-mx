import type { Metadata } from "next"
import CreditCardsSection from "@/components/credit-cards-section"

export const metadata: Metadata = {
  title: "Credit Cards - BULU ENTERPRISES",
  description:
    "Explore the best credit card offers with attractive rewards, cashback, and benefits. Apply for premium credit cards online.",
}

export default function CreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CreditCardsSection />
    </main>
  )
}
