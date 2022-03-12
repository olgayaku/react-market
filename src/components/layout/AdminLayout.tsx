import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebase } from "src/services/firebase";
import { userService } from "src/services/user";

import cls from "classnames";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../styles/AdminLayout.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ logout }: { logout: () => void }) => (
  <nav className={styles.navbar}>
    <Container>
      <Row className={styles.navbar_nav}>
        <Col xs={12} md={4} lg={4}>
          <Link href="/admin">
            <a className={cls(styles.navbar_item, styles.navbar_admin)}>Admin</a>
          </Link>
        </Col>
        <Col xs={12} md={4} lg={4} className={styles.navbar_items}>
          <Link href="/admin/users">
            <a className={styles.navbar_item}>Users</a>
          </Link>
          <Link href="/admin/categories">
            <a className={styles.navbar_item}>Categories</a>
          </Link>
          <Link href="/admin/products">
            <a className={styles.navbar_item}>Products</a>
          </Link>
          <Link href="/admin/orders">
            <a className={styles.navbar_item}>Orders</a>
          </Link>
        </Col>
        <Col xs={12} md={4} lg={4} className="d-flex justify-content-end">
        <a onClick={logout} className={styles.navbar_logout}>
          Logout&nbsp;<FontAwesomeIcon icon={faSignOutAlt} />
        </a>
        </Col>
      </Row>
    </Container>
  </nav>
);

export const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue.role !== "admin") {
      router.push("/login");
    }
  }, []);

  function logout() {
    firebase.logout();
    userService.logout();
  }

  return (
    <>
      <Nav logout={logout} />
      {children}
    </>
  );
};
