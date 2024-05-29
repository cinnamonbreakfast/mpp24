"use client";
import { useEffect, useRef } from "react";
import ChatInfoSide from "./ChatInfoSide";
import ChatList from "./ChatList";
import styles from "./ChatWindow.module.scss";
import MessageBox from "./MessageBox";
import Messages from "./Messages";

const ChatWindow = () => {
  const socketInstance = useRef<WebSocket>();

  useEffect(() => {
    if (socketInstance.current) return;
    const ws = new WebSocket("ws://localhost:8081/");
    socketInstance.current = ws;
    console.log("Connected to the websocket!");
  }, []);

  return (
    <div className={styles.window}>
      <div className={styles.chatList}>
        <h2>Chats</h2>
        <ChatList />
      </div>

      <div className={styles.messagesArea}>
        <Messages socket={socketInstance} />
      </div>

      <div className={styles.messageBoxArea}>
        <MessageBox />
      </div>

      <ChatInfoSide />
    </div>
  );
};

export default ChatWindow;
