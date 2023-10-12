import React, { useEffect, useState } from 'react'
import { request, setAuthToken } from '../../axios_helper'
import LoginForm from './LoginForm'
import MyAccountAuthContent from './MyAccountAuthContent'
import Buttons from '../blocks/bodyBlocks/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth-Slice'
import state from '../../store/index'

// function setToken( userToken ){
  //   sessionStorage.setItem('token', JSON.stringify(userToken))
  // }
  
  // function getToken(){
    
    // 

function MyAccount() {
  const loggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  const [toShow, setToShow] = useState('welcome');
  function logout () {
    window.localStorage.removeItem('auth_token')
    dispatch(authActions.logout())
    window.location.reload();
    setToShow('welcome')
  }

  

  // const [token, setToken] = useState()
  // const [toShow, setToShow] = useState('welcome')

  function login() {
    setToShow('login')
  }
  
  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
        // Anything in here is fired on component unmount.
        dispatch(authActions.setShowSuccessfulLogin(false))
    }
  }, [])



  // if(!token) {
  //   return <LoginForm setToken={setToken}/>
  // }

  
  function onLogin (e, username, password) {
    e.preventDefault();
    request(
      'POST',
      '/x-login',
      {
        username: username,
        password: password
      }
      ).then((response) => {
        const status = response.status
        setAuthToken(response.data.token)
        dispatch(authActions.login()) 

        dispatch(authActions.setShowSuccessfulLogin(true))
        dispatch(authActions.setUser(response.data))

        setToShow('recipes')
    }).catch((error) => {
      console.log('GOT 401 RESPONSE by login')
      dispatch(authActions.setShowLoginFailed(true))
      setToShow('welcome')
    })
  }
  
  
  function onRegister (e, username, password, email) {
    e.preventDefault();
    request(
      'POST',
      '/register',
      {
        username: username,
        password: password,
        email: email
      }
    ).then((response) => {

      dispatch(authActions.setShowSuccessfulRegistration(true))
      dispatch(authActions.setUser(response.data))
      // if (response.status === 201) {}
      setAuthToken(response.data.token)
      setToShow('recipes')
    }


    ).catch((error) => {
      console.log('GOT 401 RESPONSE by registration')
      dispatch(authActions.setShowRegistrationFailed(true))
      setToShow('welcome')
    })
  }

  
  return (
    <div className='my-account-content'>
      <div>
        <Buttons login={login} logout={logout} />
      </div>

      {!loggedIn && <LoginForm onLogin={onLogin} onRegister={onRegister} />}
      {loggedIn && <MyAccountAuthContent />}
    </div>
  );
}


export default MyAccount;
