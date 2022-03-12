import type { NextPage } from "next";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

import cls from 'classnames';
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import styles from "/src/components/blocks/Header.module.scss";

import { slide as Menu } from 'react-burger-menu';
import { IUser, IOrder } from "src/models";
import { firebase } from "src/services/firebase";
import { orderService } from "src/services/order";
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';

import { userService } from "src/services/user";

import { BackCall } from '/src/components/blocks/BackCall';
import { Footer } from '/src/components/blocks/Footer';


function Nav() {
  const [user, setUser] = useState<IUser>();
  const [orders, setOrders] = useState<IOrder | null>(null);
  const router = useRouter();

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    firebase.logout();
    userService.logout();
  }

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (user) {
      orderService
        .getByUserId(user.id)
        .then((u) => {
          setOrders(u);
        })
        .catch((e) => {
          goBack();
        });
    }
  }, [user]);


  // only show nav when logged in
  useEffect(() => {
    // redirect to home if already logged in
    if (!userService.userValue) {
      router.push("/login");
    }
  }, []);

  const { order } = useSelector((state: RootState) => state.basket);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((s) => !s);
  const onClose = () => setIsOpen(false);


  return (
    <>
      <Menu
        pageWrapId={"__next"}
        outerContainerId={"__next"}
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
              <div className={cls(styles.menu_icon, styles.logout_menu)}>
                <ul>
                  <li className={cls(styles.login, styles.logout)}>
                      <a onClick={logout}>
                        <span></span>
                      </a>
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
      {user && (
        <Container className={styles.mt_95}>
          <h1>Hello, {`${user.name} ${user.surname}`} !</h1>
          <p>Your e-mail: {user.email}</p>
          <Col xs={12} >
            {!orders ? (
              <Spinner animation="border" />
            ) : orders.length === 0 ? (
              <h1>You don't have orders yet :(</h1>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Created</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((u: IOrder) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{new Date(u.create_time * 1000).toDateString()}</td>
                      <td>${u.price}</td>
                      <td>{u.status === 1 ? "Done" : "New order"}</td>
                      <td>{u.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Container>
      )}
    <BackCall/>
    <Footer/>
    </>
  );
}

const Logout: NextPage = () => <Nav />;
export default Logout;
