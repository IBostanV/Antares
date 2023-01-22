import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { fetchMessages } from '../../api/message';

function Message({ hostUrl }) {
  const [input, setInput] = useState('');
  const [receiver, setReceiver] = useState('');
  const [clientRef, setClientRef] = useState({});
  const [messages, setMessages] = useState([]);

  const sendPrivateMessage = () => {
    clientRef.sendMessage('/api/app/private', JSON.stringify({ content: input, destination: receiver }));
    setInput('');
  };

  const sendPublicMessage = () => {
    clientRef.sendMessage('/api/app/public', JSON.stringify({ content: input, destination: 'news' }));
    setInput('');
  };

  const history = () => {
    const fetchData = async () => {
      const response = await fetchMessages('/api/message', 'news');
      if (response) setMessages(response);
    };
    fetchData();
  }

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
        messages.map((item) => (
          <div key={item.message}>
            <p>
              {item.createdDate + ' ' + item.source + ' ' + item.content}
            </p>
          </div>
        ))
      }

      <SockJsClient
        url={`${hostUrl}/api/pq`}
        topics={['/user/solo', '/party/news']}
        onConnect={() => history()}
        onMessage={(msg) => setMessages((msgs) => [...msgs, msg])}
        ref={(client) => setClientRef(client)}
      />
    </>
  );
}

Message.propTypes = {
  hostUrl: PropTypes.string,
};

export default Message;
