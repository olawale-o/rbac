const {
  ExceptionCore,
} = require("../../../libraries/exception/exception.core");

class AuthException extends ExceptionCore {
  message = "Invalid login credentials.";
  code = "AUTH.INVALID_LOGIN_CREDENTIALS";
  statusCode = 401;

  constructor(statusCode, message, isOperational = true, stack = "") {
    super(statusCode, message, isOperational, stack);
  }
}

class InvalidEmailCredentialsException extends ExceptionCore {
  message = "Invalid email credentials.";
  code = "AUTH.INVALID_EMAIL_CREDENTIALS";

  constructor(statusCode, message, isOperational = true, stack = "") {
    super(statusCode, message, isOperational, stack);
  }
}

class InvalidPasswordException extends ExceptionCore {
  message = "Invalid password.";
  code = "AUTH.INVALID_PASSWORD";

  constructor(statusCode, message, isOperational = true, stack = "") {
    super(statusCode, message, isOperational, stack);
  }
}

module.exports = {
  AuthException,
  InvalidEmailCredentialsException,
  InvalidPasswordException,
};
