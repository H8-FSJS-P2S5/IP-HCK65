import axios from "axios";

function Checkout() {


    const checkout = async () => {
        let invoiceUrl, invoiceData
        try {
            const currency = "IDR"
            const amount = 50_000_000

            const invoiceData = {
                currency,
                amount,
                redirect_url: `${window.location.origin}/try-checkout`
            };

            const response = await axios({
                url: "http://localhost:3000/api/invoice",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(invoiceData)
            });

            const {data} = response;
            if (response.status >= 200 && response.status <= 299) {
                invoiceUrl = data.invoice_url;
                window.location.href = invoiceUrl
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert(error);
        }
    }


    return (
        <>
            <button onClick={checkout}>testing</button>
            ini halaman checkout
        </>
    )
}


export default Checkout