"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MessageBox.module.scss";
import { Message, useChatStore } from "@/core/store";

const MessageBox = () => {
  const [message, setMessage] = useState<string>("");
  const sendMessage = useChatStore((state) => state.sendMessage);
  const socketInstance = useRef<WebSocket>();

  const _handleForm = (e: any) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();

      alert("sent");
    }
    // const mess = {
    //   type: "sent",
    //   timestamp: new Date(),
    //   message,
    // };
    // sendMessage(mess as Message);
    // if (socketInstance.current)
    //   socketInstance.current.send(JSON.stringify(mess));
    // setMessage("");
  };

  // useEffect(() => {}, []);

  return (
    <form className={styles.form}>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Aa"
        rows={(message.match(/\n/g)?.length || 0) + 1}
        onKeyDown={_handleForm}
      ></textarea>
    </form>
  );
};

export default MessageBox;
