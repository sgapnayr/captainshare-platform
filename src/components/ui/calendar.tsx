"use client";

import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Calendar({ className }: { className?: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className={cn("relative p-3", className)}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className={buttonVariants({ variant: "outline" }) + " w-full p-2"}
        calendarClassName="border border-gray-200 rounded-lg shadow-md"
      />
    </div>
  );
}
