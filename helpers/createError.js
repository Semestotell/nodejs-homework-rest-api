const messagesStatus = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
  500: "Server error",
};
const createError = (status, message = messagesStatus[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
