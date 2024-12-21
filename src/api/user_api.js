import axios from "../utils/request_util";

const login = async (email, password) => {
    return axios.post(
        "/api/oauth2/token",
        { username: email, password: password }, 
        { headers: { "Content-Type": "application/x-www-form-urlencoded" }}
    )
}

const signup = async ({...data}) => {
    return axios.post(
        "/api/user/signup",
        data,
        { headers: { "Content-Type": "application/json" }}
    )
}

export {
    login,
    signup,
}
