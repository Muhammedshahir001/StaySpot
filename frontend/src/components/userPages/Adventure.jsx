import React, { useEffect, useState } from "react";
import { getuseradventure } from "../../api/userApi";
import Header from "./Layout/Header";

import { MdPlace } from "react-icons/md";
import { baseUrl } from "../../files/file";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./Layout/Footer";

const Adventure = () => {
  const users = useSelector((state) => state.user);
  console.log(users, "zcc");
  const [adventure, setAdventure] = useState([]);
  const adventureStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gridGap: "2rem",
    gap: "2rem",
    padding: "0 20px",
    marginLeft: "auto",
    height: "12rem",
    width: "20%",
    border: "1px solid hsla(0,0%,61.6%,.49411764705882355)",
    backgroundColor: "hsla(0,0%,80.8%,.6078431372549019)",
    borderRadius: "0 7px 7px 0",
  };

  const [currentpage, setCurrentpage] = useState(1);
  console.log(currentpage, "current page");
  const recordpage = 3;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = adventure.slice(firstIndex, lastIndex);
  console.log(records, "record count in user side...");
  const npage = Math.ceil(adventure.length / recordpage);
  console.log(npage, "npage of count...");
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
    useradventure();
  }, []);
  const useradventure = async () => {
    try {
      let { data } = await getuseradventure();
      if (data.success) {
        setAdventure(data.adventure);
      }
    } catch (error) {}
  };
  const navigate = useNavigate();
  const handleView = async (item) => {
    try {
      navigate(`/viewAdventure/${item}`, { state: { item } });
    } catch (error) {
      console.log(error, "Error Occured in the Adventure page");
    }
  };
  console.log(adventure, "adventure datas are coming....");

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="">
        {records.map((item) => (
          <div className="flex flex-col md:flex-row items-center justify-between m-5 max-w-4xl bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-1 rounded-tl-[20px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
            <div className="flex">
              <figure>
                <img
                  src={`${baseUrl}${item?.image[0]}`}
                  className="object-cover w-full md:w-48 md:h-40 md:rounded-l-lg ml-5"
                  alt="Movie"
                />
              </figure>
              <div className="flex flex-col flex-grow p-4 leading-normal">
                <div className="flex items-center mb-2">
                  <div className="text-lg mr-2" />
                  <div className="text-lg font-semibold">{item.activity}</div>
                </div>
                <div className="flex items-center">
                  <MdPlace className="text-lg mr-2" />
                  <div className="text-lg font-semibold">{item.place}</div>
                </div>
                <div className="flex items-center">
                  <div className="text-lg mr-2" />
                  <div className="text-black">{item.resortName}</div>
                </div>
              </div>
            </div>
            <div className="h-full bg" style={adventureStyle}>
              <button
                onClick={() => handleView(item._id)}
                className="bg-blue-500 hover:bg-indigo-950 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {records.length > 0 && (
        <div className="join flex justify-center">
          <button
            className="join-item btn btn-outline btn-info"
            onClick={prePage}
            disabled={currentpage === 1} // Disable Prev button on the first page
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
            disabled={currentpage === npage} //
          >
            Next
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Adventure;
