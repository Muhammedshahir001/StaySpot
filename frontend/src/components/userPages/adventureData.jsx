import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { getadvData } from "../../api/userApi";
import { baseUrl } from "../../files/file";

const AdventureData = () => {
  const [adventdata, setAdventdata] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    getAdventureData();
  }, []);

  const getAdventureData = async () => {
    try {
      const response = await getadvData(id);
      setAdventdata(response.data.oneAdvData);
    } catch (error) {
      console.error("Error fetching adventure details:", error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const images = adventdata?.image?.map((image, index) => ({
    id: index + 1,
    src: `${baseUrl}${image}`,
    isLarge: index === 0,
  }));

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="container mx-auto min-h-screen mb-14 flex flex-col items-center p-5">
        <div className="max-w-[768px] mb-8 flex flex-col lg:flex-row">
          {images && images.length > 0 ? (
            <figure className="mx-auto mb-4 lg:mb-0 lg:mr-4">
              <img
                src={images[0].src}
                alt={`${images[0].id}`}
                className="mx-auto h-96"
              />
            </figure>
          ) : null}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            {images &&
              images.length > 1 &&
              images.slice(1).map((image) => (
                <figure
                  key={image.id}
                  onClick={() => handleImageClick(image.src)}
                >
                  <img
                    src={image.src}
                    alt={`${image.id}`}
                    className="cursor-pointer mx-auto h-28"
                  />
                </figure>
              ))}
          </div>
        </div>
        <div className="max-w-[768px] mx-auto p-6 border border-gray-300">
          <h2 className="text-2xl font-semibold">{adventdata.activity}</h2>
          <h3 className="text-lg mb-4">
            Conducted By: {adventdata.resortName}
          </h3>
          <div className="font-semibold">
            Total Time Allowed: {adventdata.time}hours
          </div>
          <br />
          <div className="text-justify font-normal">
            <h2 className="font-medium">Description</h2>
            {adventdata.description}
          </div>
        </div>
      </div>
      <Footer />
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <img src={selectedImage} alt="Selected" className="max-h-screen" />
        </div>
      )}
    </div>
  );
};

export default AdventureData;
