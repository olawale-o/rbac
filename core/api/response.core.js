class IdResponse {
  constructor(id) {
    this.id = id;
  }
}

class MessageResponse extends IdResponse {
  constructor({ id, message }) {
    super(id);
    this.message = message;
  }
}

class ResponseCore extends IdResponse {
  constructor(props) {
    super(props.id);
    this.createdAt = new Date(props.createdAt).toISOString();
    this.updatedAt = new Date(props.updatedAt).toISOString();
  }
}

module.exports = { ResponseCore, IdResponse, MessageResponse };
