import React from "react";

const Footer = ({ currentpage, npage, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];

    for (let page = 1; page <= npage; page++) {
      pageButtons.push(
        <button
          key={page}
          className={`join-item btn rounded-3xl ${
            currentpage === page ? "btn-outline mr-1" : "mr-1"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    return pageButtons;
  };
  return (
    <div className="flex justify-center mt-6">
      <div className="join">{renderPageButtons()}</div>
    </div>
  );
};

export default Footer;
