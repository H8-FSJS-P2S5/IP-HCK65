import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";

export default function CardPage() {
  const [fetch, setFetch] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/foods",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then((response) => {
      setFetch(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const [addItem, setAddItem] = useState([]);

  const addData = (itemId) => {
    axios({
        method: "POST",
        url: `http://localhost:3000/foods/` + itemId,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    .then((response) => {
        console.log(response.data);
    })
  }

  return (
    <> 
    <div className="flex w-full flex-wrap overflow-auto h-screen">
       {fetch.map((e, i) => {
        return  <Card
        key={i}
            className="max-w-[20rem] h-[26rem] overflow-hidden ml-4 mt-4"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none h-[26rem]"
            >
              <img src={e.img} alt="ui/ux review check" className="" />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="text-sm">
                {e.name}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 font-normal text-sm"
              >
                {e.description}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 font-normal text-sm"
              >
                {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(e.price)}
              </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center -space-x-3">
                
                <Tooltip content="Tania Andrew">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="tania andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    className="border-2 border-white hover:z-10"
                  />
                </Tooltip>
              </div>
              <Typography className="text-xl"><MdOutlineAddCircle /></Typography>
            </CardFooter>
          </Card>
        
       })} 
       </div>
    </>
  );
}
