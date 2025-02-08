'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import GeminiAI from './GeminiAI';

const ClickHandler = ({ setMarker, marker, setInfo }: any) => {
  useMapEvents({
    click(e) {
      const clickedPosition = { lat: e.latlng.lat, lng: e.latlng.lng };

      if (marker && marker.lat === clickedPosition.lat && marker.lng === clickedPosition.lng) {
        setMarker(null);
        setInfo('');
      } else {
        setMarker(clickedPosition);
        setInfo(''); 
      }
    },
  });
  return null;
};

const MyMap = () => {
  const [marker, setMarker] = useState<any | null>(null);
  const [info, setInfo] = useState<string>('');

  const customIcon = new L.Icon({
    iconUrl: 'https://i.pinimg.com/736x/77/aa/6e/77aa6e0b27539ffa404863a3acf0dc3b.jpg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="relative w-4/5 h-72 mx-auto mb-10"> 
      <MapContainer
        center={[51.505, -0.09]} 
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <ClickHandler setMarker={setMarker} marker={marker} setInfo={setInfo} />
        {marker && ( 
          <Marker position={[marker.lat, marker.lng]} icon={customIcon}>
            <Popup>
              <b>Koordinat:</b> {marker.lat}, {marker.lng}
              <br />
              <b>Info AI:</b> {info || 'Tanyakan sesuatu kepada AI'}
              <GeminiAI location={marker} onResponse={setInfo} />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MyMap;
