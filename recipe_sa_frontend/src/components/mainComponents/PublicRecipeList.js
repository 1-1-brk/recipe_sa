import React from "react";
import RecipeList from "./RecipeList";

function PublicRecipeList() {
  return (
    <div className="public-recipe-list">
      <RecipeList use={"public"} />
    </div>
  );
}

export default PublicRecipeList;
