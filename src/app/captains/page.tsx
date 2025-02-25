"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";
import Captain1 from "../../../assets/captain-1.jpg";
import Captain2 from "../../../assets/captain-2.jpg";
import Captain3 from "../../../assets/captain-3.jpg";

// Sample data - would come from API in real app
const captains = [
  {
    id: "1",
    name: "Captain John Smith",
    image: Captain1,
    location: "Miami, FL",
    experience: 12,
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 150,
    specialties: ["Yachts", "Sailing", "Sport Fishing"],
    availability: "Weekends",
    verified: true,
  },
  {
    id: "2",
    name: "Captain Sarah Johnson",
    image: Captain2,
    location: "San Diego, CA",
    experience: 8,
    rating: 4.8,
    reviewCount: 96,
    hourlyRate: 130,
    specialties: ["Catamarans", "Coastal Cruising"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: "3",
    name: "Captain Mike Davis",
    image: Captain3,
    location: "Seattle, WA",
    experience: 15,
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 140,
    specialties: ["Deep Sea Fishing", "Yacht Delivery"],
    availability: "Weekdays",
    verified: true,
  },
  // Add more captains...
];

export default function CaptainsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  const specialties = Array.from(
    new Set(captains.flatMap((captain) => captain.specialties))
  );

  const filteredCaptains = captains.filter(
    (captain) =>
      (captain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        captain.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedSpecialty || captain.specialties.includes(selectedSpecialty))
  );

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Find Your Captain
          </h1>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-[200px]"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCaptains.map((captain) => (
            <div
              key={captain.id}
              className="group relative overflow-hidden rounded-lg border bg-background"
            >
              <div className="aspect-square relative">
                <Image
                  src={captain.image || "/placeholder.svg"}
                  alt={captain.name}
                  className="object-cover transition-transform group-hover:scale-105"
                  fill
                />
                {captain.verified && (
                  <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    <Shield className="mr-1 inline-block h-3 w-3" />
                    Verified
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{captain.name}</h3>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">
                      {captain.rating}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({captain.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {captain.location}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {captain.experience} years experience
                </div>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {captain.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-secondary px-2 py-1 text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">
                      ${captain.hourlyRate}
                    </span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                  <Button asChild>
                    <Link href={`/captains/${captain.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
