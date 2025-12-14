"use client";

import data from "./data.json";
import { useAuth } from "@/hooks/useAuth";

import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Activity,
  Bell,
  Search,
  Menu,
  ChevronRight,
  Package,
  Clock,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  name?: string;
  avatar?: string;
  email?: string;
}

export default function Page() {
  const { user } = useAuth() as { user: User | string | null };

  const userName =
    typeof user === "object" && user?.name
      ? user.name
      : typeof user === "string"
      ? user.includes("@")
        ? user
            .split("@")[0]
            .replace(".", " ")
            .split(" ")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ")
        : user
      : "User";

  const userInitial = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarUrl = typeof user === "object" ? user?.avatar : undefined;

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Sales Today",
      value: "123",
      change: "+23.1%",
      icon: ShoppingCart,
      color: "text-violet-500",
    },
    {
      title: "Growth Rate",
      value: "18.2%",
      change: "+4.1%",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Olivia Martin",
      action: "created new project",
      time: "2 hours ago",
      avatar: "OM",
    },
    {
      id: 2,
      user: "Jackson Lee",
      action: "completed task",
      time: "4 hours ago",
      avatar: "JL",
    },
    {
      id: 3,
      user: "Isabella Nguyen",
      action: "left a comment",
      time: "6 hours ago",
      avatar: "IN",
    },
    {
      id: 4,
      user: "William Kim",
      action: "uploaded files",
      time: "8 hours ago",
      avatar: "WK",
    },
  ];

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-black/70 dark:text-white/70 hover:text-black hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50 dark:text-white/50" />
            <Input
              placeholder="Search anything..."
              className="pl-10 bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-black/70 dark:text-white/70 hover:text-black hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0a0a0a]" />
          </Button>

          <Avatar className="h-9 w-9 ring-2 ring-gray-200 dark:ring-white/20">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-gradient-to-br from-violet-600 to-blue-600 text-white font-bold text-sm">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </div>
      </header> */}

      <div className="@container/main flex flex-1 flex-col gap-8 p-6 lg:p-8">
        {/* Welcome */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-lg text-gray-600 dark:text-white/60">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 backdrop-blur-md hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-black/70 dark:text-white/70">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl text-black dark:text-white">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-white/50">
                Latest actions from your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-medium">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-black dark:text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-white/40">
                    {activity.time}
                  </span>
                </div>
              ))}
              <Button
                variant="ghost"
                className="w-full text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
              >
                View all activity <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <Card className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl text-black dark:text-white">
                Quick Summary
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-white/50">
                Your performance today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/20 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-black dark:text-white/70">
                        Tasks Completed
                      </p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-yellow-500/20 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-black dark:text-white/70">
                        Pending Orders
                      </p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/20 rounded-lg">
                      <Package className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-black dark:text-white/70">
                        New Messages
                      </p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 font-medium">
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-black dark:text-white">
              Revenue Overview
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-white/50">
              Last 30 days performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 rounded-xl bg-gradient-to-br from-violet-100/20 dark:from-violet-900/20 to-blue-100/20 dark:to-blue-900/20 border border-gray-200 dark:border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-black/40 dark:text-white/40 mx-auto mb-4" />
                <p className="text-black/50 dark:text-white/50">
                  Chart visualization coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// "use client";
// import data from "./data.json";
// import { useAuth } from "@/hooks/useAuth";

// export default function Page() {
//   const { user } = useAuth();

//   return (
//     <div className="flex flex-1 flex-col">
//       <div className="@container/main flex flex-1 flex-col gap-2">
//         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//           <div className="px-4 lg:px-6"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
