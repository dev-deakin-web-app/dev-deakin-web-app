import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import ArticleCard from "./ArticleCard/ArticleCard";
import { motion } from "framer-motion";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("Date");

  // Distinct Dates (store it in a set)
  const distinctDates = articles.map((article) => {
    return article.dateStamp;
  })

  // Distinct Dates (store it in a set)
  const distinctDatesSet = new Set(distinctDates);

  const fetchAllData = async () => {
    const articleRef = collection(db, "articles");
    const querySnapshot = await getDocs(articleRef);
    setArticles([]);

    querySnapshot.forEach((doc) => {
      // putting data into the articles
      setArticles((prev) => [...prev, { ...doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filteredArticles = articles.filter((article) => {
    // Filter articles based on the search input value (case-insensitive)
    return (article.title.toLowerCase().includes(searchInput.toLowerCase()) || article.description.toLowerCase().includes(searchInput.toLowerCase())) && (selectedDate === "Date" || article.dateStamp === selectedDate || selectedDate === "All");
  });

  return (
    <Layout>
      <div className="m-4 flex flex-col p-2 shadow-sm rounded-3xl">
        <h1 className="text-5xl font-bold text-center m-4">Articles</h1>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select className="select select-bordered" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              <option disabled selected>
                Date
              </option>
              {Array.from(distinctDatesSet).map((dateStamp) => (
                <option key={dateStamp} value={dateStamp}>
                  {dateStamp}
                </option>
              ))}
              <option>
                All
              </option>
            </select>
            {/* <button className="btn">Go</button> */}
          </div>
        </div>

        <div className="p-2">
          {/* Show Second Info Only If User is logged in */}
          {auth.currentUser ? (
            <div className="flex flex-col md:flex-row gap-8 justify-center align-middle cols-md-3">
              {filteredArticles.map((article) => (
                <motion.div key={article.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 0.9 }}>
                  <ArticleCard {...article} />
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

export default ArticlePage;
