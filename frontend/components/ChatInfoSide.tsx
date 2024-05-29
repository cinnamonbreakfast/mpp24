import styles from "./ChatInfoSide.module.scss";

const ChatInfoSide = () => {
  return (
    <div className={styles.infoSide}>
      <div className={styles.chatImage}>
        <img src="/avatar.jpeg" />
        <h2>Chat name</h2>
        <p className={styles.status}>Active 18 mins ago</p>
      </div>
    </div>
  );
};

export default ChatInfoSide;
