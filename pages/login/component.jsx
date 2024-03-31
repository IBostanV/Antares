import React, {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {Button, Col, Container, Row,} from 'react-bootstrap';
import {LOGIN_URL} from '../../api/constant';
import validateEmail from '../../utils/validation';
import {authenticate} from '../../api/authentication';
import {toast} from 'react-toastify';
import {InputText} from "primereact/inputtext";
import {useTranslation} from "react-i18next";

function Login({isLoggedIn}) {
  const router = useRouter();
  const {t} = useTranslation();

  const email = useRef();
  const password = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        login();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [email, password]);

  const login = () => {
    if (!validateEmail(email.current.value)) {
      toast.error('Invalid email address');
    } else {
      authenticate(LOGIN_URL, {
        email: email.current.value,
        password: password.current.value
      })
          .then((account) => {
            if (account) {
              localStorage.setItem('langCode', account.data.language.langCode);
              localStorage.setItem('langId', parseInt(account.data.language.langId));

              router.push('/').then(() => null);
            }
          });
    }
  };

  return (
    <div className="login-form">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center">Login</h2>
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
              <InputText type={'password'} ref={password} className="w-100"/>
              <label>{t('password')}</label>
            </span>
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <Button onClick={login}>Login</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
