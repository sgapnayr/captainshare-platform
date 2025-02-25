import Image from "next/image";
import { Calendar, MapPin, Anchor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import Boat1 from "../../../../assets/boat-1.jpg";
import Boat2 from "../../../../assets/boat-2.jpg";
import Boat3 from "../../../../assets/boat-3.jpg";

// Sample data - in a real app, this would come from an API based on the ID
const boat = {
  id: "1",
  name: "Sea Spirit",
  type: "Yacht",
  location: "Miami, FL",
  rate: 299,
  capacity: 12,
  length: "42ft",
  description:
    "Experience luxury on the water with this beautiful yacht. Perfect for day trips and special occasions.",
  features: [
    "GPS Navigation",
    "Sound System",
    "Kitchen",
    "Bathroom",
    "Sun Deck",
  ],
  images: [Boat1, Boat2, Boat3],
};

export default function BoatDetailsPage() {
  return (
    <Layout>
      <div className="container py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={boat.images[0] || "/placeholder.svg"}
                alt={boat.name}
                className="object-cover"
                fill
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {boat.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${boat.name} ${index + 2}`}
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{boat.name}</h1>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {boat.location}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Anchor className="h-4 w-4" />
                <span>{boat.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Up to {boat.capacity} guests</span>
              </div>
            </div>
            <p className="text-muted-foreground">{boat.description}</p>
            <div>
              <h3 className="font-semibold">Features</h3>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {boat.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">${boat.rate}</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
