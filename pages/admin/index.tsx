import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { AdminLayout } from "../../src/components/layout/AdminLayout";
import styles from "../../styles/Admin.module.scss";

import { userService } from "src/services/user";
import { productService } from 'src/services/product';
import { orderService } from 'src/services/order';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown, faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFirstOrder,
} from "@fortawesome/free-brands-svg-icons";

import { IUser, IProduct, IOrder } from 'src/models';
import { getOwnPropertyDescriptors } from "immer/dist/internal";


const Admin: NextPage = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [orders, setOrders] = useState<IOrder[] | null>(null);

  const onClick = () => {
    userService.getAll().then((x) => console.log(x));
  };

  const getUsers = () => {
    userService.getAll().then((x) => setUsers(x));
  };

  const getOrders = () => {
    orderService.getAll().then((x) => setOrders(x));
  };

  const getProducts = () => {
    productService.getAll().then((x) => setProducts(x));
  };

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    getUsers();
    getOrders();
    getProducts();
  }, []);

  // only show nav when logged in
  if (!user) return null;

  console.log("user :>> ", user);

  return (
    <AdminLayout>
      <Container>
        <section className={styles.admin_main}>
          <Row className={styles.root}>
            <Col lg={4} md={6}>
              <Link href="/admin/users">
                <div className={styles.admin_card}>
                  <FontAwesomeIcon icon={faUserCircle} />
                  <h3>{users ? users.length : 0}</h3>
                  <p>All Users</p>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6}>
              <Link href="/admin/orders">
                <div className={styles.admin_card}>
                  <FontAwesomeIcon icon={faFirstOrder} />
                  <h3>{orders ? orders.length : 0}</h3>
                  <p>All Orders</p>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6}>
              <Link href="/admin/products">
                <div className={styles.admin_card}>
                  <FontAwesomeIcon icon={faCaretDown} />
                  <h3>{products ? products.length : 0}</h3>
                  <p>All Product</p>
                </div>
              </Link>
            </Col>
          </Row>
        </section>
      </Container>
    </AdminLayout>
  );
};

export default Admin;
