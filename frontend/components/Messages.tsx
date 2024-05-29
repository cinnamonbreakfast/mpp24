"use client";
import { Message, useChatStore } from "@/core/store";
import styles from "./Messages.module.scss";
import {
  createRef,
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
} from "react";

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
    <div className={`${styles.messageBubble} ${styles[type]}`}>
      <div>{message}</div>
      <p>19:30</p>
    </div>
  );
};

interface MessagesProps {
  socket: MutableRefObject<WebSocket | undefined>;
}

export const Messages = ({ socket }: MessagesProps) => {
  const { messages, addMessage } = useChatStore((state) => state);
  const containerRef = createRef<HTMLDivElement>();

  const _scrollDown = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [containerRef]);

  useEffect(() => {
    if (socket?.current) {
      console.log("Listening to the socket!");
      socket.current.onmessage = (ev) => {
        console.log(ev);
        addMessage(JSON.parse(ev.data));
      };
    }
  }, [socket, addMessage]);

  useEffect(() => {
    _scrollDown();
  }, [_scrollDown]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.beginningOfTime}>
        <h2>Your chat starts here!</h2>
        <p>You went past the Moon trying to reach the stars.</p>
      </div>
      {messages.map((e: Message, i: number) => (
        <MessageBubble
          key={i}
          type={"received"}
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
