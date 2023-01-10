import ActionBar from "../../components/ActionBar/ActionBar";
import X from "../../components/X/X";
import "./Game.css";
import O from "../../components/O/O";
import { useEffect, useMemo } from "react";
import { useState } from "react";
// import { updateMove } from "../../api/GameRequest";
import { useDispatch, useSelector } from "react-redux";
import { getGame, updateMove } from "../../actions/GameAction";

const XIcon = () => {
  return <X width={16.2} height={72.89} dimension={105} />;
};

const OIcon = () => {
  return <O />;
};

const Game = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.GameReducer.game?.gameData);
  const opponentData = useSelector(
    (state) => state.GameReducer.game?.opponentData
  );
  const opponentName = opponentData?.name;
  let boardPositions = useMemo(() => [2, 2, 2, 2, 2, 2, 2, 2, 2], [gameData]);
  const [tempBoardPositions, setTempBoardPositions] = useState(
    new Array(...boardPositions)
  );
  const myId = useSelector((state) => state.AuthReducer.authData._id);

  const [myTurn, setMyTurn] = useState(false);
  const [gameTitle, setGameTitle] = useState("");

  useEffect(() => {
    if(!gameData)return;

    const player1Positions = gameData.positions[0].places;
    const player2Positions = gameData.positions[1].places;

    if (!player1Positions) return;

    if (gameData.positions[0].id === myId) {
      player1Positions.forEach((position) => {
        if (position >= 0) {
          boardPositions[position] = 0;
        }
      });
      player2Positions.forEach((position) => {
        if (position >= 0) {
          boardPositions[position] = 1;
        }
      });
    } else {
      player1Positions.forEach((position) => {
        if (position >= 0) {
          boardPositions[position] = 1;
        }
      });
      player2Positions.forEach((position) => {
        if (position >= 0) {
          boardPositions[position] = 0;
        }
      });
    }

    setMyTurn(gameData.currentTurn === myId);

    if(gameData.isGameOn){
      if(gameData.currentTurn === myId){
        setGameTitle("Your turn!");
      }
      else{
        setGameTitle(`${opponentName} turn!`);
      }
    }
    else{
      if(gameData.winnerId === null){
        setGameTitle("Draw!")
      }
      else if(gameData.winnerId === myId){
        setGameTitle("You win!");
      }
      else{
        setGameTitle("You loose!");
      }
    }
  }, [gameData, myId]);

  const getGameStatus = () => {
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

    for(var win in winPositions){
      if(boardPositions[win[0]] !==2 && boardPositions[win[0]] === boardPositions[win[1]] && boardPositions[win[1]] === boardPositions[win[2]]){
        return boardPositions[win[0]];// Either 0 or 1 -> 0: You, 1: Opponent 
      }
    }

    for(var i=0;i<=8;i++){
      if(boardPositions[i] === 2){
        return 2; // game can be played
      }
    }

    return 3; // draw
  };

  const [updatedPosition, setUpdatedPosition] = useState(null);

  const handleSubmit = (e) => {
    for (var i = 0; i <= 8; i++) {
      if (tempBoardPositions[i] !== boardPositions[i]) {
        setUpdatedPosition(i);
        console.log(i);
        break;
      }
    }
  };

  useEffect(() => {
    const updateBoard = () => {
      const gameSituation = getGameStatus();
      console.log(gameSituation);
      const currGameData = {
        position: updatedPosition,
        gameCompleted: gameSituation !==2,
        winnerId: gameSituation === 0 ? myId : gameSituation === 1 ? opponentData._id : null,
        myId,
        otherId: opponentData._id,
        time: Date.now(),
      };
      console.log(gameData);
      dispatch(updateMove(gameData._id, currGameData));
    };
    if (updatedPosition !==null) {
      updateBoard();
      setUpdatedPosition(null);
    }
  }, [updatedPosition]);

  const getIcon = (position) => {
    switch (tempBoardPositions[position]) {
      case 0:
        return <XIcon />;
      case 1:
        return <OIcon />;
      default:
        return "";
    }
  };

  const placeIcon = (position) => {
    if (!myTurn) return;
    if (tempBoardPositions[position] === 2) {
      setTempBoardPositions(new Array(...boardPositions));
      setTempBoardPositions((prev) => {
        let arr = new Array(...prev);
        arr[position] = 0;
        return arr;
      });
    }
  };

  

  return (
    <div className="container">
      <ActionBar path="/home" />
      <div className="opponent">
        Game With{" "}
        {opponentName?.length <= 8
          ? opponentName
          : opponentName?.substring(0, 7) + "..."}
      </div>
      <div className="peice-title">Your peice</div>
      <div className="peice">
        <X width={9.86} height={44.39} dimension={64} />
      </div>
      <div className="game-area">
        <div className="game-title">{gameTitle}</div>
        <div className="grid-container">
          <div className="grid-item" onClick={() => placeIcon(0)} id="0">
            {getIcon(0)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(1)} id="1">
            {getIcon(1)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(2)} id="2">
            {getIcon(2)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(3)} id="3">
            {getIcon(3)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(4)} id="4">
            {getIcon(4)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(5)} id="5">
            {getIcon(5)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(6)} id="6">
            {getIcon(6)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(7)} id="7">
            {getIcon(7)}
          </div>
          <div className="grid-item" onClick={() => placeIcon(8)} id="8">
            {getIcon(8)}
          </div>
        </div>
      </div>
      <button
        className="button game-btn"
        onClick={handleSubmit}
        disabled={myTurn === false}
        style={myTurn === false ? { backgroundColor: "#E0E0E0" } : {}}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
