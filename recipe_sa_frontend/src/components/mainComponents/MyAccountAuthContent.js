 import * as React from 'react'

 import { request } from '../../axios_helper'

 import { useSelector } from 'react-redux'
import RecipeService from '../../services/RecipeService';
import SortBy from '../blocks/bodyBlocks/SortBy';
import { SORT_OPTIONS } from '../../constants';
import RecipeList from './RecipeList';

 export default function MyAccountAuthContent () {
//  export default function MyAccountAuthContent () {

    // const [recipes, setRecipes] = React.useState([]);

    // // const altImg = `${process.env.PUBLIC_URL+'/websiteImgs/1315553.png'}`;
    // const altImg = `${process.env.PUBLIC_URL}ALT_IMG`
    // const trashBin = `${process.env.PUBLIC_URL}websiteImgs/trash_bin.png`
    // const dishPlaceholder = `${process.env.PUBLIC_URL}websiteImgs/covered_plate.png`
    // const user = useSelector(state => state.auth.user)
    // const loggedIn = useSelector(state => state.auth.isLoggedIn)
    // console.log("USER FROM SELECTOR: ", user)
    // console.log("isLoggedIn FROM SELECTOR: ", loggedIn)


    // // init
    // React.useEffect(() => {
    //     console.log('MyAccAuthContent: fetching initial recipes list')
    //     updateRecipesList()
    // }, []);
    
    //  // update
    //  React.useEffect(() => {
    //     console.log('MyAccAuthContent: rerendering recipes list')
    //     console.log(recipes)
    //     // updateRecipesList()
    // }, [recipes]);

    // function updateRecipesList(){
    //     const fullUrl = `/api/myRecipes-user-${user.id}`
    //     request(
    //         'GET',
    //         fullUrl,
    //         {
    //         }
    //     ).then(
    //         response => {
    //             setRecipes((recipes) => (recipes = response.data))
    //             console.log("recipes: ", recipes)
    //             // return response.data
    //         }
    //     ).catch(err => 
    //         console.log(err)

    //     )
    // }

    // const handleRecipeDelete = async (deleteID) => {
    //     console.log('event.target.name: ', deleteID);

    //     try {
    //         await RecipeService.deleteRecipe(deleteID);

    //         setRecipes(() => (recipes.filter(recipe => recipe.id !== deleteID)));
    //         console.log('State updated:', recipes);
    //     } catch (error) {
    //         console.error('Error deleting recipe:', error);
    //     }
    // };

     
    // const recipesList = recipes.map(
    //     (recipe) => 
    //     <div className="card " >
    //         <div className="row ">
    //             <div className="col justify-content-center display-content-center" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    //                 <img className='img-fluid rounded-start' src={dishPlaceholder} alt='' style={{height: '150px', width : '150px'}}/>
    //             </div>
    //             <div className='col-md-8' key={recipe.id} >
    //                 <span className="card-body row justify-content-between">
    //                     <h4 className='card-title col-4'>{recipe.name}</h4>
    //                     <img
    //                         src={trashBin}
    //                         alt={altImg}
    //                         className="col-4 trash-icon"
    //                         name={recipe.id}
    //                         style = {{height: '35px', width: '45px'}}
    //                         onClick={() => handleRecipeDelete(recipe.id)}
    //                     />
    //                 </span>
    //                 <p className='card-text'>{recipe.instructions}</p>
    //                 <p className='card-text'>Cook Time: {recipe.cook_time}</p>
    //                 <p className="card-text"><small className="text-muted">created by {recipe.username === undefined ? "???" : recipe.username} on {formatTimeStamp(recipe.createdAt)}</small></p>
    //             </div>
    //             </div>
    //     </div>
    // )


    // function formatTimeStamp(tS){
    //     const date = new Date(tS);
    //     return date.toLocaleString()
    // }
     
     return (
       <div className="">
         <RecipeList use={"private"} />
       </div>
       // <div>
       //     <div>You are logged in</div>
       //     {(recipes.length !== 0)
       //         ?
       //         <>
       //             {/* <SortBy sortOptions={SORT_OPTIONS} selectedSortOption={this.state.sortOptionSelected} handleChange={this.handleSelectedSortOptionChange}/> */}
       //             {recipesList}
       //         </>
       //         :
       //     (<span>No recipes found.</span>)}
       // </div>
     );
    }
