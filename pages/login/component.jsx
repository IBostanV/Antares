import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { LOGIN_URL } from '../../api/constant';
import validateEmail from '../../utils/validation';
import {authenticate} from "../../api/authentication";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!validateEmail(email)) {
      throw Error('Validation error. Invalid email address');
    }
    authenticate(LOGIN_URL, { email, password }).then(() => router.push('/'));
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
            <input id="email" className="login-input pl-3 w-75" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input id="password" type="password" className="login-input pl-3 w-75" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <Button className="w-75" onClick={onSubmit}>Login</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
