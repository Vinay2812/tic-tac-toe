import React from 'react'
import LeftArrow from '../LeftArrow/LeftArrow'
import "./ActionBar.css"
const ActionBar = ({path}) => {
  return (
    <div className="action-bar">
      <LeftArrow path={path}/>
    </div>
  )
}

export default ActionBar
