import React, { useState } from "react";
import { Mic, Navigation, Wand2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onGeneratePlan?: () => void;
}

const COUNTRIES = [
  { code: "id", flag: "🇮🇩" },
  { code: "us", flag: "🇺🇸" },
  { code: "jp", flag: "🇯🇵" },
  { code: "sg", flag: "🇸🇬" },
  { code: "kr", flag: "🇰🇷" },
  { code: "cn", flag: "🇨🇳" },
  { code: "au", flag: "🇦🇺" },
];

const FILTERS = [
  "Restaurants",
  "Hotels",
  "Attractions",
  "Hidden Gems",
  "Events",
  "Transit",
];

export default function SearchBar({
  onSearch,
  isSearching,
  selectedCountry,
  onCountryChange,
  onGeneratePlan,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] z-20 flex flex-col gap-3 pointer-events-none items-center">
      {/* Search Input Box */}
      <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 w-full pointer-events-auto ring-1 ring-slate-900/5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
        {/* Country Selector */}
        <div className="pl-3 flex items-center border-r border-slate-200 pr-2">
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="bg-transparent border-none outline-none text-xl cursor-pointer hover:bg-slate-100 rounded p-1 appearance-none text-center min-w-12"
            title="Select Country"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag}
              </option>
            ))}
          </select>
        </div>

        <Input
          className="border-none bg-transparent shadow-none focus-visible:ring-0 text-base h-10 placeholder:text-slate-400"
          placeholder={`Search in ${selectedCountry.toUpperCase()}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center gap-1 pr-1">
          {onGeneratePlan && (
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-blue-50 text-blue-500 hover:text-blue-600"
              onClick={onGeneratePlan}
              title="Generate 1-Day Plan"
            >
              <Wand2 className="w-5 h-5" />
            </Button>
          )}

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
            onClick={() => onSearch(query)}
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 ml-0.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Quick Filters Pill */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full pointer-events-auto px-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onSearch(filter)}
            className="px-5 py-2 bg-white/90 backdrop-blur-md shadow-lg shadow-slate-200/50 rounded-full text-sm font-semibold text-slate-600 hover:bg-white hover:text-blue-600 whitespace-nowrap border border-white/50 transition-all active:scale-95 ring-1 ring-slate-900/5"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
