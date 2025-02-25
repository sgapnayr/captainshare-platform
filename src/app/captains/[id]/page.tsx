"use client";

import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  Shield,
  Anchor,
  Award,
  MessageCircle,
  ThumbsUp,
  Ship,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout";
import Captain1 from "../../../../assets/captain-1.jpg";

const captain = {
  id: "1",
  name: "Captain John Smith",
  image: Captain1,
  coverImage: Captain1,
  location: "Miami, FL",
  experience: 12,
  rating: 4.9,
  reviewCount: 128,
  hourlyRate: 150,
  bio: "Professional captain with over 12 years of experience in luxury yachts and sailing vessels. Certified by USCG with a perfect safety record. Specialized in coastal cruising and sport fishing.",
  specialties: [
    "Luxury Yachts",
    "Sport Fishing",
    "Sailing",
    "Coastal Navigation",
  ],
  certifications: [
    {
      name: "USCG Master Captain License",
      issuer: "U.S. Coast Guard",
      year: "2012",
    },
    {
      name: "First Aid & CPR",
      issuer: "American Red Cross",
      year: "2023",
    },
    {
      name: "Marine Radio Operation",
      issuer: "FCC",
      year: "2012",
    },
  ],
  availability: {
    general: "Available weekdays and weekends",
    preferredHours: "6:00 AM - 8:00 PM",
    nextAvailable: "Tomorrow",
  },
  stats: {
    tripsCompleted: 450,
    hoursAtSea: 3600,
    yearsExperience: 12,
    returnRate: 85,
  },
  reviews: [
    {
      id: "1",
      author: "Michael R.",
      rating: 5,
      date: "February 2024",
      content:
        "Captain John was exceptional! His knowledge of the local waters and fishing spots made our trip unforgettable. Highly professional and friendly.",
      tripType: "Sport Fishing",
      helpful: 12,
    },
    {
      id: "2",
      author: "Sarah L.",
      rating: 5,
      date: "January 2024",
      content:
        "Amazing sunset cruise with Captain John. He was very knowledgeable and made sure everyone was comfortable and having a great time.",
      tripType: "Sunset Cruise",
      helpful: 8,
    },
    {
      id: "3",
      author: "David M.",
      rating: 4,
      date: "January 2024",
      content:
        "Great experience overall. Captain John is very skilled and made our day on the water memorable.",
      tripType: "Day Charter",
      helpful: 5,
    },
  ],
  recentTrips: [
    {
      type: "Luxury Yacht Charter",
      location: "Miami Beach",
      duration: "8 hours",
      date: "Last week",
    },
    {
      type: "Sport Fishing Trip",
      location: "Biscayne Bay",
      duration: "6 hours",
      date: "2 weeks ago",
    },
  ],
};

export default function CaptainProfilePage() {
  return (
    <Layout>
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-[300px] w-full">
          <Image
            src={captain.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        </div>

        <div className="container relative">
          {/* Profile Header */}
          <div className="relative -mt-20 flex flex-col items-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-background">
              <Image
                src={captain.image || "/placeholder.svg"}
                alt={captain.name}
                className="object-cover"
                fill
                priority
              />
            </div>
            <h1 className="mt-4 text-3xl font-bold">{captain.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {captain.location}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 font-medium">{captain.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({captain.reviewCount} reviews)
              </span>
              <Badge variant="secondary" className="ml-2">
                <Shield className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Left Column - Info */}
            <div className="space-y-6 lg:col-span-2">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{captain.bio}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium">Specialties</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {captain.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Languages</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary">English</Badge>
                        <Badge variant="secondary">Spanish</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardDescription>Trips Completed</CardDescription>
                    <CardTitle>{captain.stats.tripsCompleted}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardDescription>Hours at Sea</CardDescription>
                    <CardTitle>{captain.stats.hoursAtSea}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardDescription>Years Experience</CardDescription>
                    <CardTitle>{captain.stats.yearsExperience}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardDescription>Return Rate</CardDescription>
                    <CardTitle>{captain.stats.returnRate}%</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {captain.certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex items-start gap-3 rounded-lg border p-3"
                      >
                        <Award className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer} · {cert.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {captain.reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="ml-1">{review.rating}</span>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          {review.tripType}
                        </Badge>
                        <p className="mt-2 text-muted-foreground">
                          {review.content}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ${captain.hourlyRate}
                        </span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{captain.availability.preferredHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{captain.availability.general}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Anchor className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Available {captain.availability.nextAvailable}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="lg">Book Now</Button>
                      <Button variant="outline" size="lg">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Captain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Trips */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {captain.recentTrips.map((trip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border p-3"
                      >
                        <Ship className="mt-0.5 h-5 w-5 text-muted-foreground" />{" "}
                        {/* Fixed Ship variable */}
                        <div>
                          <h4 className="font-medium">{trip.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {trip.location} · {trip.duration}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {trip.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
