"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Ship,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import Boat1 from "../../../assets/boat-1.jpg";
import Boat2 from "../../../assets/boat-2.jpg";

// Sample data - would come from API
const boats = [
  {
    id: "1",
    name: "Sea Spirit",
    image: Boat1,
    type: "Yacht",
    length: "42ft",
    location: "Miami Marina",
    status: "available",
    owner: {
      name: "Michael Brown",
      phone: "+1 (305) 555-0123",
      email: "michael@example.com",
    },
    nextCharter: {
      date: "2024-03-01",
      time: "10:00 AM",
      duration: "4 hours",
      guests: 8,
    },
    maintenanceStatus: "good",
    lastInspection: "2024-02-15",
    upcomingMaintenance: "2024-03-15",
  },
  {
    id: "2",
    name: "Ocean Explorer",
    image: Boat2,
    type: "Sailboat",
    length: "38ft",
    location: "Port of Miami",
    status: "chartered",
    owner: {
      name: "Emma Wilson",
      phone: "+1 (305) 555-0124",
      email: "emma@example.com",
    },
    nextCharter: {
      date: "2024-03-03",
      time: "2:00 PM",
      duration: "6 hours",
      guests: 6,
    },
    maintenanceStatus: "attention",
    lastInspection: "2024-02-01",
    upcomingMaintenance: "2024-02-28",
  },
];

export default function MyBoatsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBoats = boats.filter((boat) => {
    const matchesSearch = boat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || boat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Boats</h1>
          <p className="mt-2 text-muted-foreground">
            Manage the boats you captain
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search boats..."
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
              <SelectItem value="all">All Boats</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="chartered">Chartered</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-12 mt-12 rounded-lg border bg-muted/50 p-8 text-center">
          <h2 className="text-2xl font-bold">
            Looking for More Boats to Captain?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse available boats in your area and expand your fleet.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/boats">Find Boats to Captain</Link>
          </Button>
        </div>

        <div className="grid gap-6 my-8">
          {filteredBoats.map((boat) => (
            <Card key={boat.id}>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-[240px_1fr]">
                  <div className="space-y-4">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                      <Image
                        src={boat.image || "/placeholder.svg"}
                        alt={boat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{boat.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Ship className="h-4 w-4" />
                        {boat.type} · {boat.length}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {boat.location}
                      </div>
                    </div>
                    <Badge
                      variant={
                        boat.status === "available" ? "default" : "secondary"
                      }
                      className="w-full justify-center"
                    >
                      {boat.status === "available"
                        ? "Available"
                        : "Currently Chartered"}
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {/* Next Charter */}
                    <div>
                      <h4 className="font-medium">Next Charter</h4>
                      <div className="mt-2 rounded-lg border p-4">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {format(
                              new Date(boat.nextCharter.date),
                              "MMM d, yyyy"
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {boat.nextCharter.time} ·{" "}
                            {boat.nextCharter.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Ship className="h-4 w-4 text-muted-foreground" />
                            {boat.nextCharter.guests} guests
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Owner Contact */}
                    <div>
                      <h4 className="font-medium">Owner Contact</h4>
                      <div className="mt-2 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{boat.owner.name}</p>
                            <div className="mt-1 space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {boat.owner.phone}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {boat.owner.email}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Maintenance Status */}
                    <div>
                      <h4 className="font-medium">Maintenance Status</h4>
                      <div className="mt-2 rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          {boat.maintenanceStatus === "good" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : boat.maintenanceStatus === "attention" ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">
                              {boat.maintenanceStatus === "good"
                                ? "All systems operational"
                                : "Maintenance required"}
                            </p>
                            <div className="mt-1 text-sm text-muted-foreground">
                              Last inspection:{" "}
                              {format(
                                new Date(boat.lastInspection),
                                "MMM d, yyyy"
                              )}
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Maintenance Details</DialogTitle>
                                <DialogDescription>
                                  Maintenance history and upcoming schedule for{" "}
                                  {boat.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium">
                                    Next Scheduled Maintenance
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {format(
                                      new Date(boat.upcomingMaintenance),
                                      "MMM d, yyyy"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
