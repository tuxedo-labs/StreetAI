import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ClientAuth from "@/provider/auth-provider";

export default function Home() {
  return (
    <>
      <ClientAuth>
        <Navbar />
        <HeroSection />
      </ClientAuth>
    </>
  );
}
