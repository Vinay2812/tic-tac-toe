import * as GameApi from "../api/GameRequest"
export const getGame = (gameId, opponentId) => async (dispatch)=>{
    dispatch({type: "LOAD_GAME_START"});
    try {
        const game = await GameApi.getGame({gameId});
        const opponent = await GameApi.getUser(opponentId);
        const gameData = game.data;
        const opponentData = opponent.data;
        // // console.log(data);
        dispatch({type: "LOAD_GAME_SUCCESS", data: {gameData, opponentData}});
    } catch (err) {
        dispatch({type: "LOAD_GAME_FAIL"})
    }
};

export const updateMove = (gameId, gameData)=> async(dispatch)=>{
    dispatch({type: "GAME_UPDATE_START"});
    try {
        const {data} =  await GameApi.updateMove({gameId, gameData});
        // console.log(data);
        dispatch({type: "GAME_UPDATE_SUCCESS", data: data});
    } catch (err) {
       dispatch({type: "GAME_UPDATE_FAIL"});
    }
}