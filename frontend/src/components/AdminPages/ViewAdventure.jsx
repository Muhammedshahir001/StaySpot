import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { useParams } from "react-router-dom";
import { getUniqueAdv } from "../../api/adminApi";
import { baseUrl } from "../../files/file";

const ViewAdventure = () => {
  const [adventdetails, setAdvdetails] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getadventuredata();
  }, []);

  const getadventuredata = async () => {
    try {
      const response = await getUniqueAdv(id);

      if (response.data.success) {
        setAdvdetails(response.data.adventureData);
      } else {
        console.error(
          "Failed to fetch adventure details:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching adventure details:", error);
    }
  };

  const images = Array.from({ length: adventdetails?.image?.length }).map(
    (_, index) => ({
      id: index + 1,
      src: `${baseUrl}${adventdetails?.image && adventdetails?.image[index]}`,
    })
  );
  if (!adventdetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1 ">
        <Headers name={"View Adventure Activity"} />
        <div className="box mt-4 p-6">
          <div className="carousel">
            {images?.map((image) => (
              <div
                id={`slide${image?.id}`}
                key={image?.id}
                className="carousel-item relative w-full"
              >
                <img
                  src={image?.src}
                  className="w-96 h-60 mx-auto"
                  alt="image_Adventure"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${
                      image?.id === 1 ? images?.length : image?.id - 1
                    }`}
                    className="btn btn-circle btn-ghost"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      image?.id === images?.length ? 1 : image?.id + 1
                    }`}
                    className="btn btn-circle btn-ghost"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="border p-4 mb-4">
              <h4 className="text-xl font-bold">{adventdetails.activity}</h4>
              <p className="mt-2">{adventdetails.description}</p>
              <p className="mt-2 text-xl">
                Conducted By: {adventdetails.resortName} Resort
              </p>
              <p>Time: {adventdetails.time} Hour(s)</p>
              <p>Price: {adventdetails.price}</p>
            </div>
            <div className="border p-4">
              <h3 className="text-xl font-bold mb-2">Resort Owner Details</h3>
              <p>Name: {adventdetails?.resortowner?.name}</p>
              <p>Email: {adventdetails?.resortowner?.email}</p>
              <p>Contact No: {adventdetails?.resortowner?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdventure;
