import React, { useEffect, useState } from 'react';

const ServerSentEventsClient = ({ hostUrl }) => {
  const [resultData, setResultData] = useState('');

  useEffect(() => {
    let eventSource = null;
    eventSource = new EventSource(`${hostUrl}/sse`);

    eventSource.addEventListener('StringList', (event) => {
      setResultData(event.data);
    });

    eventSource.onerror = (event) => {
      console.log(event.target.readyState);
      if (event.target.readyState === EventSource.CLOSED) {
        console.log('SSE closed (' + event.target.readyState + ')');
      }
      eventSource.close();
    };

    eventSource.onopen = (event) => {
      console.log('connection opened');
    };
    return () => {
      eventSource.close();
      console.log('event closed');
    };

  }, []);

  return (
    <div>
      {resultData}
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props:
      {
        hostUrl: process.env.BE_HOST_URL
      }
  };
};

export default ServerSentEventsClient;
