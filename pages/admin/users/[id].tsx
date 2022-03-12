import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Spinner,
  Form,
  Button,
} from "react-bootstrap";
import { AdminLayout } from "../../../src/components/layout/AdminLayout";
import styles from "../../../styles/AdminPages.module.scss";

import * as Yup from "yup";
import { userService } from "src/services/user";
import { IUser, RoleType } from "src/models";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/form_fields/TextInput";
import { Select } from "src/components/form_fields/Select";

const initialState: IUser = {
  email: "",
  uid: "",
  name: "",
  surname: "",
  middle_name: null,
  role: RoleType.USER,
};

const UserItem: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const { id } = router.query;
  const isNew = id === "new";

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    uid: Yup.string().required("UID is required"),
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    middle_name: Yup.string().nullable(),
    role: Yup.string()
      .oneOf(Object.values(RoleType))
      .required("Role is required"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initialState,
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

  const onSubmit = (data: IUser) => {
    if (isNew) {
      userService.create(data).then(({ id }) => {
        router.push(`/admin/users/${id}`);
      });
    } else {
      userService.edit(data).then((res) => goBack());
    }
  };

  // hooks
  useEffect(() => {
    if (isNew) {
      reset(initialState);
      setUser(initialState);
    } else if (id) {
      userService
        .getById(id as string)
        .then((u) => {
          reset(u);
          setUser(u);
        })
        .catch((e) => {
          goBack();
        });
    }
  }, []);

  if (!id || !user) return <Spinner animation="border" />;

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container fluid={"sm"}>
        <Row>
          <section className={styles.userId}>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.mt_20}>
              <Col xs={12} lg={5}>
                <TextInput
                className="uID"
                  name="uid"
                  control={control}
                  rules={{ required: true }}
                  label={"Uid:"}
                  readOnly={!isNew}
                  type="text"
                />
              </Col>
              <Col lg={5} xs={12}>
                <TextInput
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  label={"Email"}
                  placeholder={"Enter email"}
                  // type="email"
                  type="text"
                />
              </Col>
              <Col lg={5} xs={12}>
                <TextInput
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  label={"Name"}
                  placeholder={"Enter Name"}
                  type="text"
                />
              </Col>
              <Col lg={5} xs={12}>
                <TextInput
                  name="surname"
                  control={control}
                  rules={{ required: true }}
                  label={"Surname"}
                  placeholder={"Enter Surname"}
                  type="text"
                />
              </Col>
              <Col lg={5} xs={12}>
                <TextInput
                  name="middle_name"
                  control={control}
                  rules={{ required: true }}
                  label={"Middle Name"}
                  placeholder={"Enter Middle Name"}
                  type="text"
                />
              </Col>
              <Col lg={5} xs={12}>
                <Select
                  className={styles.role}
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  label={"Role"}
                  options={[
                    { value: RoleType.USER, text: RoleType.USER },
                    { value: RoleType.ADMIN, text: RoleType.ADMIN },
                  ]}
                />
              </Col>
              <Col xs={12}>
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

export default UserItem;
