import React from "react";
// import SecondSection from "./SecondSection";
import { auth } from "../firebase";
import ImageGallery from "./ImageGallery";
import Clock from "../components/Clock/Clock";
import Buttons from "./Buttons";
import Statistics from "./Statistics";

const Gallery = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* First Section */}
      <ImageGallery />

      {/* Second Section */}
      <div className="m-4 md:mt-10 w-max">
        {/* Time Section */}
        <Clock />

        {/* Show Second Info Only If User is logged in */}
        {auth.currentUser ? (
          <div>
            {/* Buttons */}
            <Buttons />

            {/* Another Section */}
            <div className="flex flex-row justify-center">
              {/* Statistics */}
              <Statistics />
            </div>
          </div>
        ) : (
          <div className="font-mono font-thin text-5xl text-center mt-16">Please Login</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
