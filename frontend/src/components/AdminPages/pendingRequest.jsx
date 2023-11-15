import React, { useState, useEffect } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import {
  getAllData,
  rejectresort,
  approveresortt,
} from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PendingRequest = () => {
  const [data, setdata] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const recordpage = 10;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [resortId, setResortid] = useState("");
  const [search, setSearch] = useState("");
  const [rejectionreason, setRejectionreason] = useState("");
  // console.log(search, "searching working...");
  const navigate = useNavigate();
  function changePage(id) {
    setCurrentpage(id);
  }

  function prePage() {
    if (currentpage !== 1) {
      setCurrentpage(currentpage - 1);
    }
  }
  function nextPage() {
    if (currentpage !== npage) {
      setCurrentpage(currentpage + 1);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let dataa = await getAllData();
      // console.log(dataa, "data of all resorts");

      if (dataa.data &&dataa.data.resort) {
        console.log(dataa.data, "tttttttt");

        setdata(dataa.data.resort);
      }
    } catch (error) {
      console.log(error, "error coming..");
    }
  };

  const handleRejectreasonsubmitt = async () => {
    try {
      if (rejectionreason === "") {
        return alert("type the reason first");
      } else {
        console.log(resortId, "id getting");
        console.log(rejectionreason, "reason getting");

        let { data } = await rejectresort(resortId, rejectionreason);
        setRejectionreason("");
        if (data) {
          const message = data.message;
          toast.success(message, {
            position: "top-center",
          });
          getData();
        }
      }
    } catch (error) {}
  };
  const handleReject = async (resortid) => {
    setResortid(resortid);
    console.log(resortId, "yyyyyyyy");
  };
  const handleapprove = async (id) => {
    try {
      let data = await approveresortt(id);
      setResortid(id);
      if (data) {
        const message = data.message;
        toast.success(message, {
          position: "top-center",
        });
        getData();
      }
    } catch (error) {}
  };

  const handleView = async (item) => {
    try {
      console.log(item, "resort full coming...");

      navigate(`/admin/viewresort/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Resorts"} />
        <div className="form-control float-right">
          <div className="form-control">
            <div className="input-group">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Search…"
                className="input input-bordered mt-1 mb-1"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Resort name</th>
                <th>Resort Owner</th>
                <th>Place</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? true
                    : item.resortname
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.resortname}</td>
                    <td>{item?.resortowner?.name}</td>
                    <td>{item?.place}</td>
                    <td>{item?.verify}</td>

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
                    {item.verify === "new" ? (
                      <>
                        <button
                          onClick={() => handleapprove(item._id)}
                          className="btn btn-xs btn-success"
                          style={{ marginRight: "10px" }}
                        >
                          Approve
                        </button>
                        <label
                          htmlFor="my_modal_6"
                          className="btn btn-xs btn-error"
                          onClick={(e) => {
                            handleReject(item._id);
                          }}
                        >
                          Reject
                        </label>

                        <input
                          type="checkbox"
                          id="my_modal_6"
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Reason for Rejection
                            </h3>
                            <textarea
                              id="reasonInput"
                              value={rejectionreason}
                              className="form-input w-auto h-auto"
                              placeholder="Enter reason for rejection"
                              onChange={(e) => {
                                setRejectionreason(e.target.value);
                              }}
                            ></textarea>
                            <div className="modal-action">
                              <label
                                htmlFor="my_modal_6"
                                onClick={handleRejectreasonsubmitt}
                                className="btn btn-xs btn-success"
                              >
                                Send
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : item.verify === "verified" ? (
                      <>
                        <label
                          htmlFor="my_modal_6"
                          className="btn btn-xs btn-error"
                          onClick={(e) => {
                            handleReject(item._id);
                          }}
                        >
                          Reject
                        </label>

                        <input
                          type="checkbox"
                          id="my_modal_6"
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Reason for Rejection
                            </h3>
                            <textarea
                              id="reasonInput"
                              value={rejectionreason}
                              className="form-input w-auto h-auto"
                              placeholder="Enter reason for rejection"
                              onChange={(e) => {
                                setRejectionreason(e.target.value);
                              }}
                            ></textarea>
                            <div className="modal-action">
                              <label
                                htmlFor="my_modal_6"
                                onClick={handleRejectreasonsubmitt}
                                className="btn btn-xs btn-success"
                              >
                                Send
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => handleapprove(item._id)}
                        className="btn btn-xs btn-success"
                        style={{ marginRight: "10px" }}
                      >
                        Approve
                      </button>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="join flex  justify-center  mt-5">
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

export default PendingRequest;
