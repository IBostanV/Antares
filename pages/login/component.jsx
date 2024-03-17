import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Col, Container, Form, InputGroup, Row, } from 'react-bootstrap';
import { LOGIN_URL } from '../../api/constant';
import validateEmail from '../../utils/validation';
import { authenticate } from '../../api/authentication';
import { toast } from 'react-toastify';

function Login({isLoggedIn}) {
  const router = useRouter();

  const email = useRef();
  const password = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
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
        .then((response) => response && router.push('/'));
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
        <Row className="mt-4">
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Email</InputGroup.Text>
              <Form.Control
                id="email"
                ref={email}
                type="email"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                id="password"
                ref={password}
                type="password"
              />
            </InputGroup>
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
