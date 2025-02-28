'use client';
import { useState } from 'react';

export default function Calculator() {
  const [values, setValues] = useState({
    electricity: '',
    gas: '',
    car: '',
    flights: ''
  });

  const [result, setResult] = useState<number | null>(null);

  const calculateFootprint = (e: React.FormEvent) => {
    e.preventDefault();
    const total = 
      (Number(values.electricity) * 0.5) +
      (Number(values.gas) * 0.2) +
      (Number(values.car) * 0.3) +
      (Number(values.flights) * 0.1);

    setResult(total);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Carbon Footprint Calculator</h1>
      
      <form onSubmit={calculateFootprint} className="space-y-4">
        <div>
          <label className="block mb-2">Monthly Electricity Usage (kWh)</label>
          <input
            type="number"
            value={values.electricity}
            onChange={(e) => setValues({...values, electricity: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Monthly Gas Usage (therms)</label>
          <input
            type="number"
            value={values.gas}
            onChange={(e) => setValues({...values, gas: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Monthly Car Mileage</label>
          <input
            type="number"
            value={values.car}
            onChange={(e) => setValues({...values, car: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Flights per Year</label>
          <input
            type="number"
            value={values.flights}
            onChange={(e) => setValues({...values, flights: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="text-xl font-semibold">Your Carbon Footprint</h2>
          <p className="mt-2">Estimated {result.toFixed(2)} tonnes of CO2 per year</p>
        </div>
      )}
    </div>
  );
} 