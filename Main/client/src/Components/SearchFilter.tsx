const SearchFilter = () => {
    return (
      <section className="p-4 flex flex-col md:flex-row items-center gap-4 bg-white">
        <input
          type="text"
          placeholder="Search herbs or symptoms..."
          className="border rounded-md p-2 flex-1"
        />
        <button className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-md">
          Search
        </button>
        <select className="border rounded-md p-2">
          <option>Category</option>
          <option>Digestive</option>
          <option>Calming</option>
          <option>Immunity</option>
        </select>
        <select className="border rounded-md p-2">
          <option>Sort</option>
          <option>A-Z</option>
          <option>Newest</option>
        </select>
      </section>
    );
  };
  
  export default SearchFilter;
  