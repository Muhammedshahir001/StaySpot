import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { getAlluser, blockuser } from "../../api/adminApi";
import { ToastContainer, toast } from "react-toastify";

const AllUsers = () => {

    console.log("startinggggggggggggggggggggggggggggggg");
  const [user, Setuser] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const recordpage = 10;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = user.slice(firstIndex, lastIndex);
  const npage = Math.ceil(user.length / recordpage);
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
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    getUserData();
  }, [searchQuery]);
  const getUserData = async () => {
    try {
      let { data } = await getAlluser();
      console.log(data,"usersssssssssssssssssssss");
        if (searchQuery) {
      // Filter users based on the search query
      const filteredUsers = data.users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
       Setuser(filteredUsers);
    }else{
          Setuser(data.users);
    } 
  }catch (error) {
        console.log(error);
    }
  };
  const handleBlockUnblock = async (userId) => {
    try {
      let { data } = await blockuser(userId);
      toast.success(data.message, {
        position: "top-center",
      });
      getUserData();
    } catch (error) {

    }
  };
  console.log(user, "user displayin...");
  return (
    <div className="flex ">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Users"} />
        <div className="form-control float-right">
          <input
            type="text"
            placeholder="Search by user name"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>User Name</th>
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
                  <td>{user.status}</td>
                  {user.status === "Unblock" ? (
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

export default AllUsers;
