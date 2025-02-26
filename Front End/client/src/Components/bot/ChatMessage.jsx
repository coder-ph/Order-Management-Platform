import React from "react";
import bot from "../../assets/icons/bot.svg";

const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <div
        className={`message ${chat.role === "model" ? "bot" : "user"}-message ${
          chat.isError ? "error" : ""
        }`}
      >
        {chat.role === "model" && <img src={bot} alt="Bot" />}
        <p className="message-text">{chat.text}</p>
      </div>
    )
  );
};

export default ChatMessage;
