"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

/* --- minimal mock data --- */
const monthlyUsers = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 650 },
  { month: "Mar", users: 800 },
  { month: "Apr", users: 700 },
  { month: "May", users: 920 },
  { month: "Jun", users: 990 },
]

export default function AdminAnalyticsPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Users</CardTitle>
        </CardHeader>

        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyUsers} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" name="Users" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  )
}
