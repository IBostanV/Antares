import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function Message({ hostUrl }) {
  const [input, setInput] = useState('');
  const [clientRef, setClientRef] = useState({});
  const [response, setResponse] = useState([]);

  const sendMessage = () => {
    clientRef.sendMessage('/api/pq/message', JSON.stringify(input));
    setInput('');
  };

  return (
    <>
      <span>Message: </span>
      <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      <Button onClick={() => sendMessage()}>Push</Button>
      <hr />
      {
        response.map((item) => (
          <div key={item.message}>
            <pre>
              {item.createDate} {item.user}: {item.content}
            </pre>
          </div>
        ))
      }

      <SockJsClient
        url={`${hostUrl}/api/pq`}
        topics={['/topic/private']}
        onMessage={(msg) => setResponse((msgs) => [...msgs, msg])}
        ref={(client) => setClientRef(client)}
      />
    </>
  );
}

Message.propTypes = {
  hostUrl: PropTypes.string,
};

export default Message;
