import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import QuestionCard from "./QuestionCard/QuestionCard";
import { motion } from "framer-motion";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedTag, setSelectedTag] = useState("Tag");

  // Distinct Tags (store it in a set)
  const distinctTags = questions.map((questions) => {
    // Each question have its tags
    // Iterate over all tags
    return questions.tags.map((tag) => {
      return tag;
    });
  });

  // Distinct Tags (store it in a set)
  const distinctTagsSet = new Set(distinctTags);

  // Distinct Dates (store it in a set)
  const distinctDates = questions.map((questions) => {
    return questions.dateStamp;
  });

  // Distinct Dates (store it in a set)
  const distinctDatesSet = new Set(distinctDates);

  const fetchAllData = async () => {
    const questionsRef = collection(db, "documents");
    const querySnapshot = await getDocs(questionsRef);
    setQuestions([]);

    querySnapshot.forEach((doc) => {
      // putting data into the questions
      setQuestions((prev) => [...prev, { ...doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filteredQuestions = questions.filter((question) => {
    // Filter questions based on the search input value (case-insensitive)
    return (
      (question.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        question.description
          .toLowerCase()
          .includes(searchInput.toLowerCase())) &&
      (selectedDate === "Date" ||
        question.dateStamp === selectedDate ||
        selectedDate === "All") &&
      (selectedTag === "Tag" ||
        question.tags.includes(selectedTag) ||
        selectedTag === "All")
    );
  });

  return (
    <Layout>
      <div className="m-4 flex flex-col p-2 shadow-sm rounded-3xl">
        <h1 className="text-5xl font-bold text-center m-4">Questions</h1>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
              className="select select-bordered"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option disabled selected>
                Date
              </option>
              {Array.from(distinctDatesSet).map((dateStamp) => (
                <option key={dateStamp} value={dateStamp}>
                  {dateStamp}
                </option>
              ))}
              <option>All</option>
            </select>
            <select
              className="select select-bordered"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option disabled selected>
                Tag
              </option>
              {Array.from(distinctTagsSet).map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
              <option>All</option>
            </select>
            {/* <button className="btn">Go</button> */}
          </div>
        </div>

        <div className="p-2">
          {/* Show Second Info Only If User is logged in */}
          {auth.currentUser ? (
            <div className="flex flex-wrap justify-center p-4">
              {filteredQuestions.map((questions) => (
                <motion.div
                  key={questions.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.9 }}
                  className="flex flex-col md:flex-row flex-wrap justify-center m-auto w-full p-8 md:w-1/2 lg:w-1/3"
                >
                  <QuestionCard {...questions} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="font-mono font-thin text-5xl text-center mt-16">
              Please Login
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuestionPage;
