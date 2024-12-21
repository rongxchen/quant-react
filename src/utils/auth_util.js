const getCurrentUser = () => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
        return JSON.parse(userInfoString);
    }
    return null;
}

const setCurrentUser = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
}

export {
    getCurrentUser,
    setCurrentUser,
    isAuthenticated
}
