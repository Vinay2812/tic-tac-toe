import React from "react";
import ActionBar from "../ActionBar/ActionBar";
import "./Register.css";
import { useState } from "react";
import Toast from "../Toast/Toast";
import { register } from "../../actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({name: "", username: "", email: "", password: ""});

  const handleChange = (e)=>{
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value});
    setShowEmail(true);
  }
  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(register(formData)).then(()=>{
      setShowEmail(authData === null && !authFail);
    });
  }

  const {authData, authFail} = useSelector((state)=>state.AuthReducer);

  const [showEmail, setShowEmail] = useState(true);

  return (
    <div className="container">
      <ActionBar path="/auth" />
      <div className="register-title">
        <div className="small-text">Create account</div>
        <div className="large-text">Let's get to know you better</div>
        <div className="label-name small-text">Your name</div>
        <input
          type="text"
          name="name"
          placeholder="Type your name here"
          className="user-input"
          onChange = {handleChange}
        />

        <div className="label small-text">Username</div>
        <input
          type="text"
          name="username"
          placeholder="Type your username here"
          className="user-input"
          onChange = {handleChange}
        />
        {showEmail ? 
          <>
            <div className="label small-text">Email</div>
            <input
              type="email"
              name="email"
              placeholder="Type your email here"
              className="user-input"
              onChange = {handleChange}
            />
          </>
         : 
          ""
        }

        <div className="label small-text">Password</div>
        <input
          type="password"
          name="password"
          placeholder="Type your password here"
          className="user-input"
          onChange = {handleChange}
        />

        {
          !showEmail ? !authData ? <Toast backgroundColor="#EB5757" text="Email/username already exist"/>
          : <Toast backgroundColor="#6FCF97" text="Congratulations!!! Account created." /> : ""
        }
        
        <button
          className="button register-btn"
          disabled={!showEmail}
          style={!showEmail ? { backgroundColor: "#E0E0E0" } : {}}
          onClick = {handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
