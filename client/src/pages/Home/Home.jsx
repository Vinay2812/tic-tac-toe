import { useState } from "react";
import "./Home.css";
// import { Data } from "./dummyData";
import GameCard from "../../components/GameCard/GameCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { getAllGames } from "../../api/GameRequest";

const Home = () => {
  const [allGames, setAllGames] = useState([]);
  const userId = useSelector((state)=>state.AuthReducer.authData._id)
  const navigate = useNavigate();
  const startNewGame = () => {
    navigate("/new-game");
  };

  useEffect(()=>{
    const fetchGames = async()=>{
      const {data} = await getAllGames(userId);
      setAllGames(data);
    }
    fetchGames();
  }, [])
  return (
    <div className="container">
      <div className="home-title">Your Games</div>
      {allGames.length === 0 ? (
        <>
          <div className="no-game-heading">No Games Found</div>
          <button className="button start-btn" onClick={startNewGame}>Start a new game</button>
        </>
      ) : (
        <>
          <div className="game-container">
            {allGames?.map((gameData) => {
              return <GameCard key={gameData._id} gameData={gameData} />;
            })}
          </div>
          <button className="floatingButton" onClick={startNewGame}>
            <div className="plus">
              <div className="vertical"></div>
              <div className="horizontal"></div>
            </div>
            <div className="btn-text">New Game</div>
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
