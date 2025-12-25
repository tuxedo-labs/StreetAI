import React from "react";
import { Navigation, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "~/components/ui/button";

export interface ItineraryItem {
  id: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
  activity: string;
  description?: string;
  imageUrl?: string;
  wikiUrl?: string;
}

interface ItineraryListProps {
  items: ItineraryItem[];
  onItemClick: (item: ItineraryItem) => void;
  activeItemId?: string;
  onExportGoogleMaps?: () => void;
  onClose?: () => void;
  onDelete?: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ItineraryList({
  items,
  onItemClick,
  activeItemId,
  onExportGoogleMaps,
  onClose,
  onDelete,
  onMoveUp,
  onMoveDown,
  className,
  style,
}: ItineraryListProps) {
  return (
    <div
      className={`absolute top-20 bottom-24 w-80 z-20 flex flex-col pointer-events-none transition-all duration-300 ease-in-out ${
        className || "left-24"
      }`}
      style={style}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col h-full overflow-hidden pointer-events-auto ring-1 ring-black/5 animate-in slide-in-from-left-10 duration-500">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-white shrink-0 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              1-Day Itinerary
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Powered by StreetAI
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-full"
          >
            ✕
          </Button>
        </div>

        {/* Timeline List */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-4">
            {items.map((item, index) => {
              const isActive = activeItemId === item.id;
              return (
                <div
                  key={item.id}
                  className={`relative pl-6 cursor-pointer group transition-all duration-300 ${
                    isActive ? "scale-105 origin-left" : "hover:scale-102"
                  }`}
                  onClick={() => onItemClick(item)}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-white ${
                      isActive
                        ? "border-blue-500 ring-4 ring-blue-500/20 scale-110"
                        : "border-slate-300 group-hover:border-blue-400"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-blue-500"
                          : "bg-slate-300 group-hover:bg-blue-400"
                      }`}
                    />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`rounded-xl p-3 border transition-all duration-300 shadow-sm relative pr-2 ${
                      isActive
                        ? "bg-blue-50/50 border-blue-200 shadow-md"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
                    }`}
                  >
                    {/* Action Buttons (Visible on Hover) */}
                    <div className="absolute top-2 right-2 flex gap-1 bg-white/80 backdrop-blur rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-100 z-10">
                      <button
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 disabled:opacity-30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveUp?.(index);
                        }}
                        disabled={index === 0}
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 disabled:opacity-30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveDown?.(index);
                        }}
                        disabled={index === items.length - 1}
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <div className="w-px bg-slate-200 mx-0.5 h-5 self-center"></div>
                      <button
                        className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(item.id);
                        }}
                        title="Remove"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Wiki Image */}
                    {item.imageUrl && (
                      <div className="mb-2 rounded-lg overflow-hidden h-32 w-full">
                        <img
                          src={item.imageUrl}
                          alt={item.location}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.time}
                      </div>
                    </div>

                    <h4
                      className={`font-bold text-sm leading-tight mb-1 ${
                        isActive ? "text-blue-900" : "text-slate-800"
                      }`}
                    >
                      {item.location}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {/* Prefer wiki description if short, else activity */}
                      {item.description || item.activity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 py-5 transition-all active:scale-95"
            onClick={onExportGoogleMaps}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Start Navigation
          </Button>
        </div>
      </div>
    </div>
  );
}
