import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Spinner, Form, Button } from "react-bootstrap";
import { AdminLayout } from "../../../src/components/layout/AdminLayout";
import styles from "../../../styles/AdminPages.module.scss";

import * as Yup from "yup";
import { ICategory } from "src/models";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/form_fields/TextInput";
import { categoryService } from "src/services/category";

const initialState: ICategory = {
  name: "",
};

const CategoryItem: NextPage = () => {
  const router = useRouter();
  const [category, setCategory] = useState<ICategory | null>(null);
  const { id } = router.query;
  const isNew = id === "new";

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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

  const onSubmit = (data: ICategory) => {
    if (isNew) {
      categoryService.create(data).then(() => {
        router.push(`/admin/categories`);
      });
    } else {
      categoryService.edit(data).then((res) => goBack());
    }
  };

  // hooks
  useEffect(() => {
    if (isNew) {
      reset(initialState);
      setCategory(initialState);
    } else if (id) {
      categoryService
        .getById(id as string)
        .then((u) => {
          reset(u);
          setCategory(u);
        })
        .catch((e) => {
          goBack();
        });
    }
  }, []);

  if (!id || !category) return <Spinner animation="border" />;

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container fluid={"sm"}>
        <Row>
          <section className={styles.productCategorie}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} lg={5} className={styles.mt_20}>
              <TextInput
                name="name"
                control={control}
                rules={{ required: true }}
                label={"Name categorie"}
                placeholder={"Enter Name"}
                type="text"
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

export default CategoryItem;
