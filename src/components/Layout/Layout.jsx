import React from "react";

// Importing all created components
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

// Pass the child props
export default function Layout({ children }) {
  return (
    <div>
      {/* Attaching all file components */}
      <Navbar />
      {children}
      <Footer /> {/* Attach if necessary */}
    </div>
  );
}
