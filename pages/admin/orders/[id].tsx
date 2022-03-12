import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { AdminLayout } from "../../../src/components/layout/AdminLayout";
import styles from "../../../styles/AdminPages.module.scss";
import cls from "classnames";

import * as Yup from "yup";
import { IOrder } from "src/models";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/form_fields/TextInput";
import { orderService } from "src/services/order";
import { Select } from "src/components/form_fields/Select";

const OrdersItem: NextPage = () => {
  const router = useRouter();
  const [order, setOrders] = useState<IOrder | null>(null);
  const { id } = router.query;
  const isNew = id === "new";

  // form validation rules
  const validationSchema = Yup.object().shape({
    status: Yup.number().required("Status is required"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  // get functions to build form with useForm() hook
  const {
    handleSubmit,
    setError,
    formState: { isDirty, isValid },
    control,
    reset,
  } = useForm(formOptions);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const onSubmit = (data: IOrder) => {
    orderService.edit(data).then((res) => goBack());
  };

  // hooks
  useEffect(() => {
    if (isNew) {
      router.push(`/admin/orders`);
    } else if (id) {
      orderService
        .getById(id as string)
        .then((order) => {
          reset(order);
          setOrders(order);
        })
        .catch((e) => {
          goBack();
        });
    }
  }, []);

  if (!id || !order) return <Spinner animation="border" />;

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container fluid={"sm"}>
        <Row>
          <section className={styles.orderId}>
          <h3 className={styles.mt_40}>Order</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Comment</th>
                  <th>Order Date</th>
                  <th>Order Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.id}</td>
                  <td>{order.id_user}</td>
                  <td>{order.comment}</td>
                  <td>{new Date(order.create_time * 1000).toLocaleString()}</td>
                  <td>${order.price}</td>
                </tr>
              </tbody>
            </Table>
            <h3 className={styles.mt_40}>Details of Order</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Neme</th>
                  <th>Count</th>
                  <th>Price</th>
                  <th>Price * Count</th>
                  <th>Img</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id_product}</td>
                    <td>{e.name}</td>
                    <td>{e.count}</td>
                    <td>${e.price}</td>
                    <td>${e.price * e.count}</td>
                    <td>
                      <img width="100" src={e.img} alt={e.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.mt_20}>
              <Col xs={12} lg={5}>
                <Select
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  label={"Order Status"}
                  options={[
                    { value: 0, text: "New order" },
                    { value: 1, text: "Done" },
                  ]}
                />
              </Col>
              <Col xs={12} className={styles.mt_20}>
                <Button onClick={goBack}>Back</Button>
                <Button disabled={!isDirty || !isValid} type="submit">
                  {isNew ? "Create" : "Save"}
                </Button>
              </Col>
            </Form>
          </section>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default OrdersItem;