const { ExceptionCore } = require("./exception.core");
const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("./exception.code");

class NotFoundException extends ExceptionCore {
  code = NOT_FOUND;
  constructor(message, isOperational = true, stack = "") {
    super(404, message, isOperational, stack);
  }
}

class BadRequestException extends ExceptionCore {
  constructor(message, isOperational = true, stack = "") {
    super(400, message, isOperational, stack);
  }
}

class UnauthorizedException extends ExceptionCore {
  code = UNAUTHORIZED;
  constructor(message, isOperational = true, stack = "") {
    super(403, message, isOperational, stack);
  }
}

class ForbiddenException extends ExceptionCore {
  code = FORBIDDEN;
  constructor(message, isOperational = true, stack = "") {
    super(403, message, isOperational, stack);
  }
}

class InternalServerErrorException extends ExceptionCore {
  code = INTERNAL_SERVER_ERROR;
  constructor(message, isOperational = true, stack = "") {
    super(500, message, isOperational, stack);
  }
}

class ConflictException extends ExceptionCore {
  code = CONFLICT;
  constructor(message, isOperational = true, stack = "") {
    super(409, message, isOperational, stack);
  }
}

class UnprocessedEntityException extends ExceptionCore {
  code = UNPROCESSED_ENTITY;
  constructor(message, isOperational = true, stack = "") {
    super(422, message, isOperational, stack);
  }
}

module.exports = {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
  UnprocessedEntityException,
};
