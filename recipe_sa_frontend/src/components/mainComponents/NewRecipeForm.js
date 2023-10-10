import React from 'react'
import RecipeForm from './RecipeForm'

function NewRecipeForm() {
  return (
    <div>
      <RecipeForm use={'createRecipe'} />
    </div>
  )
}

export default NewRecipeForm
