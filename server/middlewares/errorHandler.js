module.exports = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error"

    switch (err.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            status = err.status || 400
            message = err.errors.map(error => error.message)
            break;

        case "Validation":
            status = err.status || 400
            message = err.message || ["Validation error"]
            break;

        case "JsonWebTokenError":
        case "InvalidToken":
            if(err.message === "jwt malformed"){
                err.message = "Unauthorized"
            }
            status = err.status || 401
            message = err.message || "Invalid Token"
            break;


        case "Forbidden":
            status = err.status || 403
            message = err.message || "Forbidden"
            break;

        case "NotFound":
            status = err.status || 404
            message = err.message || "error not found"
            break;

    }

    return res.status(status).json({message})
};