import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const GET_SAVED_SEARCHES = gql`
query GetSavedSearches {
me {
email
savedSearches
}
}
`;

const MyApothecary = () => {
const { authToken } = useAuth();

const { loading, error, data } = useQuery(GET_SAVED_SEARCHES, {
context: {
headers: {
authorization: `Bearer ${authToken}`,
},
},
});

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
