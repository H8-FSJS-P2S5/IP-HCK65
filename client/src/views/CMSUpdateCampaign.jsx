import FormCampaign from "../components/FormCampaign.jsx";
import {useParams} from "react-router-dom";

function CMSUpdateCampaign() {
    let {id} = useParams()


    return (
        <>
            <div className="container">
                <div id="container-history-pembelian">
                    <div className="col-lg-12 mb-5">
                        <div className="text-history mt-5 text-center">
                            <h3>
                                <u>
                                    Update Campaign
                                </u>
                            </h3>
                        </div>

                        <div className="col-lg-6 offset-lg-3">
                            <FormCampaign id={id}/>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default CMSUpdateCampaign
