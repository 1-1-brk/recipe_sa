import React from "react";
import RecipeService from "../../services/RecipeService";


export default class RecipeList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            recipes : []
        }
    }

    dishPlaceholder = `${process.env.PUBLIC_URL}websiteImgs/covered_plate.png`

    async fetchRecipes() {
        try {
          const response = await RecipeService.getAllRecipes();
          // this.recipes = response.data;
          this.setState({ recipes: response.data });
          console.log('this.recipes: ', this.recipes)
        } catch (error) {
          console.error(error);
        }
      }
  
      
    componentDidMount(){  
        this.fetchRecipes();
    }

    getRecipes(){
      return this.recipes;
    }
    
    formatTimeStamp(tS){
      const date = new Date(tS);
      return date.toLocaleString()
    }

    render() {
      console.log('RENDERING this.recipes: ', this.state.recipes)

        return (
            this.state.recipes.map((recipe) => (

                // <section key={recipe.id} className='recipe-card'>
                //   <p className='recipe-list-text'>{recipe.name}</p>
                //   <p className='recipe-list-text'>{recipe.instructions}</p>
                // </section>
                <div class="card " >
                <div class="row ">
                    <div class="col justify-content-center display-content-center" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <img className='img-fluid rounded-start' src={this.dishPlaceholder} alt='' style={{height: '150px', width : '150px'}}/>
                    </div>
                    <div className='col-md-8' key={recipe.id} >
                        <span className="card-body row justify-content-between">
                            <h4 className='card-title col-4'>{recipe.name}</h4>
                        </span>
                        <p className='card-text'>{recipe.instructions}</p>
                        <p className='card-text'>Cook Time: {recipe.cook_time}</p>
                        <p className="card-text"><small className="text-muted">created by {recipe.username} on {this.formatTimeStamp(recipe.created_at)}</small></p>
                    </div>
                    </div>
            </div>
              ))
        )
    }
}