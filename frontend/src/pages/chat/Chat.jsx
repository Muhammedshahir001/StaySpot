import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/userApi";
import Header from "../../components/userPages/Layout/Header";
import Footer from "../../components/userPages/Layout/Footer";
import Conversate from "../../components/Conversation/Conversation";
import Chatbox from "../../components/Conversation/Chatbox";
import { io } from "socket.io-client";

const Chat = () => {
  const users = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineusers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recievedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();
  // sending messsage to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      console.log(sendMessage)
      socket.current.emit("send-message", {data:sendMessage});
    }
  }, [sendMessage]);


  // received message from the socket server
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BASE_URL);
    // subscribing the socket
    socket.current.emit("new-user-add", users.id);
    // getting the emitted data
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [recievedMessage]);


  useEffect(() => {
    socket.current.on("receive-message", ({data}) => {
      console.log('dataaaaaaaaaaaaaaa..............................')
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlinestatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== users.id);
    const online = onlineusers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(users.id);
        //  userChats means shows user msgd resortowners
        setChats(data);
      } catch (error) {
        console.log(error, "Error occured in the chat box");
      }
    };
    getChats();
  }, []);
  return (
    <>
      <Header />

      <div>
        <div className=" mt-4 flex h-screen">
          <div className="bg-slate-200 w-1/3 rounded-3xl overflow-y-auto">
            {/* search component here */}
            <div className="container">
              <h2 className="text-2xl font-bold mb-4  ">Chats</h2>
              <div>
                {chats.map((chat) => (
                  <div onClick={() => setCurrentChat(chat)}>
                    <Conversate
                      data={chat}
                      currentUserId={users.id}
                      online={checkOnlinestatus(chat)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className=" flex flex-col  w-2/3 p-2 rounded-3xl overflow-y-scroll"
            style={{
              backgroundImage:
                'url("https://t4.ftcdn.net/jpg/01/95/42/21/360_F_195422106_cNzNOmCmgf0QbxDVfuOoEc2zEl0gYIL0.jpg")',
            }}
          >
            {/* right side chat component */}
            <Chatbox
              chat={currentChat}
              currentUser={users.id}
              setSendMessage={setSendMessage}
              recievedMessage={recievedMessage}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Chat;
