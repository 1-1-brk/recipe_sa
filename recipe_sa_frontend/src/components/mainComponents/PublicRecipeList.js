import React from "react";
import RecipeList from "./RecipeList";

function PublicRecipeList() {
  return (
    <div className="card-list-container">
      <RecipeList use={"public"} />
    </div>
  );
}

export default PublicRecipeList;
