import React from "react";
import Layout from "../../components/Layout/Layout";

const QuestionPage = () => {
  return (
    <Layout>
      <div className="m-4 flex flex-col p-2 shadow-sm rounded-3xl">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered w-full"
            />
            <select className="select select-bordered">
              <option disabled selected>
                Tag
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
            <select className="select select-bordered">
              <option disabled selected>
                Date
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
            <button className="btn">Go</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionPage;
