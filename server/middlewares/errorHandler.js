module.exports = (error, request, response, next) => {
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
            break;

        case "SequelizeValidationError":
            status = 400;
            message = error.errors[0].message;
            break;
    }
    response.status(status).json({message})
}
