import * as GameApi from "../api/GameRequest"
export const getGame = (gameId) => async (dispatch)=>{
    dispatch({type: "LOAD_GAME_START"});
    try {
        const {data} = await GameApi.getGame({gameId});
        console.log(data);
        dispatch({type: "LOAD_GAME_SUCCESS", data: data});
    } catch (err) {
        dispatch({type: "LOAD_GAME_FAIL"})
    }
}