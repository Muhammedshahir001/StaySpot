import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { useParams } from "react-router-dom";
import { getUniqDest } from "../../api/adminApi";
import { baseUrl } from "../../files/file";

const ViewDest = () => {
  const [destdetails, setDestdetails] = useState({});
  const { id } = useParams();

  const getdestinations = async () => {
    try {
      const { data } = await getUniqDest(id);
      if (data.success) {
        setDestdetails(data.destData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdestinations();
    // eslint-disable-next-line
  }, [id]);

  const renderImages = () => {
    if (!destdetails.dest_img) return null;

    return destdetails.dest_img.map((img, index) => (
      <img
        key={index}
        src={`${baseUrl}${img}`}
        className="w-96 h-60 mx-auto"
        alt={`Destination Image ${index + 1}`}
      />
    ));
  };

  const resortOwnerName = destdetails.resortowner?.name || "Not available";
  const resortOwnerEmail = destdetails.resortowner?.email || "Not available";
  const resortOwnerPhone = destdetails.resortowner?.phone || "Not available";

  return (
    <div className="flex h-screen">
      <Navbars />
      <div className="flex-1 ">
        {" "}
        {/* Added mt-16 to give space for the fixed header */}
        <Headers name={"View Destination"} />
        <div className="carousel pt-3 pl-3">{renderImages() }</div>
        <div className="flex flex-col mt-6 pl-3">
          <h4 className="text-2xl font-bold">{destdetails.dest_name}</h4>
          <h3 className="text-xl font-semibold mb-2">
            Overview of the destination
          </h3>
          <p className="text-gray-700 mb-4">{destdetails.about}</p>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-xl">
              Conducted By: {destdetails.resortName} Resort
            </p>
          </div>
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h3 className="text-xl font-bold">Resort Owner Details</h3>
            <p className="mb-1">Name: {resortOwnerName}</p>
            <p className="mb-1">Email: {resortOwnerEmail}</p>
            <p>Contact No: {resortOwnerPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDest;
