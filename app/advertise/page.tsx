import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Advertise() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Advertise with Us</h1>
          <p className="text-xl text-gray-600 mb-8">
            Reach millions of customers across India with our advertising solutions
          </p>
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">📢 Coming Soon!</h2>
            <p className="text-lg">Powerful advertising tools and analytics are being prepared for you!</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
