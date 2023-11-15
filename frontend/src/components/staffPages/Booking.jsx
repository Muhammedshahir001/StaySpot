import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { get_Book_Data } from "../../api/Staffapi";

function Booking() {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    getBookedData();
  }, []);

  const getBookedData = async () => {
    try {
      let { data } = await get_Book_Data();
      console.log(data, "This is all booking datas.....");
      if (data.success) {
        setBooking(data.result);
      }
    } catch (error) {
      console.log(error, "Error occured whill geting the booking page...");
    }
  };
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Header name={"List of Bookings"} />

        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Booking Id</th>
                <th>Booking Resort</th>
                <th>Traveler</th>

                <th>Booking_Date</th>
                <th>CheckOutDate</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((item, index) => {
                const toDate = item.toDate;
                const currentDate = new Date();
                const options = {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                };
                console.log(options,"options......");
                const formatedDate = currentDate.toLocaleDateString("en-US");

                console.log(
                  formatedDate,
                  "This is the formatedDate in the booking page..."
                );
                console.log(
                  toDate,
                  "This is the toDate in the booking page...."
                );

                const isExpired = toDate < formatedDate;
                console.log(isExpired, "isExpired.......");
                const status = isExpired ? "Expired" : "Reserved";
                console.log(status, "status of booking.....");
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item._id}</td>
                    <td>{item.resortId.resortname}</td>
                    <td>{item.traveler?.name}</td>
                    <td>
                      {new Date(item.Booked_at).toLocaleDateString("en-Us")}
                    </td>
                    <td>{item.toDate}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default Booking;
