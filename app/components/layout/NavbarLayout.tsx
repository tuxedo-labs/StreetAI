import { Link, Outlet, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";

export default function NavbarLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      {!isAuthPage && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-2xl shadow-lg">
          <div className="w-7xl mx-auto">
            <div className="container flex h-16 max-w-screen-2xl items-center">
              <Link to="/" className="mr-4 hidden md:flex items-center">
                <span className="font-bold text-xl">StreetAI</span>
              </Link>

              <div className="flex flex-1 items-center justify-end space-x-2 md:ml-10 gap-10">
                <NavigationMenu className="hidden md:flex flex-1 text-xl">
                  <NavigationMenuList className="gap-6">
                    <NavigationMenuItem className="">
                      <NavigationMenuLink asChild>
                        <Link to="/" className="hover:text-blue-500">
                          Home
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="hover:text-blue-500">
                          About
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/service" className="hover:text-blue-500">
                          Service
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <Link to="/login">
                  <Button variant="default" className="text-base rounded-full px-5 hover:bg-blue-500">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">
        {children ? children : <Outlet />}
      </main>
    </div>
  );
}
