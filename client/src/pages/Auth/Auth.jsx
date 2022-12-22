import React from 'react'
import "./Auth.css"

import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();
  const navigateLogin = ()=>{
    navigate("/auth/login");
  }
  const navigateRegister = ()=>{
    navigate("/auth/register");
  }
  return (
    <div class="container auth">
      <div className="small-title">
        async
      </div>
      <div className="big-title">
        tic tac toe
      </div>
      <button className="button login" onClick={navigateLogin}>
        Login
      </button>
      <button className="button register" onClick={navigateRegister}>
        Register
      </button>
    </div>
  )
}

export default Auth
