// components/RecipeCard.js
function RecipeCard({ recipe, onRecipeClick }) {
    return (
      <div className="card" onClick={() => onRecipeClick(recipe)}>
        <h3>{recipe.recipe_name}</h3>
        <p>Cooking time: {recipe.cooking_time}</p>
      </div>
    );
  }
  
  export default RecipeCard;