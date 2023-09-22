import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../../store/auth-Slice'

function Buttons(props) {

const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
const showLoginFailed = useSelector(state => state.auth.showLoginFailed)
const showSuccessfulLogin = useSelector(state => state.auth.showSuccessfulLogin)
const dispatch = useDispatch();
const successfulLogin = document.getElementById('successfulLogin');
const failedLogin = document.getElementById('failedLogin');


  return (
    <>
    { showSuccessfulLogin && <div id='successfulLogin' className="alert alert-success alert-dismissible fade show" role="alert" >
          <strong>You have Logged In!</strong> You can now see your ecipes and those of other users, as well as explore other features.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>dispatch(authActions.setShowSuccessfulLogin(false))}></button>
    </div>}
    { showLoginFailed && <div id='failedLogin' className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Login Failed!</strong> TRy again, maybe login or password were incorrect.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>dispatch(authActions.setShowLoginFailed(false))}></button>
    </div>}
    <div className='row col-md-12 text-center' style={{marginTop:30}}>
        { isLoggedIn === true &&  <button className='btn btn-danger btn-block mb-4' onClick={props.logout}>Logout</button>}
    </div>
    </>
  )
}

export default Buttons
