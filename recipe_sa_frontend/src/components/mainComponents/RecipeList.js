import React from "react";
import { connect, useDispatch } from "react-redux";
// import { Dispatch } from "redux";
import { commonActions } from "../../store/common-Slice";
import { SORT_OPTIONS } from "../../constants";
import RecipeService from "../../services/RecipeService";
import ChangeRecipeDialog from "../blocks/bodyBlocks/ChangeRecipeDialog";
import SortBy from "../blocks/bodyBlocks/SortBy";
import UpdateRecipeForm from "./UpdateRecipeForm";

// export default
class RecipeList extends React.Component {
  ALT_ICON = `${process.env.PUBLIC_URL}ALT_IMG`;
  TRASH_ICON = `${process.env.PUBLIC_URL}websiteImgs/trash_bin.png`;
  WRITE_ICON = `${process.env.PUBLIC_URL}websiteImgs/writeIcon.png`;
  DISH_PLACEHOLDER = `${process.env.PUBLIC_URL}websiteImgs/covered_plate.png`;
  // USER = useSelector(state => state.auth.user)
  // LOGGED_IN = useSelector(state => state.auth.isLoggedIn)

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      sortOptionSelected: "0",
      recipeToUpdate: null,
      showUpdateDialog: false,
    };
  }

  dishPlaceholder = `${process.env.PUBLIC_URL}websiteImgs/covered_plate.png`;

  async fetchRecipes(sortOptionSelected) {
    try {
      let response = null;
      if (this.props.use === "public") {
        response = await RecipeService.getAllRecipes(sortOptionSelected);
      } else {
        const { USER } = this.props;
        response = await RecipeService.getAllRecipesOfUser(
          sortOptionSelected,
          USER.id
        );
      }
      this.setState({ recipes: response.data });
      console.log("this.recipes: ", this.state.recipes);
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    // this.fetchRecipes(0);

    this.fetchRecipes(this.state.sortOptionSelected);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      console.log("rerendering RecipeList");
      this.forceUpdate();
    }
  }

  handleSelectedSortOptionChange = (selectedOption) => {
    this.setState({ sortOptionSelected: selectedOption }, () => {
      this.fetchRecipes(this.state.sortOptionSelected);
    });
  };

  // handleRecipeDelete = async (deleteID) => {
  //       console.log('event.target.name: ', deleteID);

  //       try {
  //           await RecipeService.deleteRecipe(deleteID);
  //         const newRecipeList = () => this.state.recipes.filter(recipe => recipe.id !== deleteID)

  //         // i need the following line to update the state in similar functionality: setRecipes(() => (recipes.filter(recipe => recipe.id !== deleteID)));
  //         this.setState({ recipies: newRecipeList }, () => console.log('State updated:', this.state.recipes));
  //         this.forceUpdate()

  //       } catch (error) {
  //           console.error('Error deleting recipe:', error);
  //       }
  //   };

  handleRecipeDelete = async (deleteID) => {
    try {
      await RecipeService.deleteRecipe(deleteID);

      // Filter the recipes and update the state
      const newRecipes = this.state.recipes.filter(
        (recipe) => recipe.id !== deleteID
      );
      this.setState({ recipes: newRecipes }, () => {
        // console.log("State updated:", this.state.recipes);
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  showRecipeUpdateDialog(recipeId) {
    // const recipe = this.state.recipes.filter(
    //   (recipe) => recipe.id === recipeId
    // );
    const index = this.state.recipes.findIndex((recipe) => recipe.id === recipeId);
    const recipe = this.state.recipes[index];
    this.props.setRecipeToUpdate(recipe);
    this.setState({ recipeToUpdate: recipe }, () => {
      const changeRecipeDialog = document.getElementById("ChangeRecipeDialog");
      changeRecipeDialog.style.display = "block";
      console.log("(RecipeList) found the recipeToUpdate ", this.state.recipeToUpdate);
    });
  }

  handleRecipeUpdate(updatedRecipe){
    console.log("RecipeList updatedRecipe from UpdateRecipeForm: ", updatedRecipe)
    this.setState({ recipeToUpdate: updatedRecipe });
    RecipeService.putExistingRecipe(updatedRecipe)
    const { recipes } = this.state;
    const updatedRecipeId = updatedRecipe.id;

    // Clone the recipes array to avoid modifying the state directly
    const updatedRecipes = [...recipes];

    // Find the index of the recipe with the matching ID
    const index = updatedRecipes.findIndex(
      (recipe) => recipe.id === updatedRecipeId
    );

    if (index !== -1) {
      // Replace the old recipe with the updated recipe
      updatedRecipes[index] = updatedRecipe;

      // Update the state with the new array of recipes
      this.setState({ recipes: updatedRecipes });
    }
    const changeRecipeDialog = document.getElementById("ChangeRecipeDialog");
    changeRecipeDialog.style.display = "none";
    this.props.setRecipeToUpdate((prevState) => null);

  };

  formatTimeStamp(tS) {
    const date = new Date(tS);
    return date.toLocaleString();
  }

  render() {
    // console.log(
    //   "RecipeList RENDERING this.state.recipeToUpdate: ",
    //   this.state.recipeToUpdate
    // );
    const { USER, LOGGED_IN } = this.props;


    return (
      <>
        <SortBy
          sortOptions={SORT_OPTIONS}
          selectedSortOption={this.state.sortOptionSelected}
          handleChange={this.handleSelectedSortOptionChange}
        />

        {this.state.recipeToUpdate !== null && (
          <ChangeRecipeDialog
            // props={changeRecipeDialogProps}
            handleRecipeSave={this.handleRecipeUpdate}
            recipe={this.state.recipeToUpdate}
          />
        )}

        <div>
          {this.state.recipes.map((recipe) => (
            <>
              <div className="recipe-card row" key={recipe.id}>
                <div className="row ">
                  <div
                    className="col justify-content-center display-content-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className="img-fluid rounded-start"
                      src={this.dishPlaceholder}
                      alt=""
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                  <div
                    className="col justify-content-center display-content-center"
                    key={recipe.id}
                  >
                    <span className="card-body col">
                      <h4 className="card-title col">{recipe.name}</h4>
                    </span>
                    <p className="card-text">{recipe.instructions}</p>
                    <p className="card-text">
                      Cook Time: {recipe.cook_time} minutes
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        created by {recipe.username} on{" "}
                        {this.formatTimeStamp(recipe.created_at)}
                      </small>
                    </p>
                    {(recipe.updated_at !== recipe.created_at) && (
                      <p className="card-text">
                        <small className="text-muted">
                          edited on {this.formatTimeStamp(recipe.updated_at)}
                        </small>
                      </p>
                    )}
                  </div>
                  <div className="col-1" style={{}}>
                    {this.props.use === "private" && (
                      <>
                        <img
                          src={this.TRASH_ICON}
                          alt={this.ALT_ICON}
                          className="col-4 tinyIcon tinyIcon-animation"
                          name={recipe.id}
                          style={{ height: "35px", width: "45px" }}
                          onClick={() => this.handleRecipeDelete(recipe.id)}
                        />
                        <img
                          src={this.WRITE_ICON}
                          alt={this.ALT_ICON}
                          className="col-4 tinyIcon tinyIcon-animation"
                          name={recipe.id}
                          style={{ height: "35px", width: "45px" }}
                          onClick={() => this.showRecipeUpdateDialog(recipe.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  USER: state.auth.user,
  LOGGED_IN: state.auth.isLoggedIn,
  recipeToUpdate: state.common.recipeToUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipeToUpdate: (recipe) =>
    dispatch(commonActions.setRecipeToUpdate(recipe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
