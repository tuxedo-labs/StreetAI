import React, { useState } from "react";
import DashboardSideBar from "~/components/layout/DashboardSideBar";
import Map from "~/components/Map";
import ChatWidget from "~/components/ChatWidget";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, Map as MapIcon, Mic, MessageSquare, X } from "lucide-react";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Collapsed by default for map view
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Auto-open chat when area is selected
  React.useEffect(() => {
    if (selectedArea) {
      setChatOpen(true);
    }
  }, [selectedArea]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100 relative">
          {/* Map Layer (Full Background) */}
          <div className="absolute inset-0 z-0">
            <Map onAreaSelect={setSelectedArea} />
          </div>

          {/* Floating Sidebar (Left) */}
          <div
            className={`fixed left-4 top-4 bottom-4 z-20 flex flex-col transition-all duration-300 pointer-events-none`}
          >
            <div className="pointer-events-auto h-full shadow-2xl rounded-xl overflow-hidden">
              <DashboardSideBar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
              />
            </div>
          </div>

          {/* Top Floating Search Bar (Google Maps Style) */}
          <div className="absolute top-4 left-24 right-4 md:left-[100px] md:w-[400px] z-10 pointer-events-auto">
            <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-gray-200 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MapIcon className="w-5 h-5" />
              </Button>
              <Input
                className="border-none bg-transparent shadow-none focus-visible:ring-0 text-base"
                placeholder="Search StreetAI maps..."
              />
              <div className="flex items-center border-l border-gray-300 pl-2 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-500 rounded-full hover:bg-blue-50"
                >
                  <Search className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-none">
              {[
                "Restaurants",
                "Hotels",
                "Attractions",
                "Transit",
                "Pharmacies",
              ].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-1.5 bg-white/90 backdrop-blur shadow-md rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 whitespace-nowrap border border-gray-200 transition-transform active:scale-95"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Location Card (Bottom Left or Side) */}
          {selectedArea && !chatOpen && (
            <div className="absolute bottom-8 left-24 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-10 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedArea.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedArea.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedArea(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setChatOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
                <Button variant="outline" className="w-full rounded-full">
                  Directions
                </Button>
              </div>
            </div>
          )}

          {/* AI Chat Widget (Right Floating Panel) */}
          <div
            className={`absolute top-4 bottom-4 right-4 w-96 z-20 transition-transform duration-500 ease-in-out pointer-events-none
              ${chatOpen ? "translate-x-0" : "translate-x-[120%]"}`}
          >
            <div className="h-full w-full pointer-events-auto">
              <ChatWidget
                context={selectedArea}
                onClose={() => setChatOpen(false)}
              />
            </div>
          </div>

          {/* Floating Chat Toggle (If chat is closed) */}
          {!chatOpen && (
            <Button
              onClick={() => setChatOpen(true)}
              className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 shadow-2xl z-10 pointer-events-auto flex items-center justify-center hover:scale-110 transition-transform"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </Button>
          )}
        </div>
      </SignedIn>
    </>
  );
}
