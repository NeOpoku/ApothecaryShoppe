import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { DELETE_SAVED_SEARCH } from "../../utils/mutations";

const [deleteSearch] = useMutation(DELETE_SAVED_SEARCH);

export default function SavedSearches() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  if (!Auth.loggedIn()) {
    return <p>Please log in to view your saved searches.</p>;
  }

  return (
    <div>
      <h2>Saved Searches</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        user.savedSearches?.map((search) => (
          <div key={search._id} style={{ marginBottom: "1rem" }}>
            <h4>Query: {search.query}</h4>
            <ul>
              {search.results.map((herb) => (
                <li key={herb._id}>{herb.name}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

<button
  onClick={() =>
    deleteSearch({
      variables: { searchId: search._id },
    })
  }
>
  Delete Search
</button>;
