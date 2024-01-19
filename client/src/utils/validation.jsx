import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export const validation = (error) => {
    console.log(error, "{}{{}");
    let { status, data } = error.response;
    let notify;

    if (status === 400) {
        // console.log("masuk");
        notify = () => toast(data.message);
    } else if (status === 401) {
        notify = () => toast("Invalid email/password")
    }

    notify()
}