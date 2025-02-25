"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Clock,
  Ship,
  MapPin,
  Search,
  LayoutGrid,
  LayoutList,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardLayout from "@/components/dashboard-layout";
import { format } from "date-fns";

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
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isAutoBooking, setIsAutoBooking] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch =
      booking.boatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.captainName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAutoBook = () => {
    setIsAutoBooking(true);
    // Simulate auto-booking process
    setTimeout(() => {
      setIsAutoBooking(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bookings</h1>
              <p className="mt-2 text-muted-foreground">
                Manage your bookings and reservations
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Auto Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Auto Booking</DialogTitle>
                  <DialogDescription>
                    Let us automatically schedule your boats based on captain
                    availability
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="flex gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate
                              ? format(selectedDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Preferred Hours
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (8AM - 12PM)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12PM - 4PM)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (4PM - 8PM)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleAutoBook}
                    disabled={isAutoBooking}
                  >
                    {isAutoBooking
                      ? "Finding availability..."
                      : "Find Available Slots"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
          <div className="flex items-center gap-2">
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
            <div className="flex items-center rounded-lg border">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setView("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "calendar" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setView("calendar")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {view === "list" ? (
          // Existing list view
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
                        <CalendarIcon className="h-4 w-4" />
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
        ) : (
          // Calendar view
          <div className="rounded-lg border bg-background p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
