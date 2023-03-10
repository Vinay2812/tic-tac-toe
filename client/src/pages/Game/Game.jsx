import ActionBar from "../../components/ActionBar/ActionBar";
import X from "../../components/X/X";
import "./Game.css";
import GridItem from "../../components/GridItem/GridItem";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGame, updateMove } from "../../actions/GameAction";
import { useParams } from "react-router-dom";
import { getSocket } from "../../socketio";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Game = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.GameReducer.game?.gameData);
  const myId = useSelector((state) => state.AuthReducer.authData?._id);
  const opponentData = useSelector(
    (state) => state.GameReducer.game?.opponentData
  );
  const opponentName = opponentData?.name;
  const { loading } = useSelector((state) => state.GameReducer);

  const { gameId } = useParams();
  const socket = getSocket();

  let boardPositions = useMemo(() => {
    let arr = [2, 2, 2, 2, 2, 2, 2, 2, 2];
    if (loading) return arr;
    if (!gameData) return arr;
    getUpdatedBoardPositions(arr);
    return arr;
  }, [gameData, loading]);

  useEffect(() => {
    socket.emit("join_room", gameId);
    if (opponentData) {
      dispatch(getGame(gameId, opponentData?._id));
    }
  }, [gameId]);

  useEffect(() => {
    socket.on("start_game_update", () => {
      if (opponentData) {
        dispatch(getGame(gameId, opponentData?._id));
      }
    });
  }, [socket]);

  function getUpdatedBoardPositions(arr) {
    const player1Positions = gameData.positions[0].places;
    const player2Positions = gameData.positions[1].places;

    player1Positions.forEach((position) => {
      arr[position] = gameData.positions[0].id === myId ? 0 : 1;
    });
    player2Positions.forEach((position) => {
      arr[position] = gameData.positions[0].id === myId ? 1 : 0;
    });
  }

  

  const [tempBoardPositions, setTempBoardPositions] = useState(
    new Array(...[2, 2, 2, 2, 2, 2, 2, 2, 2])
  );

  const [myTurn, setMyTurn] = useState(false);
  const [gameTitle, setGameTitle] = useState("");

  function getGameTitle() {
    if (gameData.isGameOn === true) {
      return gameData.currentTurn === myId ? "Your move!" : "Their move!";
    } else {
      return gameData.winnerId === null
        ? "Draw!"
        : gameData.winnerId === myId
        ? "You win!"
        : "You loose!";
    }
  }

  useEffect(() => {
    if (!gameData) return;
    setTempBoardPositions(new Array(...boardPositions));
    setMyTurn(gameData.currentTurn === myId);
    setGameTitle(getGameTitle());
  }, [gameData, myId, boardPositions, opponentName]);

  function getGameStatus() {
    const winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPositions.length; i++) {
      const win = winPositions[i];
      if (
        tempBoardPositions[win[0]] !== 2 &&
        tempBoardPositions[win[0]] === tempBoardPositions[win[1]] &&
        tempBoardPositions[win[1]] === tempBoardPositions[win[2]]
      ) {
        return tempBoardPositions[win[0]]; // Either 0 or 1 -> 0: You, 1: Opponent
      }
    }
    for (let i = 0; i <= 8; i++) {
      if (tempBoardPositions[i] === 2) {
        return 2; // game can be played
      }
    }
    return 3; // draw
  }

  // const [updatedPosition, setUpdatedPosition] = useState(null);

  const handleSubmit = (e) => {
    for (let i = 0; i <= 8; i++) {
      // position is updated
      if (tempBoardPositions[i] !== boardPositions[i]) {
        const updatedPosition = i;
        const gameSituation = getGameStatus();
        const currGameData = {
          position: updatedPosition,
          gameCompleted: gameSituation !== 2,
          winnerId:
            gameSituation === 0
              ? myId
              : gameSituation === 1
              ? opponentData._id
              : null,
          myId,
          otherId: opponentData._id,
          time: Date.now(),
        };
        dispatch(updateMove(gameId, currGameData)).then(() => {
          socket.emit("update_game", gameId);
        });

        break;
      }
    }
  };

  const gridPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
     <div className="container">
          <ActionBar path="/home" />
          <div className="opponent">
            Game With{" "}
            {loading ? "Loading..." : opponentName?.length <= 8
              ? opponentName
              : opponentName?.substring(0, 7) + "..."}
          </div>
          <div className="peice-title">Your peice</div>
          <div className="peice">
            <X width={9.86} height={44.39} dimension={64} />
          </div>
          <div className="game-area">
            <div className={`game-title ${loading? "loading" : ""}`}>{loading ? <LoadingSpinner width="15px" height="15px" /> : gameTitle}</div>
            <div className="grid-container">
              {gridPositions.map((position) => {
                return (
                  <GridItem
                    key={position}
                    position={position}
                    boardPositions={boardPositions}
                    tempBoardPositions={tempBoardPositions}
                    setTempBoardPositions={setTempBoardPositions}
                    myTurn={myTurn}
                    isGameOn={gameData?.isGameOn}
                  />
                );
              })}
            </div>
          </div>
          <button
            className="button game-btn"
            onClick={handleSubmit}
            disabled={
              gameData?.currentTurn !== myId || gameData?.isGameOn === false
            }
            style={
              gameData?.currentTurn !== myId || gameData?.isGameOn === false
                ? { backgroundColor: "#E0E0E0" }
                : {}
            }
          >
            Submit
          </button>
    </div>
  );
};

export default Game;
