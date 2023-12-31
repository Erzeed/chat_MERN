/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import {uniqBy} from "lodash";
import BubleChat from "../components/buble-chat";
import Card from "../components/card";
import { UserContext } from "../context/userContext";

function Chat() {
  const [online, setOnline] = useState();
  const [idUser, setIdUser] = useState();
  const [newMessage, setMessage] = useState("");
  const [newMessageText, setMessageText] = useState([]);
  const [ws, setWs] = useState();
  const { id } = useContext(UserContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);
    ws.addEventListener("message", onHandleMessage);
  }, []);

  const onHandleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
        if(messageData.sender === idUser) {
          setMessageText(prev => ([
              ...prev,
              {...messageData}
            ]))
        }
    }
  };

  const showOnlinePeople = (people) => {
    const newPeople = {};
    people.forEach(({ userId, email }) => {
      newPeople[userId] = email;
    });
    setOnline(newPeople);
  };

  const onHandleClickSelect = (id) => {
    setIdUser(id);
  };

  const onHandleSubmitMessage = (e) => {
    e.preventDefault();
    ws.send(JSON.stringify({
        recipient: idUser,
        text: newMessage
      }));
      setMessage('')
      setMessageText(prev => ([...prev,{
        text: newMessage,
        sender: id,
        recipient: idUser,
        _id: Date.now(),
      }]));
  }
  const filterIsMy = { ...online };
  delete filterIsMy[id];
  const filterNewMessageText = uniqBy(newMessageText, '_id');

  return (
    <div className="container_chat w-full flex h-screen bg-[#2e333d]">
      <div className="chat_log w-1/3 mt-5 border-sky-500 overflow-y-scroll">
        <div className="log_search p-2 sticky top-0">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none dark:text-white"
              placeholder="Search"
              required
            />
          </div>
        </div>
        <div className="log_card mt-5">
          {online != undefined ? (
            Object.keys(filterIsMy).map((userId) => (
              <Card
                key={userId}
                onSelectContact={() => onHandleClickSelect(userId)}
                select={idUser == userId}
                email={filterIsMy[userId]}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="chat_main w-3/5 flex flex-col justify-between">
        <div className="main_header flex text-white justify-between px-7 mt-2 items-center h-20">
          <div className="header_text tracking-wider">
            <h2 className="text-2xl font-medium">Bio</h2>
            <p className="text-xs text-slate-400">online</p>
          </div>
          <div className="header_icon">
            <p>{">"}</p>
          </div>
        </div>
        <div className="main_chat h-full bg-gray-800 p-2 flex flex-col justify-end">
          {idUser ? (
            filterNewMessageText.map((message) => (
                <div key={message._id} className={`${
                  (message.sender == idUser ? 'items-start': 'items-end')
                } flex flex-col`}>
                  <BubleChat answer={message.sender == idUser ? false : true}  message={message} />
                </div>
            ))
          ) : (
            <p className="text-gray-300">Silahkan pilih chat</p>
          )}
        </div>
        <div className="main_type m-2">
          {idUser && (
            <form onSubmit={(e) => onHandleSubmitMessage(e)}>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center px-2 py-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <button
                  type="button"
                  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      fill="currentColor"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                  </svg>
                  <span className="sr-only">Upload image</span>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                    />
                  </svg>
                  <span className="sr-only">Add emoji</span>
                </button>
                <textarea
                  id="chat"
                  rows="1"
                  className="block mx-4 p-3 w-full text-sm text-gray-900 bg-gray-800 rounded-lg placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="Your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="chat_profile w-1/4 bg-black"></div>
    </div>
  );
}

export default Chat;
