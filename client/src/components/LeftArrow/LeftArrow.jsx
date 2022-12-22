import React from 'react'
import "./LeftArrow.css"
import { useNavigate } from 'react-router-dom';
const LeftArrow = ({path}) => {
  const navigate = useNavigate();
  const handleNavigation = ()=>{
    navigate(path);
  }
  return (
    <div className='arrow-box' onClick={handleNavigation}>
      <i className="arrow-left"></i>
    </div>
  )
}

export default LeftArrow
