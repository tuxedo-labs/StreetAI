import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";

interface GeminiAIProps {
  location: { lat: number; lng: number };
  onResponse: (response: string) => void;
}

const GeminiAI = ({ location, onResponse }: GeminiAIProps) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAI = async () => {
    if (!question.trim()) {
      setError("Pertanyaan tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResponse("");

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, question }),
      });

      const data = await res.json();
      setResponse(data.answer || "Tidak ada jawaban dari AI.");
      onResponse(data.answer || "Tidak ada jawaban dari AI.");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan tak terduga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="space-y-4">
      <Input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />
      <Button onClick={askAI} disabled={loading} className="w-full">
        {loading ? "Loading" : "Ask AI"}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && <Skeleton className="h-20" />}
      {response && <ReactMarkdown className="prose dark:prose-invert">{response}</ReactMarkdown>}
    </CardContent>
  );
};

export default GeminiAI;

