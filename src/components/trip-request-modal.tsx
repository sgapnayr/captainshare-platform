"use client";

import { format } from "date-fns";
import { Ship, Calendar, Clock, DollarSign, MapPin, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface TripRequest {
  id: string;
  companyName: string;
  boatName: string;
  boatType: string;
  date: string;
  time: string;
  duration: string;
  payRate: number;
  location: string;
}

interface TripRequestModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  request: TripRequest | null;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
}

export function TripRequestModal({
  isOpen,
  onOpenChange,
  request,
  onAccept,
  onDecline,
}: TripRequestModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {request && (
          <>
            <DialogHeader>
              <DialogTitle>New Trip Request</DialogTitle>
              <DialogDescription>
                {request.companyName} has requested you for a charter
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{request.boatName}</span>
                  <span className="text-sm text-muted-foreground">
                    ({request.boatType})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(request.date), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {request.time} · {request.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {request.location}
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />$
                  {request.payRate}/hour
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
                Accept Trip
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PendingRequestAlertProps {
  request: TripRequest;
  onView: () => void;
  onDismiss: () => void;
}

export function PendingRequestAlert({
  request,
  onView,
  onDismiss,
}: PendingRequestAlertProps) {
  return (
    <Alert className="bg-background shadow-lg border-primary">
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ship className="h-4 w-4" />
          <span>
            New trip request from {request.companyName} for{" "}
            {format(new Date(request.date), "MMM d")}
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

interface FloatingNotificationProps {
  count: number;
  onClick: () => void;
}

export function FloatingNotification({
  count,
  onClick,
}: FloatingNotificationProps) {
  return (
    <Button
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 rounded-full shadow-lg",
        count > 0 ? "visible" : "invisible"
      )}
      onClick={onClick}
    >
      <Ship className="h-4 w-4" />
      <span>{count} New Requests</span>
    </Button>
  );
}
