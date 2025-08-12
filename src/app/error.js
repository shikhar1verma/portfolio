'use client';

export default function Error({ error, reset }) {
  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="mb-4 text-sm opacity-80">{error?.message || 'Unexpected error.'}</p>
      <button onClick={() => reset()} className="inline-block bg-brand-500 text-white px-4 py-2 rounded">Try again</button>
    </section>
  );
} 