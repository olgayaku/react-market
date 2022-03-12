/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { ReactElement, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { slide as Menu } from 'react-burger-menu';
import cls from 'classnames';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';

interface IProps {
  type?: 'Logout' | 'Login';
  className?: string;
}

export const Header = React.memo(({type}: IProps) => {
  const { order } = useSelector((state: RootState) => state.basket);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((s) => !s);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Menu
        pageWrapId={'__next'}
        outerContainerId={'__next'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={cls(styles.navbar_header, styles.burger_navbar)}>
          <Link href="/">
            <Image
              className={styles.navbar_brand}
              src="/assets/menu-logo.png"
              width={200}
              height={35}
            />
          </Link>
        </div>
        <div className={styles.menuClose} onClick={onClose}>
          <span></span>
        </div>
        <Link href="/">
          <a id="home" className="menu-item">
            Home
          </a>
        </Link>
        <Link href="/shop">
          <a id="shop" className="menu-item">
            Shop
          </a>
        </Link>
        <Link href="#">
          <a id="category" className="menu-item">
            Category
          </a>
        </Link>
        <Link href="#">
          <a id="about" className="menu-item">
            About us
          </a>
        </Link>
        <Link href="#">
          <a id="contact" className="menu-item">
            Contact
          </a>
        </Link>
        <Link href="/logout">
          <a id="logout" className="menu-item">
            Logout
          </a>
        </Link>
      </Menu>
      <header className={styles.header}>
        <Container>
          <Row>
            <Col
              lg={4}
              md={4}
              xs={7}
              className="d-flex align-items-center align-flex"
            >
              <div className={styles.navbar_header}>
                <Link href="/">
                  <Image
                    className={styles.navbar_brand}
                    src="/assets/logo.png"
                    width={182}
                    height={35}
                  />
                </Link>
              </div>
            </Col>
            <Col lg={8} md={8} xs={5}>
              <div className={cls(styles.menu_icon, {
                [styles.logout_menu]: type === 'Logout'})}>
                <ul>
                  <li className={styles.login}>
                    <Link href="/cabinet">
                      <a>
                        <span></span>
                      </a>
                    </Link>
                  </li>
                  <li className={styles.cart_menu}>
                    <Link href="/cart">
                      <a>
                        <span></span>
                      </a>
                    </Link>
                    <span className={styles.count_cart}>{order.count}</span>
                  </li>
                  <li>
                    <div className={styles.menu_toggle} onClick={toggleOpen}>
                      <span className={styles.transition}></span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.overlay}></div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
});
