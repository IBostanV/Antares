import React, { useRef, useState } from 'react';
import SockJsClient from 'react-stomp';
import { Button, Col, Dropdown, Form } from 'react-bootstrap';
import { retrieveSessionId } from '../utils/webSocketUtil';
import { Messages } from '../models/Messages';
import { PRINT, PROCESS } from '../utils/constants';

const Chat = ({ hostUrl }) => {
  let clientRef = useRef({});

  const [action, setAction] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [receivedPayload, setReceivedPayload] = useState({});

  const sendMessage = () => {
    const message = new Messages(action, sentMessage, retrieveSessionId(clientRef));
    clientRef.sendMessage('/antares/public', JSON.stringify(message));
  };

  const handleMessage = (payload) => {
    switch (payload.action) {
      case PRINT:
        setReceivedMessage(payload.message);
        break;
      case PROCESS:
        setReceivedPayload(payload);
        break;
      default:
        console.log(payload);
    }
  };

  return (
    <>
      <Form>
        <Form.Row>
          <Col xs={1}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="actions-dropdown">
                {action || 'ACTION'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setAction('PRINT')}>PRINT</Dropdown.Item>
                <Dropdown.Item onClick={() => setAction('PROCESS')}>PROCESS</Dropdown.Item>
                <Dropdown.Item onClick={() => setAction('DISPATCH')}>DISPATCH</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              placeholder="Type your text"
              onChange={event => setSentMessage(event.target.value)}
            />
          </Col>
          <Col xd={2}>
            <Button onClick={sendMessage}>Send</Button>
          </Col>
        </Form.Row>
      </Form>
      <div>
        <span>
          PRINT Action :
        </span>
        {JSON.stringify(receivedMessage)}
        <br/>
        <span>
          PROCESS Action :
        </span>
        {JSON.stringify(receivedPayload)}
      </div>
      <SockJsClient
        url={`${hostUrl}/ws`}
        onMessage={handleMessage}
        topics={['/user/topic/private']}
        ref={(client) => clientRef = client}/>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props:
      {
        hostUrl: process.env.BE_HOST_URL,
      }
  };
};

export default Chat;
