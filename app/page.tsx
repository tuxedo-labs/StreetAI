import HeroSection from "@/components/HeroSection";
import MapWrapper from "@/components/MapWrapper";
import Navbar from "@/components/Navbar";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SignedIn>
      <MapWrapper/>
      </SignedIn>
    </>
  );
}

