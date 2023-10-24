import React from "react";
import Layout from "../../components/Layout/Layout";
import Gallery from "../../sections/Gallery";
import CookieConsent from "react-cookie-consent";

const HomePage = () => {
  return (
    <Layout>
      <Gallery />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius: "8px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </Layout>
  );
};

export default HomePage;
