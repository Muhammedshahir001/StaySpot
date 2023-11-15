import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Header";
import { AddDes, getResortData } from "../../api/Staffapi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDestination = () => {
  const [destname, setDestname] = useState("");
  const [place, setPlace] = useState("");
  const [about, setAbout] = useState("");
  const [resort, setResort] = useState("");
  const [dest_image, setDest_image] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getresortData();
  }, []);

  const handleSuccess = () => {
    toast.success("Destination added successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  const redirectToDestination = () => {
    navigate("/staff/staffDestination");
  };

  const handleError = (message) => {
    alert(`An error occurred while adding the resort: ${message}`);
  };
  const getresortData = async () => {
    try {
      let { data } = await getResortData();

      if (data.success) {
        setList(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      destname === "" ||
      place === "" ||
      about === "" ||
      resort === "" ||
      dest_image === ""
    ) {
      alert("please fill all are required");
      return;
    }
    const formData = new FormData();
    formData.append("destname", destname);
    formData.append("destplace", place);
    formData.append("destabout", about);
    formData.append("destresort", resort);
    for (let i = 0; i < dest_image.length; i++) {
      const dest_img = dest_image[i];
      console.log(dest_img, "88888888");
      formData.append("destimages", dest_img);
    }
    try {
      const response = await AddDes(formData);
      console.log(response);
      if (response.data.created) {
        handleSuccess();
        setTimeout(redirectToDestination, 2000);
      } else {
        handleError("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error adding Destination :", error);
      handleError("An error occurred while adding the Destination.");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Destination details"} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add Destination</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Destination Name
                </label>
                <input
                  value={destname}
                  onChange={(e) => {
                    setDestname(e.target.value);
                  }}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs"
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Place of the Destination
                </label>
                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="form-control">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  About
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Description of the resort"
                ></textarea>
              </div>
              <select
                value={resort}
                onChange={(e) => setResort(e.target.value)}
                className="select select-bordered w-full mt-7 ml-5 max-w-xs"
              >
                <option disabled selected>
                  Near by Resorts
                </option>
                {list.map((place, index) => (
                  <option key={index} value={place.resortname}>
                    {place.resortname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Images of the Destination
                </label>
                <input
                  type="file"
                  onChange={(e) => setDest_image(e.target.files)}
                  className="file-input w-full max-w-xs"
                  multiple
                />
              </div>
            </div>
            <div></div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Add Destination
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddDestination;
