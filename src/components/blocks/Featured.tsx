import Link from 'next/link';
import { ReactElement } from 'react';
import styles from './Featured.module.scss';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Image from 'next/image';
import cls from 'classnames';

export const Featured = (): ReactElement => {
  return (
    <section className={styles.featured}>
      <Container>
        <Row>
          <Col md={12}>
            <div className={styles.featured_product_tab}>
              <ul className={cls(styles.navv, styles.navv_tabs)}>
                <li className={styles.featured_link}>
                  <Link href="/shop?categories=Tables">
                    <a className={styles.link}>
                      <img src="./assets/sofas.png" alt="sofa" />
                      <span>Tables</span>
                    </a>
                  </Link>
                </li>
                <li className={styles.featured_link}>
                  <Link href="/shop?categories=Chairs">
                    <a className={styles.link}>
                      <img src="./assets/sofas.png" alt="sofa" />
                      <span>Chairs</span>
                    </a>
                  </Link>
                </li>
                <li className={styles.featured_link}>
                  <Link href="/shop?categories=Descks">
                    <a className={styles.link}>
                      <img src="./assets/sofas.png" alt="sofa" />
                      <span>Descks</span>
                    </a>
                  </Link>
                </li>
                <li className={styles.featured_link}>
                  <Link href="/shop?categories=Closet">
                    <a className={styles.link}>
                      <img src="./assets/sofas.png" alt="sofa" />
                      <span>Closet</span>
                    </a>
                  </Link>
                </li>
                <li className={styles.featured_link}>
                  <Link href="/shop?categories=Beds">
                    <a className={styles.link}>
                      <img src="./assets/sofas.png" alt="sofa" />
                      <span>Beds</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <a href="#">
                    <img src="./assets/bathrooms.png" alt="Bathrooms" />
                    <span>Bathrooms</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="./assets/chair.png" alt="Office Chair" />
                    <span>Office Chair</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="./assets/bed-room.png" alt="Bed Room" />
                    <span>Bed Room</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="./assets/living-room.png" alt="Living Room" />
                    <span>Living Room</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="./assets/kitchen-cabinet.png"
                      alt="Kitchen Cabinet"
                    />
                    <span>Kitchen Cabinet</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
