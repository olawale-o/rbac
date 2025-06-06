class IdRepresentation {
  constructor(id) {
    this.id = id;
  }
}

class ResponseCore extends IdRepresentation {
  constructor(props) {
    super(props.id);
    this.createdAt = new Date(props.createdAt).toISOString();
    this.updatedAt = new Date(props.updatedAt).toISOString();
  }
}

module.exports = { ResponseCore };
