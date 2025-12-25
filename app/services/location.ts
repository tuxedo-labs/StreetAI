export interface LocationResult {
  lat: number;
  lng: number;
  displayName: string;
  address?: any;
  type?: string;
  category?: string;
}

export const searchLocation = async (
  query: string,
  countryCode: string = "id"
): Promise<LocationResult | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&countrycodes=${countryCode}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        displayName: result.display_name,
        address: result.address,
        type: result.type,
        category: result.class || result.category,
      };
    }
    return null;
  } catch (error) {
    console.error("Location search failed:", error);
    return null;
  }
};

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<LocationResult | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    if (data) {
      return {
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lon),
        displayName: data.display_name,
        address: data.address,
        type: data.type,
        category: data.class || data.category,
      };
    }
    return null;
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return null;
  }
};
