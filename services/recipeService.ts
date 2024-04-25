import Parse from "./parse";

export const createNewRecipeRow = async (newUser: any, newRecipe: any) => {
    // Make sure 'Recipes' is a class that exists in your Back4App dashboard.
  
    const Recipe = new Parse.Object.extend("Recipes");
    let recipeObject;
    recipeObject = new Recipe();

    // Assuming 'newUser' is a Parse.User object.
    recipeObject.set("User", newUser);
    recipeObject.set("RecipeArr", newRecipe);

    // console.log("Setting RecipeJson to:", newRecipe);
    // console.log("Is newRecipe an object?", typeof newRecipe === "object");
    // console.log("Stringified version:", JSON.stringify(newRecipe));

    try {
      const result = await recipeObject.save();
      console.log('Recipe saved', result);
      return result;
    } catch (error) {
      console.error('Error while saving recipe: ', error);
      throw error;
      
    }
    // return recipeObject;
};
/*
work on this

export const lastRecipeFromUser = async(userId) => {
    const recipe = Parse.Recipes;
    const query = new Parse.Query(User);
    const user = await query.get(userId);
    return user;
  }
  */