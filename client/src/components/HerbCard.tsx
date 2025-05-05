// src/components/Apothecary/HerbCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Herb } from '../types';
import { useApothecary } from '../components/ApothecaryContext';

interface HerbCardProps {
  herb: Herb;
  showSaveButton?: boolean;
}

const HerbCard: React.FC<HerbCardProps> = ({ herb, showSaveButton = false }) => {
  const { saveHerb, deleteHerb } = useApothecary();

  const handleSave = () => {
    saveHerb(herb);
  };

  const handleDelete = () => {
    deleteHerb(herb.id);
  };

  return (
    <div className="apothecary-card">
      <img 
        src={herb.imageUrl || '/assets/images/herbs/default.jpg'} 
        alt={herb.name} 
        className="apothecary-card-img" 
      />
      <div className="apothecary-card-content">
        <h3 className="apothecary-card-title">{herb.name}</h3>
        <p className="apothecary-card-subtitle">{herb.scientificName}</p>
        <p className="apothecary-card-desc">{herb.description.substring(0, 100)}...</p>
        <div className="apothecary-card-footer">
          <Link to={`/herbs/${herb.id}`} className="apothecary-card-button">
            View Details
          </Link>
          {showSaveButton ? (
            <button onClick={handleSave} className="apothecary-card-button save-button">
              Save to My Apothecary
            </button>
          ) : (
            <button onClick={handleDelete} className="apothecary-card-button delete-button">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HerbCard;