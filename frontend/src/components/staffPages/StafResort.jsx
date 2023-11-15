import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headerr from "./layout/Header";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { getResortData, disableresort } from "../../api/Staffapi";

const StafResort = () => {
  const [resort, setresort] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getresortData();
  }, []);
  const getresortData = async () => {
    try {
      let { data } = await getResortData();
      console.log(data, "data of resort ");

      if (data.success) {
        
        setresort(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleEdit = async (item) => {
    try {
    

      navigate("/staff/editResort/", { state: { item } });
    } catch (error) {
      console.log(error ,"Error occured the staff resort page");
    }
  };
  const handledisable = async (resortId) => {
    try {
    

      let { data } = await disableresort(resortId);
    
      if (data) {
        getresortData();
      }
    } catch (error) {
      console.log(error, "eeeeeeeeeee");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"List of Resorts"} />
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Details of Resort</h2>
          <Link to="/staff/add-resort" className="btn btn-ghost">
            Add Resort
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Resort name</th>

                <th>Place</th>
                <th>Price</th>
                <th>Status</th>
                <th>Admin Response</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resort.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.resortname}</td>

                  <td>{item.place}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td>{item?.verify}</td>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => {

                      handleEdit(item);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                 

                  {item.status === "Enable" ? (
                    <button
                      onClick={() => handledisable(item._id)}
                      className="btn btn-xs btn-error"
                      style={{ marginRight: "10px" }}
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={() => handledisable(item._id)}
                      className="btn btn-xs btn-success"
                      style={{ marginRight: "10px" }}
                    >
                      Enable
                    </button>
                  )}


                </tr>
              ))}
            </tbody>
          </table>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StafResort;
