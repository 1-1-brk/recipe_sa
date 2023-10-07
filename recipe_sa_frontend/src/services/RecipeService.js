import { request } from "../axios_helper";

class RecipeService {
  getAllRecipesOfUser(sortOption, userId) {
    // const fullUrl = `/api/myRecipes-user-${userId}`
    const fullUrl = `/api/myRecipes-user?user_id=${userId}&sortBy=${sortOption}`;
    return request("GET", fullUrl, {});
  }

  getAllRecipes(selectedSortOption) {
    return request("GET", `/api/getAll?sortBy=${selectedSortOption}`, {});
  }

  postNewRecipe(data) {
    console.log("POST new recipe REQUEST: " + data);
    try {
      request("POST", "/api/newRecipe", data);
      return true;
    } catch (err) {
      return false;
    }
  }

  deleteRecipe(recipeId) {
    console.log("DELETE REQUEST: " + recipeId);
    request("DELETE", `/api/deleteRecipe-${recipeId}`, {});
  }
}

export default new RecipeService();
