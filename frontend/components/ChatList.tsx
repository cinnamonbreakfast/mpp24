import styles from "./ChatList.module.scss";

const ChatInstance = () => (
  <div className={styles.chatCard}>
    <img src="/avatar.jpeg" title="Avatar" alt="User avatar" />

    <div className={styles.chatInfo}>
      <p className={styles.username}>User Name</p>
      <p className={styles.lastMessage}>You: i get it...</p>
    </div>
  </div>
);

const ChatList = () => {
  return (
    <div className={styles.chatList}>
      <ChatInstance />
      <ChatInstance />
      <ChatInstance />
    </div>
  );
};

export default ChatList;
