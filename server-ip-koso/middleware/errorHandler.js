module.exports = (error, req, res, next) => {
  console.log(
    error.name,
    error.message,
    "ErrorHandler",
    "HEHEHEHHEHEHEHEHEHEEHHEHEHEEHEHEHEHEHE"
  );

  let status = error.status || 500;
  let message = error.message || "Internal server error";

  switch (error.name) {
    case "InvalidInput":
      (status = 400), (message = "username / email / password is required");
      break;
    case "BadInput":
      (status = 401), (message = "wrong email/ username/ password");
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      let errorMsg = [];
      errorMsg = error.errors.map((el) => {
        return el.message;
      });
      if (errorMsg.length === 1) {
        message = errorMsg[0];
      } else {
        message = errorMsg;
      }
      status = 400;
      break;
    case "badRequest":
      (status = 400), (message = "data is required");
      break;
    case "SequelizeForeignKeyConstraintError":
      (status = 400),
        (message =
          "failed to update lodging because lodging type is not found");
      break;
    case "notFound":
      (status = 404), (message = "Data not found");
      break;
    case "notFoundLodging":
      (status = 404), (message = "Lodging not found");
      break;
    case "notFoundType":
      (status = 404), (message = "Lodging's type not found");
      break;
    case "TokenNotFound":
      (status = 401), (message = "Unauthorized Access, must log in first");
      break;
    case "JsonWebTokenError":
    case "InvalidToken":
      (status = 400), (message = "Invalid Token");
      break;
    case "Forbidden":
      (status = 403), (message = "Forbidden, you are not authorized");
      break;
  }

  res.status(status).json({ message });
  // res.status(status).json({ message, source: "Error Handler" });
};
