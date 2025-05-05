import { useState } from 'react';
import SearchResult from './SearchResult';

export default function Welcome() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/herbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ailment: query })
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Error fetching herbs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="welcome-container">
      {/* ... same as before ... */}

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Feeling off? Tell us what's wrong..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}

        <div className="results-grid">
          {results.map((herb: any, i) => (
            <SearchResult key={i} herb={herb} />
          ))}
        </div>
      </div>
    </div>
  );
}
