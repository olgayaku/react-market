/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { ReactElement } from "react";
import styles from "./Banner.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import cls from "classnames";
import { Button } from "../elements/Button";

export const Banner = (): ReactElement => {
  return (
    <section className={styles.home_banner}>
      <div className={styles.slider_banner}>
        <Container>
          <div className={cls(styles.banner_bg_home, styles.position_r)}>
            <Row>
              <Col md={12}>
                <div className={styles.banner_content}>
                  <h2
                    className={cls(styles.banner_head, styles.text_uppercase)}
                  >
                    THE BEST <span> DESIGN 2022 </span>
                  </h2>
                  <p className={styles.banner_desc}>
                    You can buy what do you wish all of your life.
                  </p>
                  <Button text="View Details"/>
                </div>
              </Col>
              <Col md={12} className={styles.position_i}>
                <div className={cls(styles.banner_img, styles.text_center)}>
                  <img
                    src="./assets/ceiling-lights.png"
                    alt="lights"
                    className={styles.ceiling_lights}
                  />
                  <img
                    src="./assets/pot.png"
                    alt="pot"
                    className={styles.pot}
                  />
                  <img
                    src="./assets/banner-sofa.png"
                    alt="sofa"
                    className={cls(styles.position_r, styles.banner_main_img)}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </section>
  );
};
