import React, { useState, useEffect } from "react";

const position: [number, number] = [-6.2088, 106.8456]; // Jakarta coordinates

interface Area {
  name: string;
  description: string;
}

interface MapProps {
  onAreaSelect: (area: Area | null) => void;
}

export default function Map({ onAreaSelect }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      Promise.all([import("react-leaflet"), import("leaflet")])
        .then(([reactLeaflet, leaflet]) => {
          const { MapContainer, TileLayer, Marker, Popup, Polyline } =
            reactLeaflet;
          const L = leaflet;

          // Fix for default markers in react-leaflet
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          });

          setMapComponents({
            MapContainer,
            TileLayer,
            Marker,
            Popup,
            Polyline,
            L,
          });
        })
        .catch((error) => {
          console.error("Failed to load map components:", error);
        });
    }
  }, []);

  if (!isClient || !MapComponents) {
    return (
      <div className="w-screen h-full bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Polyline } = MapComponents;
  const L = MapComponents.L;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          updateWhenIdle={true}
          updateWhenZooming={false}
        />
        <Marker position={position} eventHandlers={{
          click: () => onAreaSelect({ name: "Jakarta", description: "Capital city of Indonesia" })
        }}>
          <Popup>
            Click to select this area
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
