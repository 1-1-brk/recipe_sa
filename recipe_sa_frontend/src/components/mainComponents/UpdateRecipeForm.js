import React, { useState, useEffect } from "react";
import CategoryService from "../../services/CategoryService";
import RecipeService from "../../services/RecipeService";
import { useSelector } from "react-redux";
import { getUsernameFromJwt } from "../../axios_helper";
import RecipeList from "./RecipeList";

export default function UpdateRecipeForm(props) {
  // const { recipe } = props;

  const SAVE_ICON = `${process.env.PUBLIC_URL}websiteImgs/SaveIcon.png`;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const reduxRecipeToUpdate = useSelector(
    (state) => state.common.recipeToUpdate
  );
  // console.log("\n\n\nreduxRecipeToUpdate: ", reduxRecipeToUpdate, "\n\n\n");

  const [categories, setCategories] = useState([]);
  const [recipeToUpdateProps, setRecipeToUpdateProps] = useState(null);

  const [recipeName, setRecipeName] = useState();
  // providedRecipe.name
  // props.recipe && props.recipe.name !== undefined ? props.recipe.name :
  // ""
  // reduxRecipeToUpdate.name
  // props.recipe.name

  // const [recipeToUpdate, setRecipeToUpdate] = useState();
  const [recipeInstructions, setRecipeInstructions] = useState("");
  // props && props.recipe && props.recipe.instructions !== undefined
  //   ? props.recipe.instructions
  //   :
  // ""
  // reduxRecipeToUpdate.instructions
  // props.recipe.instructions
  const [selectedCategory, setSelectedCategory] = useState("");
  // props && props.recipe && props.recipe.category !== undefined
  //   ? props.recipe.category
  //   :
  // ""
  // reduxRecipeToUpdate.category
  const [recipeCookTime, setRecipeCookTime] = useState("");
  // props && props.recipe && props.recipe.cook_time !== undefined
  //   ? props.recipe.cook_time
  //   :
  // ""
  // reduxRecipeToUpdate.cook_time
  const [categoryToIdMap, setCategoryToIdMap] = useState({});

  const [showMsg, setShowMsg] = useState({});

  let providedRecipe =
    props.use === "updateRecipe" && props.recipe !== null ? props.recipe : "";
  // console.log("\n\n\nprovidedRecipe: ", providedRecipe, "\n\n\n");

  // if (providedRecipe!=="") {
  //     setRecipeToUpdate(
  //       (prevState) => providedRecipe,
  //       () => {
  //         console.log("\n\n\nRecipeToUpdate: ", providedRecipe);
  //       }
  //     );
  // }

  useEffect(() => {
    // console.log("\n\n\nRECIPE FORM RENDERED INIT\n\n\n");
    // setRecipeName((prevState) => providedRecipe);
    fetchCategories();
  }, []);

  useEffect(() => {
    // const rec = getRecipe();
    // const { recipe } = props
    // console.log("useEffect ran because of props: ", providedRecipe);
    if (
      props &&
      props.use === "updateRecipe" &&
      props.recipe &&
      props.recipe !== null &&
      recipeToUpdateProps === null
    ) {
      // setRecipeName((prevState) => props.recipe.name);
      // setRecipeInstructions((prevState) => props.recipe.instructions);
      // setSelectedCategory((prevState) => props.recipe.category);
      // setRecipeCookTime((prevState) => props.recipe.cook_time);
      // setRecipeToUpdateProps((prevState) => props.recipe);
      setRecipeName((prevState) => props.recipe.name ?? "");
      setRecipeInstructions((prevState) => props.recipe.instructions ?? "");
      setSelectedCategory((prevState) => props.recipe.category ?? "");
      setRecipeCookTime((prevState) => props.recipe.cook_time ?? "");
      setRecipeToUpdateProps((prevState) => props.recipe);
    }
  }, [props]);

  // useEffect(() => {
  //   console.log("useEffect ran because of props: ", providedRecipe);
  //   if (props.use === "updateRecipe" && props.recipe && recipeToUpdate === {}) {
  //     console.log(
  //       'props.use === "updateRecipe" && props.recipe && recipeToUpdate === {} CONDITION MATCHED'
  //     );
  //     setRecipeToUpdate((prevState) => props.recipe)
  //   }
  //   if (props.use === "updateRecipe" && recipeToUpdate) {
  //     setRecipeName(recipeToUpdate.name);
  //     // setRecipeInstructions(providedRecipe.instructions || "");
  //     // setSelectedCategory(providedRecipe.category || "");
  //     // setRecipeCookTime(providedRecipe.cook_time || "");
  //   }

  // }, [props]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories();
      setCategories(response.data);

      setCategoryToIdMap(categoryToIdMap);
      // console.log("right after fetching categories", categoryToIdMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleClose = () => {
    // props.hideDialog()//.bind(RecipeList)
    const changeRecipeDialog = document.getElementById("ChangeRecipeDialog");
    changeRecipeDialog.style.display = "none";
  };

  const handleSubmit = async () => {
    console.log("UPDATE_RECIPE_FORM inside handle submit");
    // event.preventDefault();
    const dataToSend = {
      name: recipeName,
      instructions: recipeInstructions,
      category: selectedCategory,
      cook_time: recipeCookTime,
      username: getUsernameFromJwt(),
    };

    console.log("UPDATE_RECIPE_FORM Submitted: ", dataToSend);

    if (props.use === "updateRecipe") {
      const updatedDataToSend = { ...dataToSend, id: recipeToUpdateProps.id };
      // const success = RecipeService.putExistingRecipe(dataToSend)
      //   props.handleRecipeSave();
      // if (success) {
      //   setShowMsg("success");
      //   // window.location.reload()
      // } else {
      //   setShowMsg("false");
      // }
      try {
        await RecipeService.putExistingRecipe(updatedDataToSend);
        props.handleRecipeSave(updatedDataToSend);
        setShowMsg("success");
      } catch (error) {
        console.error("Error updating recipe:", error);
        setShowMsg("failed");
      }
    } else {
      // const success = RecipeService.postNewRecipe(dataToSend);
      // if (success) {
      //   setShowMsg("success");
      //   // window.location.reload()
      // } else {
      //   setShowMsg("false");
      // }
      try {
        await RecipeService.postNewRecipe(dataToSend);
        setShowMsg("success");
      } catch (error) {
        console.error("Error saving a new recipe:", error);
        setShowMsg("failed");
      }
      // }
    }
  };

  console.log("RecipeForm re-rendered recipeToUpdate name: ", recipeName);

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
                : console.log("CLICKED ON SUBMIT FORM")
              // () => handleSubmit()
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

              {/* CLOSE BTN */}
              {props && props.use && props.use === "updateRecipe" && (
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={() => {
                    handleClose();
                  }}
                ></button>
              )}

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
              {/* {recipeNameInput} */}
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
              ></input>
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
                value={
                  // JSON.stringify(reduxRecipeToUpdate)
                  recipeInstructions
                  // reduxRecipeToUpdate.instructions
                }
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
            <button type="submit" onClick={handleSubmit} className="my-button">
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
