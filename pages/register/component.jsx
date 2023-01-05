import React, { useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { authenticate, REGISTER_URL } from '../../api/authentication';

function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [repass, setRepass] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (password === repass) {
      authenticate(REGISTER_URL, { email, password }).then(() => router.push('/'));
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
            <input id="email" className="login-input pl-3 w-75" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input id="password" type="password" className="login-input pl-3 w-75" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input id="repass" type="password" className="login-input pl-3 w-75" placeholder="Confirm password" onChange={(e) => { setRepass(e.target.value); }} />
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <Button className="w-75" onClick={onSubmit}>Register</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
