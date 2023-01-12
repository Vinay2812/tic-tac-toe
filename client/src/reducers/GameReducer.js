const INITIAL_STATE = {game: null, loading: false, error: false}
const GameReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "LOAD_GAME_START":
            return {...state, loading: true}
        case "LOAD_GAME_SUCCESS":
            return {...state, game: action.data, loading: false}
        case "LOAD_GAME_FAIL":
            return {...state, loading: false, error: true}
        case "GAME_UPDATE_START":
            return {...state, loading: true};
        case "GAME_UPDATE_SUCCESS":
            
            return {...state, 
                game: {
                    ...state.game, gameData: action.data
                },
                loading: false
            }
        case "GAME_UPDATE_FAIL":
            return {...state, loading: false, error: true}
        default:
            return state;
    }
}
export default GameReducer