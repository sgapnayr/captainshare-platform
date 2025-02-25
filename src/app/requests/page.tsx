"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Search,
  Ship,
  Calendar,
  Clock,
  MapPin,
  Star,
  Shield,
  MessageSquare,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Label } from "../../components/ui/label";
import DashboardLayout from "../../components/dashboard-layout";

// Sample data - would come from API
const requestsData = {
  captain: {
    sent: [
      {
        id: "1",
        boatName: "Sea Spirit",
        boatType: "Yacht",
        ownerName: "Michael Brown",
        date: "2024-03-15",
        time: "10:00 AM",
        duration: "6 hours",
        location: "Miami Marina",
        rate: 250,
        status: "pending",
        sentAt: "2024-02-25T10:00:00Z",
      },
      {
        id: "2",
        boatName: "Ocean Explorer",
        boatType: "Sailboat",
        ownerName: "Emma Wilson",
        date: "2024-03-20",
        time: "2:00 PM",
        duration: "4 hours",
        location: "Port of Miami",
        rate: 200,
        status: "accepted",
        sentAt: "2024-02-24T15:30:00Z",
      },
    ],
    received: [
      {
        id: "3",
        boatName: "Coastal Cruiser",
        boatType: "Catamaran",
        ownerName: "Sarah Johnson",
        date: "2024-03-18",
        time: "11:00 AM",
        duration: "8 hours",
        location: "Key Biscayne",
        rate: 300,
        status: "pending",
        sentAt: "2024-02-26T09:15:00Z",
      },
    ],
  },
  owner: {
    captainApplications: [
      {
        id: "1",
        captainName: "John Smith",
        experience: "12 years",
        rating: 4.9,
        reviewCount: 156,
        boatRequested: {
          name: "Sea Spirit",
          type: "Yacht",
          date: "2024-03-15",
          time: "10:00 AM",
        },
        certifications: [
          {
            name: "USCG Master Captain License",
            issuer: "U.S. Coast Guard",
            expiryDate: "2024-12-31",
          },
        ],
        completedTrips: 450,
        onTimeRate: 0.98,
        status: "pending",
        appliedAt: "2024-02-25T10:00:00Z",
      },
    ],
    sentRequests: [
      {
        id: "2",
        captainName: "Sarah Johnson",
        rating: 4.8,
        reviewCount: 98,
        boatName: "Ocean Explorer",
        date: "2024-03-20",
        time: "2:00 PM",
        duration: "4 hours",
        status: "accepted",
        sentAt: "2024-02-24T15:30:00Z",
      },
    ],
  },
};

export default function RequestsPage() {
  const [userRole, setUserRole] = useState<"captain" | "owner">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("userRole") as "captain" | "owner") || "captain"
      );
    }
    return "captain";
  });

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "declined":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
  };

  const handleAction = (action: "accept" | "decline", request: any) => {
    // In a real app, this would call an API
    console.log(`${action} request:`, request);
    setShowDetailsDialog(false);
    setFeedbackText("");
  };

  const CaptainView = () => (
    <div className="space-y-6">
      {/* Sent Requests */}
      <div>
        <h2 className="text-lg font-semibold">Sent Requests</h2>
        <div className="mt-4 grid gap-4">
          {requestsData.captain.sent.map((request) => (
            <div key={request.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{request.boatName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {request.boatType}
                  </p>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(request.date), "MMM d, yyyy")} at{" "}
                  {request.time}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {request.duration}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {request.location}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">${request.rate}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowDetailsDialog(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Received Requests */}
      <div>
        <h2 className="text-lg font-semibold">Received Requests</h2>
        <div className="mt-4 grid gap-4">
          {requestsData.captain.received.map((request) => (
            <div key={request.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{request.boatName}</h3>
                  <p className="text-sm text-muted-foreground">
                    from {request.ownerName}
                  </p>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(request.date), "MMM d, yyyy")} at{" "}
                  {request.time}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {request.duration}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {request.location}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">${request.rate}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAction("decline", request)}
                  >
                    Decline
                  </Button>
                  <Button onClick={() => handleAction("accept", request)}>
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const OwnerView = () => (
    <div className="space-y-6">
      {/* Captain Applications */}
      <div>
        <h2 className="text-lg font-semibold">Captain Applications</h2>
        <div className="mt-4 grid gap-4">
          {requestsData.owner.captainApplications.map((application) => (
            <div key={application.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {application.captainName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{application.captainName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      {application.rating} ({application.reviewCount} reviews)
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Requesting: {application.boatRequested.name} (
                    {application.boatRequested.type})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(
                      new Date(application.boatRequested.date),
                      "MMM d, yyyy"
                    )}{" "}
                    at {application.boatRequested.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>{application.certifications[0].name}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{application.completedTrips} trips completed</span>
                  <span>
                    {(application.onTimeRate * 100).toFixed(0)}% on-time rate
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAction("decline", application)}
                  >
                    Decline
                  </Button>
                  <Button onClick={() => handleAction("accept", application)}>
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sent Requests */}
      <div>
        <h2 className="text-lg font-semibold">Sent Requests</h2>
        <div className="mt-4 grid gap-4">
          {requestsData.owner.sentRequests.map((request) => (
            <div key={request.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{request.captainName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{request.captainName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      {request.rating} ({request.reviewCount} reviews)
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  <span>For: {request.boatName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(new Date(request.date), "MMM d, yyyy")} at{" "}
                    {request.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{request.duration}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Captain
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Requests</h1>
          <p className="mt-2 text-muted-foreground">
            {userRole === "captain"
              ? "Manage your trip requests and applications"
              : "Review captain applications and manage requests"}
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
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
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {userRole === "captain" ? <CaptainView /> : <OwnerView />}

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>
                Review the details of this request
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">{selectedRequest.boatName}</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Owner:</span>{" "}
                      {selectedRequest.ownerName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      {format(new Date(selectedRequest.date), "MMM d, yyyy")}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span>{" "}
                      {selectedRequest.time}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Duration:</span>{" "}
                      {selectedRequest.duration}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Location:</span>{" "}
                      {selectedRequest.location}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Rate:</span> $
                      {selectedRequest.rate}/hour
                    </p>
                  </div>
                </div>
                {selectedRequest.status === "pending" && (
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback or Notes</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Add any additional notes or feedback..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDetailsDialog(false)}
              >
                Close
              </Button>
              {selectedRequest?.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleAction("decline", selectedRequest)}
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleAction("accept", selectedRequest)}
                  >
                    Accept
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
