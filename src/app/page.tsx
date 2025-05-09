"use client";
import { useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Supermarket Sales Assistant</h1>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={3}
        placeholder="Ask something like: 'What were the top-selling dairy items last month?'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
