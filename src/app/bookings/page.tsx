"use client";

import { useState } from "react";
import { Calendar, Clock, Ship, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";

// Sample data - would come from API
const bookings = [
  {
    id: "1",
    boatName: "Sea Spirit",
    captainName: "John Smith",
    date: "2024-03-01",
    time: "10:00 AM",
    duration: "4 hours",
    location: "Miami Marina",
    status: "Confirmed",
    amount: 600,
  },
  {
    id: "2",
    boatName: "Ocean Explorer",
    captainName: "Sarah Johnson",
    date: "2024-03-03",
    time: "2:00 PM",
    duration: "6 hours",
    location: "Port of Miami",
    status: "Pending",
    amount: 900,
  },
  {
    id: "3",
    boatName: "Sea Spirit",
    captainName: "John Smith",
    date: "2024-03-05",
    time: "11:00 AM",
    duration: "3 hours",
    location: "Miami Marina",
    status: "Completed",
    amount: 450,
  },
];

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch =
      booking.boatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.captainName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your bookings and reservations
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Ship className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{booking.boatName}</h3>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Captain: {booking.captainName}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {booking.time} · {booking.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booking.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${booking.amount}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
