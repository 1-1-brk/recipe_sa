import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/CategoryService';
import RecipeService from '../../services/RecipeService';
import { useSelector } from 'react-redux'
import { getUsernameFromJwt } from '../../axios_helper';


function NewRecipeForm() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  const [categories, setCategories] = useState([]);

  const [recipeName, setRecipeName] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipeCookTime, setRecipeCookTime] = useState('');
  const [categoryToIdMap, setCategoryToIdMap] = useState({});

  const [showMsg, setShowMsg] = useState({})

  useEffect(() => {
    fetchCategories();
    console.log('isLoggedIn: ', isLoggedIn)
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories();
      setCategories(response.data);


      setCategoryToIdMap(categoryToIdMap);
      console.log('right after fetching', categoryToIdMap)


    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSend = {
        name: recipeName,
        instructions: recipeInstructions,
        category: selectedCategory,
        cook_time: recipeCookTime,
        username : getUsernameFromJwt()
    }

    const success = RecipeService.postNewRecipe(dataToSend);
    if(success){
      setShowMsg('success')
      // window.location.reload()
    }
    else{
      setShowMsg('false')
    }

    console.log('Submitted:', dataToSend);
  };

  return (
    <>
    <div>
      { showMsg === 'success' && <div id='successfulLogin' className="alert alert-success alert-dismissible fade show" role="alert" >
            <strong>Recipe saved!</strong> You can now see your ecipes and those of other users, as well as explore other features.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setShowMsg()}></button>
      </div>}
      { showMsg === 'failed' && <div id='failedLogin' className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Recipe not saved!</strong> Try again, maybe login or password were incorrect.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setShowMsg()}></button>
      </div>}
    </div>
    
    {(isLoggedIn === true) ?
    <div className='container-md recipe-form'>
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor='recCat'>Recipe Category:</label>
          <select
            id='recCat'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name} title={category.description}>
                {category.name}
              </option>
            ))}
          </select> */}
          <div class="form-floating">
            <label class="form-select" for="recCat">{selectedCategory ? selectedCategory : "Recipe Category"}</label>
            <select class="form-select" id='recCat'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required>
            <option  value=''>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name} title={category.description}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="form-floating">
          <input class="form-control" placeholder="Leave a comment here"
            id='recName'
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            maxLength='50'
            required>
           </input>
          <label for="recName">Recipe Name:</label>
        </div>
        {/* <div>
          <label htmlFor='recName'>Recipe Name:</label>
          
          <input
            id='recName'
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            maxLength='50'
            required
          />
        </div> */}
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id='recInst'
            value={recipeInstructions}
            onChange={(e) => setRecipeInstructions(e.target.value)}
            maxLength='400'
            required>
           </textarea>
          <label for="recInst">Recipe Instructions:</label>
        </div>
        {/* <div>
          <label htmlFor='recInst'>Recipe Instructions:</label>
          <textarea
            id='recInst'
            value={recipeInstructions}
            onChange={(e) => setRecipeInstructions(e.target.value)}
            maxLength='400'
           required
          />
        </div> */}
        <div class="form-floating">
          <input class="form-control" placeholder="Leave a comment here"
            id='recTime'
            type="text"
            value={recipeCookTime}
            onChange={(e) => setRecipeCookTime(e.target.value)}
            maxLength='10'
            required>
           </input>
          <label for="recName">Recipe Cook Time:</label>
        </div>
        {/* <div>
          <label htmlFor='recTime'>Recipe Cook Time:</label>
          
          <input
            id='recTime'
            type="text"
            value={recipeCookTime}
            onChange={(e) => setRecipeCookTime(e.target.value)}
            maxLength='10'

            required
          />
        </div> */}
        <button type="submit">Submit Recipe</button>
      </form>
    </div>

    : <div>
      please login finally, because: """isLoggedIn""":{isLoggedIn}
    </div>}
    </>
  );
}

export default NewRecipeForm;
