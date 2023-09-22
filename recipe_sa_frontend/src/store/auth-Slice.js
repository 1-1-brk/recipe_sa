import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({

    name : 'auth',
    initialState : {
        isLoggedIn : false,
        showSuccessfulLogin: false,
        showLoginFailed: false,
        user : null
    },
    reducers : {
        login(state){
            
            state.isLoggedIn = true;
            console.log("INSIDE SLICE: EXECUTING LOGIN FUNCTION , state.isLoggedIn:  ", state.isLoggedIn)
        },
        logout(state){
            state.isLoggedIn = false;
            console.log("INSIDE SLICE: EXECUTING LOGOUT FUNCTION , state.isLoggedIn:  ", state.isLoggedIn)
        },
        setShowSuccessfulLogin(state, action){
            state.showSuccessfulLogin = action.payload
        },
        setShowLoginFailed(state, action){
            state.showLoginFailed = action.payload
        },
        setUser(state, action){
            state.user = action.payload;
            console.log("INSIDE AUTH SLICE GOR A USER PBJECT: ", action.payload)
        }
    }

})

export const authActions = authSlice.actions;
export default authSlice;