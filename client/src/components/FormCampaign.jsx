import Carousel from 'react-bootstrap/Carousel';
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Axios from "../helpers/axios.js";
import {toast} from "react-toastify";
import ErrorHandler from "../helpers/ErrorHandler.js";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFetch} from "../hooks/useFetch.js";


function FormCampaign({id = ""}) {
    const navigate = useNavigate()
    let [form, setForm] = useState({
        "title": "",
        "description": "",
        "total_fundraising": "",
        "remaining_balance": "",
        "image_1": "",
        "image_2": "",
        "image_3": "",
    })

    const fetchDetailCampaign = async (event) => {
        let {data} = await Axios({
            method: 'get',
            url: `/campaigns/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        setForm(data.data)
    }

    if (id) {
        useEffect(() => {
            fetchDetailCampaign()
        }, []);
    }


    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmitCampaign = async (event) => {
        event.preventDefault()
        try {
            if (id) {
                let {data} = await Axios({
                    method: 'put',
                    url: `/campaigns/${id}`,
                    data: form,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
            } else {
                let {data} = await Axios({
                    method: 'post',
                    url: '/campaigns',
                    data: form,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
            }


            let notify = () => toast("Create campaign berhasil");
            notify()
            navigate('/cms/campaigns')
        } catch (error) {
            ErrorHandler(error)
        }
    }

    return (
        <>
            <form onSubmit={handlerSubmitCampaign}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={form.title} onChange={handlerChange}
                           className="form-control" placeholder="Your Title" required/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handlerChange}
                              className="form-control" rows="5" required></textarea>
                </div>

                <div className="form-group">
                    <label>Total Fundraising</label>
                    <input type="number" name="total_fundraising" value={form.total_fundraising}
                           onChange={handlerChange} className="form-control"
                           placeholder="Your Total Fundraising"
                           required/>
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input type="text" name="image_1" value={form.image_1} onChange={handlerChange}
                           className="form-control" placeholder="Your Image URL" required/>
                    <input type="text" name="image_2" value={form.image_2} onChange={handlerChange}
                           className="form-control mt-2" placeholder="Your Image URL" required/>
                    <input type="text" name="image_3" value={form.image_3} onChange={handlerChange}
                           className="form-control mt-2" placeholder="Your Image URL" required/>
                </div>

                <Button className="btn btn-primary mt-2 floatRight" type="submit">
                    {(id) ? "Update Campaign" : "Create Campaign"}
                </Button>

            </form>
        </>
    )
}

export default FormCampaign
