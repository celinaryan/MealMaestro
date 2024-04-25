// components/RecipeList.tsx
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail'; // This is the component that shows full recipe details

interface Recipe {
  recipe_name: string;
  cooking_time: string;
  ingredients: string[];
  // ... other properties
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div>
      {selectedRecipe ? (
        <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
      ) : (
        recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} onSelect={setSelectedRecipe} />
        ))
      )}
    </div>
  );
};

export default RecipeList;
