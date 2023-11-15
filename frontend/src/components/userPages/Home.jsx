import React, { useState, useEffect } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { MdPlace } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { baseUrl } from "../../files/file";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import service1 from "../../images/service1.png";
import service2 from "../../images/service.png";
import service3 from "../../images/service3.png";
import service4 from "../../images/service4.png";
import {
  getuserresort,
  getuseradventure,
  getuserdestination,
} from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const users = useSelector((state) => state.user);
  const [resort, setResort] = useState([]);
  const [resortbooked, setResortbooked] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [destination, setDestination] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filteredResorts, setFilteredResorts] = useState([]);

  const navigate = useNavigate();

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  useEffect(() => {
    console.log();
    console.log();
    userdestination();
  }, []);

  useEffect(() => {
    useradventure();
  }, []);

  useEffect(() => {
    userresort();
  }, []);

  const useradventure = async () => {
    try {
      let { data } = await getuseradventure();
      if (data.success) {
        setAdventure(data.adventure.slice(0, 3));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userresort = async () => {
    try {
      let { data } = await getuserresort();
      if (data.success) {
        setResort(data.resortt.slice(0, 3));
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const userdestination = async () => {
    try {
      let { data } = await getuserdestination();
      if (data.success) {
        setDestination(data.destination.slice(0, 3));
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };
  const handleClick = async (item) => {
    try {
      navigate(`/viewAdventure/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSee = async (item) => {
    try {
      navigate(`/viewDestination/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (!selectedPlace || !checkInDate || !checkOutDate) {
      generateError("Please enter valid credentials to search the data.");
      setFilteredResorts([]);
      return;
    }

    if (selectedPlace && checkInDate && checkOutDate) {
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

        return isPlaceMatched && !hasOverlappingBooking && !isUserBooked;
      });

      setFilteredResorts(filterResorts);
      navigate("/resortList");
    }
  };
  const today = new Date();
  const uniquePlaces = [...new Set(resort.map((item) => item.place))];

  const imageSrc =
    "https://res.cloudinary.com/dqlhedl48/image/upload/v1694625468/cdsxzffo3o3gusc1hfmw.jpg";

  const data = [
    {
      icon: service1,
      title: "Get Best Prices",
      subTitle:
        "Unlock Savings and Earn Exciting Rewards by Using Our App for Payments",
    },
    {
      icon: service2,
      title: "Safety Measures",
      subTitle:
        "Discover our carefully selected hotels that prioritize your safety and well-being. We've implemented enhanced safety measures to ensure a worry-free stay.",
    },
    {
      icon: service3,
      title: "Flexible Payment",
      subTitle:
        " Experience Convenient App Payments and Earn Rewards with Every Transaction.",
    },
    {
      icon: service4,
      title: "Find The Best Place",
      subTitle:
        "Find the best Resorts  and places to visit near you in a single click.",
    },
  ];
  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-2xl">
        <div
          style={{
            margin: "8px",
          }}
        >
          <div className="carousel-item relative w-full">
            <img
              src={imageSrc}
              className="w-full max-h-96 object-cover brightness-50"
              style={{
                borderRadius: "27px",
              }}
              alt="Img"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center mb-16">
              <div
                className="text-slate-100 text-4xl font-thin pt-0"
                style={{ fontFamily: "monospace", fontStyle: "italic" }}
              >
                Welcome To StaySpot
              </div>
              <br />

              <div className="px-[30px] py-4 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-md rounded-lg bg-blue-50">
                <select
                  className="w-64 h-10 max-w-xs"
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

                <div className="ml-2">
                  <DatePicker
                    selected={checkInDate}
                    dateFormat="dd MMMM yyyy"
                    onChange={handleCheckInDateChange}
                    placeholderText="Check-in"
                    className="w-64 h-10 max-w-xs"
                    minDate={today}
                  />
                </div>

                <div className="ml-4">
                  <DatePicker
                    selected={checkOutDate}
                    dateFormat="dd MMMM yyyy"
                    onChange={handleCheckOutDateChange}
                    placeholderText="Check-out"
                    className="w-64 h-10 max-w-xs"
                    minDate={checkInDate ? new Date(checkInDate) : null}
                  />
                </div>

                <button onClick={handleSearch} className="btn btn-primary">
                  Search Resorts
                </button>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <p
                // href={`#slide${img.id === 1 ? images.length : img.id - 1}`}
                className="btn btn-circle btn-ghost"
              >
                ❮
              </p>
              <p
                // href={`#slide${img.id === images.length ? 1 : img.id + 1}`}
                className="btn btn-circle btn-ghost"
              >
                ❯
              </p>
            </div>
          </div>
        </div>

        <div className=" my-10 card border border-stone-400 rounded-2xl shadow-2xl bg-opacity-25 bg-green-500 mx-2">
          {filteredResorts.length > 0 ? (
            <div className="card">
              <h1 className="p-5 font-extrabold md:text-2xl text-center underline-offset-8">
                Filtered Resorts
              </h1>
              <div className="flex flex-wrap">
                {filteredResorts.map((item) => (
                  <div
                    className="bg-white shadow-2xl p-4 w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 border-sky-300"
                    key={item.resortname}
                  >
                    <figure>
                      <img
                        src={`${item.image[0]}`}
                        alt="resort img"
                        className="mb-1"
                      />
                    </figure>
                    <div className="flex flex-col">
                      <div className="flex items-center ">
                        <div className="text-lg font-semibold">
                          {item.resortname}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <MdPlace className="text-lg mr-2" />
                        <div className="text-black">{item.place}</div>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-sm" />
                        <div className="text-black">{item.price} per room</div>
                      </div>

                      <button
                        className="bg-transparent hover:bg-indigo-950 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => {
                          handleView(item._id);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card-body">
              <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
                Recommended Resorts
              </h1>
              <div className="flex flex-wrap">
                {resort.map((item) => (
                  <div
                    className="bg-white shadow-2xl p-4  w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition rounded-md hover:scale-105 border-sky-300 "
                    key={item.resortname}
                  >
                    <figure>
                      <img
                        src={`${item.image[0]}`}
                        alt="resort img"
                        className="mb-7 rounded-md  h-48 w-80 "
                      />
                    </figure>
                    <div className="flex flex-col">
                      <div className="flex items-center ">
                        <div className="text-lg font-semibold">
                          {item.resortname}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <MdPlace className="text-lg mr-2" />
                        <div className="text-black">{item.place}</div>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-sm" />
                        <div className="text-black">{item.price} per room</div>
                      </div>

                      <button
                        className="bg-transparent hover:bg-indigo-950 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => {
                          handleView(item._id);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card-body">
            <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
              Recommended Activities
            </h1>
            <div className="flex flex-wrap">
              {adventure.map((item) => (
                <div className="bg-white shadow-2xl p-4  rounded-md w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 border-sky-300">
                  <figure>
                    <img
                      src={`${baseUrl}${item?.image[0]}`}
                      className="mb-7 rounded-md  h-48 w-80"
                      alt="Movie"
                    />
                  </figure>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-lg font-semibold">
                        {item.activity}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MdPlace className="text-lg mr-2" />
                      <div className="text-lg font-semibold">{item.place}</div>
                    </div>

                    <button
                      className="btn btn-primary "
                      onClick={() => {
                        handleClick(item._id);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-body">
            <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
              Poppular Destinations....
            </h1>
            <div className="flex flex-wrap ">
              {destination.map((item) => (
                <div className="bg-white shadow-2xl p-4  rounded-md w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 border-sky-300">
                  <figure>
                    <img
                      src={`${baseUrl}${item?.dest_img[0]}`}
                      className="mb-7 rounded-md  h-48 w-80 "
                      alt="Movie"
                    />
                  </figure>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="text-lg mr-2" />
                      <div className="text-lg font-semibold">
                        {item.dest_name}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MdPlace className="text-lg mr-2" />
                      <div className="text-black">{item.place}</div>
                    </div>

                    <button
                      className="btn btn-primary mt-5"
                      onClick={() => {
                        handleSee(item._id);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" pr-4">
          <div id="services" className="pt-20 grid grid-cols-4 gap-8">
            {data.map((service, index) => {
              return (
                <div className="service flex flex-col bg-slate-100 gap-4 p-8 bg-aliceblue shadow-lg transition-transform transform translate-x-4 -translate-y-10 hover:translate-x-0 hover:-translate-y-4 hover:shadow-md">
                  <div className="icon">
                    <img src={service.icon} alt="" className="h-10" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p>{service.subTitle}</p>
                </div>
              );
            })}
          </div>
        </div>
        <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
          Our Customer's Gallery
        </h1>
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item ">
            <img
              src="https://res.cloudinary.com/dqlhedl48/image/upload/v1695718523/banner/hynsah7dn50mtwqi1wcs.webp"
              alt="img"
              className="shadow-lg p-5"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dqlhedl48/image/upload/v1695718610/banner/i252wteugrqrj3nkc4qe.webp"
              alt="img"
              className="shadow-lg p-5"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dqlhedl48/image/upload/v1695718665/banner/nrx7jso4zv3i3zpv05z5.webp"
              alt="img"
              className="shadow-lg p-5"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dqlhedl48/image/upload/v1695718711/banner/gbdjxvzn0nx7kywkm2kj.webp"
              alt="img"
              className="shadow-lg p-5"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dqlhedl48/image/upload/v1695718761/banner/n8fe8bzxna9ao0ovkt7u.webp"
              alt="img"
              className="shadow-lg p-5"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dqlhedl48/image/upload/v1695718806/banner/kcm1m3zgijx1fo0j21tm.webp"
              alt="img"
              className="shadow-lg p-5"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
