import Carousel from 'react-bootstrap/Carousel';
import {setListCampaign} from "../features/campaign/campaignSlice";
import {useSelector} from "react-redux";
import {useFetch} from "../hooks/useFetch.js";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import ErrorHandler from "../helpers/ErrorHandler.js";
import Axios from "../helpers/axios.js";


function CMSListCampaign() {
    const listCampaigns = useSelector((state) => state.campaign.list)

    let refetchCampaigns = useFetch({
        url: "/campaigns",
        setter: setListCampaign,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })

    const deleteCampaign = async (id) => {
        try {
            let response = await Axios({
                method: 'delete',
                url: `/campaigns/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            refetchCampaigns()
            let notify = () => toast(response.data.message);
            notify()
        } catch (error) {
            ErrorHandler(error)
        }
    }


    return (
        <>
            <div className="container">
                <div id="container-history-pembelian">
                    <div className="col-lg-12 mb-5">
                        <div className="text-history mt-5">
                            <h3>
                                <u>
                                    List Campaign
                                </u>
                            </h3>
                        </div>


                        {listCampaigns.map(item => (
                            <div id="historyPembelian" key={item.id}>
                                <div className="riwayat">
                                    <div className="side-bar-history row">
                                        <div className="col-lg-7 col-md-12 col-sm-12">
                                            <Carousel data-bs-theme="dark" fade>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        src={item.image_1}
                                                        style={{"height": "400px"}}
                                                        alt="First slide"
                                                    />
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        style={{"height": "400px"}}
                                                        src={item.image_2}
                                                        alt="Second slide"
                                                    />
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        style={{"height": "400px"}}
                                                        src={item.image_3}
                                                        alt="Third slide"
                                                    />
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                        <div
                                            className="col-lg-5 col-md-12 col-sm-12 d-flex flex-column justify-content-between">
                                            <div className="side-right">
                                                <h3>{item.title}</h3>
                                                <p style={{"whiteSpace": "pre-line"}}>
                                                    {(item.description.length > 250) ? item.description.substring(0, 250) + "..." : item.description}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="progress w-95 mb-2" id="progressBar">
                                                    <div className="progress-bar" role="progressbar"
                                                         style={{"width": `${((item.total_fundraising - item.remaining_balance) / item.total_fundraising) * 100}%`}}
                                                         aria-valuenow="15"
                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>
                                                    Sudah Terkumpul&nbsp;
                                                    <span
                                                        className="color-blue-theme fw-bold">{item.total_fundraising - item.remaining_balance}</span>
                                                </span>
                                                <div>
                                                    {
                                                        item.remaining_balance === item.total_fundraising &&
                                                        <Link to={`/cms/campaigns/${item.id}`}>
                                                            <button type="button"
                                                                    className="btn btn-primary w-100 mt-2">
                                                                Edit
                                                            </button>
                                                        </Link>
                                                    }

                                                    {
                                                        item.remaining_balance === item.total_fundraising &&
                                                        <button type="button" onClick={() => deleteCampaign(item.id)}
                                                                className="btn btn-danger w-100 mt-2">
                                                            {/*{(item.remaining_balance !== item.total_fundraising) && ('disabled') }*/}

                                                            Delete
                                                        </button>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}


                    </div>

                </div>
            </div>

        </>
    )
}

export default CMSListCampaign
