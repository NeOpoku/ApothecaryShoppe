// src/components/layout/HeroBanner.tsx
const HeroBanner = () => {
  return (
    <section className="pt-32 text-center bg-[url('/your-background.jpg')] bg-cover bg-center min-h-[80vh] flex flex-col justify-center items-center">
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-green-900">The Apothecary Shoppe</h1>
        <p className="mt-4 text-lg text-green-700">A Place of Healing and Wonder 🌸</p>
        <button className="mt-6 px-6 py-3 rounded-full bg-pink-300 hover:bg-pink-400 text-white font-semibold">
          Explore Remedies
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;

  