const errorHandler = (res, error, next) => {
    let status = error.status || 500;
    let message = error.message || "Internal server error";

    switch (error.name) {
        case "NotFound":
            status = 404;
            message = "Data not found";
            break;

        case "InvalidToken":
            status = 401;
            message = "Invalid token";

        case "Unauthorized":
            status = 401;
            message = "Invalid email or password"
        default:
            break;
    }
}

module.exports = {errorHandler};