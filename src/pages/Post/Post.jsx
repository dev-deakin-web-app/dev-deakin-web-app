import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Article from "./Article/Article";
import Question from "./Question/Question";

const Post = () => {
  // Using State Current Selected Option
  const [option, setOption] = useState("Question");

  return (
    <Layout>
      <div>
        <h1 className="text-5xl font-bold text-center m-4">Post</h1>

        {/* Give Option to the User to Select Question or Article to Post */}
        <div className="flex justify-center m-8">
          <div className="join mx-auto">
            <input
              className="join-item btn rounded-3xl"
              type="radio"
              name="options"
              aria-label="Question"
              checked={option === "Question"}
              onClick={() => setOption("Question")}
            />
            <input
              className="join-item btn rounded-3xl"
              type="radio"
              name="options"
              aria-label="Article"
              onClick={() => setOption("Article")}
            />
          </div>
        </div>
        {/* Show Selected Option */}
        {option === "Question" ? <Question /> : <Article />}
      </div>
    </Layout>
  );
};

export default Post;
