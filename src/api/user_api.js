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
        "/api/users/register",
        data,
    )
}

const getUserInfo = async () => {
    return axios.get(
        "/api/users/me",
    )
}

export {
    login,
    signup,
    getUserInfo,
}
