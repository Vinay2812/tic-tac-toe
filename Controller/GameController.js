import GameModel from "../models/GameModel.js";
import UserModel from "../models/UserModel.js"

export const startGame = async (req, res)=>{
    const myId = req.params.userId;
    const { email } = req.body;

    try {
        const otherUser = await UserModel.findOne({email});
        const currentUser = await UserModel.findById(myId);
        if(otherUser){
            const gameExist = await GameModel.findOne({
                $and:[
                    {userIds: {$all: [myId, otherUser._id]}},
                    {isGameOn: true}
                ]
            });
            // console.log(gameExist);
            if(gameExist){
                res.status(400).json(`You are already playing with ${otherUser.name}`);
            }
            else{
                const userIds = [myId, otherUser._id];
                const currentTurn = myId;
                const positions = [
                    {
                        id: myId,
                        places: []
                    },
                    {
                        id: otherUser._id,
                        places: []
                    }
                ];
                
                const newGame = new GameModel({userIds, currentTurn, positions, lastUpdate: new Date()});
                const game = await newGame.save();
                await otherUser.updateOne(
                    {
                        $push: {activeGames: game._id.toString()}
                    }
                )
                await currentUser.updateOne(
                    {
                        $push: {activeGames: game._id.toString()}
                    }
                )
                res.status(200).json(game);

            };


        }
        else{
            res.status(400).json("Invalid email");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateMove = async (req, res)=>{
    const {gameId} = req.params;
    const { position, gameCompleted, winnerId, myId, otherId, time } = req.body;
    try {
        const game = await GameModel.findById(gameId);
        // console.log(game);
        if(game.currentTurn === game.positions[0].id){
            await game.updateOne(
                {
                    $push: {"positions.0.places": position}
                }
            );
        }
        else{
            await game.updateOne(
                {
                    $push: {"positions.1.places": position}
                }
            );
        }
        await game.updateOne(
            {
                $set: {
                    isGameOn: gameCompleted === false,
                    winnerId: winnerId,
                    lastUpdate: time,
                    currentTurn: game.currentTurn === myId ? otherId : myId
                }
            }
        );

        if(gameCompleted){
            const currentPlayer = await UserModel.findById(myId);
            const otherPlayer = await UserModel.findById(otherId);

            await currentPlayer.updateOne(
                {
                    $pull: {activeGames: gameId},
                    $push: {completedGames: gameId}
                }
            )

            await otherPlayer.updateOne(
                {
                    $pull: {activeGames: gameId},
                    $push: {completedGames: gameId}
                }
            )
        };

        const updatedGame = await GameModel.findById(gameId);
        res.status(200).json(updatedGame);

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
    
};

export const getGame = async (req, res)=>{
    const {gameId} = req.params;
    try {
        const game = await GameModel.findById(gameId);
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAllGame = async(req, res)=>{
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId);
        const gameIds = [...user.activeGames, ...user.completedGames];
        const allGames = await Promise.all(
            gameIds.map(async(gameId)=>{
                const game = await GameModel.findById(gameId);
                return game;
            })
        );

        res.status(200).json(allGames.sort((a, b)=>{
            return b.lastUpdate - a.lastUpdate
        }))
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUser = async(req, res)=>{
    const {userId} = req.params;
    try {
        const user = await UserModel.findById(userId);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}