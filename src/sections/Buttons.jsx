import React from "react";
import { Link } from "react-router-dom";

const Buttons = () => {
  return (
    <div className="rounded-3xl shadow mt-8 flex flex-col sm:flex-row">
      <Link to={"/findquestionpage"}>
        <button className="btn btn-neutral m-5 rounded-3xl">
          Find Question
        </button>
      </Link>
      <Link to={"/showallarticles"}>
        <button className="btn btn-neutral m-5 rounded-3xl">
          All Articles
        </button>
      </Link>
      <Link to={"/showallquestions"}>
        <button className="btn btn-neutral m-5 rounded-3xl">
          All Questions
        </button>
      </Link>
    </div>
  );
};

export default Buttons;
