import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { get_All_Bookings } from "../../api/adminApi";

function AllBookings() {
  const [allBooking, setAllBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Set the initial page to 1
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const reversedAllBooking = [...allBooking].reverse(); // Reverse the array
  const records = reversedAllBooking.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(allBooking.length / recordPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentPage(id);
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  useEffect(() => {
    getAllBooking();
  }, []);

  const getAllBooking = async () => {
    try {
      let { data } = await get_All_Bookings();
      console.log(
        data,
        "this is the data of all the bookings in the admin page"
      );
      if (data.success) {
        setAllBooking(data.result);
      }
    } catch (error) {
      console.log(error, "an error occurred in the admin booking page..");
    }
  };

  console.log(allBooking, "This is all the bookings");
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Header name={"List of Bookings"} />
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No:</th>
                <th>Booking Resort</th>
                <th>Traveler</th>
                <th>Status</th>
                <th>CheckInDate</th>
                <th>CheckOutDate</th>
                <th>Phone no:</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.resortId?.resortname}</td>
                  <td>{item.traveler?.name}</td>
                  <td>{item.status}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>{item.traveler?.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join flex justify-center">
            <button
              className="join-item btn btn-outline btn-primary"
              onClick={prePage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {numbers.map((num, i) => (
              <div
                className={`join ${currentPage === num ? "active" : ""}`}
                key={i}
              >
                <button
                  className="join-item btn btn-outline btn-primary"
                  onClick={() => changePage(num)}
                >
                  {num}
                </button>
              </div>
            ))}
            <button
              className="join-item btn btn-outline btn-primary"
              onClick={nextPage}
              disabled={currentPage === nPage || records.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBookings;
