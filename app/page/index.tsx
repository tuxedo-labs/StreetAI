import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationWalkGirl from "../components/animation/girl_travel_walk_cycle.json";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import {
  FaArrowRight,
  FaMapMarkedAlt,
  FaRobot,
  FaGithub,
} from "react-icons/fa";
import { FiCpu, FiMap, FiDatabase, FiArrowUpRight } from "react-icons/fi";
import Footer from "~/components/layout/Footer";
import { motion } from "framer-motion";
import Map from "~/components/Map";

function Main() {
  const [mounted, setMounted] = useState(false);
  const [contributors, setContributors] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch("https://api.github.com/repos/terarush/StreetAI/contributors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContributors(data);
        }
      })
      .catch((err) => console.error("Failed to fetch contributors", err));
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden font-sans text-slate-900 selection:bg-blue-200">
      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-indigo-400/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-slate-200 backdrop-blur-sm shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600">
                The Future of Local Travel
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Explore the World <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Like a Local.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl text-slate-600 leading-relaxed max-w-lg"
            >
              StreetAI combines real-time mapping with AI-powered local insights
              to transform how you navigate and experience new destinations.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="h-14 px-8 rounded-full text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                  Get Started Free
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-14 px-12 rounded-full text-lg border-2 hover:bg-slate-100 transition-all"
              >
                View Demo <FaArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex items-center gap-6 pt-4 text-slate-500"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs overflow-hidden"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt="user"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">
                Trusted by 50,000+ travelers
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-50" />
            {mounted && (
              <div className="relative z-10 w-full max-w-lg drop-shadow-2xl">
                <Lottie
                  animationData={animationWalkGirl}
                  loop={true}
                  autoplay={true}
                  className="w-full h-full object-contain"
                />
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[180px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <FaMapMarkedAlt />
                    </div>
                    <span className="font-bold text-sm">Best Route</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-green-500 rounded-full" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-20 left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FaRobot />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">AI Suggestion</p>
                      <p className="font-bold text-sm">Visit Tokyo Tower</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "195+", label: "Countries Covered" },
              { value: "1M+", label: "Active Guides" },
              { value: "24/7", label: "AI Support" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group cursor-default">
                <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-slate-500 font-medium mt-2 tracking-wide uppercase text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                Discover
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 text-slate-900">
                Trending Destinations
              </h2>
            </div>
            <Button variant="outline" className="hidden md:flex rounded-full">
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-6 md:grid-rows-2 gap-6 h-[800px] md:h-[600px]">
            {[
              {
                name: "Kyoto, Japan",
                image:
                  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
                rating: "4.9",
                className: "md:col-span-3 md:row-span-2", // Large item
              },
              {
                name: "Bali, Indonesia",
                image:
                  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=500",
                rating: "4.8",
                className: "md:col-span-3 md:row-span-1",
              },
              {
                name: "Paris, France",
                image:
                  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=500",
                rating: "4.7",
                className: "md:col-span-1 md:row-span-1",
              },
              {
                name: "New York, USA",
                image:
                  "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&q=80&w=500",
                rating: "4.6",
                className: "md:col-span-2 md:row-span-1",
              },
            ].map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative rounded-4xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${dest.className}`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-bold flex items-center gap-1 border border-white/20">
                  <span>★</span> {dest.rating}
                </div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold tracking-tight mb-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <span className="font-medium">Explore Guide</span>
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                      <FaArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems & Solutions (Split View) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-slate-900">
              Why choose StreetAI?
            </h2>
            <p className="text-lg text-slate-600">
              Traveling shouldn't be stressful. We solve the common problems
              travelers face with intelligent technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                title: "Information Overload",
                icon: <FiDatabase className="w-8 h-8" />,
                desc: "Generic travel guides are overwhelming. We curate only what matters to you using AI.",
                color: "bg-blue-50 text-blue-600",
                delay: 0,
              },
              {
                title: "Getting Lost",
                icon: <FiMap className="w-8 h-8" />,
                desc: "Complex transit systems? Our real-time AR navigation keeps you on the right path.",
                color: "bg-indigo-50 text-indigo-600 lg:translate-y-12", // Staggered position
                delay: 0.2,
              },
              {
                title: "Generic Plans",
                icon: <FiCpu className="w-8 h-8" />,
                desc: "No more cookie-cutter itineraries. Your trip is personalized to your unique taste.",
                color: "bg-green-50 text-green-600",
                delay: 0.4,
              },
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.6 }}
                key={i}
                className={`p-10 rounded-4xl border border-slate-100 hover:shadow-xl transition-all duration-300 group ${item.color.includes("translate") ? "lg:translate-y-12" : ""} bg-white`}
              >
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${item.color.split(" ").slice(0, 2).join(" ")} group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {item.desc}
                </p>
                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center font-semibold cursor-pointer group/link">
                  <span className={item.color.split(" ")[1]}>Learn more</span>
                  <FiArrowUpRight
                    className={`ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform ${item.color.split(" ")[1]}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Preview Section */}
      <section className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Experience the Power of{" "}
              <span className="text-blue-600">Smart Maps</span>
            </h2>
            <p className="text-lg text-slate-600">
              See what's happening around you in real-time. Our map isn't just a
              static image; it's a living, breathing guide.
            </p>
          </div>
          import Map from "~/components/Map"; // ... (in the component)
          <div className="relative w-full aspect-video md:aspect-21/9 bg-slate-100 rounded-4xl shadow-2xl overflow-hidden border border-slate-200 z-0">
            <div className="absolute inset-0 z-0">
              <Map onAreaSelect={() => {}} />
            </div>

            {/* Animated Map Pins */}
            {[
              {
                x: "20%",
                y: "30%",
                color: "bg-red-500",
                delay: 0,
                label: "Hot Spot!",
              },
              {
                x: "50%",
                y: "50%",
                color: "bg-blue-500",
                delay: 1,
                label: "You are here",
              },
              {
                x: "70%",
                y: "20%",
                color: "bg-green-500",
                delay: 2,
                label: "Park",
              },
              {
                x: "60%",
                y: "70%",
                color: "bg-orange-500",
                delay: 1.5,
                label: "Restaurant",
              },
            ].map((pin, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: pin.delay, type: "spring" }}
                className="absolute group cursor-pointer"
                style={{ left: pin.x, top: pin.y }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${pin.color} ring-4 ring-white shadow-lg animate-bounce`}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {pin.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
                </div>
              </motion.div>
            ))}

            {/* UI Overlay Mockup */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-xl p-2 px-4 shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-700">
                Live Updates Active
              </span>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800 h-14 text-lg shadow-xl"
              >
                Try the Live Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">
              Our Amazing Contributors
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              StreetAI is built by a passionate community of developers from
              around the world.
            </p>
          </div>

          {contributors.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {contributors.map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-500">
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap z-10 pointer-events-none">
                    {contributor.login}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900"></div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Fallback/Loading State */
            <div className="flex flex-wrap justify-center gap-4 opacity-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full bg-slate-200 animate-pulse"
                />
              ))}
            </div>
          )}

          <div className="mt-12">
            <a
              href="https://github.com/terarush/StreetAI"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="rounded-full gap-2 hover:bg-white"
              >
                <FaGithub /> Become a Contributor
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/30">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Ready to start your journey?
              </h2>
              <p className="text-blue-100 text-xl">
                Join thousands of travelers who are discovering the world in a
                smarter, safer way.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link to="/register">
                  <Button className="h-14 px-10 rounded-full bg-white text-blue-600 hover:bg-slate-100 text-lg font-bold shadow-lg">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="h-14 px-10 rounded-full border-2 border-white/30 text-black hover:bg-white/10 hover:text-white text-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Main;
