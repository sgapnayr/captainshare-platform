"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  Star,
  Shield,
  AlertCircle,
  MessageSquare,
  Search,
  Ship,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import Captain1 from "../../../assets/captain-1.jpg";
import Captain2 from "../../../assets/captain-2.jpg";
// Sample data - would come from API
const captains = [
  {
    id: "1",
    name: "John Smith",
    image: Captain1,
    status: "active",
    rating: 4.9,
    reviewCount: 128,
    experience: "12 years",
    certifications: [
      {
        name: "USCG Master Captain License",
        expiry: "2024-12-31",
        status: "valid",
      },
      {
        name: "First Aid Certification",
        expiry: "2024-06-30",
        status: "valid",
      },
    ],
    assignedBoats: [
      {
        name: "Sea Spirit",
        type: "Yacht",
        status: "available",
      },
      {
        name: "Ocean Explorer",
        type: "Sailboat",
        status: "chartered",
      },
    ],
    upcomingCharters: [
      {
        date: "2024-03-01",
        time: "10:00 AM",
        duration: "4 hours",
        boat: "Sea Spirit",
      },
    ],
    performance: {
      completedTrips: 450,
      cancelationRate: 0.02,
      onTimeRate: 0.98,
      customerSatisfaction: 0.96,
    },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    image: Captain2,
    status: "on_charter",
    rating: 4.8,
    reviewCount: 96,
    experience: "8 years",
    certifications: [
      {
        name: "USCG Master Captain License",
        expiry: "2024-08-15",
        status: "valid",
      },
      {
        name: "First Aid Certification",
        expiry: "2024-03-01",
        status: "expiring",
      },
    ],
    assignedBoats: [
      {
        name: "Coastal Cruiser",
        type: "Catamaran",
        status: "available",
      },
    ],
    upcomingCharters: [
      {
        date: "2024-03-03",
        time: "2:00 PM",
        duration: "6 hours",
        boat: "Coastal Cruiser",
      },
    ],
    performance: {
      completedTrips: 320,
      cancelationRate: 0.01,
      onTimeRate: 0.99,
      customerSatisfaction: 0.95,
    },
  },
];

export default function MyCaptainsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCaptains = captains.filter((captain) => {
    const matchesSearch = captain.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || captain.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8 flex flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Captains</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your fleet captains
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <Button size="lg" className="" asChild>
              <Link href="/captains">Find More Captains</Link>
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search captains..."
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
              <SelectItem value="all">All Captains</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on_charter">On Charter</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {filteredCaptains.map((captain) => (
            <Card key={captain.id}>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                  <div className="space-y-4">
                    <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                      <Image
                        src={captain.image || "/placeholder.svg"}
                        alt={captain.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">{captain.name}</h3>
                      <div className="mt-1 flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{captain.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({captain.reviewCount} reviews)
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {captain.experience} experience
                      </p>
                    </div>
                    <Badge
                      variant={
                        captain.status === "active" ? "default" : "secondary"
                      }
                      className="w-full justify-center"
                    >
                      {captain.status === "active"
                        ? "Active"
                        : captain.status === "on_charter"
                        ? "On Charter"
                        : "Unavailable"}
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {/* Certifications */}
                    <div>
                      <h4 className="font-medium">Certifications</h4>
                      <div className="mt-2 space-y-3">
                        {captain.certifications.map((cert, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-3">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Expires:{" "}
                                  {format(new Date(cert.expiry), "MMM d, yyyy")}
                                </p>
                              </div>
                            </div>
                            {cert.status === "valid" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : cert.status === "expiring" ? (
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Assigned Boats */}
                    <div>
                      <h4 className="font-medium">Assigned Boats</h4>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {captain.assignedBoats.map((boat, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-3">
                              <Ship className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{boat.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {boat.type}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={
                                boat.status === "available"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {boat.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div>
                      <h4 className="font-medium">Performance Metrics</h4>
                      <div className="mt-2 grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Completed Trips
                            </span>
                            <span className="font-medium">
                              {captain.performance.completedTrips}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              On-Time Rate
                            </span>
                            <span className="font-medium">
                              {(captain.performance.onTimeRate * 100).toFixed(
                                1
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={captain.performance.onTimeRate * 100}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Cancelation Rate
                            </span>
                            <span className="font-medium">
                              {(
                                captain.performance.cancelationRate * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Customer Satisfaction
                            </span>
                            <span className="font-medium">
                              {(
                                captain.performance.customerSatisfaction * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              captain.performance.customerSatisfaction * 100
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        View Schedule
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Assign Boat</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Boat</DialogTitle>
                            <DialogDescription>
                              Assign a boat to {captain.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select boat" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sea-spirit">
                                  Sea Spirit
                                </SelectItem>
                                <SelectItem value="ocean-explorer">
                                  Ocean Explorer
                                </SelectItem>
                                <SelectItem value="coastal-cruiser">
                                  Coastal Cruiser
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button className="w-full">Assign Boat</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
