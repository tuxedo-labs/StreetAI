import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/provider/auth-provider";

export default function Home() {
  return (
    <>
      <AuthProvider>

        <Navbar />
        <HeroSection />

      </AuthProvider>
    </>
  );
}

