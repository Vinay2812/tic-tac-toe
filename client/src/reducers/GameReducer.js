const INITIAL_STATE = {gameData: null, loading: false, error: false}
const GameReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "LOAD_GAME_START":
            return {...state, loading: true}
        case "LOAD_GAME_SUCCESS":
            return {...state, gameData: action.data, loading: false}
        case "LOAD_GAME_FAIL":
            return {...state, loading: false, error: true}
        default:
            return state;
    }
}
export default GameReducer