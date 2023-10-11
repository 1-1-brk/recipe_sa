import React from 'react'
import RecipeForm from './RecipeForm'
import UpdateRecipeForm from './UpdateRecipeForm'

function NewRecipeForm() {
  return (
    <div>
      <UpdateRecipeForm
        // use={'createRecipe'}
      />
    </div>
  )
}

export default NewRecipeForm
