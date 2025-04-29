const categories = ["Digestive", "Calming", "Immunity", "Sleep", "Energy", "Focus"];

const DrawerCabinet = () => {
  return (
    <section className="flex overflow-x-auto gap-4 p-4 bg-green-50">
      {categories.map((category) => (
        <button
          key={category}
          className="flex-shrink-0 px-4 py-2 rounded-full bg-green-200 hover:bg-green-300 text-green-800 font-semibold"
        >
          {category}
        </button>
      ))}
    </section>
  );
};

export default DrawerCabinet;
