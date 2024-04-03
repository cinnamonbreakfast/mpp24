"use client";
import { useChatStore } from "@/core/store";
import styles from "./Messages.module.scss";

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
  return (
    <div className={styles.container}>
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
