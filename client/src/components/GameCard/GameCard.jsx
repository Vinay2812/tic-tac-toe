import { useState } from "react";
import "./GameCard.css";
import { useEffect } from "react";
import { getUser } from "../../api/GameRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGame } from "../../actions/GameAction";

const GameCard = ({ gameData }) => {
  const [opponentName, setOpponentName] = useState("");
  const [status, setStatus] = useState("");
  const [updateTime, setUpdateTime] = useState(null);
  const [isGameOn, setIsGameOn] = useState(null);
  const myId = useSelector((state) => state.AuthReducer.authData._id);
  const otherId = gameData.userIds.filter((id) => id !== myId)[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    async function fetchUser(){
      try {
        const { data } = await getUser(otherId);
        setOpponentName(
          data.name.length <= 10
            ? data.name
            : data.name.substring(0, Math.min(7, data.name.length)) + "..."
        );
      } catch (err) {}
    };
    if (otherId) {
      fetchUser();
    }
  }, [otherId]);

  useEffect(() => {
    const timestamp = new Date(gameData.lastUpdate); // This would be the timestamp you want to format
    setUpdateTime(
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timestamp)
    );
    if (gameData.isGameOn) {
      setIsGameOn(true);
      setStatus(
        gameData.currentTurn === myId
          ? `${opponentName} just made there move!\nIt's yourn tun to play now.`
          : "You have made your move!\nWaiting for them."
      );
    } else {
      setIsGameOn(false);
      setStatus(
        gameData.winnerId === myId
          ? "You won!"
          : gameData.winnerId === otherId
          ? `${opponentName} won!`
          : "It's a Draw!"
      );
    }
  }, [opponentName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(getGame(gameData?._id, otherId));
      navigate(`/game/${gameData?._id}`);
    } catch (err) {}
  };
  return (
    <div className="gameCard">
      <div className="gameHeading">Game with {opponentName}</div>
      <div className="gameStatus">{status}</div>
      <div className="gameTime">{updateTime}</div>
      <button className="button gameBtn" onClick={handleSubmit}>
        {isGameOn ? "Play!" : "View Game"}
      </button>
    </div>
  );
};

export default GameCard;
