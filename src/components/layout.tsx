"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CaptainShare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/boats"
              className="text-sm font-medium hover:text-primary"
            >
              Find Boats
            </Link>
            <Link
              href="/captains"
              className="text-sm font-medium hover:text-primary"
            >
              Find Captains
            </Link>
            <Link
              href="/dashboard/owner"
              className="text-sm font-medium hover:text-primary"
            >
              I am a Owner
            </Link>
            <Link
              href="/dashboard/captain"
              className="text-sm font-medium hover:text-primary"
            >
              I am a Captain
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="h-9 w-9"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="default" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 w-9"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-b">
            <nav className="container flex flex-col space-y-4 py-4">
              <Link
                href="/boats"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Find Boats
              </Link>
              <Link
                href="/captains"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Find Captains
              </Link>
              <Link
                href="/dashboard/owner"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                I am a Owner
              </Link>
              <Link
                href="/dashboard/captain"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                I am a Captain
              </Link>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDark}
                  className="h-9 w-9"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="default" asChild className="w-full">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      <main className="px-3 md:px-8">{children}</main>
      {/* <footer className="border-t px-8">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/press">Press</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/safety">Safety</Link>
                </li>
                <li>
                  <Link href="/cancellation">Cancellation</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="https://twitter.com">Twitter</Link>
                </li>
                <li>
                  <Link href="https://instagram.com">Instagram</Link>
                </li>
                <li>
                  <Link href="https://facebook.com">Facebook</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CaptainShare. All rights reserved.
          </div>
        </div>
      </footer> */}
    </div>
  );
}
