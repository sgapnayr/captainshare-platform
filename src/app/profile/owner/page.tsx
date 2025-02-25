"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  Upload,
  Edit,
  Building,
  CreditCard,
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
import DashboardLayout from "@/components/dashboard-layout";
import Captain1 from "../../../../assets/captain-1.jpg";

// Sample owner profile data
const ownerProfile = {
  name: "Michael Brown",
  email: "michael.brown@example.com",
  phone: "+1 (305) 555-0124",
  location: "Miami, FL",
  image: Captain1,
  companyName: "Luxury Marine Rentals LLC",
  memberSince: "2020-01-15",
  bio: "Premium boat rental service provider specializing in luxury yachts and sailing experiences. Committed to providing exceptional maritime experiences.",
  fleet: {
    totalBoats: 5,
    activeListings: 4,
    maintenanceNeeded: 1,
  },
  businessMetrics: {
    totalBookings: 450,
    totalRevenue: 180000,
    averageRating: 4.8,
    repeatCustomers: 65,
  },
  documents: [
    {
      name: "Business License",
      type: "PDF",
      status: "verified",
      expiryDate: "2024-12-31",
    },
    {
      name: "Insurance Policy",
      type: "PDF",
      status: "verified",
      expiryDate: "2024-12-31",
    },
    {
      name: "Tax Registration",
      type: "PDF",
      status: "pending",
      expiryDate: null,
    },
  ],
  paymentInfo: {
    method: "Bank Account",
    status: "verified",
    lastPayout: "2024-02-20",
    nextPayout: "2024-03-01",
  },
};

export default function OwnerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your owner profile and business settings
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
                        src={ownerProfile.image}
                        alt={ownerProfile.name}
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
                  <h2 className="text-xl font-bold">{ownerProfile.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {ownerProfile.companyName}
                  </p>
                  <div className="mt-4 grid w-full gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {ownerProfile.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {ownerProfile.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {ownerProfile.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      Member since{" "}
                      {format(new Date(ownerProfile.memberSince), "MMMM yyyy")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fleet Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Boats
                    </span>
                    <span className="font-medium">
                      {ownerProfile.fleet.totalBoats}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Active Listings
                    </span>
                    <Badge variant="default">
                      {ownerProfile.fleet.activeListings}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Maintenance Needed
                    </span>
                    <Badge variant="destructive">
                      {ownerProfile.fleet.maintenanceNeeded}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {ownerProfile.paymentInfo.method}
                      </span>
                    </div>
                    <Badge variant="secondary">Verified</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      Last payout:{" "}
                      {format(
                        new Date(ownerProfile.paymentInfo.lastPayout),
                        "MMM d, yyyy"
                      )}
                    </p>
                    <p className="text-muted-foreground">
                      Next payout:{" "}
                      {format(
                        new Date(ownerProfile.paymentInfo.nextPayout),
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Payment Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Business Metrics and Documents */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ownerProfile.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Bookings
                      </span>
                      <span className="font-medium">
                        {ownerProfile.businessMetrics.totalBookings}
                      </span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Revenue
                      </span>
                      <span className="font-medium">
                        $
                        {ownerProfile.businessMetrics.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Average Rating
                      </span>
                      <span className="font-medium">
                        {ownerProfile.businessMetrics.averageRating}
                      </span>
                    </div>
                    <Progress
                      value={ownerProfile.businessMetrics.averageRating * 20}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Repeat Customers
                      </span>
                      <span className="font-medium">
                        {ownerProfile.businessMetrics.repeatCustomers}%
                      </span>
                    </div>
                    <Progress
                      value={ownerProfile.businessMetrics.repeatCustomers}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>
                  Manage your business licenses and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ownerProfile.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-start gap-4 rounded-lg border p-4"
                    >
                      <FileText className="mt-0.5 h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{doc.name}</h4>
                          <Badge
                            variant={
                              doc.status === "verified"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {doc.status === "verified" ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                        {doc.expiryDate && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Expires{" "}
                            {format(new Date(doc.expiryDate), "MMM d, yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Document
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
