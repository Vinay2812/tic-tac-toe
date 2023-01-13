import React, { useState } from "react";
import ActionBar from "../ActionBar/ActionBar";
import Toast from "../Toast/Toast";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../actions/AuthAction";
import { useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [submitClicked, setSubmitClicked] = useState(false);
  const {authFail} = useSelector((state)=>state.AuthReducer);
  console.log(process.env.REACT_APP_AXIOS_BASE_URL)

  const handleChange = (e)=>{
    e.preventDefault();
    setSubmitClicked(false);
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    setSubmitClicked(true);
    e.preventDefault();
    dispatch(login(formData));
  }

  useEffect(()=>{
    if(authFail === false){
      setSubmitClicked(false);
    }
  }, [authFail])
  

  return (
    <div className="container">
      <ActionBar path="/auth" />
      <div>
        <div className="small-text">Login</div>
        <div className="large-text">Please enter your details</div>

        <div className="label-name small-text">Username</div>
        <input
          type="text"
          name="username"
          placeholder="Type your username here"
          className="user-input"
          onChange={handleChange}
        />

        <div className="label small-text">Password</div>
        <input
          type="password"
          name="password"
          placeholder="Type your password here"
          className="user-input"
          onChange={handleChange}
        />
        {
          authFail && submitClicked ? <Toast backgroundColor="#EB5757" text="Enter correct details" /> : ""
        }
        
        <button className="button register-btn" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
