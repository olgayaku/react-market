import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, ChangeEventHandler } from 'react';
import { Container, Row, Spinner, Form, Button } from 'react-bootstrap';
import { AdminLayout } from '../../src/components/layout/AdminLayout';

import * as Yup from 'yup';
import { ICategory } from 'src/models';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { categoryService } from 'src/services/category';
import { TextInput } from 'src/components/form_fields/TextInput';
import { productService } from 'src/services/product';

const initialState = {
  name: '123',
  description: '123',
  price: 123,
};

const Test: NextPage = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    images: Yup.mixed()
      .required('A file is required')
      .test('fileFormat', 'Images only', (value) => {
        return (
          Array.from(value).every(Boolean) &&
          Array.from(value as FileList).every((e: File) =>
            ['image/jpeg', 'image/png'].includes(e.type)
          )
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
    setValue,
    setError,
    formState: { isDirty, isValid, errors },
    control,
    reset,
    register,
  } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log('data :>> ', data);
    productService.create(data).then((e) => console.log('e :>> ', e));
  };

  // only show nav when logged in
  return (
    <AdminLayout>
      <Container fluid={'sm'}>
        <Row>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="name"
              control={control}
              rules={{ required: true }}
              label={'Name'}
              placeholder={'Enter Name'}
              type="text"
            />
            <TextInput
              name="description"
              control={control}
              rules={{ required: true }}
              label={'description'}
              placeholder={'Enter description'}
              type="text"
            />
            <TextInput
              name="price"
              control={control}
              rules={{ required: true }}
              label={'price'}
              placeholder={'Enter price'}
              type="number"
            />
            images
            <input
              {...register('images')}
              type="file"
              name="images"
              multiple
              accept="image/png, image/jpeg"
            />
            {errors.images?.message}
            <br />
            <br />
            <Button disabled={!isDirty || !isValid} type="submit">
              Create
            </Button>
          </Form>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Test;
