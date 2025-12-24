import { SignUp } from "@clerk/clerk-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex justify-center">
        <SignUp
          path="/register"
          signInUrl="/login"
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
              card: "shadow-none border border-slate-200 rounded-3xl",
            },
          }}
        />
      </div>
    </div>
  );
}
