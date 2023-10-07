import React from "react";
import { connect, useSelector } from "react-redux";
import { SORT_OPTIONS } from "../../constants";
import RecipeService from "../../services/RecipeService";
import SortBy from "../blocks/bodyBlocks/SortBy";

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
      console.log("this.recipes: ", this.recipes);
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    // this.fetchRecipes(0);

    this.fetchRecipes(this.state.sortOptionSelected);
  }

  componentDidUpdate(prevProps, prevState) {
    // Compare the previous and current values of yourVariable
    if (this.state.recipes !== prevState.recipes) {
      // Do something when yourVariable changes
      console.log("yourVariable has changed:", this.state.yourVariable);
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
        console.log("State updated:", this.state.recipes);
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  formatTimeStamp(tS) {
    const date = new Date(tS);
    return date.toLocaleString();
  }

  render() {
    console.log("RENDERING this.recipes: ", this.state.recipes);
    const { USER, LOGGED_IN } = this.props;
    console.log("RECIPE LIST USER: ", USER);
    console.log("RECIPE LIST LOGGED_IN: ", LOGGED_IN);

    return (
      <>
        <SortBy
          sortOptions={SORT_OPTIONS}
          selectedSortOption={this.state.sortOptionSelected}
          handleChange={this.handleSelectedSortOptionChange}
        />

        <div>
          {this.state.recipes.map((recipe) => (
            <>
            <div className="recipe-card row" key={recipe.id}>
              <div className="row ">
                <div
                  className="col-4 justify-content-center display-content-center"
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
                  className="col-4 justify-content-center display-content-center"
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
                  {recipe.updatedAt !== recipe.createdAt && (
                    <p className="card-text">
                      <small className="text-muted">
                        updated on {this.formatTimeStamp(recipe.updated_at)}
                      </small>
                    </p>
                  )}
                </div>
            </div>
                <div className="col-1" style={{}}>
                  {this.props.use === "private" && (
                    <>
                      <img
                        src={this.TRASH_ICON}
                        alt={this.ALT_ICON}
                        className="col-4 tinyIcon-animation"
                        name={recipe.id}
                        style={{ height: "35px", width: "45px" }}
                        onClick={() => this.handleRecipeDelete(recipe.id)}
                      />
                      <img
                        src={this.WRITE_ICON}
                        alt={this.ALT_ICON}
                        className="col-4 tinyIcon-animation"
                        name={recipe.id}
                        style={{ height: "35px", width: "45px" }}
                        // onClick={() => this.handleRecipeDelete(recipe.id)}
                      />
                    </>
                  )}
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
});

export default connect(mapStateToProps)(RecipeList);
