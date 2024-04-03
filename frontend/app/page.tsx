import Image from "next/image";
import styles from "./page.module.css";
import ChatWindow from "@/components/ChatWindow";
import { Col, Row } from "antd";

export default function Home() {
  return (
    <Row className={styles.main}>
      <Col span={4} />
      <Col span={16}>
        <ChatWindow />
      </Col>
      <Col span={4} />
    </Row>
  );
}
