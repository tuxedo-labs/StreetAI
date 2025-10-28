import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Navbar from "~/components/layout/NavbarLayout";
import animationWalkGirl from "../components/animation/girl_travel_walk_cycle.json";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import {
  SiReact,
  SiReactrouter,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { FaArrowRight } from "react-icons/fa";
import { FiCpu, FiMap, FiDatabase } from "react-icons/fi";
import Footer from "~/components/layout/Footer";
import { Outlet } from "react-router";

const stepsData = [
  {
    id: 1,
    number: "01",
    mainTitle: "Lack of Authentic Local Information",
    subTitle: "/ location",
    items: [
      "StreetAI helps you discover hidden gems and authentic tips from locals, providing in-depth insights you can't find in general travel guides.",
    ],
    isPrimary: true, // Kolom utama (warna biru)
  },
  {
    id: 2,
    number: "02",
    mainTitle: "Confusion in Finding Destinations That Match Your Interests",
    subTitle: "/ destination",
    items: [
      "StreetAI understands your interests and recommends the most suitable destinations, so you no longer have to worry about choosing from millions of available options.",
    ],
    isPrimary: false, // Kolom sekunder (warna abu-abu)
  },
  {
    id: 3,
    number: "03",
    mainTitle: "Fear of Getting Lost in a New Location",
    subTitle: "/ navigation",
    items: [
      "With interactive maps and real-time guidance, StreetAI ensures you can explore new locations with confidence and never get lost along the way.",
    ],
    isPrimary: false, // Kolom sekunder (warna abu-abu)
  },
];

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiReactrouter />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

function Main() {
  const [mounted, setMounted] = useState(false);
  const [activeCardId, setActiveCardId] = useState(1); // Default to first card

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-7xl mx-auto">
        <div className="w-full h-screen items-center flex justify-center gap-2">
          <div className="w-1/2 text-start space-y-2">
            <span className="font-medium opacity-40">
              An innovation and creativity to help tourism
            </span>
            <h1 className="text-6xl font-extrabold">
              Welcome Travelers to{" "}
              <span className="font-bold italic text-blue-500">StreetAI</span>
            </h1>
            <p className="opacity-80 text-xl pl-1">
              "StreetAI innovation helps travelers explore destinations in new
              and immersive ways, as if they had a personal tour guide who
              understands their desires."
            </p>

            <div className="mt-5 flex gap-3">
              <Button className=" rounded-full hover:bg-blue-500">
                Get Started
              </Button>
              <Button variant="outline" className="rounded-full border-black ">
                <FaArrowRight />
              </Button>
            </div>
          </div>

          <div className="w-1/2">
            {mounted && (
              <Lottie
                animationData={animationWalkGirl}
                loop={true}
                autoplay={true}
              />
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full mb-30 bg-white">
          <div className="w-7xl mx-auto text-center">
            <div className="flex justify-around items-center gap-8">
              <div className="flex flex-col items-center hover:text-blue-500">
                <div className="w-20 h-20  flex items-center justify-center mb-2">
                  <span className="text-6xl font-bold ">195+</span>
                </div>
                <p className="font-semibold text-2sm">
                  How Many Countries Explored
                </p>
              </div>
              <div className="flex flex-col items-center hover:text-blue-500">
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <span className="text-6xl font-bold ">1M+</span>
                </div>
                <p className=" font-semibold text-2sm">
                  Tourist Attractions Worldwide
                </p>
              </div>
              <div className="flex flex-col items-center hover:text-blue-500">
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <span className="text-6xl font-bold ">80%</span>
                </div>
                <p className=" font-semibold text-2sm">
                  Tourists Confused About Destinations
                </p>
              </div>
              <div className="flex flex-col items-center hover:text-blue-500">
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <span className="text-6xl font-bold ">100%</span>
                </div>
                <p className="font-semibold text-2sm">
                  Free Exploration for Travelers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* problem solve */}
        <div className="w-full h-auto">
          <div className="w-full flex flex-1 mb-40">
            <div className="w-1/2 h-auto relative">
              {/* obyek abstract */}
              <div className="absolute top-1/6 right-1/6 w-4/5 h-3/4 bg-blue-500 rounded-full  z-0 transform rotate-12 "></div>
              <img
                src="./phone_overview.png"
                alt="phone_map"
                className="w-4/7 z-10 mx-auto h-auto -rotate-6 relative"
              />
            </div>

            <div className="w-1/2 py-16 my-auto">
              <span className="ml-1 opacity-45 font-medium">
                Did you know ?
              </span>
              <h2 className="text-5xl font-bold border-l-4 border-blue-500 pl-2">
                What Does{" "}
                <span className="font-bold italic text-blue-500">
                  {" "}
                  StreetAI{" "}
                </span>{" "}
                Want To Solve ?
              </h2>
              <p className="mt-3 text-base opacity-70">
                StreetAI addresses the core challenges of travelers who are
                tired of generic information and overwhelmed by the sheer number
                of choices. Our solution addresses these needs by providing
                authentic insights from locals, recommending destinations
                personalized to their interests, and offering real-time
                navigation guidance that makes every trip safer and more
                enjoyable.
              </p>
              <div className="mt-4">
                <Button className="rounded-full">Explore Now !</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="w-full py-20 bg-gray-50">
          <div className="w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Services We Provide
              </h2>
              <p className="text-xl text-gray-600">
                Elevate Your Travel Experience
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <FiCpu className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  AI-Powered Insights
                </h3>
                <p className="text-gray-600 mb-4">
                  Get personalized recommendations based on your interests using
                  advanced AI algorithms.
                </p>
                <Button className="rounded-full ">Learn More</Button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <FiMap className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Interactive Maps
                </h3>
                <p className="text-gray-600 mb-4">
                  Navigate destinations effortlessly with real-time, interactive
                  maps and local guidance.
                </p>
                <Button className="rounded-full">Learn More</Button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <FiDatabase className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Accurate Local Data
                </h3>
                <p className="text-gray-600 mb-4">
                  Access verified information from locals for authentic and
                  up-to-date travel details.
                </p>
                <Button className="rounded-full">Learn More</Button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full py-20 bg-white">
          <div className="w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Proven Work Process
              </h2>
              <p className="text-xl text-gray-600">
                How StreetAI Makes Travel Simple
              </p>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">01</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Discover Interests
                </h3>
                <p className="text-gray-600">
                  Tell us about your preferences and let AI analyze your travel
                  style.
                </p>
              </div>
              <div className="w-12 h-1 bg-gray-300"></div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">02</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Get Recommendations
                </h3>
                <p className="text-gray-600">
                  Receive tailored suggestions for destinations and hidden gems.
                </p>
              </div>
              <div className="w-12 h-1 bg-gray-300"></div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">03</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Navigate Easily
                </h3>
                <p className="text-gray-600">
                  Use interactive maps for seamless navigation and real-time
                  guidance.
                </p>
              </div>
              <div className="w-12 h-1 bg-gray-300"></div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">04</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Explore Freely
                </h3>
                <p className="text-gray-600">
                  Enjoy your journey with confidence, empowered by authentic
                  insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-20 bg-blue-500 text-white rounded-4xl mb-20">
          <div className="w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Discover the world with StreetAI – your personal travel companion.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-white text-black hover:text-blue-500 hover:bg-gray-100 rounded-full px-8"
                >
                  Get Started
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white hover:text-blue-500 rounded-full px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
