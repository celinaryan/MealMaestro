// components/RecipeDetail.tsx
import React from 'react';

interface Recipe {
  recipe_name: string;
  cooking_time: string;
  directions: string;
  ingredients: string[];
  // ... other properties
}

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void; // Callback to go back to the recipe list
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back to recipes</button>
      <h2>{recipe.recipe_name}</h2>
      <p>Cooking time: {recipe.cooking_time}</p>
      <p>Ingredients:</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Directions:</p>
      <p>{recipe.directions}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RecipeDetail;
