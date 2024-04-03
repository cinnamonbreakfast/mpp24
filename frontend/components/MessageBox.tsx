"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MessageBox.module.scss";
import { Message, useChatStore } from "@/core/store";

const MessageBox = () => {
  const [message, setMessage] = useState<string>("");
  const sendMessage = useChatStore((state) => state.sendMessage);
  const socketInstance = useRef<WebSocket>();

  const _handleForm = (e: any) => {
    e.preventDefault();
    const mess = {
      type: "sent",
      timestamp: new Date(),
      message,
    };
    sendMessage(mess as Message);
    if (socketInstance.current)
      socketInstance.current.send(JSON.stringify(mess));
    setMessage("");
  };

  useEffect(() => {
    if (socketInstance.current) return;
    const ws = new WebSocket("ws://localhost:8081/");

    socketInstance.current = ws;
    ws.onmessage = (ev) => console.log(ev.data);
  }, []);

  return (
    <form className={styles.form} onSubmit={_handleForm}>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <input type="submit" value="Send"></input>
    </form>
  );
};

export default MessageBox;
