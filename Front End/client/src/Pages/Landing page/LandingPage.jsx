import React from "react";
import { FaBehance, FaDribble } from "react-icons/fa";
import { IoMailOutline, IoChevronForwardCircle, IoStar } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import Card from "../../Components/landing page/Card";

function LandingPage() {
  return (
    <>
      <Header>
        <div className="logo_wraper">
          Quantum<span>Leap</span>
        </div>
        <div className="menu_container">
          <span>
            <IconContext.Provider
              value={{
                color: "#000",
                size: "18px",
                className: "icons_container",
              }}
            >
              <div className="icon">
                <FaBehance />
              </div>
              <div className="icon">
                <FaDribble />
              </div>
            </IconContext.Provider>
          </span>
          <span>
            <IconContext.Provider
              value={{
                color: "#000",
                size: "18px",
              }}
            >
              <div className="icon">
                <IoMailOutline />
              </div>
              quantumleap@co.ke
            </IconContext.Provider>
          </span>
          <span className="menu"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Header>

      <div className="content_wrapper">
        <div className="left_content_wrapper">
          <h2>
            <span>
              Revolutionizing <span className="second">Logistics</span>{" "}
            </span>
            <span>
              For the <span className="second">Digital Age</span>{" "}
            </span>
          </h2>
          <p2>
            Quantum Leap Innovations introduces a groundbreaking logistics
            solution-no extra hardware, just smart technology
          </p2>
          <div className="btn_group">
            <div className="btn btn_primary">
              Order
              <IconContext.Provider
                value={{
                  color: "#14da8f",
                  size: "25px",
                }}
              >
                <IoChevronForwardCircle />
              </IconContext.Provider>
            </div>
            <div className="btn btn_secondary">Customer Support</div>
          </div>
          <div className="review_container">
            <p className="total_reviews">50+ Reviews</p>
            <IconContext.Provider
              value={{
                color: "#fff",
                size: "18px",
              }}
            >
              <span>
                {" "}
                <IoStar />
              </span>
              <span>
                {" "}
                <IoStar />
              </span>
              <span>
                {" "}
                <IoStar />
              </span>
              <span>
                {" "}
                <IoStar />
              </span>
              <span>
                {" "}
                <IoStar />
              </span>
            </IconContext.Provider>
            <p>More than 500+ clients across Afrcica taking our services</p>
          </div>
        </div>
        <div className="right_content_wrapper"></div>
        <img src={"/images.bg.png"} alt="bg_image" />
      </div>

      {/*  */}
      <Card />
    </>
  );
}

export default LandingPage;
