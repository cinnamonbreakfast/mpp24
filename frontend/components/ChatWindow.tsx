import styles from "./ChatWindow.module.scss";
import MessageBox from "./MessageBox";
import Messages from "./Messages";

const ChatWindow = () => {
  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <h3>Global Chat</h3>
      </div>

      <div className={styles.messagesArea}>
        <Messages />
      </div>

      <div className={styles.messageBoxArea}>
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatWindow;
