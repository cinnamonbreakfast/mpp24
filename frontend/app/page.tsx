import Image from "next/image";
import styles from "./page.module.css";
import ChatWindow from "@/components/ChatWindow";
import { Col, Row } from "antd";

export default function Home() {
  return <ChatWindow />;
}
