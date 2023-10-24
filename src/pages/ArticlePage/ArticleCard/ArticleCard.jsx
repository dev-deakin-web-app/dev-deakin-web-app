import React from "react";
import { useState } from "react";

const ArticleCard = (props) => {
  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={props.coverImage}
          alt="Shoes"
          onLoad={imageLoaded}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.title}</h2>
        <div className="p-4 shadow rounded-3xl overflow-scroll scrollbar-hide h-56">
          <p className="wrap justify-center text-justify font-light">{props.description}</p>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary rounded-full m-2">View</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
