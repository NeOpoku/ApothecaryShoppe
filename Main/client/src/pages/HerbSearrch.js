import React, { useState } from 'react';

export default function HerbSearch() {
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);

const [error, setError] = useState('');


const cache = new Map();

const handleSearch = async (e) => {
e.preventDefault();
setError('');
setResults([]);

const key = searchTerm.trim().toLowerCase();
if (!key) {
setError('Please enter a search term.');
return;
}

if (cache.has(key)) {
setResults(cache.get(key));
return;
}

try {
const res = await fetch(`/api/herbs?query=${encodeURIComponent(key)}`);
if (!res.ok) throw new Error('Fetch error');
const data = await res.json();

if (!data.herbs.length) {
setError('No results found.');
} else {
cache.set(key, data.herbs); // cache the result
setResults(data.herbs);
}
} catch (err) {
setError('Could not load herbs. Try again later.');
}
}

return (
// Removed duplicate handleSearch function
if (!searchTerm.trim()) {
setError('Please enter a search term.');
return;
}

try {
const res = await fetch(`/api/herbs?query=${encodeURIComponent(searchTerm)}`);
if (!res.ok) throw new Error('Failed to fetch herbs');
const data = await res.json();

if (!data.herbs.length) {
setError('No herbs found for that search term.');
} else {
setResults(data.herbs);
}
} catch (err) {
setError('Something went wrong while fetching herbs.');
console.error(err);
}};
