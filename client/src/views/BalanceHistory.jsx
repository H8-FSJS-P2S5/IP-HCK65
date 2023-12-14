import {setListBalanceHistory} from "../features/campaign/balanceHistorySlice";
import {setUser} from "../features/campaign/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../hooks/useFetch";
import Axios from "../helpers/axios";
import ErrorHandler from "../helpers/ErrorHandler.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


function BalanceHistory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listBalanceHistory = useSelector((state) => state.balanceHistory.list)
    const user = useSelector((state) => state.user.user)

    let [balance, setBalance] = useState("");

    let refetchBalanceHistory = useFetch({
        url: "/balance-histories",
        setter: setListBalanceHistory,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })

    let refetchUserInformation = useFetch({
        url: "/user-information",
        setter: setUser,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })

    const handlerSubmitDeposit = async (event) => {
        event.preventDefault()
        try {
            let amount = balance

            const response = await Axios({
                url: "/invoice",
                method: 'POST',
                data: {amount},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const {data} = response;
            if (response.status >= 200 && response.status <= 299) {
                window.location.href = data.invoiceUrl
            }

            // let {data} = await Axios({
            //     method: 'post',
            //     url: `/balance-histories/`,
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('access_token')}`
            //     },
            //     data: {balance}
            // })
            // setBalance("")
            // refetchBalanceHistory()
            // refetchUserInformation()
        } catch (error) {
            ErrorHandler(error)
        }
    }



    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        date = date.toLocaleString("id-ID", options);
        console.log(date)

        return date;
    }

    const handlerChange = (e) => {
        setBalance(e.target.value)
    }
    return (
        <>
            <div className="container">
                <div id="container-deposit">
                    <div className="col-lg-4 offset-lg-4 card card-form-input">
                        <form onSubmit={handlerSubmitDeposit}>
                            <div className="form-group">
                                <label htmlFor="input-balance">Jumlah Deposit</label>
                                <input type="text" className="form-control" name="balance" value={balance}
                                       onChange={handlerChange}
                                       id="input-balance"
                                       placeholder=""/>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input type="submit" value="Deposit" className="btn btn-primary floatRight mt-2"/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div style={{"fontSize": "17px"}}>
                        Total Balance: <b>{user.balance}</b>
                    </div>

                    <table className="table table-bordered" style={{"marginTop": "20px"}}>
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Total</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
                        </tr>
                        </thead>
                        <tbody id="historySaldo">
                        {listBalanceHistory.map(item => (
                            <tr className={`table-${(item.transaction_type === 1) ? "success" : "danger"}`} key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.total}</td>
                                <td>{(item.transaction_type === 1) ? "Deposit Saldo" : "Donasi"}</td>
                                <td>{formatDate(item.createdAt)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

export default BalanceHistory
