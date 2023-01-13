const INITIAL_STATE = {authData: null, loading: false, authFail: null}
const AuthReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "AUTH_START": 
            return {...state, loading: true, authFail: false}
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}))
            return {...state, authData: action.data, loading: false, authFail: false}
        case "AUTH_FAILED":
            return {...state, loading: false, authFail: true}
        default:
            return state;
    }
}
export default AuthReducer