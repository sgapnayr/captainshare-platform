"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  DollarSign,
  BanknoteIcon as Bank,
  AlertCircle,
  Download,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import DashboardLayout from "../../components/dashboard-layout";

// Sample data - would come from API
const payoutHistory = [
  {
    id: "1",
    amount: 1250.0,
    status: "completed",
    date: "2024-02-20",
    method: "Bank Transfer",
    reference: "PAY-123456",
  },
  {
    id: "2",
    amount: 875.5,
    status: "processing",
    date: "2024-02-15",
    method: "Bank Transfer",
    reference: "PAY-123455",
  },
  {
    id: "3",
    amount: 2100.0,
    status: "completed",
    date: "2024-02-10",
    method: "Bank Transfer",
    reference: "PAY-123454",
  },
];

const earnings = {
  available: 1875.0,
  pending: 450.0,
  lastPayout: "2024-02-20",
  nextPayout: "2024-03-01",
};

export default function PayoutsPage() {
  const [selectedMonth, setSelectedMonth] = useState("february");

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Payouts</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your earnings and payment settings
          </p>
        </div>

        {/* Earnings Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.available}</div>
              <p className="text-xs text-muted-foreground">
                Next payout on{" "}
                {format(new Date(earnings.nextPayout), "MMM d, yyyy")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Earnings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.pending}</div>
              <p className="text-xs text-muted-foreground">
                From recent bookings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Payout Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>
                Manage your payout preferences and bank information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bank className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Bank Account</h3>
                        <p className="text-sm text-muted-foreground">
                          ****6789 · Checking
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Payout Schedule</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Frequency</span>
                      <span>Weekly</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Day of week</span>
                      <span>Monday</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Change Schedule
                    </Button>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Payouts may take 1-3 business days to process depending on
                    your bank.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Payout History */}
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle>Payout History</CardTitle>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                View your past payouts and download statements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payoutHistory.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>
                        {format(new Date(payout.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>${payout.amount}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            payout.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {payout.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Statement
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
