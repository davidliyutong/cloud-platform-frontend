import axios from "axios";
import jwt_decode from "jwt-decode";

export function getRootPath() {
    return window.location.protocol + '//' + window.location.host;
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
    this.$router.push('/');
}

export async function logIn(username, password) {

    let params = {
        username: username,
        password: password
    };

    // console.log("username: ", params.username, "password: ", params.password)

    let paramStr = JSON.stringify(params);
    let loginUrl = window.document.location.href + "v1/auth/jwt/login";

    let loginSucceed = false
    try {
        await axios.post(loginUrl, paramStr
        ).then(response => {
            if (response.status === 200) {
                localStorage.setItem('username', username);
                localStorage.setItem('token', response.data.token);
                let decoded = jwt_decode(response.data.token);
                localStorage.setItem('user_uid', decoded.uid)
                localStorage.setItem('user_role', decoded.role)
                loginSucceed = true
            }
        })
    } catch (err) {
        loginSucceed = false
    }

    return loginSucceed
}