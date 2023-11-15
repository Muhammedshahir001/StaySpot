import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Header";
import Footer from "./layout/Footer";
import {
  getResortData,
  staffAdv,
  getStaffAdv,
  editAdvPost,
} from "../../api/Staffapi";
import { ToastContainer, toast } from "react-toastify";

const StaffAdventure = () => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [AdvActivity, setAdvActivity] = useState([]);
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setdescription] = useState("");
  const [resort, setResort] = useState("");
  const [list, setList] = useState([]);
  const [image, setImage] = useState([]);
  const [adv, setAdv] = useState();
  const [show, setShow] = useState(false);
  // const [id,setid]=useState('')
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    getAdvData();
    getresortData();
  }, [show]);
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
      console.log(data, "77777777777777");
      if (data.success) {
        setAdvActivity(data.result);
      }
    } catch (error) {}
  };
  // this code is for to see the detials of the advneture activity..
  const handleEditClick = (item) => {
    try {
      console.log(item, "222222222");

      setAdv(item);

      setActivity(item.activity || "");
      setPrice(item.price || "");
      setTime(item.time || "");
      setPlace(item.place || "");
      setdescription(item.description || "");
      setResort(item.resort || "");
    } catch (error) {
      console.log(error, "404444444444444444");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modal = document.getElementById("staff_adventure");
    console.log(modal.checked, "modal checking...");

    if (
      activity === "" ||
      price === "" ||
      time === "" ||
      place === "" ||
      resort === "" ||
      description === ""
    ) {
      alert("please fill all required");
      return;
    }
    const formData = new FormData();
    formData.append("adventureactivity", activity);
    formData.append("adventureprice", price);
    formData.append("adventureTime", time);
    formData.append("adventureplace", place);
    formData.append("adventureresort", resort);
    formData.append("adventuredescription", description);

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      formData.append("adventureimage", img);
    }
    try {
      const adv = await staffAdv(formData);
      console.log(adv.data.message, "message came..");
      toast.success(adv.data.message, {
        position: "top-center",
      });
      console.log(adv, "adventure formdata");
      setActivity("");
      setPrice("");
      setTime("");
      setPlace("");
      setResort("");
      setdescription("");

     
      handleShow();
      modal.checked = false;

      // making the state as null while adding tmo

      // we making the modal.checked =false means to make the while add button clicked i need to remove the modal that is y

      // }
    } catch (error) {
      console.log(error, "Error in adv");
    }

  
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!adv) {
      toast.error("No adventure post selected.", {
        position: "top-center",
      });
      return;
    }

    if (!image || image.length === 0) {
      toast.error("Please select image(s) for the adventure.", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("adventureactivity", adv.activity);
    formData.append("adventureprice", adv.price);
    formData.append("adventureTime", adv.time);
    formData.append("adventureplace", adv.place);
    formData.append("adventureresort", adv.resortName);
    formData.append("adventuredescription", adv.description);

    for (let i = 0; i < image.length; i++) {
      formData.append("adventureimage", image[i]);
    }

    try {
      const newadv = await editAdvPost(adv._id, formData);
      if (newadv.data.success) {
        toast.success(newadv.data.message, {
          position: "top-center",
        });
      } else {
        toast.error(newadv.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating adventure", error);
    }
  };

  
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Headerr name={"Adventure  Activities"} />
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Details of Adventure</h2>

            <label htmlFor="staff_adventure" className="btn ml-auto">
              Add Activity
            </label>

            <input
              type="checkbox"
              id="staff_adventure"
              // onClick={handleModalOpen}
              className="modal-toggle"
            />

            <div className="modal">
              <div className="modal-box">
                <label
                  htmlFor="staff_adventure"
                  className="btn btn-circle btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </label>
                <form
                  onSubmit={handleSubmit}
                  className="form-control w-full max-w-xs"
                >
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Activity Name</span>
                    </label>
                    <input
                      value={activity}
                      type="text"
                      onChange={(e) => {
                        const actname = e.target.value.replace(
                          /[^a-zA-Z]/g,
                          " "
                        );
                        setActivity(actname);
                      }}
                      placeholder="Enter the Activity Name"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <input
                      value={price}
                      onChange={(e) => {
                        const actprice = e.target.value.replace(/[^0-9]/g, "");
                        if (actprice.length <= 4) {
                          setPrice(actprice);
                        }
                      }}
                      type="text"
                      placeholder="Enter the price"
                      className="input input-bordered w-full max-w-xs"
                    />

                    <label className="label">
                      <span className="label-text">Time</span>
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => {
                        const acttime = e.target.value.replace(/[^0-9]/g, " ");
                        // console.log("actime",acttime);
                        setTime(acttime);
                        console.log(acttime, "after setting..");
                      }}
                      placeholder="Enter the time"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                      <span className="label-text">Place</span>
                    </label>
                    <input
                      value={place}
                      onChange={(e) => {
                        setPlace(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter the place"
                      className="input input-bordered w-full max-w-xs"
                    />

                    <label className="label">
                      <span className="label-text">Overview </span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                      placeholder="About the activity"
                      className="textarea textarea-bordered textarea-md w-full max-w-xs"
                    ></textarea>

                    <label className="label">
                      <span className="label-text">
                        Provided by this Resort
                      </span>
                    </label>
                    <select
                      value={resort}
                      onChange={(e) => {
                        // console.log(resort,"tttttttt")
                        setResort(e.target.value);
                      }}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled value="">
                        List of resorts
                      </option>
                      {list.map((place, index) => (
                        <option key={index} value={place.resortname}>
                          {place.resortname}
                        </option>
                      ))}
                    </select>

                    <label className="label">
                      <span className="label-text">Images of Activity</span>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        console.log("dddd");
                        setImage(e.target.files);
                      }}
                      className="file-input file-input-bordered w-full max-w-lg"
                      multiple
                    />
                  </div>

                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer />
          </div>
          <div className="overflow-x-auto">
            <table className="table mx-auto w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Adventure Name</th>
                  <th>Place</th>
                  <th>Price</th>
                  <th>Conducted By</th>
                  <th>Status of activity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {AdvActivity.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.activity}</td>
                    <td>{item.place}</td>
                    <td>{item.price}</td>
                    <td>{item.resortName}</td>
                    <td>{item?.verify ? "approved" : "rejected"}</td>
                    <label
                      htmlFor="my_modal_7"
                      className="btn btn-info"
                      onClick={() => {
                        console.log(item, "2222222222222");
                        // console.log(index,"44444")
                        handleEditClick(item);
                      }}
                    >
                      Edit
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_7"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
                        <label
                          onClick={() => {
                            setActivity("");
                            setPrice("");
                            setTime("");
                            setPlace("");
                            setResort("");
                            setdescription("");
                          }}
                          htmlFor="my_modal_7"
                          className="btn btn-circle btn-ghost"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </label>
                        <form
                          onSubmit={handleUpdateSubmit}
                          className="form-control w-full max-w-xs"
                        >
                          <div className="form-control w-full max-w-xs">
                            <label className="label">
                              <span className="label-text">Activity Name</span>
                            </label>
                            <input
                              value={adv?.activity || ""}
                              onChange={(e) =>
                                setAdv({ ...adv, activity: e.target.value })
                              }
                              // value={adv?.activity || ""}

                              type="text"
                              placeholder="Enter the Activity Name"
                              className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                              <span className="label-text">Price</span>
                            </label>
                            <input
                              value={adv?.price || ""}
                              onChange={(e) =>
                                setAdv({ ...adv, price: e.target.value })
                              }
                              type="text"
                              placeholder="Enter the price"
                              className="input input-bordered w-full max-w-xs"
                            />

                            <label className="label">
                              <span className="label-text">Time</span>
                            </label>
                            <input
                              type="text"
                              value={adv?.time || ""}
                              onChange={(e) =>
                                setAdv({ ...adv, time: e.target.value })
                              }
                              placeholder="Enter the time"
                              className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                              <span className="label-text">Place</span>
                            </label>
                            <input
                              value={adv?.place || ""}
                              onChange={(e) =>
                                setAdv({ ...adv, place: e.target.value })
                              }
                              type="text"
                              placeholder="Enter the place"
                              className="input input-bordered w-full max-w-xs"
                            />

                            <label className="label">
                              <span className="label-text">Overview </span>
                            </label>
                            <textarea
                              value={adv?.description || ""}
                              onChange={(e) => {
                                // console.log(adv.description,"gfhgyfhfgbfg")
                                setAdv({ ...adv, description: e.target.value });
                              }}
                              placeholder="About the activity"
                              className="textarea textarea-bordered textarea-md w-full max-w-xs"
                            ></textarea>

                            <label className="label">
                              <span className="label-text">
                                Provided by this Resort
                              </span>
                            </label>
                            <select
                              // this is for showing the resortname after added
                              value={adv?.resortName || ""}
                              onChange={(e) => {
                                console.log(e.target.value, "vannuuu");
                                setAdv({ ...adv, resortName: e.target.value });
                              }}
                              className="select select-bordered w-full max-w-xs"
                            >
                              <option disabled value="">
                                List of resorts
                              </option>
                              {list.map((place, index) => (
                                <option key={index} value={place.resortname}>
                                  {place.resortname}
                                </option>
                              ))}
                            </select>

                            <label className="label">
                              <span className="label-text">
                                Images of Activity
                              </span>
                            </label>
                            <input
                              type="file"
                              onChange={(e) => setImage(e.target.files)}
                              className="file-input file-input-bordered w-full max-w-lg"
                              multiple
                              required
                            />
                          </div>

                          <div className="modal-action">
                            <button type="submit" className="btn btn-success">
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                      <ToastContainer />
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffAdventure;
