'use client'; 

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet'; 

const ClickHandler = ({ setMarker, marker }: any) => {
  useMapEvents({
    click(e) {
      const clickedPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
      if (marker && marker.lat === clickedPosition.lat && marker.lng === clickedPosition.lng) {
        setMarker(null);
      } else {
        setMarker(clickedPosition);
      }
    },
  });
  return null;
};

const MyMap = () => {
  const [marker, setMarker] = useState<any | null>(null); // Menyimpan satu marker saj

  // Marker kastem
  const customIcon = new L.Icon({
    iconUrl: 'https://i.pinimg.com/736x/77/aa/6e/77aa6e0b27539ffa404863a3acf0dc3b.jpg', 
    iconSize: [32, 32], //(lebar, tinggi)
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  return (
    
    <div className="relative w-4/5 h-72 mx-auto mb-10"> 
      <MapContainer
        center={[51.505, -0.09]} 
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <ClickHandler setMarker={setMarker} marker={marker} />
        {marker && ( 
          <Marker position={[marker.lat, marker.lng]} icon={customIcon}>
            <Popup>Lokasi: {marker.lat}, {marker.lng}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MyMap;
