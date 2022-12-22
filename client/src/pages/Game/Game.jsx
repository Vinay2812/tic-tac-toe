import ActionBar from "../../components/ActionBar/ActionBar";
import X from "../../components/X/X";
import "./Game.css";
import O from "../../components/O/O";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getUser, updateMove } from "../../api/GameRequest";
import { getGame } from "../../actions/GameAction";
import { useDispatch, useSelector } from "react-redux";

const XIcon = () => {
  return <X width={16.2} height={72.89} dimension={105} />;
};

const OIcon = () => {
  return <O />;
};

const Game = () => {
  const params = useParams();
  const { gameId } = params;
  const dispatch = useDispatch();
  const { gameData } = useSelector((state) => state.GameReducer);
  const [opponentName, setOpponentName] = useState("");


  useEffect(() => {
    dispatch(getGame(gameId)).then(()=>{
      try {
          const getOtherUser = async () => {
          getUser(gameData?.userIds.filter((uId) => myId !== uId)[0]).then(
            (res) => {
              setOpponentName(res.data.name);
            }
            );
          };
          getOtherUser();
        } catch (err) {
          console.log(err);
        }
    });
    
  }, [gameId]);

  const myId = useSelector((state) => state.AuthReducer.authData._id);
  const otherId = gameData?.userIds.filter((uId) => myId !== uId)[0];

  const [myTurn, setMyTurn] = useState(gameData?.currentTurn === myId);

  // 0->current | 1->opponent | 2->not placed

  const [place, setPlace] = useState(-1);

  const checkWin = () => {
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

    for (let win in winPositions) {
      for(let pos=0;pos<=1;pos++){
        if(gameData?.positions[pos].places.includes(win[0]) && gameData?.positions[pos].places.includes(win[1]) && gameData?.positions[pos].places.includes(win[2])){
          if(gameData?.positions[pos].id === myId){
            return 0;
          }
          else{
            return 1;
          }
        }
      }
    }

    if(gameData?.positions[0].places.length + gameData?.positions[1].places.length === 9){
      return 2;
    }
    return 1;
  
  };
  const placeItem = (currentPlace) => {
    if(gameData?.positions[0].id === myId){
      gameData?.positions[0].places.push(currentPlace);
    }
    else{
      gameData?.positions[1].places.push(currentPlace);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gameStatus = checkWin();
      const updateData = {
        position: place,
        gameCompleted: gameStatus !== 4,
        winnerId:
          gameStatus === 0 || gameStatus === 1
            ? gameStatus === 0
              ? myId
              : otherId
            : null,
        myId: myId,
        otherId: gameData?.userIds.filter((uId) => myId !== uId)[0],
        time: new Date(),
      };

      updateMove({ gameId, gameData: updateData }).then(() => {
        dispatch(getGame(gameId)).then(()=>{
          setMyTurn(gameData?.currentTurn === myId);
        });
        setPlace(-1);
        
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getIcon = (boxNo)=>{
    if(gameData?.positions[0].places.includes(boxNo)){
      if(gameData?.positions[0].id === myId){
        return <XIcon />
      }
      else{
        return <OIcon />
      }
      
    }
    if(gameData?.positions[1].places.includes(boxNo)){
      if(gameData?.positions[1].id === myId){
        return <XIcon />
      }
      else{
        return <OIcon />
      }
    }
    return "";
  }

  const getGameStatus = ()=>{
    const winStatus = checkWin();
    if(winStatus === 0){
      return "You won";
    }

    if(winStatus === 1){
      return "You loose"
    } 

    if(winStatus === 2){
      return "It's a draw"
    }

    if(gameData?.currentTurn === myId){
      return "Your move"
    }

    return "Their move"
  }
  return (
    <div className="container">
      <ActionBar path="/home" />
      <div className="opponent">
        Game With {opponentName ? opponentName : ""}
      </div>
      <div className="peice-title">Your peice</div>
      <div className="peice">
        <X width={9.86} height={44.39} dimension={64} />
      </div>
      <div className="game-area">
        <div className="game-title">{getGameStatus()}</div>
        <div className="grid-container">
          <div className="grid-item" id="0" onClick={() => placeItem(0)}>
            {getIcon(0)}
          </div>
          <div className="grid-item" id="1" onClick={() => placeItem(1)}>
            {getIcon(1)}
          </div>
          <div className="grid-item" id="2" onClick={() => placeItem(2)}>
            {getIcon(2)}
          </div>
          <div className="grid-item" id="3" onClick={() => placeItem(3)}>
            {getIcon(3)}
          </div>
          <div className="grid-item" id="4" onClick={() => placeItem(4)}>
            {getIcon(4)}
          </div>
          <div className="grid-item" id="5" onClick={() => placeItem(5)}>
            {getIcon(5)}
          </div>
          <div className="grid-item" id="6" onClick={() => placeItem(6)}>
            {getIcon(6)}
          </div>
          <div className="grid-item" id="7" onClick={() => placeItem(7)}>
            {getIcon(7)}
          </div>
          <div className="grid-item" id="8" onClick={() => placeItem(8)}>
            {getIcon(8)}
          </div>
        </div>
      </div>
      <button
        className="button game-btn"
        onClick={handleSubmit}
        disabled={!myTurn}
        style={!myTurn ? {backgroundColor: "#E0E0E0"} : {}}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
