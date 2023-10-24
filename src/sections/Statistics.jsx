import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Statistics = () => {
  const [countDocuments, setCountDocuments] = useState(0);
  const [countArticles, setCountArticles] = useState(0);

  const getCount = async () => {
    try {
      const documentsCollection = collection(db, "documents");
      const articlesCollection = collection(db, "articles");

      const documentsSnapshot = await getDocs(documentsCollection);
      const articlesSnapshot = await getDocs(articlesCollection);

      const documentCount = documentsSnapshot.size;
      const articleCount = articlesSnapshot.size;

      setCountDocuments(documentCount);
      setCountArticles(articleCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="mt-8">
      <div className="stats stats-vertical shadow-lg">
        <div className="stat">
          <div className="stat-title">Total Documents</div>
          <div className="stat-value">{countDocuments}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Articles</div>
          <div className="stat-value">{countArticles}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Blogs</div>
          <div className="stat-value">2</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
