import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { useNavigate } from "react-router-dom";
import { getallDestData, approveDest } from "../../api/adminApi";
import { ToastContainer, toast } from "react-toastify";

const AllDestination = () => {
  const [destdata, setDestdata] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const recordpage = 10;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = destdata.slice(firstIndex, lastIndex);
  const npage = Math.ceil(destdata.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const navigate = useNavigate();
  function changePage(id) {
    setCurrentpage(id);
  }

  function prePage() {
    if (currentpage !== firstIndex) {
      setCurrentpage(currentpage - 1);
    }
  }
  function nextPage() {
    if (currentpage !== lastIndex) {
      setCurrentpage(currentpage + 1);
    }
  }
  useEffect(() => {
    getdestdata();
  }, []);
  const getdestdata = async () => {
    try {
      let data = await getallDestData();
      if (data.data.destination) {
        setDestdata(data.data.destination);
      }
    } catch (error) {}
  };
  const handleView = async (item) => {
    try {
      console.log(item, "******++++++");
      navigate(`/admin/viewdestination/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleapprove = async (DestId) => {
    try {
      let { data } = await approveDest(DestId);
      if (data) {
       
        const message = data.message;
        console.log(message, "message approve or reject");
        toast.success(message, {
          position: "top-center",
        });
        getdestdata();
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Destination"} />
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Destination name</th>
                <th>Resort Owner</th>
                <th>Place</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.dest_name}</td>
                  <td>{item?.resortowner?.name}</td>
                  <td>{item?.place}</td>
                  <td>{item?.verify ? "approved" : "rejected"}</td>

                  <button
                    onClick={() => {
                      console.log(item, "item is coming....");
                      handleView(item._id);
                    }}
                    className="btn btn-xs btn-info"
                    style={{ marginRight: "10px" }}
                  >
                    View
                  </button>
                  {item.verify === false ? (
                    <button
                      onClick={() => handleapprove(item._id)}
                      className="btn btn-xs btn-success"
                      style={{ marginRight: "10px" }}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleapprove(item._id)}
                      className="btn btn-xs btn-error"
                      style={{ marginRight: "10px" }}
                    >
                      Reject
                    </button>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join flex  justify-center ">
            <button
              className="join-item btn btn-outline  btn-info"
              onClick={prePage}
              disabled={currentpage === 1}
            >
              Prev
            </button>
            {numbers.map((n, i) => (
              <div
                className={`join ${currentpage === n ? "active" : ""}`}
                key={i}
              >
                <button
                  className="join-item btn btn-outline btn-info"
                  onClick={() => changePage(n)}
                >
                  {n}
                </button>
              </div>
            ))}
            <button
              className="join-item btn btn-outline btn-info"
              onClick={nextPage}
              disabled={currentpage === npage || records.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllDestination;
