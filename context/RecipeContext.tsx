// contexts/RecipesContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Recipe {
  recipe_name: string;
  cooking_time: string;
  serving_portions: string;
  ingredients: string[];
  directions: string;
}

interface RecipesContextType {
  recipes: Recipe[];
  updateRecipes: (newRecipes: Recipe[]) => void;
}

const RecipesContext = createContext<RecipesContextType | null>(null);

export const useRecipes = () => useContext(RecipesContext);

export const RecipesProvider: React.FC = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipes = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes);
  };

  return (
    <RecipesContext.Provider value={{ recipes, updateRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};
