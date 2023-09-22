import { request } from '../axios_helper';

// const BASE_URL = 'http://localhost:8080'

class RecipeService{

    getAllRecipes() {
        // return axios.get(`${BASE_URL}/getAll`);
        return request(
          'GET',
          '/getAll',
          {}
        )
        
      }

    postNewRecipe(data){
      console.log('POST new recipe REQUEST: '+ data)
      // axios.post(`${BASE_URL}/newRecipe`, data)
      try{
        request(
          'POST',
          '/newRecipe',
          data
        );
        return true;
      } catch (err){
        return false
      }
    }

    deleteRecipe(recipeId){
      console.log('DELETE REQUEST: '+ recipeId)
      // axios.post(`${BASE_URL}/newRecipe`, data)
      request(
        'DELETE',
        `/deleteRecipe-${recipeId}`,
        {}
      )
    }

       
}

export default new RecipeService();
