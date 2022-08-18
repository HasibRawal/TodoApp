

const authReducer = (state = {}, action) => {



    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload.userName,
                password: action.payload.password,

                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default:
            return state
    }
}

export default authReducer;