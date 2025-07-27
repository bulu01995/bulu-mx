import type React from "react"

interface Setting {
  id: string
  name: string
  value: string
  description: string
}

const mockSettings: Setting[] = [
  {
    id: "1",
    name: "Website Title",
    value: "My Awesome Website",
    description: "The title of your website.",
  },
  {
    id: "2",
    name: "Website Description",
    value: "A description of my awesome website.",
    description: "A brief description of your website.",
  },
  {
    id: "3",
    name: "Contact Email",
    value: "contact@example.com",
    description: "The email address for contact inquiries.",
  },
]

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSettings.map((setting) => (
          <div key={setting.id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">{setting.name}</h2>
            <p className="text-gray-600">{setting.description}</p>
            <div className="mt-2">
              <label htmlFor={`setting-${setting.id}`} className="block text-sm font-medium text-gray-700">
                Value:
              </label>
              <input
                type="text"
                id={`setting-${setting.id}`}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={setting.value}
                readOnly // Make it read-only for now, as we're not implementing updates
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsPage
