export interface NearbyPlace {
  id: number;
  name: string;
  type: string; // 'cafe', 'restaurant', 'park', etc.
  lat: number;
  lon: number;
  distance: number; // Jarak dalam meter
}

export const fetchNearbyPlaces = async (
  lat: number,
  lng: number,
  radius: number = 1000
): Promise<NearbyPlace[]> => {
  // Query bahasa Overpass: "Cari node (titik) di sekitar Lat/Lng ini yang punya tag 'amenity' (fasilitas)"
  // amenities: cafe, restaurant, fast_food, fuel, bank, cinema, pharmacy
  // tourism: attraction, hotel, museum, viewpont
  const query = `
    [out:json];
    (
      node["amenity"~"cafe|restaurant|fast_food|cinema"](around:${radius}, ${lat}, ${lng});
      node["tourism"~"attraction|hotel|museum|viewpoint"](around:${radius}, ${lat}, ${lng});
    );
    out 10;
  `;

  // We use a public Overpass instance.
  // Note: Sometimes rate limited.
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Overpass API Error");
    const data = await response.json();

    return data.elements
      .map((el: any) => ({
        id: el.id,
        name: el.tags.name || "Unknown Place",
        type: el.tags.amenity || el.tags.tourism || "unknown",
        lat: el.lat,
        lon: el.lon,
        distance: calculateDistance(lat, lng, el.lat, el.lon),
      }))
      .filter((item: any) => item.name !== "Unknown Place");
  } catch (error) {
    console.warn("Gagal ambil data nearby:", error);
    return [];
  }
};

// Fungsi Helper Matematika untuk hitung jarak (Haversine Formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3; // Radius bumi (meter)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Hasil meter bulat
}
