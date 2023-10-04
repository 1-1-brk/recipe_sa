import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleDisplayInvalidTokenDialog } from "./constants";

axios.defaults.baseURL = `http://${process.env.REACT_APP_BASE_URL}:8080`
axios.defaults.headers.post["Content-Type"] = 'application/json'

export function getAuthToken() {
    console.log('TOKEN: ', window.localStorage.getItem('auth_token'));
    console.log('baseEnvUrl: ', process.env.REACT_APP_BASE_URL);
    return window.localStorage.getItem('auth_token')
}

export function setAuthToken(token) {
    return window.localStorage.setItem('auth_token', token)
}

export function setNewHost(url){
    axios.defaults.baseURL = `${url}`
}

export function checkIfTokenExpired(){
    // toggleDisplayInvalidTokenDialog()
    


    const token = getAuthToken()
    if ((token !== null) && (typeof token !== 'undefined')){
        try {
            const parts = getAuthToken().split('.');
            const payload = JSON.parse(atob(parts[1]));
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (payload.exp > currentTimestamp) {
                console.log('JWT is still valid');
                return;
            }
            else{
                throw 'e'
            }
        } catch(err) {
            window.localStorage.removeItem('auth_token')
            const invalidTokenDialogBackground = document.getElementById('invalidTokenDialogBackground');
            invalidTokenDialogBackground.style.display = 'block';
            const invalidTokenDialog = document.getElementById('InvalidTokenDialog');
            invalidTokenDialog.style.display = 'block';
            // alert('Invalid token, please sign in again')
        }
        
    }
}

export function getUsernameFromJwt(){
    const parts = getAuthToken().split('.');
    
            if (parts.length === 3) {
                const payload = JSON.parse(atob(parts[1]));
                try {
                    console.log("payload", payload)
                    return payload.iss
                } catch (error) {
                    throw error;
                }
            }

}

export const request = (method, url, data) => {

    console.log('BASE_URL generated: ', axios.defaults.baseURL)

    checkIfTokenExpired()

    let headers = {}

    if(getAuthToken() !== null && getAuthToken() !== 'null'){
        headers = {
            'Authorization' : `Bearer ${getAuthToken()}`
        }
    }

    console.log('axios sending data:  ', data)
    console.log('on URL:  ', url)

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    })
}
