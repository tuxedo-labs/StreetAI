import MapWrapper from "@/components/MapWrapper";

export default async function page() {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div>
        <MapWrapper />
      </div>
    </div>
  )
}
