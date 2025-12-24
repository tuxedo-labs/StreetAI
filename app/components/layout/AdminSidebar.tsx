import { Link } from "react-router";
import { Button } from "../ui/button";
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut 
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Map, label: "Locations", path: "/admin/locations" },
  { icon: MessageSquare, label: "AI Monitotring", path: "/admin/ai-logs" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col h-full z-20">
      <div className={`shadow-xl border bg-slate-900 text-white rounded-xl overflow-hidden h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
             <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">A</div>
             <span className="text-xl font-bold">Admin</span>
          </div>
          <button onClick={onToggle} className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">
            {isOpen ? <LogOut className="w-5 h-5 rotate-180" /> : <LogOut className="w-5 h-5" />} 
            {/* Using LogOut icon as a collapse icon for now or simple chevron */}
          </button>
        </div>
        
        <div className="p-4 space-y-2 flex-1 overflow-y-auto mt-4">
          <p className={`text-xs font-bold text-gray-400 uppercase mb-2 pl-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Menu</p>
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left hover:bg-white/10 hover:text-white text-gray-300 transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5 mr-3 shrink-0" />
                      <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'w-full opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-2'}`}>
                        {item.label}
                      </span>
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-700 p-4">
          <Button variant="ghost" className="w-full justify-start text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5 mr-3 shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'w-full opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-2'}`}>
              Logout
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
