// src/components/Apothecary/MyApothecary.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import HerbCard from '../components/HerbCard'; // Adjusted the path to match the correct location

const MyApothecary: React.FC = () => {
  const { state: authState } = useAuth();
  const apothecaryState = {
    savedHerbs: [], // Replace with actual state or context logic
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
            {apothecaryState.savedHerbs.map((herb: { id: any; }) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApothecary;