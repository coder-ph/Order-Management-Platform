import React, { useEffect, useRef, useState } from "react";
import bot from "../../assets/icons/bot.svg";
import arrow_down from "../../assets/icons/arrow_down.svg";
import arrow_up from "../../assets/icons/arrow_up.svg";
import ChatForm from "../../Components/bot/ChatForm";
import ChatMessage from "../../Components/bot/ChatMessage";
import comment from "../../assets/icons/comment.svg";
import close from "../../assets/icons/close.svg";
import {companyInfo }from "../../Components/bot/companyInfo";

const User = () => {
  const chatBodyRef = useRef();
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true,
    role: 'model',
    text: companyInfo
  }]);
  const [showChatbot, setShowChatbot] = useState(false);
  
const generateBotResponse = async (history) => {
  // Replace "Thinking ..." instead of adding a new entry
  const updateHistory = (text, isError = false) => {
    setChatHistory((prev) =>
      prev.map((msg) =>
        msg.text === "Thinking ..."
          ? { ...msg, text, isError }
          : msg
      )
    );
  };

  // Format history for API
  history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const res = await fetch(import.meta.env.VITE_API_KEY, requestOptions);
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error.message || "something went wrong");
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.?)\*\*/g, '"1')
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error(error);
      updateHistory(error.message, true)
    }
  };
  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span><img src={comment} /></span>
        <span><img src={close}/></span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <div className="icon-h">
              <img src={bot} alt="Bot Icon" />
            </div>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)}>
            <span>
              <img src={arrow_down} alt="Arrow Down" />
            </span>
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <div className="svg">
              <img src={bot} alt="Bot Icon" />
            </div>
            <p className="message-text">
              Hey there <br /> How can i help you today
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
