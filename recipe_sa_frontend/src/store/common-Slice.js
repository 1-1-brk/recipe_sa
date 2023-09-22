import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({

name: 'common',
initialState: {

    randomMenu : null,
    breakfast : null

},
reducers : {

    setRandomMenu(state, action){
        console.log('setting Random Menu in state')
        state.randomMenu = action.payload;
    
    },
    setBre(state, action){
        console.log('setting BREAKFAST Menu in state')
        state.randomMenu = action.payload;
    
    },
    // getBreakfast(state){
    //     try {
    //         if(state.randomMenu !== null){
    //             return state.randomMenu.filter((recipe) => recipe.category === 'Breakfast')
    //         } else {
    //             return null;
    //       }
    //     } catch (err) {

    //     }
    // }

}

})

export const commonActions = commonSlice.actions;
export default commonSlice;