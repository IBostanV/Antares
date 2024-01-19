import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { Badge, Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import fetchMessages from '../../api/message';

function Message({ hostUrl }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientRef, setClientRef] = useState({});
  const [receiver, setReceiver] = useState('');
  const [loaded, setLoaded] = useState(false);

  const onMessage = (message) => setMessages((messages) => [...messages, message]);

  const sendPrivateMessage = () => {
    clientRef.sendMessage('/api/app/private', JSON.stringify({
      content: input,
      destination: receiver
    }));
    setInput('');
  };

  const sendPublicMessage = () => {
    clientRef.sendMessage('/api/app/public', JSON.stringify({
      content: input,
      destination: 'news'
    }));
    setInput('');
  };

  const history = () => {
    const fetchData = async () => await fetchMessages('/api/message', 'news');
    fetchData()
      .then(response => {
        setLoaded(true);
        if (response) setMessages(response);
      });
  };

  return (
    <>
      {messages?.map((message) => (
        <div key={message.message} className="m-3">
          <h6 className="m-0">
            {message.source}
            <Badge>{message.createdDate}</Badge>
          </h6>
          <h5>{message.content}</h5>
        </div>
      ))}

      {loaded && (
        <div>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text>Receiver</InputGroup.Text>
            <Form.Control
              type="text"
              value={receiver}
              aria-label="Receiver"
              placeholder="Receiver"
              aria-describedby="receiver"
              onChange={(event) => setReceiver(event.target.value)}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text>Message</InputGroup.Text>
            <Form.Control
              id="message"
              as="textarea"
              value={input}
              aria-label="Message"
              placeholder="Message"
              onChange={(event) => setInput(event.target.value)}/>
          </InputGroup>

          <ButtonGroup aria-label="Send message" className="mb-3">
            <Button variant="outline-info" onClick={() => sendPrivateMessage()}>Send
              private</Button>
            <Button variant="outline-light" onClick={() => sendPublicMessage()}>Send public</Button>
          </ButtonGroup>
        </div>
      )}

      <SockJsClient
        ref={setClientRef}
        onConnect={history}
        onMessage={onMessage}
        url={`${hostUrl}/api/pq`}
        topics={['/user/solo', '/party/news']}
      />
    </>
  );
}

Message.propTypes = {
  hostUrl: PropTypes.string,
};

export default Message;
