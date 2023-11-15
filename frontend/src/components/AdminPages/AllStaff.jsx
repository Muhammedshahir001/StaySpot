import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { getAllstaff, blockstaff } from "../../api/adminApi";
import { ToastContainer, toast } from "react-toastify";

const AllStaff = () => {
  const [staff, Setstaff] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const recordpage = 10;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = staff.slice(firstIndex, lastIndex);
  const npage = Math.ceil(staff.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
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
    getStaffData();
  }, []);
  const getStaffData = async () => {
    try {
      let { data } = await getAllstaff();
      Setstaff(data.staffs);
    } catch (error) {}
  };
  const handleBlockUnblock = async (staffId) => {
    try {
      let { data } = await blockstaff(staffId);
      toast.success(data.message, {
        position: "top-center",
      });
      getStaffData();
    } catch (error) {
       console.error("Error blocking/unblocking user: ", error);
    }
  };
  console.log(staff, "staff displayin...");
  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Resort Owners"} />
        <div className="form-control float-right"></div>
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Resort Owner</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.admin_approval}</td>
                  {user.admin_approval === "Unblock" ? (
                    <button
                      onClick={() => handleBlockUnblock(user._id)}
                      className="btn btn-xs btn-error"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUnblock(user._id)}
                      className="btn btn-xs btn-success"
                    >
                      Unblock
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

export default AllStaff;
