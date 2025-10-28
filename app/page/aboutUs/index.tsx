import { Link } from "react-router";

export default function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>This is the About page for Unique.</p>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
}
