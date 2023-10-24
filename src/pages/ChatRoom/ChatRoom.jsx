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

const ChatMessagesList = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

const ChatRoom = () => {
  // const messageRef = db.collection('messages');
  // const query = messageRef.orderBy('createdAt').limit(25);

  // const [messages] = useCollectionData(query, {idField: 'id'});

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      message: formValue,
      timestamp: serverTimestamp(),
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
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://play-lh.googleusercontent.com/0SAFn-mRhhDjQNYU46ZwA7tz0xmRiQG4ZuZmuwU8lYmqj6zEpnqsee_6QDuhQ4ZofwXj=w240-h480-rw" />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={auth.currentUser.photoURL} />
            </div>
          </div>
          <div className="chat-header">
            {auth.currentUser.displayName}
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">Well Done</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>

        <hr className="m-5"/>

        <form className="flex w-full justify-end space-x-4 mt-5">
          {/* <input
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          /> */}
          <input type="text" placeholder="Type here" className="input input-bordered input-neutral w-full max-w-xs" />
          <button type="submit" className="btn btn-primary rounded-3xl" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>

      {messages &&
        messages.map((message) => {
          ChatMessagesList(message);
        })}
    </Layout>
  );
};

export default ChatRoom;
