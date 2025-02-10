import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-4 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          It seems like the page you tried to access is either removed or never existed.
        </p>
        <Button asChild>
          <Link href="/" className="mt-4">
            Go Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}