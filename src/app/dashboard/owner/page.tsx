import Link from "next/link";
import Image from "next/image";
import {
  Ship,
  DollarSign,
  Calendar,
  TrendingUp,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

// Sample data - would come from API in real app
const ownerData = {
  stats: {
    totalBoats: 3,
    totalBookings: 45,
    totalEarnings: 12600,
    activeBookings: 5,
  },
  boats: [
    {
      id: "1",
      name: "Sea Spirit",
      type: "Yacht",
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
      metrics: {
        bookings: 12,
        earnings: 3600,
        rating: 4.8,
        maintenanceDate: "2024-04-15",
      },
    },
    {
      id: "2",
      name: "Ocean Explorer",
      type: "Sailboat",
      status: "Booked",
      image: "/placeholder.svg?height=100&width=150",
      metrics: {
        bookings: 8,
        earnings: 2400,
        rating: 4.9,
        maintenanceDate: "2024-03-30",
      },
    },
  ],
  recentBookings: [
    {
      id: "1",
      boatName: "Sea Spirit",
      captainName: "John Smith",
      date: "2024-03-01",
      duration: "4 hours",
      amount: 600,
      status: "Confirmed",
    },
    {
      id: "2",
      boatName: "Ocean Explorer",
      captainName: "Sarah Johnson",
      date: "2024-03-03",
      duration: "6 hours",
      amount: 900,
      status: "Pending",
    },
  ],
};

export default function OwnerDashboardPage() {
  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              Owner Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your fleet and track performance
            </p>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Boats</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {ownerData.stats.totalBoats}
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Bookings</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {ownerData.stats.totalBookings}
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Earnings</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              ${ownerData.stats.totalEarnings}
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Active Bookings</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {ownerData.stats.activeBookings}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Fleet Overview */}
          <div className="space-y-6">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold">Fleet Overview</h2>
                <div className="mt-4 space-y-4">
                  {ownerData.boats.map((boat) => (
                    <div key={boat.id} className="rounded-lg border p-4">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-32 overflow-hidden rounded-lg">
                          <Image
                            src={boat.image || "/placeholder.svg"}
                            alt={boat.name}
                            className="object-cover"
                            fill
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{boat.name}</h3>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                boat.status === "Available"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}
                            >
                              {boat.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {boat.type}
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Bookings:{" "}
                              </span>
                              {boat.metrics.bookings}
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Rating:{" "}
                              </span>
                              {boat.metrics.rating}
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Earnings:{" "}
                              </span>
                              ${boat.metrics.earnings}
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Next Maintenance:{" "}
                              </span>
                              {boat.metrics.maintenanceDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/boats/new">Add New Boat</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Bookings and Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold">Recent Bookings</h2>
                <div className="mt-4 space-y-4">
                  {ownerData.recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between gap-4 rounded-lg border p-4"
                    >
                      <div>
                        <h3 className="font-medium">{booking.boatName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Captain: {booking.captainName}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {booking.date} · {booking.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.amount}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="font-semibold">Quick Actions</h2>
              <div className="mt-4 space-y-2">
                <Link href="/bookings">
                  <Button variant="outline" className="w-full justify-between">
                    View All Bookings
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-between">
                  Manage Fleet
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  View Analytics
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Maintenance Schedule
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
