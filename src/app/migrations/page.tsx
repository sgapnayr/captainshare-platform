"use client";

import { useState } from "react";
import { Upload, CheckCircle2, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard-layout";

// Sample data - would come from API
const migrationHistory = [
  {
    id: "1",
    platform: "FareHarbor",
    type: "Boats",
    status: "completed",
    date: "2024-02-20",
    records: 156,
    errors: 0,
  },
  {
    id: "2",
    platform: "GetMyBoat",
    type: "Bookings",
    status: "failed",
    date: "2024-02-19",
    records: 89,
    errors: 3,
  },
];

export default function MigrationsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigration = () => {
    setIsMigrating(true);
    // Simulate migration progress
    const interval = setInterval(() => {
      setMigrationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsMigrating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Data Migration</h1>
          <p className="mt-2 text-muted-foreground">
            Import your data from other booking platforms
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Migration Tool */}
          <Card>
            <CardHeader>
              <CardTitle>Import Data</CardTitle>
              <CardDescription>
                Select a platform and data type to begin migration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select
                    value={selectedPlatform}
                    onValueChange={setSelectedPlatform}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fareharbor">FareHarbor</SelectItem>
                      <SelectItem value="getmyboat">GetMyBoat</SelectItem>
                      <SelectItem value="boatsetter">Boatsetter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boats">Boats</SelectItem>
                      <SelectItem value="bookings">Bookings</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="availability">Availability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPlatform === "fareharbor" && (
                  <Alert>
                    <Database className="h-4 w-4" />
                    <AlertTitle>FareHarbor API Connection</AlertTitle>
                    <AlertDescription>
                      You will need your FareHarbor API credentials to proceed
                      with the migration.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Migration Progress</h3>
                      {isMigrating && (
                        <p className="text-sm text-muted-foreground">
                          Importing data... Please do not close this page.
                        </p>
                      )}
                    </div>
                    {migrationProgress === 100 && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {(isMigrating || migrationProgress > 0) && (
                    <Progress value={migrationProgress} className="h-2" />
                  )}
                </div>

                <Button
                  onClick={handleMigration}
                  disabled={!selectedPlatform || isMigrating}
                  className="w-full"
                >
                  {isMigrating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Migrating...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Start Migration
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Migration History */}
          <Card>
            <CardHeader>
              <CardTitle>Migration History</CardTitle>
              <CardDescription>
                View past data migrations and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {migrationHistory.map((migration) => (
                    <TableRow key={migration.id}>
                      <TableCell>{migration.platform}</TableCell>
                      <TableCell>{migration.type}</TableCell>
                      <TableCell>
                        {migration.records}
                        {migration.errors > 0 && (
                          <span className="ml-2 text-sm text-destructive">
                            ({migration.errors} errors)
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            migration.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {migration.status}
                        </span>
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
