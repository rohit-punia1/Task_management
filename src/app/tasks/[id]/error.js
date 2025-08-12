"use client";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
