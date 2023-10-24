import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";

const ArticleCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(props.likes); // Initialize with the initial likes count
  const [likedBy, setlikedBy] = useState(props.likedBy);

  console.log(loading);
  const imageLoaded = () => {
    setLoading(false);
  };

  const handleLikeClick = async () => {

    const user = auth.currentUser;

    // Check if the user if there in the list or not
    if (!likedBy.includes(user.uid)) {
      setLikes(likes + 1);
      await updateDoc(doc(db, "articles", props.id), {
        likes: likes + 1,
        likedBy: arrayUnion(user.uid),
      });
    }
    else {
      setLikes(likes - 1);
      await updateDoc(doc(db, "articles", props.id), {
        likes: likes - 1,
        likedBy: arrayRemove(user.uid),
      });
    }
  };

  useEffect(() => {
    // Set up a snapshot listener to update the likes count in real-time
    const currentDocument = doc(db, "articles", props.id);
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
          <p className="wrap justify-center text-justify font-light">
            {props.description}
          </p>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary rounded-full m-2">View</button>
          <p className="rounded-full m-2 p-4 font-mono">
            Likes: {likes ? likes : 0}
          </p>
          {likedBy.includes(auth.currentUser.uid) ? (
            <button
              className="btn m-2 btn-secondary rounded-full"
              onClick={handleLikeClick}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          ) : (
            <button className="btn m-2 rounded-full" onClick={handleLikeClick}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
