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

return (
  <div>
	<h2>{data.me.email}'s Herbal Search History</h2>
	{data.me.savedSearches.length > 0 ? (
	  <ul>
		{data.me.savedSearches.map((term, index) => (
		  <li key={index}>{term}</li>
		))}
	  </ul>
	) : (
	  <p>You haven’t saved any searches yet.</p>
	)}
  </div>
);
};

export default MyApothecary;
