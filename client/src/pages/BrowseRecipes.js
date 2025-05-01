import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_RECIPES } from "../utils/queries";

export default function BrowseRecipes() {
  const { loading, data } = useQuery(GET_USER_RECIPES);
  const recipes = data?.me?.recipes || [];

  if (loading) return <p>Loading your recipes...</p>;

  return (
    <div className="recipe-page">
      <h2>Your Custom Herbal Recipes </h2>
      {recipes.length === 0 ? (
        <p>You haven't saved any recipes yet.</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.name}</h3>
              <p>
                <strong>Herbs:</strong> {recipe.herbs.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
