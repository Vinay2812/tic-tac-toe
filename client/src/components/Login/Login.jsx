import React, { useState } from "react";
import ActionBar from "../ActionBar/ActionBar";
import Toast from "../Toast/Toast";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../actions/AuthAction";

const Login = () => {
  const [formData, setFormData] = useState({username: "", password: ""});

  const handleChange = (e)=>{
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  }

  const {authFail} = useSelector((state)=>state.AuthReducer);

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
          authFail ? <Toast backgroundColor="#EB5757" text="Enter correct details" /> : ""
        }
        
        <button className="button register-btn" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
