import {ToastContainer, toast} from 'react-toastify';

function ErrorHandler(error) {
    let {status, data} = error.response
    let message = ""
    if (status === 400) {
        message = data.message
    } else if (status === 401) {
        message = data.message
    } else if (status === 404) {
        message = data.message
    } else {
        message = data.message
    }

    let notify = () => toast(message);
    notify()
    console.log(error, 'ini error handler')
}

export default ErrorHandler
