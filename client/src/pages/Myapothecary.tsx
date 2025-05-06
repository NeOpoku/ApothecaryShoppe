// src/components/Apothecary/MyApothecary.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAuth } from '../components/AuthContext';
import { GET_ME } from '../../utils/queries';

const MyApothecary: React.FC = () => {
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ME, {
    skip: !authState.isAuthenticated,
    fetchPolicy: 'network-only'
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login');
    }
  }, [authState.isAuthenticated, navigate]);

  if (!authState.isAuthenticated) return null;
  if (loading) return <p>Loading your Apothecary...</p>;
  if (error) return <p>Error loading saved herbs: {error.message}</p>;

  const herbs = data?.me?.savedHerbs || [];

  return (
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
                <img src={herb.image} alt={herb.name} className="herb-image" />
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApothecary;
 <p><strong>Benefits:</strong> {herb.benefits?.join(', ')}</p>