'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
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

const SetView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const MyMap = () => {
  const [marker, setMarker] = useState<any | null>(null);
  const [info, setInfo] = useState<string>('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const customIcon = new L.Icon({
    iconUrl: 'https://www.freeiconspng.com/uploads/red-circle-icon-16.png',
    iconSize: [20, 20],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => {
          setUserLocation([51.505, -0.09]);
        }
      );
    } else {
      setUserLocation([51.505, -0.09]);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-center mb-4 gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari lokasi..."
          className="border p-2 rounded-md w-full md:w-64"
        />
        <button onClick={handleSearch} className="bg-black text-white px-4 py-2 rounded-md w-full md:w-auto">
          Cari
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="bg-white p-2 rounded-md shadow-md mb-4 max-h-40 overflow-y-auto">
          <ul>
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                onClick={() => {
                  const lat = parseFloat(result.lat);
                  const lon = parseFloat(result.lon);
                  setMarker({ lat, lng: lon });
                  setSelectedLocation([lat, lon]);
                  setSearchResults([]);
                }}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center items-center">
        <MapContainer
          center={userLocation || [51.505, -0.09]}
          zoom={13}
          className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
          scrollWheelZoom={true}
        >
          {selectedLocation && <SetView center={selectedLocation} />}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
          <ClickHandler setMarker={setMarker} marker={marker} setInfo={setInfo} />
          {marker && (
            <Marker position={[marker.lat, marker.lng]} icon={customIcon}>
              <Popup maxWidth={400} minWidth={400} className="custom-popup">
                <div className="w-full max-w-[400px]">
                  <GeminiAI location={marker} onResponse={setInfo} />
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MyMap;

