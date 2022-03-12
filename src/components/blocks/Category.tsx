import { ReactElement, useState } from "react";
import styles from "./Category.module.scss";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Image from "next/image";
import cls from "classnames";

export const Category = (): ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cls(styles.sidebar_default, styles.mb_30)}>
      <div className={styles.category}>
        <h2 className={cls(styles.cat_title, styles.text_uppercase)}>Home</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Living
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Accessories</li>
                <li>Desk</li>
                <li>Storage</li>
                <li>Tools</li>
                <li>Stationary</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Dining
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Accessories</li>
                <li>Desk</li>
                <li>Storage</li>
                <li>Tools</li>
                <li>Stationary</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
          <Accordion.Header>
              Furniture
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Accessories</li>
                <li>Desk</li>
                <li>Storage</li>
                <li>Tools</li>
                <li>Stationary</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
