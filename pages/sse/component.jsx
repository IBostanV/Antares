import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function Message({ hostUrl }) {
  const [input, setInput] = useState('');
  const [receiver, setReceiver] = useState('');
  const [clientRef, setClientRef] = useState({});
  const [response, setResponse] = useState([]);

  const sendPrivateMessage = () => {
    clientRef.sendMessage('/api/app/private', JSON.stringify({content: input, to: receiver}));
    setInput('');
  };

  const sendPublicMessage = () => {
    clientRef.sendMessage('/api/app/public', JSON.stringify(input));
    setInput('');
  };

  return (
    <>
      <div>
        <span>Receiver: </span>
        <input type="text" value={receiver} onChange={(event) => setReceiver(event.target.value)} />
      </div>
      <div>
      <span>Message: </span>
      <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      </div>
      <Button onClick={() => sendPrivateMessage()}>Send private</Button>
      <Button onClick={() => sendPublicMessage()}>Send public</Button>
      <hr />
      {
        response.map((item) => (
          <div key={item.message}>
            <pre>
              {item.createDate} {item.from}: {item.content}
            </pre>
          </div>
        ))
      }

      <SockJsClient
        url={`${hostUrl}/api/pq`}
        topics={['/user/solo', '/party/news']}
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
