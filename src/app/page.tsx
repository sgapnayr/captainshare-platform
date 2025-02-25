import Link from "next/link";
import { ArrowRight, Anchor, Ship, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
              zIndex: -1,
            }}
          />
        </div>
        <div className="container relative">
          <div className="flex min-h-[600px] flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Next Adventure
              <br />
              Starts Here
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-lg text-muted-foreground">
              Connect with experienced captains or rent out your boat. The
              perfect match for your maritime journey.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Sign Up as Captain
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/boats/new">List Your Boat</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-24">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          How CaptainShare Works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Anchor className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Find Your Captain</h3>
            <p className="mt-2 text-muted-foreground">
              Browse through our network of experienced and certified captains.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Ship className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Choose Your Boat</h3>
            <p className="mt-2 text-muted-foreground">
              Select from a wide range of boats for any occasion or adventure.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Book Instantly</h3>
            <p className="mt-2 text-muted-foreground">
              Secure your booking with our instant confirmation system.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of boat owners and captains on CaptainShare.
            </p>
            <Button size="lg" className="mt-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
