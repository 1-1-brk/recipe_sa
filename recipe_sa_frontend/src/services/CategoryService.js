import { request } from "../axios_helper";

class CategoryService {

    // user = useSelector(state => state.auth.user);


    getAllCategories(){
        // return axios.get(`${BASE_URL}/categories/all`)
        return request(
            'GET',
            '/api/categories/all',
            {

            }
        )
    }

    

}
export default new CategoryService();