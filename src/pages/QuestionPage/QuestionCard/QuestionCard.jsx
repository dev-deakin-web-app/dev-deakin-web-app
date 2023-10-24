import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const QuestionCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(props.likes); // Initialize with the initial likes count
  const [likedBy, setlikedBy] = useState(props.likedBy);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(loading);
  const imageLoaded = () => {
    setLoading(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLikeClick = async () => {
    const user = auth.currentUser;

    // Check if the user if there in the list or not
    if (!likedBy.includes(user.uid)) {
      setLikes(likes + 1);
      await updateDoc(doc(db, "documents", props.id), {
        likes: likes + 1,
        likedBy: arrayUnion(user.uid),
      });
    } else {
      setLikes(likes - 1);
      await updateDoc(doc(db, "documents", props.id), {
        likes: likes - 1,
        likedBy: arrayRemove(user.uid),
      });
    }
  };

  useEffect(() => {
    // Set up a snapshot listener to update the likes count in real-time
    const currentDocument = doc(db, "documents", props.id);
    const unsubscribe = onSnapshot(currentDocument, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setLikes(docSnapshot.data().likes);
        setlikedBy(docSnapshot.data().likedBy);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [props.id]);

  const downloadHandler = () => {
    htmlToImage
      .toPng(document.getElementById("my-node"))
      .then(function (dataUrl) {
        download(dataUrl, props.title);
      });
  };
  return (
    <div>
      <div id="my-node" className="card w-96 bg-base-100 shadow-xl">
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
            <p className="wrap justify-center text-justify font-light">
              {props.description}
            </p>
          </div>
          <div className="card-actions">
            <button
              onClick={openModal}
              className="btn btn-primary rounded-full m-2"
            >
              View
            </button>
            <p className="rounded-full m-2 p-4 font-mono">
              UpVote: {likes ? likes : 0}
            </p>
            {likedBy.includes(auth.currentUser.uid) ? (
              <button
                className="btn m-2 btn-secondary rounded-full"
                onClick={handleLikeClick}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            ) : (
              <button
                className="btn m-2 rounded-full"
                onClick={handleLikeClick}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            )}
          </div>
          {/* Download Button */}
          <div className="flex w-full">
            <button
              className="btn btn-neutral rounded-3xl m-2 w-full"
              onClick={downloadHandler}
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default QuestionCard;
