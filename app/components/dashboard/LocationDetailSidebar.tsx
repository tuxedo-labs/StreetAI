import React, { useEffect, useState } from "react";
import { fetchWikiData } from "~/services/WikiService";
import { fetchUnsplashImage } from "~/services/EnrichmentService";
import { fetchNearbyPlaces, type NearbyPlace } from "~/services/NearbyService";
import {
  MessageSquare,
  Navigation,
  ArrowLeft,
  Star,
  MapPin,
} from "lucide-react";
import { Button } from "~/components/ui/button";

interface LocationData {
  name: string;
  lat: number;
  lng: number;
  category: string;
  description?: string;
  imageUrl?: string;
}

const NearbyCard = ({
  name,
  type,
  distance,
  onClick,
}: {
  name: string;
  type: string;
  distance: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer border border-slate-100 transition-all group hover:shadow-md active:scale-95"
  >
    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative bg-slate-200">
      <img
        src={`https://loremflickr.com/100/100/${type.split("_")[0]},building/all`}
        alt={type}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 -z-10">
        <span className="text-xl opacity-50">📍</span>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-sm text-slate-800 leading-tight truncate">
        {name}
      </h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 truncate max-w-[80px]">
          {type.replace("_", " ")}
        </span>
        <p className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
          {distance}
        </p>
      </div>
    </div>
  </div>
);

export default function LocationDetailSidebar({
  location,
  onClose,
  onAskAI,
  onNearbySelect,
}: {
  location: LocationData;
  onClose: () => void;
  onAskAI: () => void;
  onNearbySelect?: (place: NearbyPlace) => void;
}) {
  const [wikiInfo, setWikiInfo] = useState<any>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const enrichData = async () => {
      setLoading(true);

      let finalImageUrl: string | null | undefined = location.imageUrl;
      let finalDescription = location.description;
      let finalWikiUrl = null;

      // 1. Try Wiki First
      try {
        const wiki = await fetchWikiData(location.name);
        if (wiki) {
          finalImageUrl = wiki.imageUrl || finalImageUrl;
          finalDescription = wiki.summary || finalDescription; // Wiki summary preferred for "About"
          finalWikiUrl = wiki.wikiUrl;
        }
      } catch (e) {
        console.warn("Wiki fetch failed", e);
      }

      // 2. Fallback Image (Smart)
      if (!finalImageUrl) {
        const typeKeyword = location.category || "travel"; // e.g. "School", "Hotel"
        finalImageUrl = await fetchUnsplashImage(
          `${location.name},${typeKeyword}`
        );
      }

      // 3. Fallback Description (AI)
      // If description is just the address (contains numbers/commas) or empty, ask AI.
      // Logic: if finalDescription length < 50 or looks like address.
      if (
        !finalDescription ||
        finalDescription.length < 50 ||
        finalDescription.includes(",")
      ) {
        // const aiDesc = await generateAIDescription(location.name, "Indonesia"); // Simplified
        // finalDescription = aiDesc;
        // For now, let's keep it simple to avoid rate limits on every click.
      }

      setWikiInfo({
        summary: finalDescription,
        imageUrl: finalImageUrl,
        wikiUrl: finalWikiUrl,
      });

      // C. Nearby Logic (Real-time Overpass)
      try {
        const places = await fetchNearbyPlaces(location.lat, location.lng);
        setNearbyPlaces(
          places.map((p) => ({
            ...p,
            formattedDistance:
              p.distance < 1000
                ? `${p.distance}m`
                : `${(p.distance / 1000).toFixed(1)}km`,
          }))
        );
      } catch (e) {
        console.warn("Nearby fetch failed", e);
      }
      setLoading(false);
    };

    enrichData();
  }, [location]);

  return (
    <div className="absolute top-0 left-0 bottom-0 w-[400px] z-30 flex flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-300 border-r border-slate-200">
      {/* --- HERO IMAGE --- */}
      <div className="relative h-64 w-full bg-slate-200 shrink-0">
        <img
          src={
            wikiInfo?.imageUrl ||
            location.imageUrl ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white hover:bg-white/40 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500/90 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-white/20">
              {location.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold">4.8</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold leading-tight shadow-sm">
            {location.name}
          </h1>
        </div>
      </div>

      {/* --- CONTENT BODY --- */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
        {/* Quick Stats or Coordinates */}
        <div className="flex items-center text-slate-500 text-sm font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-xl py-6"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
                "_blank"
              )
            }
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-slate-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 rounded-xl py-6"
            onClick={onAskAI}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Ask AI
          </Button>
        </div>

        {/* Description */}
        <div className="prose prose-sm prose-slate max-w-none">
          <h3 className="text-slate-900 font-bold text-lg mb-2 flex items-center">
            About this place
          </h3>
          <p className="leading-relaxed text-slate-600">
            {wikiInfo?.summary ||
              location.description ||
              "Loading detailed information..."}
          </p>
          {wikiInfo?.wikiUrl && (
            <a
              href={wikiInfo.wikiUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-xs font-semibold inline-flex items-center hover:underline mt-2"
            >
              Read more on Wikipedia ↗
            </a>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* --- NEARBY (Neighborhood Radar) --- */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-slate-900 font-bold text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Nearby Gems
            </h3>
            <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
              1.0 km radius
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-slate-50 rounded-xl animate-pulse border border-slate-100"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {nearbyPlaces.map((place, idx) => (
                <NearbyCard
                  key={idx}
                  name={place.name}
                  type={place.type}
                  distance={place.formattedDistance}
                  onClick={() => onNearbySelect && onNearbySelect(place)}
                />
              ))}
              <Button
                variant="ghost"
                className="w-full text-blue-600 text-xs font-bold mt-2 hover:bg-blue-50"
              >
                View More Places
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
