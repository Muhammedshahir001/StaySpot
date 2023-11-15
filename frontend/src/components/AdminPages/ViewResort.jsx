import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { getuniqueresort } from "../../api/adminApi";
import { useParams } from "react-router-dom";
// import { baseUrl } from "../../files/file";
import { MdFileDownload } from "react-icons/md";

const ViewResort = () => {
  const [resortdetails, setResortdetails] = useState(null);
  let { id } = useParams();
  console.log(id,"this is the id of view resort page ");
useEffect(() => {
  const fetchResortDetails = async () => {
    try {
      const { data } = await getuniqueresort(id);
      console.log(data, "unique data of each resort");

      if (data.success) {
        console.log(data.success, "resort data getting success");
        console.log(data.resortData, "resort data"); // Check if the property is "resortData"
        setResortdetails(data.resortData); // Update the property name to "resortData"
      }
    } catch (error) {
      console.log("Error occurred while fetching resort details:", error);
    }
  };

  fetchResortDetails();
}, [id]);
 if (!resortdetails) {
   return <div>Loading...</div>;
 }
  const renderImages = () => {
    return (
      resortdetails?.image?.map((src, index) => (
        <img
          key={index}
          src={src}
          className="w-40 mx-auto"
          alt={`Image ${index + 1}`}
        />
      )) || []
    );
  };
  console.log(resortdetails,"reppppppppppppppppppp")

 

  return (
    <>
      <div className="flex">
        <Navbars />
        <div className="flex-1">
          <Headers name={"View Resort"} />
          <div className="card lg:card-side bg-slate-500 shadow-xl rounded-none flex-row">
            <figure>
              {resortdetails?.image && resortdetails.image[0] ? (
                <img
                  src={resortdetails.image[0]}
                  alt="resort"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <span>No image available</span>
              )}
            </figure>
            <div className="card-body h-60">
              <h2 className="card-title">{resortdetails?.resortname}</h2>
              <p>{resortdetails?.address}</p>
              <div className="card-actions justify-end">
                <label className="btn" htmlFor="view_image">
                  View Images
                </label>
                <input
                  type="checkbox"
                  id="view_image"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="carousel">{renderImages()}</div>
                  <label className="modal-backdrop" htmlFor="view_image">
                    close
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="card lg:card-side bg-slate-500 shadow-xl rounded-none h-auto">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Overview of Resort
            </h3>

            <div className="card-body">
              <h2>Address & place</h2>
              <p>{resortdetails?.address}</p>
              <p>{resortdetails?.place}</p>
              <h2>Description</h2>
              <p>{resortdetails.description}</p>
              <h2>Certificate uploaded</h2>
              <a href={`${resortdetails?.document}`} download>
                <MdFileDownload />
              </a>
              {resortdetails?.document ? (
                <>
                  <embed
                    src={`${resortdetails?.document}`}
                    type="application/pdf"
                    width="50%"
                    height="100px"
                  />
                </>
              ) : (
                <p>No document available</p>
              )}
            </div>
            <div className="card w-96 bg-blue-500 shadow-xl rounded-none">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Name:{resortdetails?.resortowner?.name}
                </h2>
                <h2 className="text-xl font-semibold">
                  contact:{resortdetails?.resortowner?.phone}
                </h2>
                <h2 className="text-xl font-semibold mb-20">
                  Email:{resortdetails?.resortowner?.email}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewResort;
