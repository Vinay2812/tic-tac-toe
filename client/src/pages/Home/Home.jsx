import { useState } from "react";
import "./Home.css";
import GameCard from "../../components/GameCard/GameCard";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGames } from "../../api/GameRequest";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const [allGames, setAllGames] = useState([]);
  const userId = useSelector((state) => state.AuthReducer.authData._id);
  const navigate = useNavigate();
  const params = useParams();

  const [loadingGames, setLoadingGames] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      const { data } = await getAllGames(userId);
      setAllGames(data);
      setLoadingGames(false);
    }
    if (userId) {
      setLoadingGames(true);
      fetchGames();
    }
  }, [userId, params]);

  const startNewGame = () => {
    navigate("/new-game");
  };

  return (
    <div className={`container ${loadingGames ? "loading" : ""}`}>
      {loadingGames ? (
        <LoadingSpinner width="30px" height="30px" />
      ) : (
        <>
          <div className="home-title">Your Games</div>
          {allGames.length === 0 ? (
            <>
              <div className="no-game-heading">No Games Found</div>
              <button className="button start-btn" onClick={startNewGame}>
                Start a new game
              </button>
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
        </>
      )}
    </div>
  );
};

export default Home;
