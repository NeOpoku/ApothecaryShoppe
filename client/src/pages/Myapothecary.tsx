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


if (loading) return <p>Loading your Apothecary...</p>;
if (error) return <p>Error loading saved searches: {error.message}</p>;
const herbs = data?.me?.savedHerbs || [];
return (
  <div>
	<div className="apothecary-container">
      <h2>My Saved Herbs</h2>
      {herbs.length === 0 ? (
        <p>You haven't saved any herbs yet.</p>
      ) : (
        <div className="results-grid">
          {herbs.map((herb: any, i: number) => (
            <div key={i} className="herb-card">
              <img src={herb.image} alt={herb.name} className="herb-image" />
              <div className="herb-details">
                <h3>{herb.name}</h3>
                <p><strong>Description:</strong> {herb.description}</p>
                <p><strong>Use:</strong> {herb.use}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};
export default MyApothecary;
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
