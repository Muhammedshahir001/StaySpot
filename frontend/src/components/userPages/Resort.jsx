import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { MdPlace } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { getuserresort } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const Resort = () => {
  const [resortbooked, setResortbooked] = useState([]);

  const resortStyle = {
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

  const [resort, setuserresort] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filteredResorts, setFilteredResorts] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  // pagination code works..
  const [currentpage, setCurrentpage] = useState(1);
  // console.log(currentpage, "current page");
  const recordpage = 3;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = resort.slice(firstIndex, lastIndex);
  // console.log(records, "record count in user side...");
  const npage = Math.ceil(resort.length / recordpage);
  // console.log(npage, "npage of count...");
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

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
    userresort();
  }, []);

  const handleView = async (item) => {
    try {
      navigate(`/viewData/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    if (date < checkInDate) {
      setCheckOutDate(checkInDate);
    } else {
      setCheckOutDate(date);
    }
  };
  useEffect(() => {
    if (checkInDate) {
      localStorage.setItem("checkinDate", checkInDate.toISOString());
    } else {
      localStorage.removeItem("checkinDate");
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate) {
      localStorage.setItem("checkoutDate", checkOutDate.toISOString());
    } else {
      localStorage.removeItem("checkoutDate");
    }
  }, [checkOutDate]);

  const userresort = async () => {
    try {
      let { data } = await getuserresort();
      if (data.success) {
        setuserresort(data.resortt);
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };
  const handleSearch = () => {
    if (!selectedPlace || !checkInDate || !checkOutDate) {
      generateError("Please enter valid credentials to search the data.");
      setFilteredResorts([]); // Clear previous search results
      return;
    }

    if (selectedPlace && checkInDate && checkOutDate) {
      // Formatting the date into the correct format
      const new_checkin = checkInDate;
      const new_checkout = checkOutDate;

      const options = { day: "numeric", month: "numeric", year: "numeric" };
      const formatted_InDate = new_checkin
        .toLocaleDateString("en-GB", options)
        .replace(/\/0(\d)\//, "/$1/");
      const formatted_outDate = new_checkout
        .toLocaleDateString("en-GB", options)
        .replace(/\/0(\d)\//, "/$1/");

      const filterResorts = resort.filter((item) => {
        const isPlaceMatched = item.place === selectedPlace;
        const isPriceInRange =
          (minPrice === null || item.price >= minPrice) &&
          (maxPrice === null || item.price <= maxPrice);

        const hasOverlappingBooking = resortbooked?.some((bookedItem) => {
          const bookedFrom = bookedItem.fromDate;
          const bookedTo = bookedItem.toDate;

          const isOverlapping =
            (formatted_InDate <= bookedFrom &&
              bookedFrom <= formatted_outDate) || // Overlapping start date
            (formatted_InDate <= bookedTo && bookedTo <= formatted_outDate) || // Overlapping end date
            (bookedFrom <= formatted_InDate && formatted_outDate <= bookedTo); // Booking covers the entire search range

          return (
            bookedItem.resortId._id === item._id &&
            bookedItem.status === "booked" &&
            isOverlapping
          );
        });

        const isUserBooked = resortbooked?.some((bookedItem) => {
          return (
            bookedItem.resortId._id === item._id &&
            bookedItem.status === "booked" &&
            formatted_InDate <= bookedItem.fromDate &&
            formatted_outDate >= bookedItem.toDate
          );
        });

        return (
          isPlaceMatched &&
          isPriceInRange &&
          !hasOverlappingBooking &&
          !isUserBooked
        );
      });

      // console.log(filterResorts, "Filtered Resorts");
      setFilteredResorts(filterResorts);
    }
  };

  const today = new Date();
  const uniquePlaces = [...new Set(resort.map((item) => item.place))];

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-2xl">
        <div className="px-[30px] py-4 w-full bg-gray-300 mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-md rounded-lg mt-10">
          <select
            className="w-64 h-10 max-w-xs rounded-md"
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
          >
            <option disabled value="">
              Select your Stay
            </option>
            {uniquePlaces.map((place, index) => (
              <option key={index}>{place}</option>
            ))}
          </select>

          <div className="ml-2 ">
            <DatePicker
              selected={checkInDate}
              dateFormat="dd MMMM yyyy"
              onChange={handleCheckInDateChange}
              placeholderText="Check-in"
              className="w-64 h-10 max-w-xs rounded-md  px-3"
              minDate={today}
            />
          </div>

          <div className="ml-4">
            <DatePicker
              selected={checkOutDate}
              dateFormat="dd MMMM yyyy"
              onChange={handleCheckOutDateChange}
              placeholderText="Check-out"
              className="w-64 h-10 max-w-xs rounded-md  px-3"
              minDate={checkInDate ? new Date(checkInDate) : null}
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(parseFloat(e.target.value))}
              className="w-32 h-10 px-3 max-w-xs mr-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              className="w-32 h-10 max-w-xs rounded-md  px-3"
            />
          </div>

          <button
            className="btn join-item"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </button>
        </div>

        <div className="">
          {selectedPlace && checkInDate && checkOutDate ? (
            filteredResorts?.length > 0 ? (
              filteredResorts.map((item) => (
                <div
                  className="bg-white shadow-1 p-5  rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
                  key={item.resortname}
                >
                  <figure>
                    <img
                      src={`${item.image[0]}`}
                      alt="images_resort"
                      className="rounded-tl-[20px] mb-8"
                    />
                  </figure>
                  <div className="mb-4 flex flex-col">
                    <div className="flex items-center mb-2">
                      <BiHomeAlt className="text-lg mr-2" />
                      <div className="text-lg font-semibold">
                        {item.resortname}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MdPlace className="text-lg mr-2" />
                      <div className="text-black">{item.place}</div>
                    </div>

                    <div className="flex items-center">
                      <FaBed className="text-lg mr-2" />
                      <div className="text-lg font-semibold">
                        {item.number_room}
                      </div>
                    </div>

                    <button
                      onClick={() => handleView(item._id)}
                      className="btn btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl mx-auto flex justify-center">
                <img
                  src="https://res.cloudinary.com/dqlhedl48/image/upload/v1694444884/g8uh7daaayflbm4zogpr.gif"
                  alt="images_resort"
                />
              </div>
            )
          ) : (
            records.map((item) => (
              <div
                className="flex items-center m-5 max-w-4xl bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-1 rounded-tl-[20px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
                key={item.resortname}
              >
                <figure>
                  <img
                    src={`${item.image[0]}`}
                    alt="images_resort"
                    className="object-cover w-48 md:h-auto md:w-48 md:rounded-l-lg ml-5"
                  />
                </figure>
                <div className="flex flex-col flex-grow justify-between p-4 leading-normal">
                  <div className="flex items-center mb-2">
                    <BiHomeAlt className="text-lg mr-2" />
                    <div className="text-lg font-semibold">
                      {item.resortname}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-black">{item.place}</div>
                  </div>

                  <div className="flex items-center">
                    <FaBed className="text-lg mr-2" />
                    <div className="text-lg font-semibold">
                      {item.number_room}
                    </div>
                  </div>
                </div>{" "}
                <div style={resortStyle}>
                  <button
                    onClick={() => handleView(item._id)}
                    className="bg-blue-500 hover:bg-indigo-950 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <ToastContainer />
        {records.length > 0 && (
          <div className="join flex  justify-center ">
            <button
              className="join-item btn btn-outline  btn-info"
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
              disabled={currentpage === npage} // Disable Next button on the last page
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Resort;
