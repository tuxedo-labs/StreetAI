import React, { useState, useEffect } from "react";

const defaultPosition: [number, number] = [-6.2088, 106.8456]; // Jakarta coordinates

interface Area {
  name: string;
  description: string;
}

interface MapProps {
  onAreaSelect: (area: Area | null) => void;
  targetLocation?: { lat: number; lng: number } | null;
  markerLocation?: { lat: number; lng: number } | null;
  itineraryItems?: { id: string; lat: number; lng: number; location: string }[];
  activeItineraryId?: string;
  onLocationClick?: (lat: number, lng: number) => void;
}

export default function Map({
  onAreaSelect,
  targetLocation,
  markerLocation,
  itineraryItems,
  activeItineraryId,
  onLocationClick,
}: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [libs, setLibs] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      Promise.all([import("react-leaflet"), import("leaflet")])
        .then(([reactLeaflet, leaflet]) => {
          const L = leaflet;
          // Fix icons once
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          });
          setLibs({ reactLeaflet, leaflet });
        })
        .catch((error) => console.error("Failed to load map libs:", error));
    }
  }, []);

  useEffect(() => {
    if (markerLocation) {
      setSelectedPosition([markerLocation.lat, markerLocation.lng]);
    }
  }, [markerLocation]);

  // Memoize sub-components to prevent re-renders (fixes lag)
  const Components = React.useMemo(() => {
    if (!libs) return null;
    const { useMap, useMapEvents, Polyline, Marker, Popup } = libs.reactLeaflet;
    const L = libs.leaflet;

    const MapController = ({
      target,
    }: {
      target: { lat: number; lng: number } | null | undefined;
    }) => {
      const map = useMap();
      useEffect(() => {
        if (target) {
          map.flyTo([target.lat, target.lng], 15, { duration: 1.5 });
        }
      }, [target, map]);
      return null;
    };

    const MapClickHandler = ({
      onLocationSelect,
    }: {
      onLocationSelect: (lat: number, lng: number) => void;
    }) => {
      useMapEvents({
        contextmenu(e: any) {
          onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
      });
      return null;
    };

    const ItineraryRenderer = ({
      items,
      activeId,
    }: {
      items: { id: string; lat: number; lng: number; location: string }[];
      activeId?: string;
    }) => {
      const map = useMap();

      // Fit bounds to itinerary
      useEffect(() => {
        if (items && items.length > 0) {
          const bounds = L.latLngBounds(items.map((i) => [i.lat, i.lng]));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }, [items, map]);

      if (!items || items.length === 0) return null;

      const positions = items.map((i) => [i.lat, i.lng]);

      return (
        <>
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#3b82f6",
              weight: 4,
              opacity: 0.7,
              dashArray: "10, 10",
            }}
          />
          {items.map((item, index) => (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={
                new L.DivIcon({
                  className: "custom-icon",
                  html: `<div style="background-color: ${
                    activeId === item.id ? "#3b82f6" : "#ffffff"
                  }; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #3b82f6; display: flex; align-items: center; justify-content: center; font-weight: bold; color: ${
                    activeId === item.id ? "#ffffff" : "#3b82f6"
                  }; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${
                    index + 1
                  }</div>`,
                  iconSize: [24, 24],
                  iconAnchor: [12, 12],
                })
              }
            >
              <Popup>{item.location}</Popup>
            </Marker>
          ))}
        </>
      );
    };

    return { MapController, MapClickHandler, ItineraryRenderer };
  }, [libs]);

  if (!isClient || !libs || !Components) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center animate-pulse">
        <div className="text-center">
          <p className="text-slate-400 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = libs.reactLeaflet;
  const L = libs.leaflet;
  const { MapController, MapClickHandler, ItineraryRenderer } = Components;

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    // Allow parent to handle the data fetching (Reverse Geocoding)
    // We pass a temporary placeholder to onAreaSelect if needed, or rely on a new prop.
    // However, existing usage expects onAreaSelect.
    // Let's rely on parent passing `onLocationClick` which is cleaner.
    if (onLocationClick) {
      onLocationClick(lat, lng);
    } else {
      // Fallback for backward compatibility if parent doesn't handle raw click
      onAreaSelect({
        name: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
        description: "Location selected. (Tip: Use the Wand to explore!)",
      });
    }
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="w-full h-full outline-none"
        style={{ height: "100%", width: "100%", background: "#f1f5f9" }}
        preferCanvas={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        <MapController target={targetLocation} />
        <ItineraryRenderer
          items={itineraryItems || []}
          activeId={activeItineraryId}
        />
        {selectedPosition && (
          <Marker
            position={selectedPosition}
            icon={
              new L.Icon({
                iconUrl:
                  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })
            }
          >
            <Popup>Selected Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
