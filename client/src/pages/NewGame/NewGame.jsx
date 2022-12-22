import { useSelector } from "react-redux";
import ActionBar from "../../components/ActionBar/ActionBar";
import "./NewGame.css";
import { useState } from "react";
import { startGame } from "../../api/GameRequest";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Toast from "../../components/Toast/Toast"

const NewGame = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    useEffect(()=>{
      setEmail("");
      setError("");
    }, []);

    const handleChange = (e)=>{
        e.preventDefault();
        setEmail(e.target.value);
        setError(false);
    }

    const {_id} = useSelector((state)=>state.AuthReducer.authData)
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const {data} = await startGame({email: email, userId: _id});
          const gameId = data._id;
          navigate(`/game/${gameId}`);
        } catch (err) {
          setError(true);
        }
        
    }
  return (
    <div className="container">
      <ActionBar path={"/home"} />
      <div className="newgame-small-title">Start a new game</div>
      <div className="newgame-large-title">Whom do you want to play with?</div>
      <div className="email-label">Email</div>
      <input
        type="email"
        name="email"
        className="user-input game-input"
        placeholder="Type your email here"
        onChange={handleChange}
      />
      {
        error === true ? <Toast backgroundColor="#EB5757" text={`Already game exist with ${email}`}/> : ""
      }
      
      <button className="button start-game-btn" onClick={handleSubmit}>Start game</button>
    </div>
  );
};

export default NewGame;
