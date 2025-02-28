import React from "react";
import '../../assets/styles/ButtonStyles.css'

export const MainButton = ({children, type = 'button', onClick,style}) => {
    return (
      <button
        type={type}
        onClick={onClick}
        style={{ background: "#141b2d" }}
        className="primary-button"
      >
        {children}
      </button>
    );
}

export const GoogleButton = ({children, type = 'button', onClick,style}) => {
  return (
      <button type={type} onClick={onClick} style={style} className="google-button" >
        {children}
      </button>
  )
}