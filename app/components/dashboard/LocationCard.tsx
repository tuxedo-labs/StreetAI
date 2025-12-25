import React from "react";
import { X, MessageSquare, Map as MapIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

interface LocationCardProps {
  selectedArea: {
    name: string;
    description: string;
  };
  onClose: () => void;
  onAskAI: () => void;
  // Directions logic could be passed here
}

export default function LocationCard({
  selectedArea,
  onClose,
  onAskAI,
}: LocationCardProps) {
  return (
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
            onClick={onClose}
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
              onClick={onAskAI}
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
  );
}
