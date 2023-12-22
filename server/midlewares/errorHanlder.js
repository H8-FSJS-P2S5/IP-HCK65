module.exports = (error, req, res, next) => {
    let status;
    let message;
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = error.errors.map(el => {
                return el.message
            })
            break;

        case 'EmailorPasswordRequired':
            status = 400
            message = 'Email and Password is Required'
            break;

        case 'NotFound':
            status = 404
            message = 'Not Found'
            break;

        case 'InvalidToken':
        case 'JsonWebTokenError':
            status = 401
            message = 'Unauthorized'
            break;

        case 'Forbidden':
            status = 403
            message = 'Forbidden Access'
            break;

        case 'InvalidAccount':
            status = 401
            message = 'Invalid Email or Password'
            break;

        default:
            status = 500
            message = 'Internal server error'
            break;
    }
    res.status(status).json({ message })

    // console.log(message, '<<<<<<<<<<<<<<<');
}