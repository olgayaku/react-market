import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Container, Button, Col, Row, Table, Spinner } from 'react-bootstrap';
import { AdminLayout } from '../../../src/components/layout/AdminLayout';
import styles from "../../../styles/AdminPages.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { orderService } from 'src/services/order';
import { IOrder } from 'src/models';
import { useRouter } from 'next/router';

const Orders: NextPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[] | null>(null);

  const onDelete = (id: number) => {
    orderService.delete(String(id)).then(() => {
      getOrders();
    });
  };

  const getOrders = () => {
    orderService.getAll().then((x) => setOrders(x));
  };

  const goNew = useCallback(() => {
    router.push('/admin/orders/new');
  }, [router]);

  useEffect(() => {
    getOrders();
  }, []);

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container>
        <Row>
          <Col>
            {!orders ? (
              <Spinner animation="border" />
            ) : orders.length === 0 ? (
              <h1>Empty</h1>
            ) : (
              <Table striped bordered hover className={styles.mt_40}>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Created</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Comment</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((u: IOrder) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{new Date(u.create_time * 1000).toDateString()}</td>
                      <td>{u.price}</td>
                      <td>{u.status === 1 ? 'Done' : 'New order'}</td>
                      <td>{u.comment}</td>
                      <td>
                        <li className="d-flex justify-content-center">
                          <a href={`/admin/orders/${u.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </a>
                        </li>
                      </td>
                      <td>
                        <li className="d-flex justify-content-center">
                          <a href="#">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => onDelete(u.id!)}
                              className={styles.trash}
                            />
                          </a>
                        </li>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Orders;
