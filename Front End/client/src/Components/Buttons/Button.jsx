import React from "react";
export const MainButton = ({children, type = 'button', onClick,style}) => {
    return (
        <button type={type} onClick={onClick} style={style} className="primary-button" >
          {children}
        </button>
    )
}

export const GoogleButton = ({children, type = 'button', onClick,style}) => {
  return (
      <button type={type} onClick={onClick} style={style} className="google-button" >
        {children}
      </button>
  )
}