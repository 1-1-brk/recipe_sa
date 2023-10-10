import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth-Slice";

// export function toggleDisplay() {
//     console.log('toggle Display triggered')
//     display === 'none' ? '' : 'none'
// }

export default function AlertDialog() {
  // const [display, setDisplay] = React.useState('none');
  const dispatch = useDispatch();

  // const displayBool = useSelector(state => state.auth.showDisplayInvalidTokenDialog)

  function logout() {
    window.localStorage.removeItem("auth_token");
    dispatch(authActions.logout());

    window.location.reload();
  }

  const handleClose = () => {
    logout();

    // dispatch(authActions.setShowDisplayInvalidTokenDialog(false))
    const invalidTokenDialog = document.getElementById("InvalidTokenDialog");
    invalidTokenDialog.style.display = "none";
    const invalidTokenDialogBackground = document.getElementById(
      "invalidTokenDialogBackground"
    );
    invalidTokenDialogBackground.style.display = "none";

    // setOpen('none');
  };

  return (
    <div>
      <div
        className="dialog-background"
        onClick={() => handleClose()}
        id="InvalidTokenDialog"
        //   style={{ display: 'none'}}
        //   style={{ display: `${displayBool === true ? '' : 'none'}` }}
        >
        <div
          className="dialog"
          id="invalidTokenDialogBackground"
          onClose={() => handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <h4 id="alert-dialog-title">Attention</h4>
          <div className="dialog-text">
            Invalid authentication token. Please log in again to renew the
            token.
          </div>
          <div className="dialog-buttons">
            <button onClick={() => handleClose()}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
