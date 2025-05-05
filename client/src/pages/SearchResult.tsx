import React from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_HERB } from '../../utils/mutations';

interface Herb {
  name: string;
  description: string;
  use: string;
  image: string;
}

interface Props {
  herb: Herb;
}

const SearchResult: React.FC<Props> = ({ herb }) => {
  const [saveHerb] = useMutation(SAVE_HERB);

  const handleSave = async () => {
    try {
      await saveHerb({ variables: { herb } });
      alert(`${herb.name} saved to your apothecary!`);
    } catch (err) {
      console.error(err);
      alert('You must be logged in to save herbs.');
    }
  };

  return (
    <div className="herb-card">
      <img src={herb.image} alt={herb.name} className="herb-image" />
      <div className="herb-details">
        <h3>{herb.name}</h3>
        <p><strong>Description:</strong> {herb.description}</p>
        <p><strong>Use:</strong> {herb.use}</p>
        <button className="save-btn" onClick={handleSave}>Save to My Apothecary</button>
      </div>
    </div>
  );
};

export default SearchResult;