class Entity {
  constructor({ id, createdAt, updatedAt, props }) {
    const now = new Date();
    this._id = id;
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}

module.exports = { Entity };
