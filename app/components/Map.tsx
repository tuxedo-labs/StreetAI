import React, { useState, useEffect } from "react";

const defaultPosition: [number, number] = [-6.2088, 106.8456]; // Jakarta coordinates

interface Area {
  name: string;
  description: string;
}

interface MapProps {
  onAreaSelect: (area: Area | null) => void;
}

export default function Map({ onAreaSelect }: MapProps) {
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

  if (!isClient || !libs) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center animate-pulse">
        <div className="text-center">
          <p className="text-slate-400 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, useMapEvents } =
    libs.reactLeaflet;
  const L = libs.leaflet;

  // Define component here so it accesses current selectedPosition/onAreaSelect
  const LocationSelector = () => {
    const map = useMapEvents({
      // Right click to select
      contextmenu(e: any) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);

        onAreaSelect({
          name: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`, // Basic label as requested
          description: "Location selected via map. Open AI chat to explore.",
        });

        // Optional: Fly to location? maybe just pan.
        map.panTo(e.latlng);
      },
    });

    return selectedPosition ? (
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
    ) : null;
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="w-full h-full outline-none" // Remove focus outline
        style={{ height: "100%", width: "100%", background: "#f1f5f9" }}
        preferCanvas={true}
        doubleClickZoom={false} // Prevent double click zoom if it interferes, but commonly okay.
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationSelector />
      </MapContainer>
    </div>
  );
}
