import {API} from "../api/AxiosInstance"

export const startGame = async ({email,userId}) => await API.post(`/game/start/${userId}`, {email});
export const getGame = async ({gameId}) => await API.post(`/game/get/${gameId}`);
export const updateMove = async(
    {gameId, gameData}
) => await API.patch(`/game/update/${gameId}`, gameData);
export const getAllGames = async(userId) => await API.post(`/game/timeline/${userId}`);
export const getUser = async(userId) => await API.post(`/game/user/${userId}`);