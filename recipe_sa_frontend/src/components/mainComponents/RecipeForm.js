import React, { useState, useEffect } from "react";
import CategoryService from "../../services/CategoryService";
import RecipeService from "../../services/RecipeService";
import { useSelector } from "react-redux";
import { getUsernameFromJwt } from "../../axios_helper";

export default function RecipeForm(props) {
  // const { recipe } = props;

  const SAVE_ICON = `${process.env.PUBLIC_URL}websiteImgs/SaveIcon.png`;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const recipeToUpdate = useSelector((state) => state.common.recipeToUpdate);
  console.log("recipeToUpdate: ", recipeToUpdate);

  const [categories, setCategories] = useState([]);

  const [recipeName, setRecipeName] = useState();
  // providedRecipe.name
  // props.recipe && props.recipe.name !== undefined ? props.recipe.name :
  // ""
  // props.recipe.name

  // const [recipeToUpdate, setRecipeToUpdate] = useState();
  const [recipeInstructions, setRecipeInstructions] = useState(
    // props && props.recipe && props.recipe.instructions !== undefined
    //   ? props.recipe.instructions
    //   :
    ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    // props && props.recipe && props.recipe.category !== undefined
    //   ? props.recipe.category
    //   :
    ""
  );
  const [recipeCookTime, setRecipeCookTime] = useState(
    // props && props.recipe && props.recipe.cook_time !== undefined
    //   ? props.recipe.cook_time
    //   :
    ""
  );
  const [categoryToIdMap, setCategoryToIdMap] = useState({});

  const [showMsg, setShowMsg] = useState({});

  let providedRecipe =
    props.use === "updateRecipe" && props.recipe ? props.recipe : "";
  console.log("providedRecipe: ", providedRecipe);

  // if (providedRecipe!=="") {
  //     setRecipeToUpdate(
  //       (prevState) => providedRecipe,
  //       () => {
  //         console.log("\n\n\nRecipeToUpdate: ", providedRecipe);
  //       }
  //     );
  // }

  useEffect(() => {
    console.log("\n\n\nRECIPE FORM RENDERED INIT\n\n\n");
    setRecipeName((prevState) => providedRecipe);
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   // const rec = getRecipe();
  //   // const { recipe } = props
  //   console.log("useEffect ran because of props: ", providedRecipe);
  //   setRecipeName((prevState) => providedRecipe.name);
  //   // setRecipeInstructions(props.recipe.instructions);
  //   // setSelectedCategory(props.recipe.category);
  //   // setRecipeCookTime(props.recipe.cook_time);
  // }, [props]);

  useEffect(() => {
    if (props.use === "updateRecipe" && recipeToUpdate) {
      setRecipeName(recipeToUpdate.name);
      // setRecipeInstructions(providedRecipe.instructions || "");
      // setSelectedCategory(providedRecipe.category || "");
      // setRecipeCookTime(providedRecipe.cook_time || "");
    }
  }, [props]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories();
      setCategories(response.data);

      setCategoryToIdMap(categoryToIdMap);
      console.log("right after fetching categories", categoryToIdMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      name: recipeName,
      instructions: recipeInstructions,
      category: selectedCategory,
      cook_time: recipeCookTime,
      username: getUsernameFromJwt(),
    };
    if (props.use === "updateRecipe") {
      props.handleRecipeSave();
      const success = RecipeService.putExistingRecipe(dataToSend);
      if (success) {
        setShowMsg("success");
        // window.location.reload()
      } else {
        setShowMsg("false");
      }
    } else {
      const success = RecipeService.postNewRecipe(dataToSend);
      if (success) {
        setShowMsg("success");
        // window.location.reload()
      } else {
        setShowMsg("false");
      }

      console.log("Submitted:", dataToSend);
    }
  };

  console.log("RecipeForm re-rendered");

  return (
    <>
      <div>
        {showMsg === "success" && (
          <div
            id="successfulLogin"
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Recipe saved!</strong> You can now see your ecipes and those
            of other users, as well as explore other features.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowMsg()}
            ></button>
          </div>
        )}
        {showMsg === "failed" && (
          <div
            id="failedLogin"
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Recipe not saved!</strong> Try again, maybe login or
            password were incorrect.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowMsg()}
            ></button>
          </div>
        )}
      </div>

      {isLoggedIn === true ? (
        <div className="container-md recipe-form">
          <h1>Add a New Recipe</h1>
          <form
            onSubmit={
              props && props.handleRecipeSave !== undefined
                ? props.handleRecipeSave
                : handleSubmit
            }
          >
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
              <div className="form-floating">
                <label className="form-select" htmlFor="recCat">
                  {selectedCategory ? selectedCategory : "Recipe Category"}
                </label>
                <select
                  className="form-select"
                  id="recCat"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.name}
                      title={category.description}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Leave a comment here"
                id="recName"
                type="text"
                value={
                  recipeName
                  // props.recipe.name
                }
                onChange={(e) => setRecipeName(e.target.value)}
                maxLength="50"
                required
              />
              <label htmlFor="recName">Recipe Name:</label>
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
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="recInst"
                value={recipeInstructions}
                onChange={(e) => setRecipeInstructions(e.target.value)}
                maxLength="400"
                required
              ></textarea>
              <label htmlFor="recInst">Recipe Instructions:</label>
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
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Leave a comment here"
                id="recTime"
                type="text"
                value={recipeCookTime}
                onChange={(e) => setRecipeCookTime(e.target.value)}
                maxLength="10"
                required
              ></input>
              <label htmlFor="recName">Recipe Cook Time:</label>
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
            <button type="submit">
              Submit Recipe
              <img className="tinyIcon" src={SAVE_ICON} alt="" />
            </button>
          </form>
        </div>
      ) : (
        <h4 className="pleaseLogIn">Please log in to add new recipes.</h4>
      )}
    </>
  );
}

// export default RecipeForm;
