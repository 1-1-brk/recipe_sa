import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-Slice'

export  function toggleDisplayInvalidTokenDialog() {
    console.log('toggle Display triggered')
    // const dispatch = useDispatch();

    // const displayBool = useSelector(state => state.auth.showDisplayInvalidTokenDialog)
    // dispatch(authActions.setShowDisplayInvalidTokenDialog(false))

}
export let displayInvalidTokenDialog = 'none'