import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">StreetAI</h3>
            <p className="text-gray-400 text-sm mt-1">
              Your personal travel companion.
            </p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope size={16} className="text-gray-400" />
            <a
              href="mailto:info@streetai.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              info@streetai.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400 text-sm">
          &copy; 2026 StreetAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
