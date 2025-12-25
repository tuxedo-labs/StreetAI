import React, { useState } from "react";
import DashboardSideBar from "~/components/layout/DashboardSideBar";
import Map from "~/components/Map";
import ChatWidget from "~/components/ChatWidget";
import SearchBar from "~/components/dashboard/SearchBar";
// LocationCard import removed
import { searchLocation, reverseGeocode } from "~/services/location";
import { Button } from "~/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import LocationDetailSidebar from "~/components/dashboard/LocationDetailSidebar";
import ItineraryList, {
  type ItineraryItem,
} from "~/components/dashboard/ItineraryList";
import useLocalStorage from "~/hooks/useLocalStorage";
import { fetchWikiData } from "~/services/WikiService";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    description: string;
    imageUrl?: string;
    wikiUrl?: string;
    category?: string;
  } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const [mapTarget, setMapTarget] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markerPos, setMarkerPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("id");
  const [initialChatPrompt, setInitialChatPrompt] = useState<
    string | undefined
  >(undefined);

  // Itinerary State with Persistence
  const [itinerary, setItinerary] = useLocalStorage<ItineraryItem[] | null>(
    "streetai-current-trip",
    null
  );
  const [activeItineraryId, setActiveItineraryId] = useState<
    string | undefined
  >(undefined);

  // Get User Location on Mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const pos = { lat: latitude, lng: longitude };

          setMapTarget(pos);
          setMarkerPos(pos);

          const result = await reverseGeocode(latitude, longitude);
          if (result) {
            if (result.address && result.address.country_code) {
              setSelectedCountry(result.address.country_code.toLowerCase());
            }
            // Silent location detection - don't popup the panel
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query) return;

    // Special handling for "Hidden Gems" -> Ask AI
    if (query === "Hidden Gems") {
      setInitialChatPrompt(
        `Can you recommend some hidden gems near [${markerPos?.lat}, ${markerPos?.lng}]? Return strictly a JSON Array of objects with keys: time, location, lat, lng, activity. Do not use Markdown code blocks.`
      );
      setChatOpen(true);
      return;
    }

    setIsSearching(true);
    const result = await searchLocation(query, selectedCountry);
    setIsSearching(false);

    if (result) {
      const pos = { lat: result.lat, lng: result.lng };
      setMapTarget(pos);
      setMarkerPos(pos);
      setSelectedArea({
        name: result.displayName.split(",")[0],
        description: `Search Result: ${result.displayName}.`,
        category: result.type,
      });
    }
  };

  const handleGeneratePlan = () => {
    // Strict JSON Prompt
    setInitialChatPrompt(
      `Based on my location [${markerPos?.lat || -6.2}, ${markerPos?.lng || 106.8}], create a 1-day itinerary. IMPORTANT: Reply ONLY with a valid JSON Array. No markdown formatting (no \`\`\`json), no text intro/outro. Structure: [{"time": "09:00", "location": "Place Name", "lat": -6.0, "lng": 106.0, "activity": "Short description"}]`
    );
    setChatOpen(true);
  };

  const handleItineraryReceived = async (items: any[]) => {
    const validItems = await Promise.all(
      items.map(async (item, index) => {
        const name = item.location || item.name || "Unknown Location";
        let wiki = null;
        try {
          wiki = await fetchWikiData(name);
        } catch {
          console.warn("Wiki fetch failed for", name);
        }

        return {
          id: item.id || index.toString(),
          time: item.time || `Stop ${index + 1}`,
          location: name,
          lat: typeof item.lat === "string" ? parseFloat(item.lat) : item.lat,
          lng: typeof item.lng === "string" ? parseFloat(item.lng) : item.lng,
          activity:
            item.activity || item.description || "Explore this location.",
          description: wiki?.summary || item.description,
          imageUrl: wiki?.imageUrl || undefined,
          wikiUrl: wiki?.wikiUrl,
        };
      })
    );
    setItinerary(validItems);
  };

  const handleDeleteItineraryItem = (id: string) => {
    if (!itinerary) return;
    const updated = itinerary.filter((item) => item.id !== id);
    setItinerary(updated.length > 0 ? updated : null);
    if (activeItineraryId === id) setActiveItineraryId(undefined);
  };

  const handleMoveItineraryItem = (index: number, direction: "up" | "down") => {
    if (!itinerary) return;
    const newItems = [...itinerary];
    if (direction === "up" && index > 0) {
      [newItems[index], newItems[index - 1]] = [
        newItems[index - 1],
        newItems[index],
      ];
    } else if (direction === "down" && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
    }
    setItinerary(newItems);
  };

  const handleMapClick = async (lat: number, lng: number) => {
    // Optimistic update
    setMarkerPos({ lat, lng });
    setSelectedArea({
      name: "Identifying location...",
      description: "Please wait while we fetch the address...",
    });

    try {
      const result = await reverseGeocode(lat, lng);

      if (result) {
        const name = result.displayName.split(",")[0];
        let wiki = null;
        try {
          wiki = await fetchWikiData(name);
        } catch {
          console.warn("Wiki fetch failed");
        }

        if (result.address && result.address.country_code) {
          setSelectedCountry(result.address.country_code.toLowerCase());
        }

        setSelectedArea({
          name: name,
          description: result.displayName,
          imageUrl: wiki?.imageUrl || undefined,
          wikiUrl: wiki?.wikiUrl,
          category: result.type,
        });
      } else {
        setSelectedArea({
          name: "Unknown Location",
          description: "Could not identify this spot.",
        });
      }
    } catch (error) {
      console.error("Map click handling failed", error);
    }
  };

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
              }}
              targetLocation={mapTarget}
              markerLocation={markerPos}
              itineraryItems={itinerary || []}
              activeItineraryId={activeItineraryId}
              onLocationClick={handleMapClick}
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

          {/* Itinerary Sidebar (Hidden if Location Detail is open to avoid clutter) */}
          {itinerary && !selectedArea && (
            <ItineraryList
              items={itinerary}
              activeItemId={activeItineraryId}
              className={sidebarOpen ? "left-72" : "left-28"}
              onClose={() => setItinerary(null)}
              onItemClick={(item) => {
                setActiveItineraryId(item.id);
                setMapTarget({ lat: item.lat, lng: item.lng });
                setSelectedArea({
                  name: item.location,
                  description: item.activity,
                  imageUrl: item.imageUrl,
                  wikiUrl: item.wikiUrl,
                });
              }}
              onExportGoogleMaps={() => {
                if (!itinerary.length) return;
                const origin = `${itinerary[0].lat},${itinerary[0].lng}`;
                const dest = `${
                  itinerary[itinerary.length - 1].lat
                },${itinerary[itinerary.length - 1].lng}`;
                const waypoints = itinerary
                  .slice(1, -1)
                  .map((i) => `${i.lat},${i.lng}`)
                  .join("|");
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}`,
                  "_blank"
                );
              }}
              onDelete={handleDeleteItineraryItem}
              onMoveUp={(i) => handleMoveItineraryItem(i, "up")}
              onMoveDown={(i) => handleMoveItineraryItem(i, "down")}
            />
          )}

          {/* Location Detail Super Sidebar */}
          {selectedArea && (
            <div
              className={`absolute top-0 bottom-0 z-30 pointer-events-none transition-all duration-300 ease-in-out ${
                sidebarOpen ? "left-72" : "left-28"
              }`}
            >
              <div className="pointer-events-auto h-full shadow-2xl">
                <LocationDetailSidebar
                  location={{
                    name: selectedArea.name,
                    lat: markerPos?.lat || 0,
                    lng: markerPos?.lng || 0,
                    category: selectedArea.category || "Destination",
                    description: selectedArea.description,
                    imageUrl: selectedArea.imageUrl,
                  }}
                  onClose={() => setSelectedArea(null)}
                  onAskAI={() => {
                    setInitialChatPrompt(
                      `Tell me more about ${selectedArea.name}.`
                    );
                    setChatOpen(true);
                  }}
                  onNearbySelect={(place) => {
                    setMapTarget({ lat: place.lat, lng: place.lon });
                    setMarkerPos({ lat: place.lat, lng: place.lon });
                    setSelectedArea({
                      name: place.name,
                      description: "Nearby location found via StreetAI.",
                      category: place.type,
                    });
                  }}
                />
              </div>
            </div>
          )}

          {/* Top Center Search Bar & Filter - "Pop Up" Style */}
          <SearchBar
            onSearch={handleSearch}
            isSearching={isSearching}
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
            onGeneratePlan={handleGeneratePlan}
          />

          {/* Selected Location Card (Bottom Left Floating) - MOVED TO SIDEBAR */}
          {/* {selectedArea && !chatOpen && (
            <LocationCard
               selectedArea={selectedArea}
               onClose={() => setSelectedArea(null)}
               onAskAI={() => setChatOpen(true)}
            />
          )} */}

          {/* AI Chat Widget (Bottom Right Popup) */}
          {/* Wrapper for positioning */}
          <div className="absolute top-20 bottom-24 right-4 w-[400px] z-40 pointer-events-none flex flex-col justify-end">
            {chatOpen && (
              <div className="flex-1 w-full pointer-events-auto shadow-2xl rounded-3xl overflow-hidden ring-1 ring-black/10 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-300 origin-bottom-right mb-4">
                <ChatWidget
                  context={selectedArea}
                  onClose={() => {
                    setChatOpen(false);
                    setInitialChatPrompt(undefined);
                  }}
                  initialMessage={initialChatPrompt}
                  onItineraryReceived={handleItineraryReceived}
                />
              </div>
            )}
          </div>

          {/* Floating Chat Toggle Button (Always visible logic, toggles state) */}
          <div className={`absolute bottom-8 right-8 z-50`}>
            <Button
              onClick={() => {
                setChatOpen(!chatOpen);
                if (chatOpen) setInitialChatPrompt(undefined); // Reset on close
              }}
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
