"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  Globe,
  Mail,
  CreditCard,
  Shield,
  Users,
  Monitor,
  ShoppingBag,
  Banknote,
  Home,
  Building2,
  MapPin,
  Calculator,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "hi" as const, name: "हिंदी", flag: "🇮🇳" },
  ]

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu)
  }

  const handleLanguageChange = (newLanguage: (typeof languages)[0]) => {
    setLanguage(newLanguage.code)
    setShowLanguageDropdown(false)
  }

  const currentLanguageName = languages.find((lang) => lang.code === language)?.name || "English"

  const loanItems = [
    { key: "personalLoan" as const, href: "/personal-loan", icon: Users },
    { key: "homeLoan" as const, href: "/home-loan", icon: Home },
    { key: "businessLoan" as const, href: "/business-loan", icon: Building2 },
    { key: "loanAgainstProperty" as const, href: "/loan-against-property", icon: MapPin },
  ]

  const calculatorItems = [
    { key: "emiCalculator" as const, href: "/emi-calculator", icon: Calculator },
    { key: "loanCalculator" as const, href: "/loan-calculator", icon: Calculator },
    { key: "sipCalculator" as const, href: "/sip-calculator", icon: Calculator },
    { key: "fdCalculator" as const, href: "/fd-calculator", icon: Calculator },
    { key: "ppfCalculator" as const, href: "/ppf-calculator", icon: Calculator },
    { key: "insuranceCalculator" as const, href: "/insurance-calculator", icon: Calculator },
  ]

  const otherServicesItems = [
    { key: "onlineServices" as const, href: "/online-services", icon: Monitor },
    { key: "traveling" as const, href: "/travelling", icon: Globe },
    { key: "shopping" as const, href: "/shopping", icon: ShoppingBag },
    { key: "allServiceInsurance" as const, href: "/all-service-insurance", icon: Shield },
  ]

  return (
    <>
      {/* Black Overlay */}
      {activeDropdown && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setActiveDropdown(null)} />
      )}

      {/* Main Header */}
      <header className="py-2 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm relative z-50">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="BULU ENTERPRISES Home">
            <Image
              src="/images/bulu-logo.png"
              alt="BULU ENTERPRISES Logo"
              width={160}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation - Desktop with hover dropdowns */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavItem
            label={t("loan")}
            dropdownItems={loanItems}
            icon={Banknote}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            dropdownKey="loan"
          />
          <Link
            href="/credit-cards"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors whitespace-nowrap py-2 font-light"
          >
            <CreditCard className="h-4 w-4" />
            <span>{t("creditCards")}</span>
          </Link>
          <Link
            href="/insurance"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors whitespace-nowrap py-2 font-light"
          >
            <Shield className="h-4 w-4" />
            <span>{t("insurance")}</span>
          </Link>
          <Link
            href="/labour"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors whitespace-nowrap py-2 font-light"
          >
            <Users className="h-4 w-4" />
            <span>{t("labour")}</span>
          </Link>
          <NavItem
            label={t("calculators")}
            dropdownItems={calculatorItems}
            icon={Calculator}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            dropdownKey="calculators"
          />
          <NavItem
            label={t("otherServices")}
            dropdownItems={otherServicesItems}
            icon={ShoppingBag}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            dropdownKey="other"
          />
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-3">
              {/* Language Selector in Mobile */}
              <div className="py-2 border-b border-gray-200">
                <div
                  className="flex items-center justify-between"
                  onClick={() => toggleMobileDropdown("mobile-language")}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 font-light text-sm">{currentLanguageName}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${activeMobileDropdown === "mobile-language" ? "rotate-180" : ""}`}
                  />
                </div>
                {activeMobileDropdown === "mobile-language" && (
                  <div className="pl-6 mt-2 space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang)}
                        className="flex items-center gap-2 py-1 text-gray-600 hover:text-black w-full text-left text-xs font-light"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Loan dropdown in mobile */}
              <div className="py-2">
                <div className="flex items-center justify-between" onClick={() => toggleMobileDropdown("mobile-loan")}>
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 font-light text-sm">{t("loan")}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${activeMobileDropdown === "mobile-loan" ? "rotate-180" : ""}`}
                  />
                </div>
                {activeMobileDropdown === "mobile-loan" && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                    {loanItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-2 py-1 text-gray-600 hover:text-black text-xs font-light"
                      >
                        <item.icon className="h-2.5 w-2.5" />
                        <span>{t(item.key)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/credit-cards"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-black transition-colors font-light text-sm"
              >
                <CreditCard className="h-4 w-4" />
                <span>{t("creditCards")}</span>
              </Link>
              <Link
                href="/insurance"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-black transition-colors font-light text-sm"
              >
                <Shield className="h-4 w-4" />
                <span>{t("insurance")}</span>
              </Link>
              <Link
                href="/labour"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-black transition-colors font-light text-sm"
              >
                <Users className="h-4 w-4" />
                <span>{t("labour")}</span>
              </Link>

              {/* Calculators dropdown in mobile */}
              <div className="py-2">
                <div
                  className="flex items-center justify-between"
                  onClick={() => toggleMobileDropdown("mobile-calculators")}
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 font-light text-sm">{t("calculators")}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${activeMobileDropdown === "mobile-calculators" ? "rotate-180" : ""}`}
                  />
                </div>
                {activeMobileDropdown === "mobile-calculators" && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                    {calculatorItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-2 py-1 text-gray-600 hover:text-black text-xs font-light"
                      >
                        <item.icon className="h-2.5 w-2.5" />
                        <span>{t(item.key)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Services dropdown in mobile */}
              <div className="py-2">
                <div className="flex items-center justify-between" onClick={() => toggleMobileDropdown("mobile-other")}>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 font-light text-sm">{t("otherServices")}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${activeMobileDropdown === "mobile-other" ? "rotate-180" : ""}`}
                  />
                </div>
                {activeMobileDropdown === "mobile-other" && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                    {otherServicesItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-2 py-1 text-gray-600 hover:text-black text-xs font-light"
                      >
                        <item.icon className="h-2.5 w-2.5" />
                        <span>{t(item.key)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right side actions - Language Selector and Login */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center border rounded-full px-3 py-1 hover:bg-gray-50 transition-colors"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              onBlur={() => setTimeout(() => setShowLanguageDropdown(false), 150)}
            >
              <Globe className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700 text-sm font-light">{currentLanguageName}</span>
              <ChevronDown
                className={`ml-1 h-4 w-4 text-gray-500 transition-transform ${showLanguageDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {/* Language Dropdown */}
            {showLanguageDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-50 w-40 border border-gray-100 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      language === lang.code ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-xs font-light">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="bg-[#FFC107] hover:bg-[#FFB300] text-black font-light py-1 px-4 rounded-full transition-colors flex items-center"
          >
            <span className="mr-1">→</span> {t("login")}
          </Link>

          <div className="relative">
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              onMouseEnter={() => setShowContactInfo(true)}
              onMouseLeave={() => setShowContactInfo(false)}
            >
              <Phone className="h-5 w-5 text-gray-700" />
            </button>

            {/* Contact Info Popup */}
            {showContactInfo && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 w-64 p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="font-light text-gray-800">BULU ENTERPRISES</span>
                </div>

                <div className="border border-gray-100 rounded-lg p-3 mb-2 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="font-light">9142647797</span>
                </div>

                <div className="border border-gray-100 rounded-lg p-3 mb-3 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="font-light">info@bulu.com</span>
                </div>

                <p className="text-gray-500 text-xs text-center font-light">
                  Contact us during business hours for assistance with any of our services.
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

interface NavItemProps {
  label: string
  dropdownItems?: Array<{ key: any; href: string; icon: any }>
  icon?: any
  activeDropdown?: string | null
  setActiveDropdown?: (dropdown: string | null) => void
  dropdownKey?: string
}

function NavItem({ label, dropdownItems, icon: Icon, activeDropdown, setActiveDropdown, dropdownKey }: NavItemProps) {
  const { t } = useLanguage()
  const isActive = activeDropdown === dropdownKey

  const handleMouseEnter = () => {
    if (dropdownItems && setActiveDropdown && dropdownKey) {
      setActiveDropdown(dropdownKey)
    }
  }

  const handleMouseLeave = () => {
    if (setActiveDropdown) {
      setActiveDropdown(null)
    }
  }

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="flex items-center gap-2 text-gray-700 group-hover:text-black transition-colors whitespace-nowrap py-2 font-light">
        {Icon && <Icon className="h-4 w-4" />}
        <span>{label}</span>
        {dropdownItems && (
          <ChevronDown className={`ml-1 h-4 w-4 text-gray-500 transition-transform ${isActive ? "rotate-180" : ""}`} />
        )}
      </button>

      {dropdownItems && (
        <div
          className={`absolute left-0 top-full mt-0 w-56 bg-white rounded-md shadow-lg z-50 py-2 transition-all duration-200 ${
            isActive ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {dropdownItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors text-xs font-light"
            >
              <item.icon className="h-2.5 w-2.5 text-gray-500" />
              <span>{t(item.key)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNavItem({ label, href, icon: Icon }: { label: string; href: string; icon: any }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 py-2 text-gray-700 hover:text-black transition-colors font-light text-sm"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}
