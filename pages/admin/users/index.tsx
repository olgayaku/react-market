import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Container, Button, Col, Row, Table, Spinner } from 'react-bootstrap';
import { AdminLayout } from '../../../src/components/layout/AdminLayout';
import styles from "../../../styles/AdminPages.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { userService } from 'src/services/user';
import { IUser } from 'src/models';
import { useRouter } from 'next/router';

const Users: NextPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[] | null>(null);

  const onDelete = (id: number) => {
    userService.delete(String(id)).then(() => {
      getUsers();
    });
  };

  const getUsers = () => {
    userService.getAll().then((x) => setUsers(x));
  };

  const goNew = useCallback(() => {
    router.push('/admin/users/new');
  }, [router]);

  useEffect(() => {
    getUsers();
  }, []);

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button onClick={goNew} className={styles.mt_20}>+ Create New User</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {!users ? (
              <Spinner animation="border" />
            ) : users.length === 0 ? (
              <h1>Empty</h1>
            ) : (
              <Table striped bordered hover className={styles.mt_20}>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>email</th>
                    <th>uid</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>MiddleName</th>
                    <th>role</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: IUser) => (
                    <tr key={u.uid}>
                      <td>{u.id}</td>
                      <td>{u.email}</td>
                      <td>{u.uid}</td>
                      <td>{u.name}</td>
                      <td>{u.surname}</td>
                      <td>{u.middle_name}</td>
                      <td>{u.role}</td>
                      <td>
                        <li className="d-flex justify-content-center">
                          <a href={`/admin/users/${u.id}`}>
                            <FontAwesomeIcon icon={faEdit}/>
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

export default Users;
