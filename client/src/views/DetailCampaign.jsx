import Carousel from 'react-bootstrap/Carousel';
import {setDetailCampaign} from "../features/campaign/campaignSlice";
import {useSelector} from "react-redux";
import {useFetch} from "../hooks/useFetch.js";
import {useNavigate, useParams} from "react-router-dom";
import Axios from "../helpers/axios.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import {useState} from "react";
import {setUser} from "../features/campaign/userSlice.js";
import {toast} from "react-toastify";


function ListCampaign() {
    const navigate = useNavigate()
    const {id} = useParams()
    const campaign = useSelector((state) => state.campaign.detail)
    let [total, setTotal] = useState("")

    let refetchUserInformation = useFetch({
        url: "/user-information",
        setter: setUser,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })


    useFetch({
        url: `/campaigns/${id}`,
        setter: setDetailCampaign,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })

    const handlerSubmitDonasi = async (event) => {
        event.preventDefault()
        try {
            let {data} = await Axios({
                method: 'post',
                url: `/campaigns/${id}/transaction`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {total}
            })
            setTotal("")
            refetchUserInformation()

            let notify = () => toast("Donasi Berhasil");
            notify()
            navigate('/')

        } catch (error) {
            ErrorHandler(error)
        }
    }

    const handlerChange = (e) => {
        setTotal(e.target.value)
    }


    return (
        <>
            <div className="container">
                <div id="container-detail-vendor">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">

                            <div className="card card-custom">
                                <form method="post" onSubmit={handlerSubmitDonasi}>
                                    {/*style="border-radius: 5px;"*/}
                                    <div className="card-body" id="detail-vendor">
                                        <div className="card-title center">
                                            <Carousel data-bs-theme="dark" fade>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        src={campaign.image_1}
                                                        style={{"height": "400px"}}
                                                        alt="First slide"
                                                    />
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        style={{"height": "400px"}}
                                                        src={campaign.image_2}
                                                        alt="Second slide"
                                                    />
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        style={{"height": "400px"}}
                                                        src={campaign.image_3}
                                                        alt="Third slide"
                                                    />
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                        <h5 className="card-subtitle mb-2 text-muted">
                                            {campaign.title}
                                        </h5>

                                        <p style={{"white-space": "pre-line"}}>
                                            {campaign.description}
                                        </p>


                                        {/*style="margin-top: 20px;"*/}
                                        <div className="form-group">
                                            <label>Jumlah Donasi</label>
                                            <input type="text" name="total" value={total} onChange={handlerChange}
                                                   className="form-control"
                                                   id="input-transaction"
                                                   placeholder=""/>
                                        </div>
                                        <div className="form-group row mt-2">
                                            <div className="col-sm-12">
                                                <input type="submit" className="btn btn-primary floatRight"
                                                       value="Donasi sekarang"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ListCampaign
