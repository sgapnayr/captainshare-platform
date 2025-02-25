"use client";

import { useState } from "react";
import { FileText, Upload, Check, AlertTriangle, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import DashboardLayout from "../../components/dashboard-layout";

// Sample data - would come from API
const taxForms = [
  {
    id: "1",
    type: "W-9",
    status: "completed",
    submittedDate: "2024-01-15",
    taxYear: "2024",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    type: "1099-NEC",
    status: "pending",
    submittedDate: null,
    taxYear: "2023",
    lastUpdated: "2024-01-01",
  },
];

const requiredForms = [
  {
    type: "W-9",
    description: "Request for Taxpayer Identification Number",
    required: true,
  },
  {
    type: "1099-NEC",
    description: "Nonemployee Compensation",
    required: true,
  },
];

export default function TaxFormsPage() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tax Forms</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your tax documents and forms
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Required Forms</CardTitle>
              <CardDescription>
                Forms you need to submit for tax purposes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requiredForms.map((form) => (
                  <div
                    key={form.type}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <FileText className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{form.type}</h3>
                        {form.required && (
                          <Badge variant="destructive">Required</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {form.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload New Form"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>
                Track your form submissions and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form</TableHead>
                    <TableHead>Tax Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>{form.type}</TableCell>
                      <TableCell>{form.taxYear}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {form.status === "completed" ? (
                            <>
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-500">
                                Completed
                              </span>
                            </>
                          ) : form.status === "pending" ? (
                            <>
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-yellow-500">
                                Pending
                              </span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-destructive" />
                              <span className="text-sm text-destructive">
                                Missing
                              </span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{form.lastUpdated}</TableCell>
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
