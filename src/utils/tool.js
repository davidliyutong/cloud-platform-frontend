import axios from "axios";
import jwt_decode from "jwt-decode";

export function getRootPath() {
    return window.location.protocol + '//' + window.location.host;
}

export function getRootWSPath() {
    if (window.location.protocol === "https:") {
        return 'wss://' + window.location.host;
    } else {
        return 'ws://' + window.location.host;
    }
}

export async function checkLogin() {
    return !(localStorage.getItem('token') === null ||
        localStorage.getItem('token') === undefined ||
        localStorage.getItem('token') === "" ||
        localStorage.getItem('username') === null ||
        localStorage.getItem('username') === undefined ||
        localStorage.getItem('username') === "");
}

export function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_uid');
    localStorage.removeItem('user_role');
    // refresh window
    window.location.reload();
    this.$router.push('/');
}

export async function logIn(username, password) {

    let params = {
        username: username,
        password: password
    };

    // console.log("username: ", params.username, "password: ", params.password)

    let paramStr = JSON.stringify(params);
    let loginUrl = getRootPath() + "/v1/auth/jwt/login";

    let loginSucceed = false
    try {
        await axios.post(loginUrl, paramStr
        ).then(response => {
            if (response.status === 200) {
                localStorage.setItem('username', username);
                localStorage.setItem('token', response.data.token);
                let decoded = jwt_decode(response.data.token);
                localStorage.setItem('user_uid', decoded.uid);
                localStorage.setItem('user_role', decoded.role);
                loginSucceed = true;
            }
        })
    } catch (err) {
        loginSucceed = false;
        logOut();
    }

    return loginSucceed
}

export async function refreshToken() {


    let oldToken = localStorage.getItem('token');
    if (oldToken === null || oldToken === undefined || oldToken === "") {
        return false
    }

    let params = {
        token: oldToken,
        refresh_token: "null"
    };

    // console.log("username: ", params.username, "password: ", params.password)

    let paramStr = JSON.stringify(params);
    let refreshUrl = getRootPath() + "/v1/auth/jwt/refresh";

    let loginSucceed = false
    try {
        await axios.post(refreshUrl, paramStr
        ).then(response => {
            if (response.status === 200) {
                // console.log("refreshToken:" + response.data.token);
                localStorage.setItem('token', response.data.token);
                let decoded = jwt_decode(response.data.token);
                localStorage.setItem('user_uid', decoded.uid);
                localStorage.setItem('user_role', decoded.role);
                loginSucceed = true
            }
        })
    } catch (err) {
        loginSucceed = false;
    }

    return loginSucceed
}

export function addDateStrSeconds(dateStr, secondsToAdd) {
    let originalDate = new Date(dateStr);
    let millisecondsToAdd = secondsToAdd * 1000;

    originalDate.setTime(originalDate.getTime() + millisecondsToAdd);
    return originalDate.toString();
}