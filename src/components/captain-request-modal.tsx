"use client";

import { useState } from "react";
import { format } from "date-fns";
import { User2, Star, Shield, Ship, Award, Clock, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/lib/utils";

export interface CaptainRequest {
  id: string;
  captainName: string;
  experience: string;
  rating: number;
  reviewCount: number;
  certifications: {
    name: string;
    issuer: string;
    expiryDate: string;
  }[];
  boatRequested: {
    id: string;
    name: string;
    type: string;
  };
  completedTrips: number;
  onTimeRate: number;
}

interface CaptainRequestModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  request: CaptainRequest | null;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
}

export function CaptainRequestModal({
  isOpen,
  onOpenChange,
  request,
  onAccept,
  onDecline,
}: CaptainRequestModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {request && (
          <>
            <DialogHeader>
              <DialogTitle>New Captain Request</DialogTitle>
              <DialogDescription>
                A captain wants to join your fleet
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{request.captainName}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{request.experience} experience</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{request.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({request.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Ship className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Requesting to captain:</span>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">{request.boatRequested.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.boatRequested.type}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Certifications</span>
                  </div>
                  {request.certifications.map((cert, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          Expires {format(new Date(cert.expiryDate), "MM/yyyy")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Performance</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Completed Trips</p>
                      <p className="font-medium">{request.completedTrips}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">On-Time Rate</p>
                      <p className="font-medium">
                        {(request.onTimeRate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => onDecline(request.id)}
              >
                Decline
              </Button>
              <Button className="flex-1" onClick={() => onAccept(request.id)}>
                Accept Captain
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PendingCaptainRequestAlertProps {
  request: CaptainRequest;
  onView: () => void;
  onDismiss: () => void;
}

export function PendingCaptainRequestAlert({
  request,
  onView,
  onDismiss,
}: PendingCaptainRequestAlertProps) {
  return (
    <Alert className="mx-auto max-w-2xl">
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User2 className="h-4 w-4" />
          <span>
            {request.captainName} wants to captain your{" "}
            {request.boatRequested.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onView}>
            View Request
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

interface FloatingCaptainNotificationProps {
  count: number;
  onClick: () => void;
}

export function FloatingCaptainNotification({
  count,
  onClick,
}: FloatingCaptainNotificationProps) {
  return (
    <Button
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 rounded-full shadow-lg",
        count > 0 ? "visible" : "invisible"
      )}
      onClick={onClick}
    >
      <User2 className="h-4 w-4" />
      <span>{count} Captain Requests</span>
    </Button>
  );
}
