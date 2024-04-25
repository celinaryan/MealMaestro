
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeList from '../components/RecipeList';
import { GetServerSideProps } from 'next';
import {checkUser} from '../services/authService';
import Parse from "../services/parse";

// Assuming you have a type for your recipes
type Recipe = {
  recipe_name: string;
  cooking_time: string;
  serving_portions: string;
  ingredients: string[];
  directions: string;
}

  const RecipesPage = () => {
    // Inside your RecipesPage component in recipes.tsx
    const [recipes, setRecipes] = useState<Recipe[]>([]); // Initialize with an empty array

    useEffect(() => {
        const fetchRecipes = async () => {
        const currentUser = checkUser(); // This should synchronously return the current user
        if (currentUser) {
            const Recipes = Parse.Object.extend("Recipes");
            const query = new Parse.Query(Recipes);
            query.equalTo("User", currentUser); // Assuming currentUser is the Parse.User object
            try {
            const results = await query.find();
            // Map the fetched Parse Objects to your Recipe type structure
            const mappedRecipes = results.map(r => {
                const recipeJson = r.get("RecipeJson"); // Assuming RecipeJson contains the Recipe type structure
                // Add any additional mapping here if necessary
                return {
                recipe_name: recipeJson.recipe_name,
                cooking_time: recipeJson.cooking_time,
                serving_portions: recipeJson.serving_portions,
                ingredients: recipeJson.ingredients,
                directions: recipeJson.directions
                };
            });
            setRecipes(mappedRecipes); // Update the state with the fetched recipes
            } catch (error) {
            console.error('Error while fetching recipes: ', error);
            }
        }
        };

    fetchRecipes();
  }, []);

    return (
      <div>
        <h1>Recipes</h1>
        <RecipeList recipes={recipes} />
      </div>
    );
  };
  
  export default RecipesPage;