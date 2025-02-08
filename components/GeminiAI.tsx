import { useState } from 'react';

interface GeminiAIProps {
  location: { lat: number; lng: number };
  onResponse: (response: string) => void;
}

const GeminiAI = ({ location, onResponse }: GeminiAIProps) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAI = async () => {
    if (!question.trim()) {
      setError('Pertanyaan tidak boleh kosong.');
      return;
    }

    try {
      setLoading(true);
      setError(null); 

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, question }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Terjadi kesalahan saat menghubungi AI.');
      }

      const data = await response.json();

      onResponse(data.answer || 'Tidak ada jawaban dari AI.');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan tak terduga.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Input Pertanyaan */}
      <input
        type="text"
        className="border p-2 rounded-md w-full"
        placeholder="Tanyakan sesuatu..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading} // Nonaktifkan input saat loading
      />

      {/* Tombol Tanya AI */}
      <button
        className={`p-2 rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
        onClick={askAI}
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Tanya AI'}
      </button>

      {/* Pesan Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default GeminiAI;