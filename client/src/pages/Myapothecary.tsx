// src/components/Apothecary/MyApothecary.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import HerbCard from '../components/HerbCard'; // Adjusted the path to match the correct location

const MyApothecary: React.FC = () => {
  const { state: authState } = useAuth();
  const apothecaryState = {
    savedHerbs: [
      {
        id: '1',
        name: 'Chamomile',
        scientificName: 'Matricaria chamomilla',
        description: 'A herb used for relaxation and sleep.',
        uses: ['Tea', 'Essential Oil'],
        imageUrl: 'https://example.com/chamomile.jpg',
        benefits: ['Promotes relaxation', 'Improves sleep quality'],
      },
      {
        id: '2',
        name: 'Peppermint',
        scientificName: 'Mentha × piperita',
        description: 'A herb used for digestion and headaches.',
        uses: ['Tea', 'Oil'],
        imageUrl: 'https://example.com/peppermint.jpg',
        benefits: ['Aids digestion', 'Relieves headaches'],
      },
    ], // Replace with actual state or context logic
  };
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login');
    }
  }, [authState.isAuthenticated, navigate]);

  if (!authState.isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="apothecary-container">
      <h1 className="apothecary-title">My Apothecary</h1>

      <div className="apothecary-section">
        <h2 className="apothecary-section-title">My Herbs</h2>
        {apothecaryState.savedHerbs.length === 0 ? (
          <p className="apothecary-empty">
            You haven't saved any herbs yet. Search for herbs to add them to your collection.
          </p>
        ) : (
          <div className="apothecary-grid">
            {apothecaryState.savedHerbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApothecary;