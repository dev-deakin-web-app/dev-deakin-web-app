import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { auth } from "../../firebase";

const ChatRoom = () => {
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      message: formValue,
      timestamp: new Date().toLocaleString(),
      userPhotoUrl: photoURL,
      userName: auth.currentUser.displayName,
      uid: uid,
    });

    setFormValue("");
  };

  const [formValue, setFormValue] = useState("");

  const [messages, setMessages] = useState([]);

  const fetchAllData = async () => {
    const messageRef = collection(db, "messages");

    const q = query(messageRef, orderBy("timestamp", "desc"), limit(25));

    const querySnapshot = await getDocs(q);

    // Clear previous data
    setMessages([]);

    querySnapshot.forEach((doc) => {
      // putting data into the question
      setMessages((prev) => [...prev, { ...doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Layout>
      <div className="m-10 shadow rounded-3xl p-8">
        {messages.map((message) => {
          return (
            <div>
              {message.uid === auth.currentUser.uid ? (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={message.userPhotoUrl} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.userName}
                    <time className="text-xs opacity-50 pl-2">
                      {message.timestamp}
                    </time>
                  </div>
                  <div className="chat-bubble">{message.message}</div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              ) : (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={message.userPhotoUrl} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.userName}
                    <time className="text-xs opacity-50 pl-2">
                      {message.timestamp}
                    </time>
                  </div>
                  <div className="chat-bubble">{message.message}</div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              )}
            </div>
          );
        })}
        <hr className="m-5" />

        <form className="flex w-full justify-end space-x-4 mt-5">
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-neutral w-full max-w-xs"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-3xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ChatRoom;
