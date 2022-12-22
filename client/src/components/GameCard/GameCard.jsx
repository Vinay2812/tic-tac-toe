import { useState } from "react";
import "./GameCard.css"
import { useEffect } from "react";
import { getUser } from "../../api/GameRequest";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const GameCard = ({gameData}) => {
  const [opponentName, setOpponentName] = useState("");
  const [status, setStatus] = useState("");
  const [updateTime, setUpdateTime] = useState(null);
  const [isGameOn, setIsGameOn] = useState(null);
  const myId = useSelector((state)=>state.AuthReducer.authData._id);
  const otherId = gameData.userIds.filter((id)=>id!==myId)[0];
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/game/${gameData._id}`)
  }
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const {data} = await getUser(otherId);
        setOpponentName(data.name);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [otherId]);

  useEffect(()=>{
    const timestamp = Date.now(); // This would be the timestamp you want to format
    setUpdateTime(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
    if(gameData.isGameOn){
      setIsGameOn(true);
      if(gameData.currentTurn === myId){
        setStatus(`${opponentName} just made there move!\nIt's yourn tun to play now.`);
      }
      else{
        setStatus("You have made your move!\nWaiting for them.");
      }
    }
    else{
      setIsGameOn(false);
      if(gameData.winnerId === myId){
        setStatus("You won!");
      }
      else if(gameData.winnerId === otherId){
        setStatus(`${opponentName} won!`)
      }
      else{
        setStatus("It's a Draw!")
      }
    }
  }, [opponentName])
  return (
    <div className="gameCard">
      <div className="gameHeading">
        Game with {opponentName}        
      </div>
      <div className="gameStatus">
        {status}
      </div>
      <div className="gameTime">
        {updateTime}
      </div>
      <button className="button gameBtn" onClick={handleSubmit}>
        {isGameOn ? "Play!" :"View Game"}
      </button>
    </div>
  )
}

export default GameCard
