import { Link, useLocation } from "react-router";
import {
  Home,
  MapPin,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  Map as MapIcon,
} from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react";

interface DashboardSideBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function DashboardSideBar({
  isOpen,
  onToggle,
}: DashboardSideBarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    // Exact match for dashboard home, startsWith for others
    if (path === "/dashboard") {
      return (
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/"
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full z-40">
      <div
        className={`shadow-2xl border border-white/20 bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden h-full transition-all duration-300 ease-spring flex flex-col ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between h-16 shrink-0">
          <div
            className={`flex items-center gap-3 transition-all duration-300 overflow-hidden ${isOpen ? "w-32 opacity-100" : "w-0 opacity-0"}`}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">
              StreetAI
            </span>
          </div>
          <button
            onClick={onToggle}
            className={`p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ${!isOpen && "mx-auto"}`}
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${!isOpen && "rotate-180"}`}
            />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2 flex-1 overflow-y-auto overflow-x-hidden mt-2 scrollbar-none">
          {/* Main Links */}
          <Link to="/dashboard">
            <SidebarItem
              icon={Home}
              label="Dashboard"
              isOpen={isOpen}
              active={isActive("/dashboard")}
            />
          </Link>

          <Link to="/dashboard/destinations">
            <SidebarItem
              icon={MapPin}
              label="Destinations"
              isOpen={isOpen}
              active={isActive("/dashboard/destinations")}
            />
          </Link>
        </nav>

        {/* Footer / Profile / Settings / Logout */}
        <div className="p-3 border-t border-gray-100 mt-auto space-y-2">
          <Link to="/profile">
            <SidebarItem
              icon={User}
              label="Profile"
              isOpen={isOpen}
              active={isActive("/profile")}
            />
          </Link>

          <Link to="/settings">
            <SidebarItem
              icon={Settings}
              label="Settings"
              isOpen={isOpen}
              active={isActive("/settings")}
            />
          </Link>

          <div className="h-px bg-slate-100 my-2 mx-1" />

          <SignOutButton>
            <button className="w-full">
              <SidebarItem
                icon={LogOut}
                label="Logout"
                isOpen={isOpen}
                danger
              />
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  isOpen,
  active,
  danger,
}: {
  icon: any;
  label: string;
  isOpen: boolean;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={`
      relative group flex items-center p-3 rounded-2xl transition-all duration-200 cursor-pointer
      ${active ? "bg-linear-to-r from-blue-50 to-blue-100/50 text-blue-600 shadow-sm border-l-2 border-blue-500" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
      ${danger && "hover:bg-red-50 hover:text-red-500"}
      ${!isOpen && "justify-center"}
    `}
    >
      <Icon
        className={`w-6 h-6 shrink-0 ${active ? "fill-blue-600/20 text-blue-600" : ""}`}
      />

      <span
        className={`
        font-medium whitespace-nowrap overflow-hidden transition-all duration-300 absolute left-12
        ${isOpen ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"}
      `}
      >
        {label}
      </span>

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
          {label}
        </div>
      )}
    </div>
  );
}
