import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Container, Button, Col, Row, Table, Spinner } from 'react-bootstrap';
import { AdminLayout } from '../../../src/components/layout/AdminLayout';
import styles from "../../../styles/AdminPages.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { categoryService } from 'src/services/category';
import { ICategory } from 'src/models';
import { useRouter } from 'next/router';

const Categories: NextPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  const onDelete = (id: number) => {
    categoryService.delete(String(id)).then(() => {
      getCategories();
    });
  };

  const getCategories = () => {
    categoryService.getAll().then((x) => setCategories(x));
  };

  const goNew = useCallback(() => {
    router.push('/admin/categories/new');
  }, [router]);

  useEffect(() => {
    getCategories();
  }, []);

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container>
        <Row>
        <Col className="d-flex justify-content-end">
          <Button onClick={goNew}  className={styles.mt_20}>+ Create New Categorie</Button>
        </Col>
        </Row>
        <Row>
          <Col>
            {!categories ? (
              <Spinner animation="border" />
            ) : categories.length === 0 ? (
              <h1>Empty</h1>
            ) : (
              <Table striped bordered hover className={styles.mt_20}>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((u: ICategory) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>
                        <li className="d-flex justify-content-center align-items-center">
                          <a href={`/admin/categories/${u.id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                          </a>
                        </li>
                      </td>
                      <td>
                        <li className="d-flex justify-content-center align-items-center">
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

export default Categories;
