import React, { useRef } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { authenticate } from '../../api/authentication';
import { REGISTER_URL } from '../../api/constant';

function Register() {
  const router = useRouter();

  const email = useRef();
  const repass = useRef();
  const password = useRef();

  const onSubmit = () => {
    if (password.current.value === repass.current.value) {
      authenticate(REGISTER_URL, {
        email: email.current.value,
        password: password.current.value
      })
        .then((response) => {
          if (response) router.push('/');
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
        <Row className="mt-3">
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                id="repass"
                ref={repass}
                type="password"
              />
            </InputGroup>
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
