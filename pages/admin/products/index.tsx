/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Container, Button, Col, Row, Table, Spinner } from "react-bootstrap";
import { AdminLayout } from "../../../src/components/layout/AdminLayout";
import styles from "../../../styles/AdminPages.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { productService } from "src/services/product";
import { IProduct } from "src/models";
import { useRouter } from "next/router";

const Products: NextPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[] | null>(null);

  const onDelete = (id: number) => {
    productService.delete(String(id)).then(() => {
      getProducts();
    });
  };

  const getProducts = () => {
    productService.getAll().then((x) => setProducts(x));
  };

  const goNew = useCallback(() => {
    router.push("/admin/products/new");
  }, [router]);

  useEffect(() => {
    getProducts();
  }, []);

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button onClick={goNew} className={styles.mt_20}>+ Create New Product</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {!products ? (
              <Spinner animation="border" />
            ) : products.length === 0 ? (
              <h1>Empty</h1>
            ) : (
              <Table striped bordered hover className={styles.mt_20}>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>IMAGE</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((u: IProduct) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>
                        {u.img ? (
                          <img
                            src={u.img}
                            style={{ maxWidth: "100px" }}
                            alt={u.name}
                          />
                        ) : (
                          "null"
                        )}
                      </td>
                      <td>{u.name}</td>
                      <td>{u.description}</td>
                      <td>{u.categories.join("–")}</td>
                      <td>{u.price}</td>
                      <td>
                        <li className="d-flex justify-content-center">
                          <a href={`/admin/products/${u.id}`}>
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

export default Products;
