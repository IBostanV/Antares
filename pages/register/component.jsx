import React, {useEffect, useRef} from 'react';
import {Button, Col, Container, Row,} from 'react-bootstrap';
import {useRouter} from 'next/router';
import {authenticate} from '../../api/authentication';
import {REGISTER_URL} from '../../api/constant';
import {toast} from 'react-toastify';
import {InputText} from "primereact/inputtext";
import {useTranslation} from "react-i18next";

function Register({isLoggedIn}) {
  const router = useRouter();
  const {t} = useTranslation();

  const email = useRef();
  const repass = useRef();
  const password = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isLoggedIn]);

  const onSubmit = () => {
    if (password.current.value === repass.current.value) {
      authenticate(REGISTER_URL, {
        email: email.current.value,
        password: password.current.value
      })
        .then((response) => {
          if (response) {
            toast.success('Your account has been successfully created.');
            router.push('/home');
          }
        });
    }
  };

  return (
    <div className="login-form">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center">Register</h2>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <span className="p-float-label">
              <InputText type={'email'} ref={email} className="w-100"/>
              <label>{t('email')}</label>
            </span>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <span className="p-float-label">
              <InputText type={'password'} autocomplete="new-password" ref={password} className="w-100"/>
              <label>{t('password')}</label>
            </span>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <span className="p-float-label">
              <InputText type={'password'} autocomplete="new-password" ref={repass} className="w-100"/>
              <label>{t('repass')}</label>
            </span>
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <Button onClick={onSubmit}>Register</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
