"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MapPin,
  Star,
  FileText,
  Upload,
  Edit,
  Shield,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import DashboardLayout from "../../../components/dashboard-layout";
import Captain1 from "../../../../assets/captain-1.jpg";
// Sample captain profile data
const captainProfile = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (305) 555-0123",
  location: "Miami, FL",
  image: Captain1,
  experience: "12 years",
  rating: 4.9,
  reviewCount: 156,
  bio: "Professional captain with extensive experience in luxury yachts and sailing vessels. USCG licensed with a perfect safety record.",
  certifications: [
    {
      name: "USCG Master Captain License",
      issuer: "U.S. Coast Guard",
      expiryDate: "2024-12-31",
      status: "active",
    },
    {
      name: "First Aid Certification",
      issuer: "American Red Cross",
      expiryDate: "2024-06-30",
      status: "active",
    },
  ],
  metrics: {
    totalTrips: 450,
    hoursAtSea: 3600,
    onTimeRate: 98,
    satisfactionRate: 96,
  },
  availability: {
    schedule: [
      { day: "Monday", available: true },
      { day: "Tuesday", available: true },
      { day: "Wednesday", available: true },
      { day: "Thursday", available: true },
      { day: "Friday", available: true },
      { day: "Saturday", available: true },
      { day: "Sunday", available: false },
    ],
    preferredHours: "6:00 AM - 8:00 PM",
  },
  specialties: [
    "Luxury Yachts",
    "Sport Fishing",
    "Sailing",
    "Coastal Navigation",
  ],
};

export default function CaptainProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your captain profile and preferences
            </p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={captainProfile.image}
                        alt={captainProfile.name}
                        className="object-cover"
                        fill
                        priority
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{captainProfile.name}</h2>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{captainProfile.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({captainProfile.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="mt-4 grid w-full gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {captainProfile.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {captainProfile.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {captainProfile.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {captainProfile.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">Schedule</h4>
                    <div className="grid gap-2">
                      {captainProfile.availability.schedule.map((day) => (
                        <div
                          key={day.day}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{day.day}</span>
                          <Badge
                            variant={day.available ? "default" : "secondary"}
                          >
                            {day.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Preferred Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      {captainProfile.availability.preferredHours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Certifications and Metrics */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{captainProfile.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Trips
                      </span>
                      <span className="font-medium">
                        {captainProfile.metrics.totalTrips}
                      </span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Hours at Sea
                      </span>
                      <span className="font-medium">
                        {captainProfile.metrics.hoursAtSea}
                      </span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        On-Time Rate
                      </span>
                      <span className="font-medium">
                        {captainProfile.metrics.onTimeRate}%
                      </span>
                    </div>
                    <Progress
                      value={captainProfile.metrics.onTimeRate}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Satisfaction Rate
                      </span>
                      <span className="font-medium">
                        {captainProfile.metrics.satisfactionRate}%
                      </span>
                    </div>
                    <Progress
                      value={captainProfile.metrics.satisfactionRate}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Your licenses and certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {captainProfile.certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-start gap-4 rounded-lg border p-4"
                    >
                      <Shield className="mt-0.5 h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{cert.name}</h4>
                          <Badge
                            variant={
                              cert.status === "active" ? "default" : "secondary"
                            }
                          >
                            {cert.status === "active"
                              ? "Active"
                              : "Expiring Soon"}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Issued by {cert.issuer} · Expires{" "}
                          {format(new Date(cert.expiryDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload New Certification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
