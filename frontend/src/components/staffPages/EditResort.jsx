import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Header";
import { editpostresortdatas } from "../../api/Staffapi";
import { ToastContainer, toast } from "react-toastify";

const EditResort = () => {
  const [resortData, setResortData] = useState({
    resortname: "",
    number_room: "",
    address: "",
    place: "",
    description: "",
    image: [], // You can use this to update images
    price: "",
    phone: "",
    service: "",
  });

  const [id, setId] = useState("");
  const location = useLocation();
  const items = location.state?.item;
   const navigate = useNavigate();


  useEffect(() => {
    setResortData({
      resortname: items.resortname,
      number_room: items.number_room,
      address: items.address,
      place: items.place,
      description: items.description,
      price: items.price,
      phone: items.phone,
      service: items.service,
    });
    setId(items._id);
  }, [items]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append the updated data
      formData.append("resortname", resortData.resortname);
      formData.append("place", resortData.place);
      formData.append("address", resortData.address);
      formData.append("description", resortData.description);
      formData.append("price", resortData.price);
      formData.append("phone", resortData.phone);
      formData.append("number_rooms", resortData.number_room);
      formData.append("service", resortData.service);

      // Append the existing images and any new images
      for (let i = 0; i < resortData.image.length; i++) {
        formData.append("image", resortData.image[i]);
      }

      const data = await editpostresortdatas(formData, id);

      if (data.success) {
        console.log(data.message, "message");
        // Construct a custom message and pass it to the alert function
        alert(`Success: ${data.message}`);
         navigate("/staff/staffResorts")
      } else {
        console.error("Edit failed:", data.message);
        // Construct a custom message and pass it to the alert function
        alert(`Edit failed: ${data.message}. Custom message here.`);
      }
    } catch (error) {
      console.error("An error occurred during the edit:", error.message);
      toast.error("An error occurred during the edit. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Edit Resort Details"} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Resort Name
                </label>
                <input
                  type="text"
                  value={resortData.resortname}
                  onChange={(e) =>
                    setResortData({ ...resortData, resortname: e.target.value })
                  }
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs"
                  required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Place of the Resort
                </label>
                <input
                  type="text"
                  value={resortData.place}
                  onChange={(e) =>
                    setResortData({ ...resortData, place: e.target.value })
                  }
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="form-control mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Address of the Resort
                </label>
                <textarea
                  value={resortData.address}
                  onChange={(e) =>
                    setResortData({ ...resortData, address: e.target.value })
                  }
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Bio"
                  required
                ></textarea>
              </div>
              <div className="form-control">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Description
                </label>
                <textarea
                  value={resortData.description}
                  onChange={(e) =>
                    setResortData({
                      ...resortData,
                      description: e.target.value,
                    })
                  }
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Bio"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Phone number
                </label>
                <input
                  type="number"
                  value={resortData.phone}
                  onChange={(e) =>
                    setResortData({ ...resortData, phone: e.target.value })
                  }
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs"
                  required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={resortData.price}
                  onChange={(e) =>
                    setResortData({ ...resortData, price: e.target.value })
                  }
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Images of the Resort
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setResortData({ ...resortData, image: e.target.files })
                  }
                  className="file-input w-full max-w-xs"
                  multiple
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label
                  htmlFor="number_of_rooms"
                  className="block font-bold mb-1"
                >
                  Number of Rooms
                </label>
                <input
                  type="number"
                  value={resortData.number_room}
                  onChange={(e) =>
                    setResortData({
                      ...resortData,
                      number_room: e.target.value,
                    })
                  }
                  className="input input-bordered input-md w-96 max-w-xs"
                  required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="service" className="block font-bold mb-1">
                  Services
                </label>
                <input
                  type="text"
                  value={resortData.service}
                  onChange={(e) =>
                    setResortData({ ...resortData, service: e.target.value })
                  }
                  className="input input-bordered input-md w-full max-w-xs"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-6">
              Update Resort
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditResort;
