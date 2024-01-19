import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export default function CardPage() {
  const [fetch, setFetch] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

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
      setTotalPage(response.data.total)

    })
    .catch((error) => {
      console.log(error);
    })
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= fetch.length / 10 &&
      selectedPage !== page
    )
    setPage(selectedPage)
  }

  const addData = async (id) => {
    await axios({
        method: "POST",
        url: `http://localhost:3000/foods/` + id,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };


  return (
    <> 
      {fetch.length > 0 && (
    <div className="flex w-full flex-wrap overflow-auto h-screen">
       {fetch.slice(page * 13 - 13, page * 13).map((e, i) => {
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
                
              </div>
              <button id={e.id} onClick={() => addData(e.id)} ><MdOutlineAddCircle size={28}/></button>
              <Typography className="text-xl"></Typography>
            </CardFooter>
          </Card>
        
       })} 
       </div>
       )}
       {
         fetch.length > 0 && <div className="pagination flex justify-center mt-5 mb-5 join-item btn">
          <span className={page > 1 ? "" : "pagination_disable"} onClick={() => selectPageHandler(page - 1)}><GrFormPrevious size={30} /></span>
          {
            
            [...Array(Math.floor(fetch.length / 10))].map((_, i) => {
                return <span className={page === i+1 ? "pagination_selected" : ""} onClick={() => selectPageHandler(page + 1)} key={i}></span>
            })
          }
          <span onClick={() => selectPageHandler(page + 1)} className={page < fetch.length / 10 ? "" : "pagination_disable"}><MdOutlineNavigateNext size={30} /></span>
         </div>
       }
    </>
  );
}