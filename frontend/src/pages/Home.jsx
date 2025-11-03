import React, { useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setMeals([]);
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget }),
      });

      if (!res.ok) throw new Error("Server Error");
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      setError("Could not generate meal options. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-red-400"> BudgetGenie</h1>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <label className="block mb-2 text-gray-300">Enter Your Budget (KES)</label>
        <input
          type="number"
          className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white mb-4"
          placeholder="e.g. 150"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition"
        >
          Generate Meal Options
        </button>
      </div>

      {loading && <p className="mt-6 text-gray-300 animate-pulse">Generating options...</p>}
      {error && <p className="mt-6 text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-3xl">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:border-red-400 transition"
          >
            <h3 className="text-xl font-semibold text-red-400">{meal.meal}</h3>
            <p className="text-sm text-gray-400 mt-1">{meal.joke}</p>
            <p className="mt-2 text-gray-300 font-medium"> KES {meal.price}</p>
          </div>
        ))}
        <footer className="mt-8 text-gray-500 text-sm text-center">
            Built by <span className="font-bold text-orange-600">MONTEJ</span> 
        </footer>
      </div>
    </div>
  );
}
