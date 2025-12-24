import React, { useState } from "react";
import AdminSidebar from "~/components/layout/AdminSidebar";
import {
  Users,
  MapPin,
  MessageSquare,
  TrendingUp,
  Activity,
  Globe,
} from "lucide-react";
import { Button } from "~/components/ui/button";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <div
        className={`p-2 transition-all duration-300 h-full ${sidebarOpen ? "w-68" : "w-20"}`}
      >
        <AdminSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto p-2 pl-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Monitor StreetAI performance and user activity.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value="12,345"
              change="+12% from last month"
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="Active Locations"
              value="842"
              change="+5 new this week"
              icon={MapPin}
              color="bg-green-500"
            />
            <StatCard
              title="AI Consultations"
              value="45.2k"
              change="+28% inquiry rate"
              icon={MessageSquare}
              color="bg-purple-500"
            />
            <StatCard
              title="Platform Traffic"
              value="1.2M"
              change="Consistent growth"
              icon={Activity}
              color="bg-orange-500"
            />
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart Area (Mock) */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  User Activity Overview
                </h3>
                <Button variant="outline" size="sm" className="rounded-full">
                  Last 30 Days
                </Button>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between p-4 px-8 space-x-2">
                {/* Mock Bar Chart */}
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="w-full bg-blue-500 rounded-t-md hover:opacity-80 transition-opacity relative group"
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h * 10} visits
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>Jan 01</span>
                <span>Jan 15</span>
                <span>Jan 30</span>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Live Activity
              </h3>
              <div className="space-y-4">
                <ActivityItem
                  user="Sarah M."
                  action="asked about Bali"
                  time="2 min ago"
                  icon={MessageSquare}
                  iconColor="text-purple-500"
                />
                <ActivityItem
                  user="John D."
                  action="viewed Tokyo Map"
                  time="5 min ago"
                  icon={MapPin}
                  iconColor="text-green-500"
                />
                <ActivityItem
                  user="New User"
                  action="registered"
                  time="12 min ago"
                  icon={Users}
                  iconColor="text-blue-500"
                />
                <ActivityItem
                  user="System"
                  action="updated location data"
                  time="1 hour ago"
                  icon={Globe}
                  iconColor="text-orange-500"
                />
                <ActivityItem
                  user="Alex K."
                  action="left a review"
                  time="2 hours ago"
                  icon={TrendingUp}
                  iconColor="text-yellow-500"
                />
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-blue-500 hover:text-blue-600"
              >
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
        </div>
      </div>
      <p
        className={`text-sm ${change.includes("+") ? "text-green-500" : "text-gray-500"} font-medium flex items-center gap-1`}
      >
        {change.includes("+") && <TrendingUp className="w-3 h-3" />}
        {change}
      </p>
    </div>
  );
}

function ActivityItem({ user, action, time, icon: Icon, iconColor }: any) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div className={`mt-1 ${iconColor}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}
