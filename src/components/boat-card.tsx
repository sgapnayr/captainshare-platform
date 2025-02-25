import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { StaticImageData } from "next/image";
interface BoatCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  rate: number;
  image: StaticImageData;
}

export function BoatCard({
  id,
  name,
  type,
  location,
  rate,
  image,
}: BoatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <Link
        href={`/boats/${id}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          className="object-cover transition-transform group-hover:scale-105"
          fill
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{type}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {location}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">${rate}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/boats/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
