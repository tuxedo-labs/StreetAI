import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { 
  Home, 
  MapPin, 
  Navigation, 
  Settings, 
  User 
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: MapPin, label: "Destinations", path: "/dashboard/destinations" },
  { icon: Navigation, label: "Navigation", path: "/dashboard/navigation" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardSideBar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className={` shadow-lg border bg-white rounded-xl overflow-hidden h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className={`text-xl font-bold transition-all duration-300 overflow-hidden ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>StreetAI</h2>
          <button onClick={onToggle} className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M15 19l-7-7 7-7" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div className={`p-2 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-600 text-sm text-center">Explore with AI</p>
        </div>
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left hover:bg-gray-100 transition-colors group"
                    >
                      <Icon className="w-5 h-5 mr-3 " />
                      <span className={`transition-all duration-300 overflow-hidden ${isOpen ? 'w-full opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-2'}`}>{item.label}</span>
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200 p-4">
          <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-100 transition-colors group">
            <User className="w-5 h-5 mr-3 " />
            <span className={`transition-all duration-300 overflow-hidden ${isOpen ? 'w-full opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-2'}`}>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
