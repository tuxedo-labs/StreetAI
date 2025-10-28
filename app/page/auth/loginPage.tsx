import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <Card>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-xl font-bold text-blue-600">SA</span>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button className="w-full rounded-full">Sign in</Button>
            <p className=" text-center text-sm text-gray-600">
              Or{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
