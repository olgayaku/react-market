import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import {
  Container,
  Col,
  Row,
  Table,
  Spinner,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';
import { AdminLayout } from '../../../src/components/layout/AdminLayout';
import styles from "../../../styles/AdminPages.module.scss";

import * as Yup from 'yup';
import { userService } from 'src/services/user';
import { IProduct, RoleType, ICategory } from 'src/models';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { TextInput } from 'src/components/form_fields/TextInput';
import { Textarea } from 'src/components/form_fields/Textarea';
import { Select } from 'src/components/form_fields/Select';
import { Checkbox } from 'src/components/form_fields/Checkbox';
import { categoryService } from 'src/services/category';
import { productService } from 'src/services/product';

const initialState: IProduct = {
  name: '',
  description: '',
  price: 0,
  img: '',
  gallery: [],
  categories: [],
};

const ProductItem: NextPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  const { id } = router.query;
  const isNew = id === 'new';

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().min(0).required('Price is required'),
    categories: Yup.array().of(Yup.string()).required('A category is required'),
    gallery: Yup.array(),
    images: Yup.mixed().test('fileFormat', 'Images only', (value) => {
      return (
        !isNew ||
        (value &&
          Array.from(value).every(Boolean) &&
          Array.from(value as FileList).every((e: File) =>
            ['image/jpeg', 'image/png'].includes(e.type)
          ))
      );
    }),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initialState,
  };

  // get functions to build form with useForm() hook
  const {
    handleSubmit,
    setError,
    formState: { isDirty, isValid, errors },
    control,
    reset,
    register,
    watch,
  } = useForm(formOptions);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });
  const watchFieldArray = watch('categories');

  const getCategories = () => {
    categoryService.getAll().then((x) => {
      setCategories(x);
    });
  };

  const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      append(e.target.value);
    } else {
      remove(watchFieldArray.indexOf(e.target.value));
    }
  };

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const onSubmit = (data: IProduct) => {
    if (isNew) {
      productService.create(data).then(({ id }) => {
        router.push(`/admin/products`);
      });
    } else {
      productService.edit(data).then((res) => goBack());
    }
  };

  // hooks
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (isNew) {
      reset(initialState);
      setProduct(initialState);
    } else if (id) {
      productService
        .getById(id as string)
        .then((u) => {
          reset(u);
          setProduct(u);
        })
        .catch((e) => {
          goBack();
        });
    }
  }, []);

  if (!id || !product) return <Spinner animation="border" />;

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container fluid={'sm'}>
        <Row>
          <section className={styles.productImage}>
          <Form onSubmit={handleSubmit(onSubmit)} className={styles.mt_20}>
          <Col xs={12} lg={5}>
            {isNew && (
              <>
              <Form.Label>Images</Form.Label>
                <FormControl
                  {...register('images')}
                  type="file"
                  name="images"
                  accept="image/png, image/jpeg"
                  multiple
                />
              </>
            )}
            {errors.images?.message}
            </Col>
            <Col xs={12} lg={5} className={styles.mt_20}>
            <TextInput
              name="name"
              control={control}
              rules={{ required: true }}
              label={'Name'}
              placeholder={'Enter Name'}
              type="text"
            /> 
            </Col>
            <Col xs={12} lg={5} className={styles.mt_20}>
            <Textarea
              name="description"
              control={control}
              rules={{ required: true }}
              label={'Description'}
              placeholder={'Enter description'}
              rows={5}
            />
            </Col>
            <Col xs={12} lg={5} className={styles.mt_20}>
            <TextInput
              name="price"
              control={control}
              rules={{ required: true }}
              label={'Price'}
              placeholder={'Enter price'}
              type="number"
            />
            </Col>
            <Col xs={12} lg={5} className={styles.mt_20}>
            {categories && (
              <>
                <p>Categories</p>
                {categories.map((e, index) => (
                  <Form.Check
                    key={e.id}
                    id={`category-${e.name}`}
                    label={e.name}
                    value={e.name}
                    checked={watchFieldArray.includes(e.name)}
                    onChange={onCheckBoxChange}
                  />
                ))}
              </>
            )}
            </Col>
            <Col xs={12} className={styles.mt_20}>
            <Button onClick={goBack}>Back</Button>
            <Button
              disabled={!isDirty || !isValid}
              type="submit"
            >
              {isNew ? 'Create' : 'Save'}
            </Button>
            </Col>
          </Form>
          </section>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default ProductItem;
