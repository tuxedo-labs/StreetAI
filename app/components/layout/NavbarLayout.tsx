import { Link, Outlet, useLocation } from "react-router";
import { FaMap } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function NavbarLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/dashboard");

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="min-h-screen bg-background font-sans">
      {!isAuthPage && (
        <motion.header
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md shadow-sm"
        >
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <FaMap size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                StreetAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {["Home", "About", "Service", "Blog"].map((item) => (
                    <NavigationMenuItem key={item}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-all"
                        >
                          {item}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Login Button */}
            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="rounded-full px-6 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full px-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>
      )}
      <main className="flex-1">{children ? children : <Outlet />}</main>
    </div>
  );
}
