const sampleRemedies = [
    { name: "Chamomile", type: "Calming" },
    { name: "Ginger", type: "Digestive" },
    { name: "Echinacea", type: "Immunity" },
    { name: "Lavender", type: "Calming" },
  ];
  
  const SearchResultsGrid = () => {
    return (
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleRemedies.map((remedy) => (
          <div key={remedy.name} className="border rounded-md shadow-md p-4 text-center">
            <div className="h-32 bg-green-100 flex items-center justify-center mb-4">
              <span className="text-green-700 text-3xl">🌿</span>
            </div>
            <h3 className="font-bold text-green-800">{remedy.name}</h3>
            <p className="text-green-600 text-sm">{remedy.type} Remedy</p>
          </div>
        ))}
      </section>
    );
  };
  
  export default SearchResultsGrid;
  