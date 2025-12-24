import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import NavbarLayout from "~/components/layout/NavbarLayout";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <NavbarLayout>
        <Outlet />
      </NavbarLayout>
    </ClerkProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page Not Found" : "Error";
    details =
      error.status === 404
        ? "Thinking like a local... but we couldn't find this spot."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center bg-gray-50/50">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
        <h1 className="relative text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 select-none">
          404
        </h1>
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
        {message}
      </h2>
      <p className="text-slate-500 text-lg max-w-md mb-8 leading-relaxed">
        {details}
      </p>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 rounded-full border border-slate-200 text-slate-700 hover:bg-white hover:shadow-md font-medium transition-all active:scale-95"
        >
          Go Back
        </button>
        <a
          href="/"
          className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2"
        >
          Return Home
        </a>
      </div>

      {stack && (
        <div className="mt-12 text-left w-full max-w-2xl overflow-hidden rounded-xl border border-red-200 bg-red-50/50 p-6 backdrop-blur">
          <p className="font-bold text-red-800 mb-2 flex items-center gap-2">
            <span>⚠️</span> Error Details (Dev Mode Only):
          </p>
          <pre className="overflow-x-auto text-xs text-red-600 font-mono p-2 bg-white/50 rounded-lg">
            {stack}
          </pre>
        </div>
      )}
    </main>
  );
}
