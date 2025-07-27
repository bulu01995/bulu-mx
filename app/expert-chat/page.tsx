import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ExpertChat() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Talk with Expert</h1>
          <p className="text-xl text-gray-600 mb-8">Get personalized advice from our financial and insurance experts</p>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">👨‍🔧 Coming Soon!</h2>
            <p className="text-lg">
              Live chat with experts will be available soon. Get ready for personalized guidance!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
