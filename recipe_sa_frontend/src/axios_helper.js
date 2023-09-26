import axios from "axios";
import executeLogout from './components/mainComponents/MyAccount'


// const baseHost = process.env.BASE_HOST || 'localhost'
// axios.defaults.baseURL =   `http://${baseHost}:8080`
// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'http://127.0.0.1:8080'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export function getAuthToken() {
    console.log('TOKEN: ', window.localStorage.getItem('auth_token'));
    return window.localStorage.getItem('auth_token')
}
export function setAuthToken(token) {
    return window.localStorage.setItem('auth_token', token)
}

export function setNewHost(url){
    axios.defaults.baseURL = `${url}`
}


export function checkIfTokenExpired(){
    
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
            alert('Invalid token, please sign in again')
        }
        
    }
    //     // const parts = getAuthToken().split('.');

    //     if (parts.length === 3) {
    //         // Decode the payload (second part)
    //         const payload = JSON.parse(atob(parts[1]));
            
    //             // Check if the payload contains an 'exp' claim
    //             if (payload.exp) {
    //             // Get the current timestamp in seconds
    //             const currentTimestamp = Math.floor(Date.now() / 1000);
            
    //             // Compare the 'exp' claim with the current timestamp
    //             if (payload.exp > currentTimestamp) {
    //                 console.log('JWT is still valid');
    //                 return;
    //             } else {
    //                 // window.localStorage.removeItem('auth_token')
    //                 console.log('JWT has expired & was deleted');
    //                 // return;
    //             }
    //             } else {
    //             console.error('JWT does not contain an expiration claim (exp)');
    //             }
    //         }
    //      else {
    //         console.error('Invalid JWT token');
    //     }
    // }


    // console.log('JWT was bad & was deleted');

    // window.localStorage.removeItem('auth_token')
}

export function getUsernameFromJwt(){
    const parts = getAuthToken().split('.');
    
            if (parts.length === 3) {
                // Decode the payload (second part)
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
