export class Messages {
  constructor(action, message, sessionId) {
    this.action = action;
    this.message = message;
    this.sessionId = sessionId;
  }
}
