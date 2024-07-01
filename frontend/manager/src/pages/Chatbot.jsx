import React, { useState } from "react";
import axios from "axios";
import Switcher from "../components/Switcher";
import { IoSend } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";

const Chatbot = () => {
  const [input, setInput] = useState({
    senderID: "6673f7c25a7da01a3cdd69c0",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (input.content === null || input.content === "") {
      console.log({ err: "the content of request is empty" });
      return;
    }

    const newMessage = { sender: "user", content: input.content };
    setMessages([...messages, newMessage]);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3400/api/message", input);
      const responseMessage = { sender: "bot", content: response.data.responseSaved.content };
      setMessages([...messages, newMessage, responseMessage]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    setInput({ ...input, content: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleLoginSubmit(e);
    }
  };

  return (
    <div className="h-screen w-screen overflow-clip bg-gray-50 flex text-gray-900 dark:text-gray-50 dark:bg-gray-950">
      <div className="sidBar w-1/6 h-full border "></div>
      <div className="main_container h-full w-5/6 ">
        <div className="main_nav border p-4 flex items-center">
          <Switcher />
        </div>
        <div className="main h-full w-full p-2 flex flex-col">
          <div className="w-full h-[80%] overflow-clip">
          <div className="chat flex-grow justify-end overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg max-w-xl ${
                  msg.sender === "user" ? "bg-gray-700 " : "bg-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          </div>

          <div className="input flex justify-center w-full">
            <form onSubmit={handleLoginSubmit} className="absolute bottom-4 w-[65%]">
              <div className="p-2 rounded-3xl flex bg-white dark:bg-gray-800 shadow-md">
                <textarea
                  name="content"
                  value={input.content}
                  id="content"
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                  className="bg-transparent p-2 flex-grow outline-none resize-none h-12 max-h-40 overflow-auto"
                  placeholder="Type your message here..."
                />
                <button type="submit" className="px-4 text-blue-500" disabled={loading}>
                  {loading ? <ImSpinner8 className="animate-spin" /> : <IoSend size={24} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
