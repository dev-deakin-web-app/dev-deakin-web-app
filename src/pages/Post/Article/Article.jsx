import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const Article = () => {
  // Add a new document with a generated id
  const newArticle = doc(collection(db, "articles"));

  // History as navigate
  const history = useNavigate();

  const [input, setInput] = useState({
    title: null,
    coverImage: null,
    timeStamp: new Date().toLocaleTimeString(),
    dateStamp:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
    description: null,
    attachmentsPath: "/",
    likes: 0,
    likedBy: [],
  });

  // Post Handler Method
  const postHandler = async () => {
    // Check if user filled all the fields
    if (!input.title || !input.description || !input.coverImage) {
      alert("Please fill all the fields");
      return;
    } else {
      await setDoc(newArticle, input);
      alert("Article Posted");
      history("/");
    }
  };

  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setInput({
            ...input,
            coverImage: url,
          });
        });
      }
    );
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
        <div className="flex flex-col justify-center w-full align-middle text-center p-2 border rounded-2xl">
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
          />

          <progress
            className="progress w-full mt-4"
            value={percent}
            max="100"
          ></progress>

          <button
            className="btn btn-neutral m-4 rounded-full"
            onClick={handleUpload}
          >
            Upload Image
          </button>
        </div>
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
