import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default async function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex h-[100px] items-center justify-between px-4 md:px-6 backdrop-blur-lg bg-opacity-30 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800 text-xl"
            >
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white text-black dark:bg-black dark:text-white"
          >
            <div className="grid gap-2 py-2">
              {navItems.map(({ name, link }, index) => (
                <Link
                  key={`${name}-${index}`}
                  href={link}
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-gray-600 dark:hover:text-gray-300"
                  prefetch={false}
                >
                  {name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="#"
          className="text-2xl font-bold hover:text-gray-600 dark:hover:text-gray-300 lg:px-[200px] px-0"
          prefetch={false}
        >
          Tux StreetAI
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden lg:flex gap-6">
          {navItems.map(({ name, link }, index) => (
            <Link
              key={`${name}-${index}`}
              href={link}
              className="group inline-flex h-9 items-center justify-center rounded-md px-4 py-1 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-gray-600 focus:bg-gray-200 focus:text-gray-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-black dark:hover:text-gray-300 dark:focus:bg-black dark:focus:text-gray-300"
              prefetch={false}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 lg:pr-[200px] pr-0">
          <SignedOut>
            <SignInButton mode="redirect" signUpForceRedirectUrl="/">
              <Button
                variant="ghost"
                className="text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 text-black",
                  userButtonPopoverCard:
                    "bg-white text-black dark:bg-black",
                  userButtonPopoverActionButton:
                    "hover:bg-gray-200",
                  userButtonPopoverActionButtonText:
                    "text-black dark:text-white",
                  userButtonPopoverFooter:
                    "bg-white text-black dark:bg-black dark:text-white",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}