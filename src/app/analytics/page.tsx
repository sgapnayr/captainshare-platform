"use client";

import { useState } from "react";
import {
  Users,
  Ship,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import DashboardLayout from "@/components/dashboard-layout";

// Sample data - would come from API
const analyticsData = {
  overview: {
    totalUsers: {
      value: 2456,
      change: 12.5,
      timeframe: "vs last month",
    },
    totalBoats: {
      value: 342,
      change: 8.2,
      timeframe: "vs last month",
    },
    totalRevenue: {
      value: 156400,
      change: 15.3,
      timeframe: "vs last month",
    },
    activeBookings: {
      value: 189,
      change: -2.4,
      timeframe: "vs last month",
    },
  },
  revenueData: [
    { month: "January", revenue: 98000 },
    { month: "February", revenue: 112000 },
    { month: "March", revenue: 128000 },
    { month: "April", revenue: 142000 },
    { month: "May", revenue: 156400 },
  ],
  bookingsByType: [
    { type: "Yacht", bookings: 145 },
    { type: "Sailboat", bookings: 86 },
    { type: "Catamaran", bookings: 65 },
    { type: "Powerboat", bookings: 45 },
  ],
  userGrowth: [
    { month: "January", desktop: 1250, mobile: 600 },
    { month: "February", desktop: 1400, mobile: 600 },
    { month: "March", desktop: 1500, mobile: 680 },
    { month: "April", desktop: 1600, mobile: 720 },
    { month: "May", desktop: 1700, mobile: 756 },
  ],
};

const userGrowthConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const bookingsConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const revenueConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="mt-2 text-muted-foreground">
              Platform performance and insights
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.totalUsers.value}
              </div>
              <div className="flex items-center text-xs">
                {analyticsData.overview.totalUsers.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    analyticsData.overview.totalUsers.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {analyticsData.overview.totalUsers.change}%
                </span>
                <span className="ml-1 text-muted-foreground">
                  {analyticsData.overview.totalUsers.timeframe}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Boats</CardTitle>
              <Ship className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.totalBoats.value}
              </div>
              <div className="flex items-center text-xs">
                {analyticsData.overview.totalBoats.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    analyticsData.overview.totalBoats.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {analyticsData.overview.totalBoats.change}%
                </span>
                <span className="ml-1 text-muted-foreground">
                  {analyticsData.overview.totalBoats.timeframe}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${analyticsData.overview.totalRevenue.value.toLocaleString()}
              </div>
              <div className="flex items-center text-xs">
                {analyticsData.overview.totalRevenue.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    analyticsData.overview.totalRevenue.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {analyticsData.overview.totalRevenue.change}%
                </span>
                <span className="ml-1 text-muted-foreground">
                  {analyticsData.overview.totalRevenue.timeframe}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.activeBookings.value}
              </div>
              <div className="flex items-center text-xs">
                {analyticsData.overview.activeBookings.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    analyticsData.overview.activeBookings.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {analyticsData.overview.activeBookings.change}%
                </span>
                <span className="ml-1 text-muted-foreground">
                  {analyticsData.overview.activeBookings.timeframe}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={revenueConfig}
                className="min-h-[300px] w-full"
              >
                <LineChart data={analyticsData.revenueData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bookings by Type Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Boat Type</CardTitle>
              <CardDescription>
                Distribution of bookings across boat types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={bookingsConfig}
                className="min-h-[300px] w-full"
              >
                <BarChart data={analyticsData.bookingsByType}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="type"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Monthly active users by platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={userGrowthConfig}
                className="min-h-[300px] w-full"
              >
                <LineChart data={analyticsData.userGrowth}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="desktop"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="mobile"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      Average Booking Value
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Per transaction
                    </div>
                  </div>
                  <div className="text-2xl font-bold">$827</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Conversion Rate</div>
                    <div className="text-xs text-muted-foreground">
                      Visitors to bookings
                    </div>
                  </div>
                  <div className="text-2xl font-bold">3.2%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      Customer Satisfaction
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Average rating
                    </div>
                  </div>
                  <div className="text-2xl font-bold">4.8</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Repeat Customers</div>
                    <div className="text-xs text-muted-foreground">
                      Return rate
                    </div>
                  </div>
                  <div className="text-2xl font-bold">42%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
