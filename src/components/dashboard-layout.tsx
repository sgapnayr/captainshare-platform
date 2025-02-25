"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Ship,
  Calendar,
  LogOut,
  Menu,
  User,
  Home,
  BarChart,
  MessageSquare,
  Bell,
  Users,
  FileText,
  Shield,
  DollarSign,
  Settings,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent } from "../components/ui/sheet";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";

import {
  TripRequestModal,
  PendingRequestAlert,
  FloatingNotification,
  type TripRequest,
} from "../components/trip-request-modal";
import {
  CaptainRequestModal,
  PendingCaptainRequestAlert,
  FloatingCaptainNotification,
  type CaptainRequest,
} from "../components/captain-request-modal";

// Helper function to determine if user has specific role
const hasRole = (role: string) => {
  // This would actually check the user's role from auth context
  if (role === "owner") {
    return true;
  }
  return true;
};

// Define userRole here, before it's used
const userRole: "captain" | "owner" = "captain";

// Update the navigation array to include the new Requests section and role-specific admin items
const navigation = [
  {
    name: "Overview",
    href: "/dashboard/owner",
    icon: Home,
    role: "owner",
  },
  {
    name: "Overview",
    href: "/dashboard/captain",
    icon: Home,
    role: "captain",
  },
  {
    name: "Boats",
    href: "/my-boats",
    icon: Ship,
    role: "captain",
  },
  {
    name: "Captains",
    href: "/my-captains",
    icon: Users,
    role: "owner",
  },
  {
    name: "Bookings",
    href: "/bookings",
    icon: Calendar,
  },
  {
    name: "Requests",
    href: "/requests",
    icon: MessageSquare,
  },
];

const adminNavigation = [
  {
    name: "Tax Forms",
    href: "/tax-forms",
    icon: FileText,
    description:
      userRole === "captain"
        ? "Your tax documents and forms"
        : "Captain tax document management",
    role: "all",
  },
  {
    name: "Migrations",
    href: "/migrations",
    icon: Shield,
    description: "For migrating data from FareHarbor",
    role: "owner",
  },
  {
    name: "Payouts",
    href: "/payouts",
    icon: DollarSign,
    description:
      userRole === "captain"
        ? "View your earnings and payment history"
        : "Manage captain payments",
    role: "all",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart,
    description: "View your analytics",
    role: "all",
  },
];

// Sample request data - would come from API
const sampleTripRequest: TripRequest = {
  id: "1",
  companyName: "Luxury Charters Inc.",
  boatName: "Ocean Breeze",
  boatType: "Yacht",
  date: "2024-03-15",
  time: "10:00 AM",
  duration: "6 hours",
  payRate: 250,
  location: "Miami Marina",
};

const sampleCaptainRequest: CaptainRequest = {
  id: "1",
  captainName: "Robert Wilson",
  experience: "10 years",
  rating: 4.9,
  reviewCount: 156,
  certifications: [
    {
      name: "USCG Master Captain License",
      issuer: "U.S. Coast Guard",
      expiryDate: "2024-12-31",
    },
  ],
  boatRequested: {
    id: "1",
    name: "Sea Spirit",
    type: "Yacht",
  },
  completedTrips: 450,
  onTimeRate: 0.98,
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState<"captain" | "owner">(() => {
    // Check localStorage on initial render
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("userRole") as "captain" | "owner") || "captain"
      );
    }
    return "captain";
  });

  // Filter navigation based on current role
  const filteredNavigation = navigation.filter(
    (item) =>
      !item.role ||
      item.role === userRole ||
      (item.role === "admin" && hasRole("admin"))
  );

  const NavContent = () => (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Ship className="h-6 w-6" />
            <span>CaptainShare</span>
          </Link>
        </div>
        <nav className="grid gap-1 px-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                  isActive ? "bg-accent" : "transparent"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}

          {/* Profile Link */}
          <Link
            href={
              userRole === "captain" ? "/profile/captain" : "/profile/owner"
            }
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
              pathname.includes("/profile") ? "bg-accent" : "transparent"
            )}
          >
            <Settings className="h-4 w-4" />
            My Profile
          </Link>

          {/* Administrative Section */}
          {(hasRole("admin") || hasRole("captain")) && (
            <>
              <div className="mx-3 my-2 text-xs font-semibold text-muted-foreground">
                Administrative
              </div>
              {adminNavigation
                .filter((item) => item.role === "all" || item.role === userRole)
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href ? "bg-accent" : "transparent"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
            </>
          )}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-4 rounded-lg px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">
              john@example.com
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );

  // Trip request state (for captains)
  const [showTripModal, setShowTripModal] = useState(false);
  const [showTripAlert, setShowTripAlert] = useState(true); // Start with alert visible
  const [pendingTripRequests, setPendingTripRequests] = useState<TripRequest[]>(
    [sampleTripRequest]
  );
  const [currentTripRequest, setCurrentTripRequest] =
    useState<TripRequest | null>(sampleTripRequest);

  // Captain request state (for boat owners)
  const [showCaptainModal, setShowCaptainModal] = useState(false);
  const [showCaptainAlert, setShowCaptainAlert] = useState(true); // Start with alert visible
  const [pendingCaptainRequests, setPendingCaptainRequests] = useState<
    CaptainRequest[]
  >([sampleCaptainRequest]);
  const [currentCaptainRequest, setCurrentCaptainRequest] =
    useState<CaptainRequest | null>(sampleCaptainRequest);

  // Trip request handlers
  const handleTripModalOpenChange = (open: boolean) => {
    setShowTripModal(open);
    if (!open) {
      setShowTripAlert(true);
    }
  };

  const handleAcceptTrip = (requestId: string) => {
    setPendingTripRequests((prev) =>
      prev.filter((req) => req.id !== requestId)
    );
    setShowTripModal(false);
    setShowTripAlert(false);
  };

  const handleDeclineTrip = (requestId: string) => {
    setPendingTripRequests((prev) =>
      prev.filter((req) => req.id !== requestId)
    );
    setShowTripModal(false);
    setShowTripAlert(false);
  };

  const handleViewTripRequest = () => {
    setShowTripModal(true);
    setShowTripAlert(false);
  };

  const handleDismissTripAlert = () => {
    setShowTripAlert(false);
  };

  // Captain request handlers
  const handleCaptainModalOpenChange = (open: boolean) => {
    setShowCaptainModal(open);
    if (!open) {
      setShowCaptainAlert(true);
    }
  };

  const handleAcceptCaptain = (requestId: string) => {
    setPendingCaptainRequests((prev) =>
      prev.filter((req) => req.id !== requestId)
    );
    setShowCaptainModal(false);
    setShowCaptainAlert(false);
  };

  const handleDeclineCaptain = (requestId: string) => {
    setPendingCaptainRequests((prev) =>
      prev.filter((req) => req.id !== requestId)
    );
    setShowCaptainModal(false);
    setShowCaptainAlert(false);
  };

  const handleViewCaptainRequest = () => {
    setShowCaptainModal(true);
    setShowCaptainAlert(false);
  };

  const handleDismissCaptainAlert = () => {
    setShowCaptainAlert(false);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col border-r lg:flex">
        <NavContent />
      </aside>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px]">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <form className="flex-1">
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </form>
            </div>
            <div className="flex items-center gap-4">
              {/* Role Toggle */}
              <div className="flex items-center gap-2">
                <Label htmlFor="role-toggle" className="text-sm font-medium">
                  {userRole === "captain" ? "Captain Mode" : "Owner Mode"}
                </Label>
                <Switch
                  id="role-toggle"
                  checked={userRole === "owner"}
                  onCheckedChange={(checked) => {
                    const newRole = checked ? "owner" : "captain";
                    setUserRole(newRole);
                    localStorage.setItem("userRole", newRole);
                  }}
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (userRole === "captain") {
                    setShowTripModal(true);
                  } else {
                    setShowCaptainModal(true);
                  }
                }}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/10 px-4">
          {children}
          {userRole === "captain" ? (
            <>
              <TripRequestModal
                isOpen={showTripModal}
                onOpenChange={handleTripModalOpenChange}
                request={currentTripRequest}
                onAccept={handleAcceptTrip}
                onDecline={handleDeclineTrip}
              />
              {showTripAlert && currentTripRequest && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl">
                  <PendingRequestAlert
                    request={currentTripRequest}
                    onView={handleViewTripRequest}
                    onDismiss={handleDismissTripAlert}
                  />
                </div>
              )}
              <FloatingNotification
                count={pendingTripRequests.length}
                onClick={handleViewTripRequest}
              />
            </>
          ) : (
            <>
              <CaptainRequestModal
                isOpen={showCaptainModal}
                onOpenChange={handleCaptainModalOpenChange}
                request={currentCaptainRequest}
                onAccept={handleAcceptCaptain}
                onDecline={handleDeclineCaptain}
              />
              {showCaptainAlert && currentCaptainRequest && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl">
                  <PendingCaptainRequestAlert
                    request={currentCaptainRequest}
                    onView={handleViewCaptainRequest}
                    onDismiss={handleDismissCaptainAlert}
                  />
                </div>
              )}
              <FloatingCaptainNotification
                count={pendingCaptainRequests.length}
                onClick={handleViewCaptainRequest}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
