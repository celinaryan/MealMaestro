
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeList from '../components/RecipeList';
import { GetServerSideProps } from 'next';

// Assuming you have a type for your recipes
type Recipe = {
  recipe_name: string;
  cooking_time: string;
  serving_portions: string;
  ingredients: string[];
  directions: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch the data from your API endpoint
    const res = await fetch('http://localhost:3000/api/upload');
    const recipes = await res.json();
  console.log('recipes in recpes.tsx', recipes);
    // Pass the recipes to the page via props
    return { props: { recipes } };
  };
  
  const RecipesPage = () => {
    return (
      <div>
        <h1>Recipes</h1>
        <RecipeList recipes={recipes} />
      </div>
    );
  };
  
  export default RecipesPage;