import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { getAllAdvData, approveAdvent } from "../../api/adminApi";

const AllAdventure = () => {
  const [advdata, setadvdata] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const recordpage = 10;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const npage = Math.ceil(advdata.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getadvData();
  }, []);

  const changePage = (id) => {
    if (id >= 1 && id <= npage) {
      setCurrentpage(id);
    }
  };

  const handleView = async (item) => {
    try {
      console.log(item, "itemsssssssssssssssss");
      navigate(`/admin/viewactivity/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleapprove = async (adventId) => {
    try {
      let { data } = await approveAdvent(adventId);
      console.log(data, "data from approve partm of the admin....");
      if (data) {
        const message = data.message;
        toast.success(message, {
          position: "top-center",
        });
        getadvData();
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Error approving adventure", {
        position: "top-center",
      });
    }
  };

  const getadvData = async () => {
    try {
      let { data } = await getAllAdvData();
      console.log(data, "adventure data......");
      if (data && data.adventureActivity) {
        setadvdata(data.adventureActivity);
        console.log(data.adventureActivity, "data.adventureActivity.........");
      }
    } catch (error) {
      console.error("Error fetching adventure data:", error);
      toast.error("Error fetching adventure data", {
        position: "top-center",
      });
    }
  };

  const prePage = () => {
    if (currentpage !== 1) {
      setCurrentpage(currentpage - 1);
    }
  };

  const nextPage = () => {
    if (currentpage !== npage) {
      setCurrentpage(currentpage + 1);
    }
  };

  let content;

  if (advdata.length === 0) {
    content = <div>Loading adventure data...</div>;
  } else {
    const records = advdata.slice(firstIndex, lastIndex);

    console.log(firstIndex, lastIndex, "indexsssssssssss");
    console.log(records.length, "record length..........");

    content = (
      <div className="overflow-x-auto inline">
        <table className="table table-compact w-full">
          {/* Table header */}
          <thead>
            <tr>
              <th>No</th>
              <th>Activity name</th>
              <th>Resort Owner</th>
              <th>Place</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {records
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.activity.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.activity}</td>
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
        {/* Pagination buttons */}
        <div className="join flex justify-center">
          <button
            className="join-item btn btn-outline btn-info"
            onClick={prePage}
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
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of activities"} />
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
        {content}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllAdventure;
