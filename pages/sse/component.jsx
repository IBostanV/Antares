import React, { useEffect, useState } from 'react';

function ServerSentEventsClient() {
  const [resultData, setResultData] = useState('');

  useEffect(() => {
    let eventSource = null;
    eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BE_HOST_URL}/sse`); // eslint-disable-line

    eventSource.addEventListener('StringList', (event) => {
      setResultData(event.data);
    });

    eventSource.onerror = (event) => {
      if (event.target.readyState === EventSource.CLOSED) { // eslint-disable-line
        console.log(`SSE closed (${event.target.readyState})`);
      }
      eventSource.close();
    };

    eventSource.onopen = () => {
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
}

export default ServerSentEventsClient;
