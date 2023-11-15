import React, { useEffect, useRef, useState } from "react";
import { getUser, getMessages, adMessage } from "../../api/userApi";
import InputEmoji from "react-input-emoji";
import { FiSend } from "react-icons/fi";

const Chatbox = ({ chat, currentUser, setSendMessage, recievedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  // it is based on the received message
  useEffect(() => {
    if (recievedMessage) {
      setMessages([...messages, recievedMessage]);
    }
    // eslint-disable-next-line
  }, [recievedMessage]);
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      const { data } = await getUser(userId);
      setUserData(data.result);
      // console.log(data.result,"This is the data.result in the Chatbox page");
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);
  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        // console.log(data,"This is the data in the fetchmessage -----");
        setMessages(data);
        // console.log(data, "This is the data of fetchmessages ");
      } catch (error) {
        console.log(error, "Error occured in the chatBox");
      }
    };
    if (chat !== null) fetchmessages();
  }, [chat]);
  function convertTimestampToFormattedDateTime(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedDateTime = `${day}-${month} ${hours}:${minutes}:${seconds} ${ampm}`;

    return formattedDateTime;
  }

  const timestamp = "2023-07-20T10:14:23.024+00:00";
  const formattedDateTime = convertTimestampToFormattedDateTime(timestamp);
  // console.log(formattedDateTime);

  const handleSend = async (e) => {
    e.preventDefault();
    const messag = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    // Send message to database
    try {
      const { data } = await adMessage(messag);
      setMessages([...messages, data]);
      setNewMessage("");
      const receiverId = chat.members.find((id) => id !== currentUser);
      setSendMessage({ ...data, receiverId });
    } catch (error) {
      console.log(error);
    }
    // Send message to socket server
  };

  return (
    <>
      {chat ? (
        <div className="chatBoxcontainer">
          <div>
            {userData?.map((staffdata, index) => (
              <div
                className="follower conversation flex items-center"
                key={index}
              >
                <div className="text-lg w-full font-bold ">
                  <span>{staffdata?.name}</span>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4 border-black" />
          <div className="chatmsg">
            {messages.map((message) => (
              <>
                {message?.senderId === currentUser ? (
                  <div ref={scroll} className="msg justify-end flex mb-2">
                    <div className="text-white p-3 rounded-lg  bg-slate-600">
                      <span className="text-lg font-semibold  m-2">
                        {message.text}
                      </span>

                      <span className="text-sm">
                        {message.createdAt &&
                          convertTimestampToFormattedDateTime(
                            message.createdAt
                          )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div ref={scroll} className="msg justify-start flex mb-2">
                    <div className="msg-content bg-gray-200 p-3 rounded-lg">
                      <span className="text-lg font-semibold m-2 ">
                        {message?.text}
                      </span>
                      <span className="text-sm   ">
                        {message.createdAt &&
                          convertTimestampToFormattedDateTime(
                            message.createdAt
                          )}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div>
            <div className="flex items-center">
              <div>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                className="mr-2"
              />
              <button className="btn btn-success" onClick={handleSend}>
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span
            className="text-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/originals/7c/1d/ab/7c1dab157f34e603487b5d0b057da448.gif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              borderRadius: "25px",
            }}
          >
            Tap on a chat to start conversation
          </span>
        </div>
      )}
    </>
  );
};

export default Chatbox;
