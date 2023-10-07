import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../../store/auth-Slice'

function Buttons(props) {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const showLoginFailed = useSelector(state => state.auth.showLoginFailed)
  const showSuccessfulLogin = useSelector(state => state.auth.showSuccessfulLogin)
  const showRegistrationFailed = useSelector(state => state.auth.showRegistrationFailed)
  const showSuccessfulRegistration = useSelector(state => state.auth.showSuccessfulRegistration)
  // const successfulLogin = document.getElementById('successfulLogin');
  // const failedLogin = document.getElementById('failedLogin');


  return (
    <>
      {/* LOGIN OK */}
      {showSuccessfulLogin && (
        <div
          id="successfulLogin"
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>You have Logged In!</strong> You can now see your recipes and
          those of other users, as well as explore other features.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => dispatch(authActions.setShowSuccessfulLogin(false))}
          ></button>
        </div>
      )}
      {/* LOGIN NOT OK */}
      {showLoginFailed && (
        <div
          id="failedLogin"
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Login Failed!</strong> Try again, maybe login or password were
          incorrect.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => dispatch(authActions.setShowLoginFailed(false))}
          ></button>
        </div>
      )}
      {/* REGISTRATION OK */}
      {showSuccessfulRegistration && (
        <div
          id="successfulRegistration"
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>You have been Registered!</strong> You can now see add new
          recipes and see those of other users, as well as explore other
          features.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() =>
              dispatch(authActions.setShowSuccessfulRegistration(false))
            }
          ></button>
        </div>
      )}
      {/* REGISTRATION NOT OK */}
      {showRegistrationFailed && (
        <div
          id="failedRegistration"
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Registration Failed!</strong> Try again . . .
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() =>
              dispatch(authActions.setShowRegistrationFailed(false))
            }
          ></button>
        </div>
      )}
      <div style={{ margin: "10 px", marginLeft: "70em" }}>
        {isLoggedIn === true && (
          <button  onClick={props.logout}>
            Logout
          </button>
        )}
      </div>
    </>
  );
}

export default Buttons;
