import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Tentang Kami</h3>
                        <p className="text-sm text-gray-400">
                            Kami adalah platform yang bertujuan untuk memberikan pengalaman terbaik dalam mengeksplorasi lokasi di seluruh dunia.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Navigasi Cepat</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Kontak
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
                        <p className="text-sm text-gray-400 mb-2">Email: support@streetai.com</p>
                        <p className="text-sm text-gray-400 mb-4">Telepon: +62 123 456 789</p>
                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                            Hubungi Kami
                        </Button>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} StreetAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;