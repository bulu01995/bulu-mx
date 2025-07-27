import HeroSection from "@/components/hero-section"
import TrendingLoans from "@/components/trending-loans"
import PopularCalculatorsSection from "@/components/popular-calculators-section"
import CreditCardsSection from "@/components/credit-cards-section"
import CustomerSupportSection from "@/components/customer-support-section"
import InsuranceBanner from "@/components/insurance-banner"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrendingLoans />
      <PopularCalculatorsSection />
      <CreditCardsSection />
      <InsuranceBanner />
      <CustomerSupportSection />
    </main>
  )
}
