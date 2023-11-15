import React, { useEffect, useState } from "react";
import { get_Booked_Data, CancelBook } from "../../api/userApi";
import Header from "./Layout/Header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Booking = () => {
  const [resortbooked, setResortbooked] = useState([]);

  useEffect(() => {
    getbooked_data();
  }, []);

  const getbooked_data = async () => {
    try {
      console.log("getting..");
      let data = await get_Booked_Data();
      console.log(data, "Data of the Booking page in get_Booked_Data..");

      setResortbooked(data.data.result);
    } catch (error) {
      console.log(error, "error getting...");
    }
  };

  const CancelBooking = async (BookingId) => {
    try {
      // Show a confirmation dialog before canceling the booking
      const confirmCancellation = window.confirm(
        "Are you sure you want to cancel this booking?"
      );

      if (confirmCancellation) {
        const data = await CancelBook(BookingId);

        console.log(data, "Data of the Booking page in Userpage..");
        if (data) {
          toast.success(data.data.message, {
            position: "top-center",
          });
          getbooked_data(); // Fetch the updated booking data after cancellation
        }
      }
    } catch (error) {
      console.log(error, "Error occurred while canceling the booking...");
    }
  };

  // Function to get a random image from the image array
  const getRandomImage = (images) => {
    if (images && images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    }
    return ""; // Default to an empty string if no images are available
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />

      <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8 underline ">
        My Bookings
      </h1>
      {resortbooked.length === 0 ? (
        <div className="flex flex-col items-center mt-5">
          <h6 className="bg-red-500 text-white w-full text-center p-3 rounded-lg">
            No bookings yet!
          </h6>
          <Link
            to="/resortlist"
            className="btn btn-success text-white w-full text-center p-3 mt-3 rounded-lg"
          >
            Go To Booking
          </Link>
        </div>
      ) : (
        resortbooked?.map((resort, index) => (
          <div
            key={index}
            className="card card-side bg-transparent-400 shadow-xl  border md:mx-32  my-4  hover:bg-gray-100   hover:mx-28"
          >
            <div className=" flex justify-between">
              <div className="m-6   ">
                <img
                  src={getRandomImage(resort.resortId?.image)}
                  alt="images_resort"
                  className="rounded-tl-[20px] w-96"
                />
              </div>

              <div className=" mt-8">
                <h2 className="card-title">
                  Booked Resort: {resort.resortId?.resortname}
                </h2>

                <p>Address: {resort.resortId?.address}</p>
                <br />
                
                <p>Price: {resort.payment.payment_amount}</p>
                <p>Selected Rooms: {resort.selected_rooms}</p>
                <p>Place: {resort.resortId?.place}</p>
                <p>Status: {resort.status}</p>
                <p>
                  Booked Date:{" "}
                  {new Date(resort.Booked_at).toLocaleDateString("en-US")}
                </p>
                <p>
                  CheckIn date: {resort.fromDate} - Check OutDate:{" "}
                  {resort.toDate}
                </p>
                <p>Payment Method: {resort?.payment?.payment_method}</p>
                <p>Payment Status: {resort?.payment?.payment_status}</p>

                <div className="card-actions  justify-center  ">
                  {resort.status !== "cancelled" && (
                    <button
                      className="btn bg-red-500 my-2"
                      onClick={() => CancelBooking(resort._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default Booking;
