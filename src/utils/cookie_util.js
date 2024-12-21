function setCookie(key, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + 1000*60*60*24*days);
    document.cookie = `${key}=${value};path=/;expires=${date.toString()}`;
}

function clearCookie() {
    if (document.cookie.length > 0) {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const arr2 = cookie.split("=");
            removeCookie(arr2[0]);
        }
    }
}

function removeCookie(key) {
    setCookie(key, "", -1);
}

function findCookie(key) {
    if (document.cookie.length > 0) {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const arr2 = cookie.split("=");
            if (arr2[0] === key) {
                return arr2[1];
            }
        }
    }
    return null;
}

export {
    setCookie,
    clearCookie,
    removeCookie,
    findCookie,
}