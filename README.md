# 🌍 AI-Powered Interactive Maps

## 📌 Overview
AI-Powered Interactive Maps is an innovative web application that combines **interactive maps** with **AI-generated insights**. Users can **select a location** on the map, and AI will provide **detailed explanations** about that place, including historical significance, local culture, travel recommendations, and more!

## 🔥 Features
- 🗺 **Interactive Maps** – Click or search for any location worldwide.
- 🤖 **AI Integration** – Get instant AI-generated insights about the selected place.
- 📍 **Custom Location Selection** – Users can manually pick a spot on the map.
- 🔍 **Search & Autocomplete** – Quickly find places using an intuitive search feature.
- 🌐 **Multilingual Support** – AI responses available in multiple languages.
- 🏕 **Travel Recommendations** – Get AI-generated travel tips, best places to visit, and local insights.
- 📚 **Historical & Cultural Data** – AI provides historical context and interesting facts about locations.

## ⚙️ Tech Stack
- **Frontend:** React, Next.js, Tailwind CSS
- **Maps:** Leaflet.js / Mapbox API / Google Maps API
- **AI Backend:** OpenAI / Gemini API (for AI-generated responses)
- **Authentication:** Clerk / Firebase Auth
- **Backend:** Node.js, Express, PostgreSQL / MongoDB

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/tuxedo-labs/StreetAI.git
cd StreetAI
```

### 2️⃣ Install Dependencies
```bash
yarn install
# or
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add the following:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
```

### 4️⃣ Run the Project
```bash
yarn dev
# or
npm run dev
```

## 🎯 How It Works
1️⃣ **User selects a location** on the interactive map. 🗺
2️⃣ **AI processes the request** and fetches relevant data. 🤖
3️⃣ **AI generates insights** (history, travel tips, cultural facts, etc.). 📜
4️⃣ **Information is displayed** dynamically on the UI. 🔥

## 📌 Example Use Cases
- **Travelers** – Learn about places before visiting.
- **Students & Researchers** – Get historical and cultural information quickly.
- **Real Estate & Urban Planning** – Analyze area insights for projects.
- **General Exploration** – Discover new places with AI-powered explanations.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

🌍 **Explore the world with AI!** 🧠✨


