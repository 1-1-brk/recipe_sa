 import * as React from 'react'

 import { request } from '../../axios_helper'

 import { useSelector } from 'react-redux'
import RecipeService from '../../services/RecipeService';

 export default function MyAccountAuthContent () {
//  export default function MyAccountAuthContent () {

    const [recipes, setRecipes] = React.useState([]);

    // const altImg = `${process.env.PUBLIC_URL+'/websiteImgs/1315553.png'}`;
    const altImg = `${process.env.PUBLIC_URL}ALT_IMG`
    const trashBin = `${process.env.PUBLIC_URL}websiteImgs/trash_bin.png`
    const dishPlaceholder = `${process.env.PUBLIC_URL}websiteImgs/covered_plate.png`
    const user = useSelector(state => state.auth.user)
    const loggedIn = useSelector(state => state.auth.isLoggedIn)
    console.log("USER FROM SELECTOR: ", user)
    console.log("isLoggedIn FROM SELECTOR: ", loggedIn)



    React.useEffect(() => {
        console.log('MyAccAuthContent: fetching initial recipes list')
        updateRecipesList()
    }, []);
    
     React.useEffect(() => {
        console.log('MyAccAuthContent: rerendering recipes list')
        // updateRecipesList()
    }, [recipes]);

    function updateRecipesList(){
        const fullUrl = `/api/myRecipes-user-${user.id}`
        request(
            'GET',
            fullUrl,
            {
            }
        ).then(
            response => {
                setRecipes((recipes) => (recipes = response.data))
                console.log("recipes: ", recipes)
                // return response.data
            }
        ).catch(err => 
            console.log(err)

        )
    }

    // const handleRecipeDelete = (event) => {
    //     const deleteID = event.target.name
    //     console.log('event.target.name: ', deleteID)
    //     RecipeService.deleteRecipe(deleteID)
    //     setRecipes(recipes.filter(recipe => (recipe.id !== deleteID)))
    //     // updateRecipesList()
    // }
    
    const handleRecipeDelete = async (deleteID) => {
        // const deleteID = event.target.name;
        console.log('event.target.name: ', deleteID);

        try {
            // Delete the recipe in the backend
            await RecipeService.deleteRecipe(deleteID);

            // const updatedRecipes = recipes.filter(recipe => recipe.id !== deleteID)

            // Update the state by filtering out the deleted recipe
            setRecipes(() => (recipes.filter(recipe => recipe.id !== deleteID)));
            // window.location.reload();
            console.log('State updated:', recipes);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

     
    const recipesList = recipes.map(
        (recipe) => 
        <div class="card " >
            <div class="row ">
                <div class="col justify-content-center display-content-center" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img className='img-fluid rounded-start' src={dishPlaceholder} alt='' style={{height: '150px', width : '150px'}}/>
                </div>
                <div className='col-md-8' key={recipe.id} >
                    <span className="card-body row justify-content-between">
                        <h4 className='card-title col-4'>{recipe.name}</h4>
                        <img
                            src={trashBin}
                            alt={altImg}
                            className="col-4 trash-icon"
                            name={recipe.id}
                            style = {{height: '35px', width: '47px'}}
                            onClick={() => handleRecipeDelete(recipe.id)}
                        />
                    </span>
                    <p className='card-text'>{recipe.instructions}</p>
                    <p className='card-text'>Cook Time: {recipe.cook_time}</p>
                    <p className="card-text"><small className="text-muted">created by {recipe.user.username} on {formatTimeStamp(recipe.created_at)}</small></p>
                </div>
                </div>
        </div>
    )


    function formatTimeStamp(tS){
        const date = new Date(tS);
        return date.toLocaleString()
    }

        return (
            <div>
                {/* <div>You are logged in</div> */}
                {(recipes.length !== 0) ? 
                recipesList : 
                (<span>No recipes found.</span>)}
            </div>
        )
    }
