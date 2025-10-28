import React, { useState } from "react";
import DashboardSideBar from "~/components/layout/DashboardSideBar";
import Map from "~/components/Map";
import { Input } from "~/components/ui/input";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const detailPanelLeft = sidebarOpen ? "17.5rem" : "5.5rem";

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} h-[98%] absolute left-2 top-2 z-10 flex`}
        style={{ pointerEvents: "auto" }}
      >
        <DashboardSideBar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Panel Detail */}
      {selectedArea && (
        <div
          className="absolute top-2 z-10 w-80 h-1/2 rounded-2xl bg-white shadow-lg border-l border-gray-200 p-4 overflow-y-auto transition-all duration-300"
          style={{ 
            pointerEvents: "auto",
            left: detailPanelLeft 
          }}
        >
          <h3 className="text-lg font-bold mb-4">Detail Data</h3>
          <p>Area: {selectedArea.name}</p>
          <p>Description: {selectedArea.description}</p>
          {/* Tambahkan detail lain sesuai kebutuhan */}
        </div>
      )}

      {/* Main Content: Map */}
      <div className="flex-1 h-screen relative z-0">
        <Map onAreaSelect={setSelectedArea} />
      </div>

      <div className="absolute right-2 top-2 z-10 w-1/4 h-86 ">
        <Input className="w-full h-fit bg-white " />
      </div>
    </div>
  );
}
