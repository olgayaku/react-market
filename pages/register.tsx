import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../src/components/blocks/Header';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from '../src/components/elements/Button';
import { Page } from '../src/components/layout/Page';
import cls from 'classnames';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { firebase } from 'src/services/firebase';
import { userService } from '../src/services/user';
import { TextInput } from 'src/components/form_fields/TextInput';

import styles from '../styles/Login.module.scss';
import { UserCredential } from 'firebase/auth';
import { IUser, RoleType } from 'src/models';

const Register: NextPage = () => {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, setError, formState, control } = useForm(formOptions);

  const onSubmit = ({
    name,
    surname,
    email,
    password,
  }: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    return firebase
      .createWithEmail(email, password)
      .then((userCredential: UserCredential) => {
        const { uid } = userCredential.user;
        return { email, uid, name, surname, role: RoleType.USER };
      })
      .then((user) => {
        userService
          .register(user)
          .then(() => {
            // get return url from query parameters or default to '/'
            // TODO string[] || string
            const returnUrl = router.query.returnUrl || '/cabinet';
            router.push(returnUrl as string);
          })
          .catch((error) => {
            setError('apiError', { message: error.message || error });
          });
      });
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page img={'./assets/contact-banner.jpg'} title="Register">
        <section className={cls(styles.root, styles.pt_100)}>
          <Container>
            <div className={styles.wrapper}>
              <h2 className="text-center text-uppercase">Create account</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  className={styles.form_control}
                  label={'Name'}
                  placeholder={'Enter your name'}
                  type="text"
                />
                <TextInput
                  name="surname"
                  control={control}
                  rules={{ required: true }}
                  className={styles.form_control}
                  label={'Surname'}
                  placeholder={'Enter your surname'}
                  type="text"
                />
                <TextInput
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  className={styles.form_control}
                  label={'Email address'}
                  placeholder={'Enter your email'}
                  // type="email"
                  type="text"
                />
                <TextInput
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  className={styles.form_control}
                  label={'Password'}
                  placeholder={'Enter your password'}
                  type="password"
                />

                <div className={styles.login_btn_g}>
                  <Row>
                    <Col xs={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Remember Me"
                          className={styles.checkbox}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Button
                        text="Sign up"
                        type="color"
                        className={styles.btn}
                      />
                    </Col>
                  </Row>
                </div>
                <div className={cls(styles.new_account, 'text-center')}>
                  <span>Already have an account with us </span>
                  <Link href="/login">
                    <a id="Login Account" className={styles.link}>
                      {' '}
                      Login Here
                    </a>
                  </Link>
                </div>
              </Form>
            </div>
          </Container>
        </section>
      </Page>
    </div>
  );
};

export default Register;
