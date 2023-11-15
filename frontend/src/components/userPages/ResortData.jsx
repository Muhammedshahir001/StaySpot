import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useSelector } from "react-redux";
import {
  addReview,
  getresortdata,
  getReviews,
  SendId,
} from "../../api/userApi";
import { FaBed, FaRupeeSign } from "react-icons/fa";
import { TbBrandWhatsapp } from "react-icons/tb";
const ResortData = () => {
  const users = useSelector((state) => state.user);
  const [resortdata, setResortdata] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [rooms, setRooms] = useState(1); // Added rooms state
  const [price, setPrice] = useState(0); // Added price stat
  const [user, setUser] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");
  const [submittedReview, setSubmittedReview] = useState(null);
  const [showAddReview, setShowAddReview] = useState(true);
  const [reviews, setReviews] = useState([]);
  
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getResortData();
    getReviewsForResort();
    const storedReview = localStorage.getItem("submittedReview");
    if (storedReview) {
      setSubmittedReview(JSON.parse(storedReview));
      setShowAddReview(false);
    }
  }, []);
  const getReviewsForResort = async () => {
    try {
      const { data } = await getReviews(id); // Assuming getReviews is an API function to get reviews by resort ID
      setReviews(data.reviews);
      // Assuming the response has a field named 'reviews' containing the review data
    } catch (error) {
      console.error(error);
    }
  };

  console.log(resortdata, "resortdataaaaaaaaaaaaaaaa");

  const getResortData = async () => {
    try {
      let { data } = await getresortdata(id);

      setResortdata(data.oneresortdata);
      setPrice(data.oneresortdata.price);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming resort ID is available in the component
      const resortId = resortdata._id; // Adjust this according to your data structure

      const reviewData = {
        content: reviewContent,
        stars,
        resortId,
      };

      const response = await addReview(resortId, reviewData);
      getReviewsForResort();
      console.log(response); // Handle the response as needed

      setMessage("Review submitted successfully!");
      setSubmittedReview({ content: reviewContent, stars }); // Store submitted review for display
      setReviewContent(""); // Clear review content after submission
      setStars(0); // Reset stars
      setShowAddReview(false); // Hide add review section

      // Save submitted review in local storage
      localStorage.setItem(
        "submittedReview",
        JSON.stringify({ content: reviewContent, stars })
      );
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit review.");
    }
  };

  const handleStarClick = (selectedStars) => {
    setStars(selectedStars);
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const images = resortdata?.image?.map((image, index) => ({
    id: index + 1,
    src: image, // Update this line to use the image URL directly
    isLarge: index === 0,
  }));

  const decrement = () => {
    if (rooms > 1) {
      setRooms(rooms - 1);
      priceChang();
    }
  };

  const increment = () => {
    // console.log(resortdata.number_room,"count of room")
    console.log(rooms, "number of user entered count");
    if (rooms < resortdata.number_room) setRooms(rooms + 1);
    if (rooms <= resortdata.number_room - 1) priceChange();
  };

  const priceChange = () => {
    var updatedPrice = resortdata.price * (rooms + 1);
    console.log(updatedPrice, "updated price...");
    setPrice(updatedPrice);
  };
  const priceChang = () => {
    var updatedPrice = resortdata.price * (rooms - 1);
    console.log(updatedPrice);
    setPrice(updatedPrice);
  };

  const handleBookView = async (bookeddata) => {
    try {
      if (user) {
        navigate(`/viewbook/`, { state: { bookeddata, price, rooms } });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendIds = async (sender, reciever) => {
    console.log(sender, reciever, "ttttttt");
    const ids = await SendId(sender, reciever);
    navigate("/chat");
    console.log(ids);
  };

  const checkInDateFromStorage = localStorage.getItem("checkinDate");

  const checkOutDateFromStorage = localStorage.getItem("checkoutDate");
  console.log(checkInDateFromStorage, checkOutDateFromStorage, "ppppppp");

  return (
    <>
      <div className="mx-auto max-w-screen-2xl overflow-x-hidden">
        <Header />

        <div className="container mx-auto mt-5 min-h-screen flex flex-col items-center ">
          <div className="max-w-[768px] mb-8 flex flex-col lg:flex-row">
            {images && images.length > 0 ? (
              <figure className="mx-auto mb-4 lg:mb-0 lg:mr-4">
                <img
                  src={images[selectedImageIndex].src}
                  alt={`${images[selectedImageIndex].id}`}
                  className="mx-auto h-96 cursor-pointer"
                  onClick={() =>
                    handleImageClick(
                      images[selectedImageIndex].src,
                      selectedImageIndex
                    )
                  }
                />
              </figure>
            ) : null}

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              {images &&
                images.length > 1 &&
                images.map((image, index) => (
                  <figure
                    key={image.id}
                    onClick={() => handleImageClick(image.src, index)}
                  >
                    <img
                      src={image.src}
                      alt={`${image.id}`}
                      className={`cursor-pointer mx-auto h-28 ${
                        selectedImageIndex === index
                          ? "border border-blue-500"
                          : ""
                      }`}
                    />
                  </figure>
                ))}
            </div>
          </div>

          <div className="flex gap-1 my-5">
            {/* Overview */}
            <div className="w-1/2">
              <div className="max-w-[768px] mx-auto p-6 h-[55rem] md:h-[47rem] border border-gray-300">
                <h2 className="text-2xl font-semibold">
                  {resortdata.resortname}
                </h2>
                <h3 className="text-lg mb-4">Address: {resortdata.address}</h3>
                <div className="text-justify font-normal h-[20rem] overflow-y-auto">
                  <h2 className="font-medium">Description</h2>
                  <p>{resortdata.description}</p>
                </div>
                <br />
                <div className="text-justify font-normal">
                  <h2 className="font-extrabold">Services</h2>
                  <p>
                    {resortdata.service
                      ? resortdata.service
                      : "No services available"}
                  </p>
                </div>
                <br />
                <div className="flex gap-x-6 font-bold">
                  <span>Total Rooms:</span>
                  <FaBed className="text-2xl" />
                  <div>{resortdata.number_room}</div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                  <div className="mb-4 md:mb-0">
                    <div className="font-bold">How many rooms do you need?</div>
                    <div className="custom-number-input h-10 w-32">
                      <label
                        htmlFor="custom-input-number"
                        className="w-full text-gray-700 text-sm font-semibold"
                      ></label>
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button
                          data-action="decrement"
                          onClick={decrement}
                          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 "
                          name="custom-input-number"
                          value={rooms}
                          readOnly
                        />
                        <button
                          data-action="increment"
                          onClick={increment}
                          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-black flex items-center">
                    <span>
                      <FaRupeeSign className="inline" />
                    </span>
                    <span className="inline">{price}</span>
                  </div>
                </div>
                <br />
                <button
                  className="btn btn-primary bg-blue-500 text-black w-full mt-4"
                  onClick={(e) => {
                    handleBookView(resortdata, price);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Add Review */}
            <div className="w-1/2 max-h-full">
              <div className="max-w-[768px] mb-1 mx-auto p-6 border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>

                {/* Add a Review Button */}

                <form onSubmit={handleReviewSubmit} className="mt-2">
                  <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    className="w-full h-24 p-2 border rounded-md"
                    placeholder="Write your review here..."
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className={`text-3xl ${
                          star <= stars ? "text-yellow-500" : "text-gray-300"
                        } cursor-pointer`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Submit Review
                  </button>{" "}
                </form>
              </div>

              <div className="max-w-[768px] mx-auto p-3 border border-gray-300 h-[28rem] overflow-y-scroll">
                <h2 className="text-2xl font-semibold mb-4"> All Reviews</h2>

                {reviews &&
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="py-3 px-5 border rounded-md mb-1 border-gray-300"
                    >
                      <div className="flex justify-between">
                        <p className="mt-2 font-semibold text-lg ">
                          {review.user.name}
                        </p>
                        <div className="flex items-center space-x-0 ">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-xl ${
                                star <= review.stars
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              } cursor-pointer`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="ml-5 	font-style: italic">
                        {review.content}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {selectedImage && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-screen"
              />
            </div>
          )}

          <button
            onClick={() => {
              handleSendIds(users.id, resortdata?.resortowner?._id);
            }}
            title="Contact Owner"
            className="fixed z-90 bottom-10 right-8 bg-green-500 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-green-300 hover:drop-shadow-2xl hover:animate-bounce duration-300"
          >
            <TbBrandWhatsapp />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResortData;
