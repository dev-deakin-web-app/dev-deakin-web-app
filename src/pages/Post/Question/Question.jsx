import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

// Add a new document with a generated id
const newDocument = doc(collection(db, "documents"));

const Question = () => {
  // Post Handler Method
  const postHandler = async () => {
    // Check if user filled all the fields
    if (!input.title || !input.code) {
      {
        alert("Please fill all the fields");
        return;
      }
    } else {
      await setDoc(newDocument, input);
    }
  };

  // TagsInput
  const [tags, setTags] = useState([]);

  const [input, setInput] = useState({
    code: null,
    title: null,
    timeStamp: new Date().toLocaleTimeString(),
    dateStamp:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
    description: null,
    attachmentsPath: "/",
    tags: tags,
  });

  const code = `print("Hello World")`;

  return (
    <div className="flex flex-col m-auto p-2 gap-2 border-2 rounded-3xl w-max mb-8">
      {/* Title */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Title</h1>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter Title"
          onChange={(e) => {
            setInput({
              ...input,
              title: e.target.value,
            });
          }}
        />
      </div>
      {/* Description */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Description</h1>
        <textarea
          type="text"
          className="textarea textarea-bordered w-full max-w-xs"
          placeholder="Enter Description"
          onChange={(e) => {
            setInput({
              ...input,
              description: e.target.value,
            });
          }}
        />
      </div>
      {/* Code */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Code</h1>
        <CodeMirror
          value={code}
          options={{
            theme: "monokai",
            keyMap: "sublime",
            mode: "jsx",
          }}
          width="450px"
          className="m-4"
        />
      </div>
      {/* File */}
      <div className="flex m-2 flex-col md:flex-row">
        <h1 className="text-2xl font-mono m-1 md:m-2">Attachements</h1>

        {/* File Input */}
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={(e) => {
            setInput({
              ...input,
              attachmentsPath: e.target.value,
            });
          }}
        />
      </div>
      {/* Tags Input */}
      <div className="flex m-2 flex-col md:flex-row gap-4">
        <h1 className="text-2xl font-mono m-1 md:m-2">Tags</h1>
        <input
          id="inputTag"
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTags([...tags, e.target.value]);
            }
          }}
        />

        {/* Get value from inputTag and add to tags */}
        <button className="btn btn-neutral rounded-2xl border" onClick={(e) => {setTags([...tags, document.getElementById("inputTag").value])}}>
          Add
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap border rounded-3xl p-4 w-11/12 gap-2 m-auto">
        {tags.map((tag, index) => (
          <div className="badge badge-ghost m-1 p-3 text-lg" key={index}>
            {tag}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3 hover:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
              // Remove on click on this tag
              onClick={() => {
                setTags(tags.filter((_, i) => i !== index));
              }}
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        ))}
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

export default Question;
