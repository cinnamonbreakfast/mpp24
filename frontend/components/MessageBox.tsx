"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MessageBox.module.scss";
import { useChatStore } from "@/core/store";

const MessageBox = () => {
  const [message, setMessage] = useState<string>("");
  const sendMessage = useChatStore((state) => state.sendMessage);

  const _handleForm = (e: any) => {
    e.preventDefault();

    sendMessage("");
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081/");

    ws.onopen = () => {
      ws.send("hello server!");
    };
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
