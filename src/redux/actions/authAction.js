const setUser = (userName,password) => {
    return {
        type: "SET_USER",
        payload: {userName,password}
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export {
    setUser,
    logOut
}