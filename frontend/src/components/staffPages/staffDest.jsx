import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import { getDest } from "../../api/Staffapi";

const StaffDest = () => {
  const [advavtivity, setAdvactivity] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getdestdata();
  }, []);
  console.log(advavtivity, "yyyyyyyy");
  const getdestdata = async () => {
    try {
      let { data } = await getDest();
      console.log(data, "getadvworking...");
      if (data.success) {
        setAdvactivity(data.result);
      }
    } catch (error) {}
  };
  const handleEdit = async (item) => {
    try {
      navigate("/staff/editDest", { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"List Of Destination"} />
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Details of Resort</h2>
          <Link to="/staff/add-dest" className="btn btn-ghost">
            Add Destination
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Destination name</th>
                <th>Place</th>
                <th>Near By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {advavtivity.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.dest_name}</td>
                  <td>{item.place}</td>
                  <td>{item.resortName}</td>
                  <td>{item?.verify ? "approved" : "rejected"}</td>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => {
                      // console.log(item, "item is coming....");
                      handleEdit(item);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>


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

export default StaffDest;
