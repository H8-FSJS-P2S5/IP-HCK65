import FormCampaign from "../components/FormCampaign.jsx";

function CMSCreateCampaign() {

    return (
        <>
            <div className="container">
                <div id="container-history-pembelian">
                    <div className="col-lg-12 mb-5">
                        <div className="text-history mt-5 text-center">
                            <h3>
                                <u>
                                    Create Campaign
                                </u>
                            </h3>
                        </div>

                        <div className="col-lg-6 offset-lg-3">
                            <FormCampaign/>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default CMSCreateCampaign
