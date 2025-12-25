# StreetAI 🗺️🤖

StreetAI is an intelligent travel assistant and dashboard designed to help users explore locations and create personalized itineraries effortlessly. Powered by AI and enriched with real-time data, it transforms map exploration into a rich, visual experience.

![StreetAI Dashboard Overview](demo/image.png)

## 🌟 Key Features

### 1. **Interactive Map Environment**

- **Premium Aesthetics**: Uses "CartoDB Voyager" tiles for a clean, noise-free exploration experience.
- **Click & Explore**: Click any point on the map to reverse-geocode and identify the location instantly.
- **Dynamic Markers**: Visual cues for selected spots and itinerary stops.

### 2. **"Super Sidebar" Detail Panel** 🏗️

- **Rich Content**: Automatically fetches high-quality images from Wikipedia or Unsplash (via smart category fallback) to avoid "grey box" placeholders.
- **AI Descriptions**: Provides concise, engaging summaries of locations instead of raw addresses.
- **One-Click Navigation**: Integrated "Navigate" button to open Google Maps directions.

### 3. **Neighborhood Radar (Nearby Gems)** 📡

- **Real-Time Discovery**: Uses the **Overpass API (OpenStreetMap)** to scan the user's surrounding 1km radius in real-time.
- **Live Recommendations**: Suggests real Cafes, Restaurants, Hotels, and Attractions nearby.
- **Interactive Cards**: nearby items are displayed as visual cards with thumbnails. Clicking them instantly jumps the map to that spot.

### 4. **AI-Powered Planning** 🧠

- **Natural Language Chat**: Ask the built-in AI (Gemini) to "Plan a day in Malang" or "Find hidden gems".
- **Structured Itineraries**: The AI generates actionable schedules that plotted directly onto your map.
- **Persistence**: Your plans are saved automatically to Local Storage, so you never lose your trip data.

---

## 🛠️ Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) / React 19
- **Styling**: TailwindCSS + Shadcn/UI (Lucide Icons)
- **Maps**: Leaflet / React-Leaflet
- **Data APIs**:
  - **OpenStreetMap (Nominatim)**: Geocoding.
  - **Overpass API**: Nearby places.
  - **Wikipedia API**: Content/Images.
  - **Unsplash (Source)**: Image fallbacks.
  - **Google Gemini**: AI Intelligence.

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/terarush/StreetAI.git
   cd StreetAI
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Visit `http://localhost:5173` to start exploring!

---

## 📷 Screenshots

The `demo/image.png` file in this repository showcases the enhanced "Super Sidebar" and Nearby Radar features in action.

---

Built with ❤️ by the StreetAI Team.
