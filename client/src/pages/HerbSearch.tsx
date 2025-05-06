import React, { useState } from 'react';

export default function HerbSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<{ name: string }[]>([]);
    const [error, setError] = useState('');

    const cache = new Map();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setResults([]);

        const key = searchTerm.trim().toLowerCase();
        if (!key) {
            setError('What herb would you like to search for?');
            return;
        }

        if (cache.has(key)) {
            setResults(cache.get(key));
            return;
        }

        try {
            const response = await fetch('/api/herbs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: `Provide information about the herb: ${key}`, model: 'gpt-4' }),
            }).then((res) => res.json());

            if (!response || !response.herbs || !response.herbs.length) {
                setError('No results found.');
            } else {
                cache.set(key, response.herbs); // cache the result
                setResults(response.herbs);
            }
        } catch (err) {
            setError('Could not load herbs. Try again later.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for herbs..."
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {results.map((herb, index) => (
                    <li key={index}>{herb.name}</li>
                ))}
            </ul>
        </div>
    );
}