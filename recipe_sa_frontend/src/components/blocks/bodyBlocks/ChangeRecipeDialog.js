import React from "react";
import UpdateRecipeForm from "../../mainComponents/UpdateRecipeForm";

function ChangeRecipeDialog(props) {
  console.log("got recipe inside ChangeRecipeDialog: ", props.recipe);

    return (
      <div className="" id="ChangeRecipeDialog">
        <UpdateRecipeForm
          handleRecipeSave={props.handleRecipeSave}
          recipe={props.recipe}
          use={"updateRecipe"}
        />
      </div>
    );
}

export default ChangeRecipeDialog;
