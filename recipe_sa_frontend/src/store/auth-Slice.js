import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({

    name : 'auth',
    initialState : {
        isLoggedIn : false,
        showSuccessfulLogin: false,
        showLoginFailed: false,
        showSuccessfulRegistration: false,
        showRegistrationFailed: false,
        showDisplayInvalidTokenDialog: true,
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
        setShowSuccessfulRegistration(state, action){
            state.showSuccessfulRegistration = action.payload
        },
        setShowRegistrationFailed(state, action){
            state.showRegistrationFailed = action.payload
        },
        setShowDisplayInvalidTokenDialog(state, action){
            state.showLoginFailed = action.payload
        },
        setUser(state, action){
            state.user = action.payload;
            console.log("INSIDE AUTH SLICE GOR A USER OBJECT: ", action.payload)
        }
    }

})

export const authActions = authSlice.actions;
export default authSlice;