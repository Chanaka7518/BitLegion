import React, { Component } from "react";
import { Carousel } from "antd";
import "./HomepageBody.css";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Unauthorized from "../Errors/403";
const img1: string = new URL(`./1.png`, import.meta.url).href;
const img2: string = new URL(`./2.png`, import.meta.url).href;
const img3: string = new URL(`./3.png`, import.meta.url).href;

const HomepageBody = () => {
  const { userData } = useAuthContext();
  const userRole: string = userData?.userRole;

  return (
    <>
      {userRole !== "Admin" && (
        <div className="container">
          <NavBar />
          <div className="carouser">
            <Carousel
              autoplay
              className="carousel_content"
              pauseOnDotsHover={true}
              draggable
            >
              <img src={img1} />
              <img src={img2} />
              <img src={img3} />
            </Carousel>

            <Footer />
          </div>
        </div>
      )}

      {userRole === "Admin" && (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
};

export default HomepageBody;
