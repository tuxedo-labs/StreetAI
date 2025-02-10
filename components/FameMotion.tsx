"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  "Service 1", "Service 2", "Service 3", "Service 4", "Service 5", "Service 6", "service 7"
];

export default function InfiniteSlider() {
  return (
    <div className="relative overflow-hidden w-full bg-white py-10 backdrop-blur">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-30%"] }} // Geser ke kiri
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="min-w-[100px] mx-4 p-7 bg-black text-white  rounded-lg shadow-lg">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
