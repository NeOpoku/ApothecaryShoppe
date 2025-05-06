import { FormEvent, useState } from 'react';
import SearchResult from './SearchResult';
import React from 'react';

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
    <div>
      <h1 className="welcome">Welcome to your Apothecary</h1>
      <img src="/apothecary.svg" alt="My Apothecary Logo" className="logHead" />
    </div>

    <div>
      <p className="textWelcome">
        Welcome to My Apothecary, your personal gateway to the healing power of herbs.
        Discover trusted herbal information for your needs and save
        your own history of natural solutions all in one beautiful, easy-to-use place.
      </p>
    </div>

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
