import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useLocation } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import DatePicker from "react-datepicker";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { booked_Resort, verifyRazorpay } from "../../api/userApi";
import { ToastContainer, toast } from "react-toastify";
import { keyId } from "../../files/file";

const ResortBooking = () => {
  const users = useSelector((state) => state.user);
  const navigate = useNavigate();
  const keyid = keyId;

  const [resortdata, setResortdata] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [paymentt, setPaymentt] = useState("");


  const location = useLocation();
  const timeDifference = checkOutDate?.getTime() - checkInDate?.getTime();
  const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const booked = location.state?.bookeddata;
  const pric = location.state?.price;
  const count_room = location.state?.rooms;

  const handlebookingHotel = async (bookedd) => {
    try {
      const data = await booked_Resort({
        resortId: bookedd,
        traveler: users,
        fromDate: checkInDate,
        toDate: checkOutDate,
        payment: paymentt,
        pricee: pric * dayCount,
        count_Rooms: count_room,
      });
      console.log(
        checkInDate,
        "this is the checkIn date",
        checkOutDate,
        "this is the checkout date in the ResortBooking page"
      );
      localStorage.removeItem("checkinDate");
      localStorage.removeItem("checkoutDate");

      if (data.data.success) {
        navigate("/hotelbooking/");
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
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

  const handleVerifyRazorpay = async (verifyData) => {
    try {
      const { data } = await verifyRazorpay(verifyData);
      if (data.success) {
        navigate("/hotelbooking/");
      } else {
        console.error("Razorpay payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying Razorpay payment:", error);
    }
  };

  const handleOnlinePayment = async (resortdat) => {
    try {
      const data = await booked_Resort({
        resortId: booked,
        traveler: users,
        fromDate: checkInDate,
        toDate: checkOutDate,
        payment: paymentt,
        pricee: pric * dayCount,
        count_Rooms: count_room,
      });

      var real_amount = pric * dayCount;
      initPayment(
        data.data,
        resortdat,
        checkInDate,
        checkOutDate,
        paymentt,
        real_amount,
        count_room
      );

      localStorage.removeItem("checkinDate");
      localStorage.removeItem("checkoutDate");
    } catch (error) {
      console.log(error, "222222");
    }
  };
  const initPayment = (
    data,
    resortdat,
    checkInDate,
    checkOutDate,
    paymentt,
    real_amount,
    count_room
  ) => {
    const options = {
      key: keyid,
      name: booked.resortname,
      description: "Test Payment",
      amount: real_amount * 100,
      currency: data.currency,
      order_id: data.data.id,
      handler: async (response) => {
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          const verifyData = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            resortdat,
            checkInDate,
            checkOutDate,
            paymentt,
            real_amount,
            count_room,
          };
          await handleVerifyRazorpay(verifyData);
        } catch (error) {
          console.error("Error handling Razorpay response:", error);
        }
      },
      theme: {
        color: "#3499cc",
      },
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log("Payment failed:", response.error);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };
  const today = new Date();

  useEffect(() => {
    setResortdata(booked.resortname);
    setResortdata(booked.price);
    setResortdata(booked.image);
    setResortdata(booked.number_room);
    setResortdata(booked.place);

    const checkInDateFromStorage = localStorage.getItem("checkinDate");
    const checkOutDateFromStorage = localStorage.getItem("checkoutDate");

    // Parse the stored dates as Date objects
    if (checkInDateFromStorage) {
      setCheckInDate(new Date(checkInDateFromStorage));
    }

    if (checkOutDateFromStorage) {
      setCheckOutDate(new Date(checkOutDateFromStorage));
    }
  }, [booked]); // Added booked as a dependency to useEffect

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-around">
          <div className="max-w-[768px]">
            <h2 className="text-2xl font-semibold mt-5">Date Form</h2>
            <h3 className="text-lg mb-4">Please provide Booking Date:</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <div className="flex flex-col">
                  <label htmlFor="checkInDate">Check-in Date:</label>
                  <DatePicker
                    selected={checkInDate}
                    dateFormat="dd MMMM yyyy"
                    onChange={handleCheckInDateChange}
                    placeholderText="Select Check-in Date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    minDate={today}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="flex flex-col">
                  <label htmlFor="checkOutDate">Check-out Date:</label>
                  <DatePicker
                    selected={checkOutDate}
                    dateFormat="dd MMMM yyyy"
                    onChange={handleCheckOutDateChange}
                    placeholderText="Select Check-out Date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    minDate={checkInDate ? new Date(checkInDate) : null}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="max-w-[900px] bg-gray-100 p-4 mt-5 rounded-lg">
            <h2 className="font-semibold">{booked?.resortname}</h2>
            <h2 className="font-semibold flex items-center">
              <RxCalendar className="text-lg mb-6" />
              <span className="ml-2 mb-6">
                {checkInDate && checkOutDate
                  ? `${checkInDate.toLocaleDateString(
                      "en-GB"
                    )}-${checkOutDate.toLocaleDateString("en-GB")}`
                  : "Date not selected"}
              </span>
            </h2>

            <img
              src={`${booked.image[0]}`}
              alt="Resort"
              className="w-72 h-56"
            />

            <h2 className="font-semibold flex items-center">
              <FaBed className="text-sm" />
              Selected Room:
              <span className="ml-2">{count_room}</span>
            </h2>
            <h2 className="font-semibold flex items-center">
              <MdPlace className="text-sm" />
              <span className="ml-2">{booked?.place}</span>
            </h2>
            <h2>Selected Days:{dayCount ? dayCount : 0}</h2>
            <h2>Actual Price per room:{booked?.price}</h2>

            <h2 className="font-semibold flex items-center">
              <FaRupeeSign className="text-sm" />
              <span className="ml-2">
                {pric}*{dayCount ? dayCount : 0}=
              </span>
              <span className="ml-2">{pric * (dayCount ? dayCount : 0)}</span>
            </h2>
            <div className="form-group">
              <label>Payment Method:</label>
              <div>
                <input
                  type="radio"
                  id="cod"
                  value="cod"
                  checked={paymentt === "cod"}
                  onChange={(e) => setPaymentt(e.target.value)}
                  required
                />
                <label htmlFor="cod" className="ml-2">
                  Cash on Reach
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="online"
                  value="online"
                  checked={paymentt === "online"}
                  onChange={(e) => setPaymentt(e.target.value)}
                  required
                />
                <label htmlFor="online" className="ml-2">
                  Online Payment
                </label>
              </div>
            </div>
            <button
              disabled={!checkInDate || !checkOutDate || paymentt === "cod"}
              onClick={() => {
                handleOnlinePayment(booked);
              }}
              className="btn btn-success mr-4"
            >
              Pay Now
            </button>

            <button
              disabled={!checkInDate || !checkOutDate || paymentt === "online"}
              onClick={() => {
                handlebookingHotel(booked);
              }}
              className="btn btn-success"
            >
              Pay Hotel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default ResortBooking;
