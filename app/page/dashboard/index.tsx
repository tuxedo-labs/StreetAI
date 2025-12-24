import React, { useState } from "react";
import DashboardSideBar from "~/components/layout/DashboardSideBar";
import Map from "~/components/Map";
import ChatWidget from "~/components/ChatWidget";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Search,
  Map as MapIcon,
  Mic,
  MessageSquare,
  X,
  Navigation,
} from "lucide-react";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Auto-open chat removed

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex h-screen w-screen overflow-hidden bg-slate-100 relative font-sans">
          {/* Map Layer (Full Background) */}
          <div className="absolute inset-0 z-0">
            <Map
              onAreaSelect={(area) => {
                setSelectedArea(area);
                // Optional: Auto open chat if user clicks a location? User said "awal awal berupa button", so maybe keep manual.
                // But if they select an area, they might expect details.
                // Let's keep manual toggle as per "awal awal berupa button" request.
              }}
            />
          </div>

          {/* Floating Sidebar (Left) */}
          <div
            className={`absolute left-4 top-4 bottom-4 z-30 transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"}`}
          >
            <DashboardSideBar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>

          {/* Top Center Search Bar & Filter - "Pop Up" Style */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] z-20 flex flex-col gap-3 pointer-events-none items-center">
            {/* Search Input Box */}
            <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 w-full pointer-events-auto ring-1 ring-slate-900/5">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <Input
                className="border-none bg-transparent shadow-none focus-visible:ring-0 text-base h-10 placeholder:text-slate-400"
                placeholder="Where to next?"
              />
              <div className="flex items-center gap-1 pr-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  <Navigation className="w-4 h-4 ml-0.5" />
                </Button>
              </div>
            </div>

            {/* Quick Filters Pill */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full pointer-events-auto px-2">
              {[
                "Restaurants",
                "Hotels",
                "Attractions",
                "Events",
                "Transit",
              ].map((filter) => (
                <button
                  key={filter}
                  className="px-5 py-2 bg-white/90 backdrop-blur-md shadow-lg shadow-slate-200/50 rounded-full text-sm font-semibold text-slate-600 hover:bg-white hover:text-blue-600 whitespace-nowrap border border-white/50 transition-all active:scale-95 ring-1 ring-slate-900/5"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Location Card (Bottom Left Floating) */}
          {selectedArea && !chatOpen && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] md:w-[600px] animate-in slide-in-from-bottom-10 fade-in duration-400">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden ring-1 ring-black/5 flex flex-col md:flex-row h-auto md:h-48 group">
                {/* Location Image (Mocked) */}
                <div className="h-32 md:h-full md:w-48 bg-slate-200 shrink-0 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1552596155-527758f7634f?q=80&w=400&h=400&auto=format&fit=crop"
                    alt="Location Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                    360° View
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1 relative">
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                    onClick={() => setSelectedArea(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {selectedArea.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <span className="text-orange-500 font-bold flex items-center gap-0.5">
                        4.8 ★
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>Tourist Attraction</span>
                      <span className="text-slate-300">•</span>
                      <span>Open 24h</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {selectedArea.description.includes("Lat:")
                        ? "A scenic spot waiting to be explored. Discover hidden gems, local favorites, and the rich history surrounding this coordinate."
                        : selectedArea.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/20 px-6"
                      onClick={() => setChatOpen(true)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask AI
                    </Button>

                    <div className="w-px h-8 bg-slate-200 mx-1 hidden md:block" />

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full border-slate-200 text-blue-600 hover:bg-blue-50 px-4"
                      >
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-slate-200 text-slate-500 hover:text-slate-700"
                      >
                        <MapIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Chat Widget (Bottom Right Popup) */}
          {/* Wrapper for positioning */}
          <div className="absolute top-20 bottom-24 right-4 w-[400px] z-40 pointer-events-none flex flex-col justify-end">
            {chatOpen && (
              <div className="flex-1 w-full pointer-events-auto shadow-2xl rounded-3xl overflow-hidden ring-1 ring-black/10 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-300 origin-bottom-right mb-4">
                <ChatWidget
                  context={selectedArea}
                  onClose={() => setChatOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Floating Chat Toggle Button (Always visible logic, toggles state) */}
          <div className={`absolute bottom-8 right-8 z-50`}>
            <Button
              onClick={() => setChatOpen(!chatOpen)}
              className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ring-4 ring-white/20 ${
                chatOpen
                  ? "bg-slate-200 text-slate-600 hover:bg-slate-300 rotate-90"
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105"
              }`}
            >
              {chatOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <MessageSquare className="w-7 h-7" />
              )}
            </Button>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
