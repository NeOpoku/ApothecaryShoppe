// src/components/Apothecary/MyApothecary.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';


const MyApothecary: React.FC = () => {
  const { state: authState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // Explicitly typed as Error | null
  
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      // Simulate a delay for loading
      try {
        // Simulate successful data fetching
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
      setLoading(false);
    };
  
    fetchData();
  }, []);
  
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
if (error) return <p>Error loading saved searches: {error.message}</p>;
  if (!authState.isAuthenticated) {
    return null; // Don't render anything while redirecting
  }


if (loading) return <p>Loading your Apothecary...</p>;
if (error) return <p>Error loading saved searches: {(error as any).message}</p>; // Accessing message safely
const herbs = apothecaryState.savedHerbs || [];
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
  // Removed duplicate apothecaryState and redundant return statement

export default MyApothecary;
