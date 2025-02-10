import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/provider/auth-provider";
import Service from "@/components/Service";
import Footer from "@/components/Footer";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <AuthProvider>

        <Navbar />
        <HeroSection/>
        <About/> 
        <Service/>
        <Footer/>

      </AuthProvider>
    </>
  );
}

