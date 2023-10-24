import React from "react";

const ImageGallery = () => {
  return (
    <>
      {/* First Section Image Gallery */}
      <div className="carousel w-11/12 m-4 lg:w-1/2">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-3xl"
            alt="slide1"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.pexels.com/photos/1100008/pexels-photo-1100008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-3xl"
            alt="slide2"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.pexels.com/photos/2721507/pexels-photo-2721507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-3xl"
            alt="slide3"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://static.sliit.lk/wp-content/uploads/2021/07/07031851/sliit-international-section-transfer-options-Deakin-university.jpg"
            className="w-full rounded-3xl"
            alt="slide4"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
