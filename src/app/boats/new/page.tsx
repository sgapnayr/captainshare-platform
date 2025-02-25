"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";

export default function AddBoatPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In a real app, this would submit to an API
    setTimeout(() => {
      router.push("/dashboard/owner");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container max-w-2xl py-10 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add Your Boat</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your boat details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Boat Name</Label>
              <Input id="name" placeholder="e.g. Sea Spirit" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Boat Type</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select boat type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yacht">Yacht</SelectItem>
                  <SelectItem value="sailboat">Sailboat</SelectItem>
                  <SelectItem value="catamaran">Catamaran</SelectItem>
                  <SelectItem value="powerboat">Powerboat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. Miami Marina" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Brief Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your boat..."
                className="h-24"
              />
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <Label>Photos</Label>
            <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop photos here or click to upload
                </p>
                <Button type="button" variant="outline" className="mt-4">
                  Upload Photos
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Hourly Rate (USD)</Label>
              <Input
                id="rate"
                type="number"
                min="0"
                placeholder="e.g. 150"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Boat..." : "Add Boat"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
