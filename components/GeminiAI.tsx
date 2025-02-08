import { useState } from 'react';

interface GeminiAIProps {
  location: { lat: number; lng: number };
  onResponse: (response: string) => void;
}

const GeminiAI = ({ location, onResponse }: GeminiAIProps) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    const response = await fetch('/api/geminiai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, question }),
    });

    const data = await response.json();
    onResponse(data.answer || 'Tidak ada jawaban dari AI.');
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        className="border p-2 rounded-md"
        placeholder="Tanyakan sesuatu..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={askAI}
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Tanya AI'}
      </button>
    </div>
  );
};

export default GeminiAI;
