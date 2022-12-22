import React from 'react'
import "./Toast.css"
const Toast = ({backgroundColor, text}) => {
  return (
    <div className='toast' style={{backgroundColor: backgroundColor}}>
      {text}
    </div>
  )
}

export default Toast
