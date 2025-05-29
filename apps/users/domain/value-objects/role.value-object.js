const { ValueObject } = require("../../../../core/domain/value-object.core");

class Role extends ValueObject {
  constructor({ id, props }) {
    super(props);
    this._id = id || null;
    this.props = props;
  }

  id() {
    return this._id;
  }

  name() {
    return this.props.name;
  }
}

module.exports = { Role };
