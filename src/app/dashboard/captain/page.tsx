import {
  Ship,
  DollarSign,
  Calendar,
  Clock,
  Star,
  MapPin,
  Settings,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Sample data - would come from API in real app
const captainData = {
  stats: {
    totalTrips: 156,
    totalHours: 624,
    totalEarnings: 23400,
    averageRating: 4.9,
  },
  upcomingTrips: [
    {
      id: "1",
      boatName: "Sea Spirit",
      ownerName: "Michael Brown",
      date: "2024-03-01",
      duration: "4 hours",
      location: "Miami Marina",
      amount: 600,
    },
    {
      id: "2",
      boatName: "Ocean Explorer",
      ownerName: "Emma Wilson",
      date: "2024-03-03",
      duration: "6 hours",
      location: "Port of Miami",
      amount: 900,
    },
  ],
  recentReviews: [
    {
      id: "1",
      customerName: "John D.",
      rating: 5,
      comment: "Excellent captain, very knowledgeable and professional.",
      date: "2024-02-28",
    },
    {
      id: "2",
      customerName: "Sarah M.",
      rating: 5,
      comment: "Great experience! Will definitely book again.",
      date: "2024-02-25",
    },
  ],

  certifications: [
    {
      name: "USCG Master Captain License",
      expiry: "2024-12-31",
      status: "Active",
    },
    {
      name: "First Aid Certification",
      expiry: "2024-06-30",
      status: "Active",
    },
  ],
  monthlyEarnings: [
    { month: "Jan", amount: 3200 },
    { month: "Feb", amount: 3600 },
    { month: "Mar", amount: 4100 },
  ],
};

export default function CaptainDashboardPage() {
  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              Captain Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Track your performance and manage bookings
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
              <h3 className="font-medium">Total Trips</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {captainData.stats.totalTrips}
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Hours at Sea</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {captainData.stats.totalHours}
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Earnings</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              ${captainData.stats.totalEarnings}
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Average Rating</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {captainData.stats.averageRating}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upcoming Trips */}
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold">Upcoming Trips</h2>
                <div className="mt-4 space-y-4">
                  {captainData.upcomingTrips.map((trip) => (
                    <div key={trip.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{trip.boatName}</h3>
                        <span className="font-medium">${trip.amount}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Owner: {trip.ownerName}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {trip.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trip.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold">Recent Reviews</h2>
                <div className="mt-4 space-y-4">
                  {captainData.recentReviews.map((review) => (
                    <div key={review.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {review.customerName}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Monthly Earnings */}
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold">Monthly Earnings</h2>
                <div className="mt-4 space-y-4">
                  {captainData.monthlyEarnings.map((month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <span className="font-medium">{month.month}</span>
                      <span className="font-medium">${month.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    asChild
                  >
                    <Link href="/bookings">
                      View All Bookings
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Update Availability
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Message Clients
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-destructive"
                  >
                    Cancel/Reschedule Trip
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <div className="rounded-lg border">
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-semibold">Certifications</h2>
                </div>
                <div className="mt-4 space-y-4">
                  {captainData.certifications.map((cert, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h3 className="font-medium">{cert.name}</h3>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Expires: {cert.expiry}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            cert.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
