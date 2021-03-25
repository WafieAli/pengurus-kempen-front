export const API_URL = 'http://localhost:8080';

export const API_CALL_TIMEOUT = 2000;// API call timeout in milliseconds

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return {'x-access-token':user.accessToken};
    } else {
        return {};
    }
}

export function userState() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){ 
        return {status:{loggedIn: true}, user};

    } else{ 
        return {status:{loggedIn: false}, user:null};
    }
}

