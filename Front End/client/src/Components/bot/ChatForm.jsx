import React, { useRef } from "react";
import arrow_up from "../../assets/icons/arrow_up.svg"

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
      
    ]);

setTimeout(() => {
  setChatHistory((history) => [
    ...history,
    { role: "model", text: "Thinking ..." },
  ]);

  generateBotResponse([
    ...chatHistory,
    {
      role: "user",
      text: `using the details provided above, please address this query: ${userMessage}`,
    },
  ]);
}, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        ref={inputRef}
        className="message-input"
        placeholder="Message..."
        required
      />
      <button>
        <span><img src={arrow_up} /></span>
      </button>
    </form>
  );
};

export default ChatForm;
