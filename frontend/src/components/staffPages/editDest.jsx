import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Header";
import { getResortData, editDestination } from "../../api/Staffapi";
import { ToastContainer, toast } from "react-toastify";

const EditDest = () => {
  const [des_name, setDes_name] = useState("");
  const [des_place, setDes_place] = useState("");
  const [des_about, setDes_about] = useState("");
  const [des_resorts, setDes_resorts] = useState("");
  const [des_images, setDes_images] = useState([]);
  const [des_list, setDes_list] = useState([]);
  const [id, setId] = useState("");
  const location = useLocation();
  const items = location.state?.item;
  const navigate = useNavigate();

  useEffect(() => {
    getresortData();
  }, []);

  useEffect(() => {
    setDes_name(items.dest_name);
    setDes_place(items.place);
    setDes_about(items.about);
    setDes_resorts(items.resortName);
    setId(items._id);
  }, [items]);

  const getresortData = async () => {
    try {
      const { data } = await getResortData();
      //   console.log(data, "data of resort ");

      if (data.success) {
        setDes_list(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", des_name);
    formData.append("place", des_place);
    formData.append("about", des_about);
    formData.append("destResorts", des_resorts);

    for (let i = 0; i < des_images.length; i++) {
      const img = des_images[i];
      formData.append("destimages", img);
    }

    try {
      const response = await editDestination(formData, id);
      console.log(response.data.message);

      // Use the alert function to display a success message
      alert("Destination updated successfully!");

      // Redirect to the destination list page after successful edit
      navigate("/staff/staffDestination");
    } catch (error) {
      console.error("Error updating Destination:", error);
      alert("An error occurred while updating the Destination.");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Edit Destination"} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit Destination</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label
                  htmlFor="destinationName"
                  className="block font-bold mb-1"
                >
                  Destination Name
                </label>
                <input
                  value={des_name}
                  onChange={(e) => {
                    setDes_name(e.target.value);
                  }}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs"
                  required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label
                  htmlFor="destinationPlace"
                  className="block font-bold mb-1"
                >
                  Place of the Destination
                </label>
                <input
                  value={des_place}
                  onChange={(e) => setDes_place(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="form-control">
                <label
                  htmlFor="destinationAbout"
                  className="block font-bold mb-1"
                >
                  About
                </label>
                <textarea
                  value={des_about}
                  onChange={(e) => setDes_about(e.target.value)}
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Description of the destination"
                  required
                ></textarea>
              </div>
              <select
                value={des_resorts}
                onChange={(e) => setDes_resorts(e.target.value)}
                className="select select-bordered w-full mt-7 ml-5 max-w-xs"
              >
                <option disabled value="">
                  Near by Resorts
                </option>
                {des_list.map((place, index) => (
                  <option key={index} value={place.resortname}>
                    {place.resortname}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label
                  htmlFor="destinationImages"
                  className="block font-bold mb-1"
                >
                  Images of the Destination
                </label>
                <input
                  type="file"
                  onChange={(e) => setDes_images(e.target.files)}
                  className="file-input w-full max-w-xs"
                  multiple
                  required
                />
              </div>
            </div>
            <div></div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Update Destination
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditDest;
