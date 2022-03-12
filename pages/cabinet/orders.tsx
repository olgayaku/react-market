import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { Col, Container, Spinner, Table } from 'react-bootstrap';
import { IUser, IOrder } from 'src/models';
import { firebase } from 'src/services/firebase';
import { orderService } from 'src/services/order';

import { userService } from 'src/services/user';

function Nav() {
  const [user, setUser] = useState<IUser>();
  const [orders, setOrders] = useState<IOrder | null>(null);
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  function logout() {
    firebase.logout();
    userService.logout();
  }

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

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
      router.push('/login');
    }
  }, []);

  console.log('orders :>> ', orders);
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <Link href="/cabinet/orders">
            <a className="nav-item nav-link">Orders</a>
          </Link>
          <a onClick={logout} className="nav-item nav-link">
            Logout
          </a>
        </div>
      </nav>
      {user && (
        <Container>
          <h1>{`${user.name} ${user.surname} ${user.middle_name}`}</h1>
          <p>id: {user.id}</p>
          <p>uid: {user.uid}</p>
          <p>email: {user.email}</p>
          <p>role: {user.email}</p>

          <Col>
            {!orders ? (
              <Spinner animation="border" />
            ) : orders.length === 0 ? (
              <h1>Empty</h1>
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
                      <td>{u.price}</td>
                      <td>{u.status === 1 ? 'Done' : 'New order'}</td>
                      <td>{u.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Container>
      )}
    </>
  );
}

const Logout: NextPage = () => <Nav />;
export default Logout;
