import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ClientAuth from "@/provider/auth-provider";
import MyMap from "@/components/map";

export default function Home() {
  return (
    <>
      <ClientAuth>
        <Navbar />
        <HeroSection />
        <MyMap/>
      </ClientAuth>
    </>
  );
}
