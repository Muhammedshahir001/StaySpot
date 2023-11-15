import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Header";
import { getResortData, staffAdv, getStaffAdv } from "../../api/Staffapi";
import { ToastContainer, toast } from "react-toastify";

const StaffAdventure = () => {
  const [AdvActivity, setAdvActivity] = useState([]);
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [resort, setResort] = useState("");
  const [list, setList] = useState([]);
  const [image, setImage] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    getAdvData();
  }, []);

  const handleModalOpen = () => {
    getresortData();
  };

  const getresortData = async () => {
    try {
      let { data } = await getResortData();
      console.log(data, "data of resort ");

      if (data.success) {
        setList(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdvData = async () => {
    try {
      let { data } = await getStaffAdv();
      if (data.success) {
        setAdvActivity(data.result);
      }
    } catch (error) {
      console.log(error,"Error occured in the Add Adventure page");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventureactivity", activity);
    formData.append("adventureprice", price);
    formData.append("adventureTime", time);
    formData.append("adventureplace", place);
    formData.append("adventureresort", resort);
    formData.append("adventuredesc", desc);

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      formData.append("adventureimage", img);
    }
    try {
      const adv = await staffAdv(formData);
      console.log(adv, "adventure formdata");
      if (adv.data.created) {
        toast.success(adv.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error, "Error in adv");
    }
  };

  const handleEdit = (index) => {
    const item = AdvActivity[index];
    setEditIndex(index);
    setActivity(item.activity);
    setPrice(item.price);
    setTime(item.time);
    setPlace(item.place);
    setDesc(item.desc);
    setResort(item.resortName);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventureactivity", activity);
    formData.append("adventureprice", price);
    formData.append("adventureTime", time);
    formData.append("adventureplace", place);
    formData.append("adventureresort", resort);
    formData.append("adventuredesc", desc);

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      formData.append("adventureimage", img);
    }
    try {
      // Call your update API here
      // Pass the formData and editIndex to update the specific item
      // ...
      console.log("Updated!");
      // Clear the form fields and editIndex after successful update
      setActivity("");
      setPrice("");
      setTime("");
      setPlace("");
      setDesc("");
      setResort("");
      setEditIndex(null);
    } catch (error) {
      console.log(error, "Error in update");
    }
  };

  return (
    <div>
      <Navbar />
      <Headerr />

      <div className="advouter">
        <div className="form-heading">
          <h3>Staff Adventure Form</h3>
        </div>

        <div className="resort-form">
          <form onSubmit={editIndex !== null ? handleUpdate : handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Activity</label>
                  <input
                    type="text"
                    name="activity"
                    className="form-control"
                    placeholder="Enter Activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    name="time"
                    className="form-control"
                    placeholder="Enter Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Place</label>
                  <input
                    type="text"
                    name="place"
                    className="form-control"
                    placeholder="Enter Place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="desc"
                    className="form-control"
                    placeholder="Enter Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Resort</label>
                  <select
                    name="resort"
                    className="form-control"
                    value={resort}
                    onChange={(e) => setResort(e.target.value)}
                  >
                    <option value="">Select Resort</option>
                    {list.map((resort) => (
                      <option key={resort._id} value={resort.name}>
                        {resort.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    multiple
                    onChange={(e) => setImage(e.target.files)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {editIndex !== null ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>

        <div className="advactivities">
          <h3>Staff Adventure Activities</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Price</th>
                <th>Time</th>
                <th>Place</th>
                <th>Resort</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {AdvActivity.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.activity}</td>
                  <td>{activity.price}</td>
                  <td>{activity.time}</td>
                  <td>{activity.place}</td>
                  <td>{activity.resortName}</td>
                  <td>{activity.desc}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StaffAdventure;
