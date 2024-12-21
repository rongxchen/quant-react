import axios from 'axios';
import { BACKEND_URL } from '../constant';

const axiosInstance = axios.create({baseURL: BACKEND_URL, withCredentials: false})
const excludeTokenList = ["/api/users/change-password"]

axiosInstance.interceptors.request.use(
    (config) => {
        if (excludeTokenList.includes(config.url || "")) {
            return config;
        }
        const token = localStorage.getItem("accessToken");
        const bearerToken = "Bearer " + token;
        config.headers["Authorization"] = bearerToken;
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return await axios.post(BACKEND_URL + "/api/oauth2/refresh-token", {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    }).then((res) => {
        if (res.data.code === 0) {
            const token = res.data.data.access_token;
            refreshTokenRetry = false;
            return token;
        }
        return null;
    })
}

let refreshTokenRetry = false;
axiosInstance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    if (error.code === "ERR_CANCELED") {
        return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !refreshTokenRetry) {
        refreshTokenRetry = true;
        const accessToken = await refreshToken();
        if (!accessToken) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userInfo");
            return Promise.reject(error);
        }
        localStorage.setItem("accessToken", accessToken);        
        const bearerToken = 'Bearer ' + accessToken   
        axiosInstance.defaults.headers.common['Authorization'] = bearerToken
        return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
})

export default axiosInstance