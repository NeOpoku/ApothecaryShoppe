import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';

const allHerbs = ['Chamomile', 'Ginger', 'Peppermint', 'Echinacea', 'Lavender', 'Turmeric'];

export default function CustomRecipe() {
const [name, setName] = useState('');
const [herbs, setHerbs] = useState([]);
const [instructions, setInstructions] = useState('');
const [addRecipe] = useMutation(ADD_RECIPE);

const toggleHerb = (herb) => {
setHerbs((prev) =>
prev.includes(herb) ? prev.filter((h) => h !== herb) : [...prev, herb]
);
};

const handleSubmit = (e) => {
e.preventDefault();
addRecipe({ variables: { name, herbs, instructions } });
setName('');
setHerbs([]);
setInstructions('');
};

return (
<form onSubmit={handleSubmit}> 
<h2>Create Your Own Herbal Recipe</h2>
<input
placeholder="Recipe Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<div>
<p>Select Herbs:</p>
{allHerbs.map((herb) => (
<label key={herb}>
<input
type="checkbox"
value={herb}
checked={herbs.includes(herb)}
onChange={() => toggleHerb(herb)}
/>
{herb}
</label>
))}
</div>
<textarea
placeholder="Instructions"
value={instructions}
onChange={(e) => setInstructions(e.target.value)}
/>
<button type="submit">Save Recipe</button>
</form>
);
}
