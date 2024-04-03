"use client";
import { Message, useChatStore } from "@/core/store";
import styles from "./Messages.module.scss";
import { message } from "antd";

interface MessageBubbleProps {
  type: "received" | "sent";
  message: string;
  timestamp: Date;
}

export const MessageBubble = ({
  type,
  message,
  timestamp,
}: MessageBubbleProps) => {
  return (
    <div className={`${styles.messageBubble} ${styles[type]}`}>{message}</div>
  );
};

export const Messages = () => {
  const { messages, sendMessage } = useChatStore((state) => state);

  return (
    <div className={styles.container}>
      {messages.map((e: Message, i: number) => (
        <MessageBubble
          key={i}
          type={e.type}
          message={e.message}
          timestamp={e.timestamp}
        />
      ))}
      {/* <MessageBubble
        type="sent"
        message="hello world!!"
        timestamp={new Date()}
      />
      <MessageBubble
        type="received"
        message="hello world!!"
        timestamp={new Date()}
      />
      <MessageBubble
        type="sent"
        message="hello world!! dsadasd saldsadkasd as dsadasd asd asdasd asd asd asd asd asd asd asdasdsadsada sdas dsad a dasdsadsa dsadsa d"
        timestamp={new Date()}
      /> */}
    </div>
  );
};

export default Messages;
