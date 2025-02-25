"use client";

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
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Helper function to determine if user has specific role
const hasRole = (role: string) => {
  // This would actually check the user's role from auth context
  if (role === "owner") {
    return true;
  }
  // test nothing for now
  return true;
};

const navigation = [
  {
    name: "Overview (Owner)",
    href: "/dashboard/owner",
    icon: Home,
    role: "owner",
  },
  {
    name: "Overview (Captain)",
    href: "/dashboard/captain",
    icon: Home,
    role: "captain",
  },
  {
    name: "Boats",
    href: "/my-boats",
    icon: Ship,
  },
  {
    name: "Captains",
    href: "/my-captains",
    icon: Users,
  },
  {
    name: "Bookings",
    href: "/bookings",
    icon: Calendar,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart,
    role: "admin",
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
];

const adminNavigation = [
  {
    name: "Tax Forms",
    href: "/admin",
    icon: FileText,
    description: "W-9 and tax document management",
  },
  {
    name: "Payouts",
    href: "/payouts",
    icon: DollarSign,
    description: "Payment processing and history",
  },
  {
    name: "Migrations",
    href: "/migrations",
    icon: ArrowUpRight,
    description: "Migrations from Fareharbor or other platforms",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredNavigation = navigation.filter(
    (item) => !item.role || hasRole(item.role)
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

          {/* Administrative Section */}
          {(hasRole("admin") || hasRole("captain")) && (
            <>
              <div className="mx-3 my-2 text-xs font-semibold text-muted-foreground">
                Administrative
              </div>
              {adminNavigation.map((item) => {
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
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
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
          <div className="flex flex-1 items-center gap-4">
            <form className="flex-1">
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </form>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/10 px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
