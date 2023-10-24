import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { faker } from "@faker-js/faker";

// Add a new document with a generated id
const newArticle = doc(collection(db, "articles"));

const Article = () => {
  const [input, setInput] = useState({
    title: null,
    coverImage: faker.image.url(),
    timeStamp: new Date().toLocaleTimeString(),
    dateStamp:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
    description: null,
    attachmentsPath: "/",
  });

  // Post Handler Method
  const postHandler = async () => {
    // Check if user filled all the fields
    if (!input.title || !input.description) {
      {
        alert("Please fill all the fields");
        return;
      }
    }else {
        await setDoc(newArticle, input);
        alert("Article Posted");
    }
  };
  return (
    <div className="flex flex-col m-auto p-2 gap-2 border-2 rounded-3xl w-max mb-8">
      {/* Title */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Title</h1>
        <input
          type="text"
          onChange={(e) => setInput({ ...input, title: e.target.value })}
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter Title"
          required
        />
      </div>
      {/* Description */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Description</h1>
        <textarea
          type="text"
          className="textarea textarea-bordered w-full max-w-xs"
          placeholder="Enter Description"
          onChange={(e) => setInput({ ...input, description: e.target.value })}
          required
        />
      </div>
      {/* File */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Image</h1>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={(e) =>
            setInput({ ...input, attachmentsPath: e.target.value })
          }
        />
      </div>

      {/* Post Button */}
      <div className="flex m-2 flex-col md:flex-row">
        <button
          type="submit"
          className="btn-primary rounded-3xl p-2 text-2xl font-mono m-1 md:m-2 w-full text-center"
          onClick={postHandler}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Article;
