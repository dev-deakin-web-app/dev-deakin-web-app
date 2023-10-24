import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import ArticleCard from "./ArticleCard/ArticleCard";
import { motion } from "framer-motion";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);

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
            />
            <select className="select select-bordered">
              <option disabled selected>
                Date
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
            <button className="btn">Go</button>
          </div>
        </div>

        <div className="p-2">
          {/* Show Second Info Only If User is logged in */}
          {auth.currentUser ? (
            <div className="flex flex-col md:flex-row gap-8 justify-center align-middle cols-md-3">{/* Map through all articles from google firebase */}
              {articles.map((article) => (
                <motion.div key={article.id} transition={{ type: "spring"}}>
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
