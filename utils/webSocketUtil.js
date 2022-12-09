const WS_HOST_URL = 'ws://localhost:8080/ws/';

export const retrieveSessionId = (clientRef) => clientRef.client.ws._transport.url
  .replace(WS_HOST_URL, '')
  .replace('/websocket', '')
  .replace(/^[0-9]+\//, '');
