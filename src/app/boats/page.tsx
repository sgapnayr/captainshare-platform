"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BoatCard } from "@/components/boat-card";
import Layout from "@/components/layout";
import Boat1 from "../../../assets/boat-1.jpg";
import Boat2 from "../../../assets/boat-2.jpg";
import Boat3 from "../../../assets/boat-3.jpg";

// Sample data - in a real app, this would come from an API
const boats = [
  {
    id: "1",
    name: "Sea Spirit",
    type: "Yacht",
    location: "Miami, FL",
    rate: 299,
    image: Boat1,
  },
  {
    id: "2",
    name: "Ocean Explorer",
    type: "Sailboat",
    location: "San Diego, CA",
    rate: 199,
    image: Boat2,
  },
  {
    id: "3",
    name: "Coastal Cruiser",
    type: "Catamaran",
    location: "Seattle, WA",
    rate: 249,
    image: Boat3,
  },
  // Add more boats...
];

export default function BoatsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBoats = boats.filter(
    (boat) =>
      boat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boat.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boat.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Available Boats
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or type..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBoats.map((boat) => (
            <BoatCard key={boat.id} {...boat} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
