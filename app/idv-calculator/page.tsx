"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Car, RotateCcw, Info } from "lucide-react"

export default function IDVCalculatorPage() {
  const [carBrand, setCarBrand] = useState("")
  const [carModel, setCarModel] = useState("")
  const [yearOfManufacture, setYearOfManufacture] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [registrationYear, setRegistrationYear] = useState("")
  const [result, setResult] = useState<{
    idv: number
    depreciationRate: number
    originalPrice: number
  } | null>(null)

  const calculateIDV = () => {
    const currentYear = new Date().getFullYear()
    const manufactureYear = Number.parseInt(yearOfManufacture) || currentYear
    const regYear = Number.parseInt(registrationYear) || currentYear

    // Sample car prices (in a real app, this would come from a database)
    const carPrices: { [key: string]: number } = {
      "maruti-alto": 350000,
      "maruti-swift": 600000,
      "hyundai-i20": 700000,
      "honda-city": 1200000,
      "toyota-innova": 1800000,
      "mahindra-xuv500": 1500000,
    }

    const originalPrice = carPrices[`${carBrand}-${carModel}`] || 800000

    // Calculate depreciation based on age
    const carAge = currentYear - regYear
    let depreciationRate = 0

    if (carAge <= 0.5) depreciationRate = 5
    else if (carAge <= 1) depreciationRate = 15
    else if (carAge <= 2) depreciationRate = 20
    else if (carAge <= 3) depreciationRate = 30
    else if (carAge <= 4) depreciationRate = 40
    else if (carAge <= 5) depreciationRate = 50
    else depreciationRate = 60

    const idv = originalPrice * (1 - depreciationRate / 100)

    setResult({
      idv: Math.round(idv),
      depreciationRate,
      originalPrice,
    })
  }

  const resetCalculator = () => {
    setCarBrand("")
    setCarModel("")
    setYearOfManufacture("")
    setFuelType("")
    setRegistrationYear("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">IDV Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate the Insured Declared Value (IDV) of your car. IDV is the maximum sum assured fixed by the insurer.
          </p>
        </div>

        {/* What is IDV */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-6 w-6 mr-2 text-blue-600" />
              What is IDV (Insured Declared Value)?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              IDV is the maximum sum assured fixed by the insurer that is provided on theft or total loss of a vehicle.
              It is calculated based on the manufacturer's listed selling price of the brand and model, less
              depreciation.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Key Points:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• IDV decreases as your car gets older due to depreciation</li>
                <li>• Higher IDV means higher premium but better coverage</li>
                <li>• IDV cannot be more than manufacturer's listed price</li>
                <li>• IDV is used to calculate your car insurance premium</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-6 w-6 mr-2 text-blue-600" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carBrand">Car Brand</Label>
                  <Select value={carBrand} onValueChange={setCarBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select car brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="mahindra">Mahindra</SelectItem>
                      <SelectItem value="tata">Tata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="carModel">Car Model</Label>
                  <Select value={carModel} onValueChange={setCarModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select car model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alto">Alto</SelectItem>
                      <SelectItem value="swift">Swift</SelectItem>
                      <SelectItem value="i20">i20</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                      <SelectItem value="innova">Innova</SelectItem>
                      <SelectItem value="xuv500">XUV500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearOfManufacture">Year of Manufacture</Label>
                  <Input
                    id="yearOfManufacture"
                    type="number"
                    placeholder="Enter manufacture year"
                    value={yearOfManufacture}
                    onChange={(e) => setYearOfManufacture(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="registrationYear">Registration Year</Label>
                  <Input
                    id="registrationYear"
                    type="number"
                    placeholder="Enter registration year"
                    value={registrationYear}
                    onChange={(e) => setRegistrationYear(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateIDV} className="flex-1">
                  Calculate IDV
                </Button>
                <Button onClick={resetCalculator} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IDV Calculation Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Car's IDV</h3>
                    <p className="text-3xl font-bold text-blue-600">₹{result.idv.toLocaleString()}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Original Price</h4>
                      <p className="text-xl font-bold text-gray-600">₹{result.originalPrice.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-900">Depreciation Rate</h4>
                      <p className="text-xl font-bold text-red-600">{result.depreciationRate}%</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• This is an estimated IDV calculation</li>
                      <li>• Actual IDV may vary based on insurer and market conditions</li>
                      <li>• IDV affects your insurance premium directly</li>
                      <li>• You can negotiate IDV within ±15% of calculated value</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your vehicle details to calculate IDV</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Depreciation Table */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Car Depreciation Rates by Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Car Age</th>
                    <th className="text-left p-4 font-semibold">Depreciation Rate</th>
                    <th className="text-left p-4 font-semibold">IDV Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Up to 6 months</td>
                    <td className="p-4">5%</td>
                    <td className="p-4">95%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">6 months to 1 year</td>
                    <td className="p-4">15%</td>
                    <td className="p-4">85%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">1 to 2 years</td>
                    <td className="p-4">20%</td>
                    <td className="p-4">80%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">2 to 3 years</td>
                    <td className="p-4">30%</td>
                    <td className="p-4">70%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">3 to 4 years</td>
                    <td className="p-4">40%</td>
                    <td className="p-4">60%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">4 to 5 years</td>
                    <td className="p-4">50%</td>
                    <td className="p-4">50%</td>
                  </tr>
                  <tr>
                    <td className="p-4">Above 5 years</td>
                    <td className="p-4">60%</td>
                    <td className="p-4">40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
