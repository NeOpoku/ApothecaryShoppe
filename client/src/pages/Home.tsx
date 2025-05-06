import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_HERBS } from '../utils/queries';


export default function Home() {
const [query, setQuery] = useState('');
const [searchHerbs, { data, loading }] = useLazyQuery(GET_HERBS);

const handleSearch = (e) => {
e.preventDefault();
if (!query.trim()) return;
searchHerbs({ variables: { query } });
};

const herbs = data?.herbs || [];

return (
<div>
    <h1>Welcome to The Apothecary Shoppe</h1>
    <form onSubmit={handleSearch}>
        <input
            type="text"
            placeholder="Search herbs or symptoms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
    </form>
    {loading && <p>Loading...</p>}
    <div className="herb-results">
        {herbs.map((herb)=>(
            <div key={herb._id} className="herb-card">
                <h2>{herb.name}</h2>
                <img src={herb.image} alt={herb.name} style={{width:'100px'}} />
                <p>{herb.description}</p>
                {herb.remedies?.length > 0 && (
                    <ul>
                        {herb.remedies.map((remedy, idx) => (
                            <li key={idx}>{remedy}</li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
    </div>
</div>
    );
    }
